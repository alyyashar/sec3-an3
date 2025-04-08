"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface ReportCollaborationProps {
  project: any;
  isPaidUser?: boolean;
}

/**
 * ReportCollaboration provides a section for users to view their detailed audit report,
 * download a PDF report (if on a paid tier), and see a placeholder for collaborative expert review (N3ST).
 */
export function ReportCollaboration({ project, isPaidUser = false }: ReportCollaborationProps) {
  const router = useRouter();

  const handleViewReport = () => {
    if (project?.audit_id) {
      // Navigate to the reports page; you may pass the audit_id as a query param or in another way
      router.push(`/n3xus/reports?auditId=${project.audit_id}`);
    }
  };

  const handleDownloadReport = () => {
    if (!project?.audit_id) return;
    const url = `/api/scan/${project.audit_id}/report`;
    window.open(url, "_blank");
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Report & Collaboration</CardTitle>
        <CardDescription>
          Access your detailed audit report and request expert review (N3ST - Coming Soon).
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div className="flex space-x-3">
          <Button onClick={handleViewReport}>View Report</Button>
          <Button onClick={handleDownloadReport} disabled={!isPaidUser}>
            {isPaidUser ? "Download PDF Report" : "Download PDF (Paid Tier)"}
          </Button>
        </div>
        <div className="border rounded-lg p-3">
          <p className="text-sm text-muted-foreground">
            Collaboration with security experts and red-team reviews will soon be available through N3ST.
          </p>
          <Button variant="outline" disabled>
            Request Expert Review (Coming Soon)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
