"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Hourglass } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReportCollaborationProps {
  project: any;
  isPaidUser?: boolean;
}

// Define a type for the progress state
interface ReportProgress {
  status: "idle" | "in_progress" | "complete" | "error";
  progress: number;
  steps: {
    fetching_data: boolean;
    summarizing_findings: boolean;
    designing_report: boolean;
    finalizing_pdf: boolean;
  };
}

// This function simulates the progress response from the back end.
// In a real implementation you would replace this with actual polling of your API endpoint.
function simulateProgress(attempt: number): ReportProgress {
  // Increase progress by 20 points every attempt.
  const progress = Math.min(attempt * 20, 100);
  const steps = {
    fetching_data: attempt >= 1,
    summarizing_findings: attempt >= 2,
    designing_report: attempt >= 3,
    finalizing_pdf: attempt >= 4,
  };
  const status = progress === 100 ? "complete" : "in_progress";
  console.log(`Simulated progress attempt ${attempt}:`, { progress, steps, status });
  return { status, progress, steps };
}

export function ReportCollaboration({ project, isPaidUser = false }: ReportCollaborationProps) {
  const router = useRouter();
  const [reportState, setReportState] = useState<ReportProgress>({
    status: "idle",
    progress: 0,
    steps: {
      fetching_data: false,
      summarizing_findings: false,
      designing_report: false,
      finalizing_pdf: false,
    },
  });
  const [polling, setPolling] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Debug: Log the project data whenever the component renders
  console.log("ReportCollaboration - project:", project);

  const handleViewReport = () => {
    console.log("View report clicked, audit_id:", project?.audit_id);
    if (project?.audit_id) {
      router.push(`/n3xus/reports?auditId=${project.audit_id}`);
    }
  };

  const handleDownloadReport = async () => {
    console.log("Download PDF clicked! Using project.id:", project.id);
    alert("Download PDF button clicked");
  
    if (!project?.id) {
      console.warn("No id found on project.");
      return;
    }
  
    const url = `https://sec3-an3-production.up.railway.app/api/scan/${project.id}/report`;
    try {
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) {
        throw new Error(`Failed to fetch PDF: ${res.status} - ${res.statusText}`);
      }
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (error: any) {
      console.error("Download error:", error);
      alert("Error downloading PDF: " + error.message);
    }
  };

  const startReportGeneration = async () => {
    if (!project?.id) {
      console.warn("startReportGeneration: No audit_id found");
      return;
    }
    if (!isPaidUser) return;
    setPolling(true);
    setReportState({
      status: "in_progress",
      progress: 0,
      steps: {
        fetching_data: false,
        summarizing_findings: false,
        designing_report: false,
        finalizing_pdf: false,
      },
    });
    setErrorMsg("");
    
    let attempts = 0;
    const maxAttempts = 6;
    const interval = setInterval(() => {
      attempts++;
      const newState = simulateProgress(attempts);
      setReportState(newState);
      
      if (newState.status === "complete") {
        clearInterval(interval);
        setPolling(false);
      }
      
      if (attempts >= maxAttempts && newState.status !== "complete") {
        setErrorMsg("Report generation timed out. Please try again later.");
        setReportState({ ...newState, status: "error" });
        clearInterval(interval);
        setPolling(false);
      }
    }, 2000);
  };

  const renderStepIcon = (done: boolean) =>
    done ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Hourglass className="h-4 w-4 text-yellow-500" />;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Report & Collaboration</CardTitle>
        <CardDescription>
          Generate a detailed PDF report that summarizes your audit findings. Progress steps include fetching data, summarizing, designing the report, and finalizing the PDF.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {reportState.status === "idle" && (
          <Button onClick={startReportGeneration} disabled={!isPaidUser || polling}>
            {isPaidUser ? "Generate PDF Report" : "Generate PDF (Paid Tier)"}
          </Button>
        )}
        {reportState.status === "in_progress" && polling && (
          <>
            <p className="text-sm text-muted-foreground">Report generation in progress... ({reportState.progress}%)</p>
            <Progress value={reportState.progress} className="h-2" />
            <ul className="mt-2 space-y-2">
              <li className="flex items-center space-x-2">
                {renderStepIcon(reportState.steps.fetching_data)}
                <span>Fetching scan data</span>
              </li>
              <li className="flex items-center space-x-2">
                {renderStepIcon(reportState.steps.summarizing_findings)}
                <span>Summarizing vulnerabilities and key insights</span>
              </li>
              <li className="flex items-center space-x-2">
                {renderStepIcon(reportState.steps.designing_report)}
                <span>Designing report layout</span>
              </li>
              <li className="flex items-center space-x-2">
                {renderStepIcon(reportState.steps.finalizing_pdf)}
                <span>Finalizing PDF file</span>
              </li>
            </ul>
          </>
        )}
        {reportState.status === "complete" && (
          <>
            <p className="text-sm text-green-500">Report generation complete!</p>
            <div className="flex space-x-3">
              <Button onClick={handleViewReport}>View Report</Button>
              <Button onClick={handleDownloadReport}>Download PDF Report</Button>
            </div>
          </>
        )}
        {reportState.status === "error" && !polling && (
          <p className="text-sm text-red-500">{errorMsg}</p>
        )}
        <div className="border rounded-lg p-3">
          <p className="text-sm text-muted-foreground">
            Collaboration with security experts for manual review and bug bounties (N3ST) will be available in the future.
          </p>
          <Button variant="outline" disabled>
            Request Expert Review (Coming Soon)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
