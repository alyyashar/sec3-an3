"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Hourglass, Users, Activity, Rocket, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReportCollaborationProps {
  project: {
    id: string;
    scan_results?: any;
    // other fields...
  };
  isPaidUser?: boolean;
}

// State for simulating PDF generation progress
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

/** 
 * Mocks incremental progress every 2s.
 * Replace this with real polling once your back end supports it.
 */
function simulateProgress(attempt: number): ReportProgress {
  const progress = Math.min(attempt * 20, 100);
  const steps = {
    fetching_data: attempt >= 1,
    summarizing_findings: attempt >= 2,
    designing_report: attempt >= 3,
    finalizing_pdf: attempt >= 4,
  };
  const status = progress === 100 ? "complete" : "in_progress";
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

  // --- Handlers --- //
  const handleViewReport = () => {
    console.log("View report clicked, using project.id:", project?.id);
    // For demonstration, pass the ID as a query param
    router.push(`/n3xus/reports?auditId=${project.id}`);
  };

  const handleDownloadReport = async () => {
    console.log("Download PDF clicked! Using project.id:", project.id);
    if (!project?.id) {
      console.warn("No id found on project.");
      return;
    }

    alert("Generating your PDF, please wait...");

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

  const startReportGeneration = () => {
    if (!project?.id) {
      console.warn("startReportGeneration: No id found on project.");
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

  // --- UI --- //

  return (
    <Card className="mt-6 bg-background text-foreground shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ShieldAlert className="h-5 w-5 text-orange-500" />
          <span>Report & Collaboration</span>
        </CardTitle>
        <CardDescription>
          Generate a detailed PDF report summarizing your audit findings. Then explore N3ST for advanced collaboration.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 1) PDF Generation / Progress Section */}
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2">Report Generation</h3>
          {reportState.status === "idle" && (
            <Button onClick={startReportGeneration} disabled={!isPaidUser || polling}>
              {isPaidUser ? "Generate PDF Report" : "Generate PDF (Paid Tier)"}
            </Button>
          )}

          {reportState.status === "in_progress" && polling && (
            <>
              <p className="text-sm text-muted-foreground">
                Report generation in progress... ({reportState.progress}%)
              </p>
              <Progress value={reportState.progress} className="h-2 mt-2" />
              <ul className="mt-2 space-y-2">
                <li className="flex items-center space-x-2">
                  {renderStepIcon(reportState.steps.fetching_data)}
                  <span>Fetching scan data</span>
                </li>
                <li className="flex items-center space-x-2">
                  {renderStepIcon(reportState.steps.summarizing_findings)}
                  <span>Summarizing vulnerabilities & key insights</span>
                </li>
                <li className="flex items-center space-x-2">
                  {renderStepIcon(reportState.steps.designing_report)}
                  <span>Designing PDF layout</span>
                </li>
                <li className="flex items-center space-x-2">
                  {renderStepIcon(reportState.steps.finalizing_pdf)}
                  <span>Finalizing PDF file</span>
                </li>
              </ul>
            </>
          )}

          {reportState.status === "complete" && (
            <div className="space-y-2">
              <p className="text-sm text-green-500">Report generation complete!</p>
              <div className="flex space-x-2">
                <Button onClick={handleViewReport} variant="outline">
                  View Report
                </Button>
                <Button onClick={handleDownloadReport} variant="default">
                  Download PDF Report
                </Button>
              </div>
            </div>
          )}

          {reportState.status === "error" && !polling && (
            <p className="text-sm text-red-500">{errorMsg}</p>
          )}
        </div>

        {/* 2) Collaboration / N3ST Intro Section */}
        <div className="border rounded-lg p-4 bg-[#111] text-[#ddd]">
          <h3 className="text-sm font-medium flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-primary" />
            <span>N3ST Collaboration Hub (Coming Soon)</span>
          </h3>
          <p className="text-sm mb-3">
            N3ST is our upcoming platform where security experts, developers, and white-hat hackers collaborate 
            to identify, patch, and prevent vulnerabilities. With real-time code reviews and structured bug 
            bounty programs, you'll confidently secure your smart contracts.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center space-x-3 p-3 bg-[#1d1d1d] rounded-md border border-[#333]">
              <Activity className="h-5 w-5 text-blue-400" />
              <div className="text-sm">
                <strong className="block text-white">Live Collaboration</strong>
                <span className="text-xs text-gray-400">Real-time code reviews by security experts</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#1d1d1d] rounded-md border border-[#333]">
              <Rocket className="h-5 w-5 text-purple-400" />
              <div className="text-sm">
                <strong className="block text-white">Bug Bounties</strong>
                <span className="text-xs text-gray-400">Reward white-hat hackers for valid finds</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="outline" disabled>
              Join N3ST Beta (Coming Soon)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
