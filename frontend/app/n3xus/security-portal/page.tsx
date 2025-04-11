"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UploadContractModal } from "@/app/n3xus/security-portal/upload-modal";
import { computeRiskScoreSWC } from "@/app/n3xus/security-portal/risk-scoring";
import { ReportCollaboration } from "@/app/n3xus/security-portal/_components/security-portal/ReportCollaboration";

import {
  AlertTriangle,
  CheckCircle,
  Code,
  FileText,
  Search,
  RefreshCw,
  Eye,
  Share2,
  Filter,
  Plus,
  ArrowRight,
  Brain,
  ShieldCheck,
} from "lucide-react";
import { ProjectList } from "@/app/n3xus/security-portal/_components/security-portal/project-list";
import { VulnerabilityAnalysis } from "@/app/n3xus/security-portal/_components/security-portal/vulnerability-analysis";
import { SecurityCopilot } from "@/app/n3xus/security-portal/_components/security-portal/security-copilot";
import { RiskScoreCard } from "@/app/n3xus/security-portal/_components/security-portal/risk-score-card";
import { VerificationStatus } from "@/app/n3xus/security-portal/_components/security-portal/verification-status";

// ----------------------------------------------------------------------------
// Helper: Determines if AI verification data is complete.
// It checks whether the "verification" property is a non-empty array or object,
// or whether "false_positives" or "missed_vulnerabilities" contain data.
function isAIAnalysisComplete(aiVerification: any): boolean {
  if (!aiVerification) return false;

  let hasVerification = false;
  if (Array.isArray(aiVerification.verification)) {
    hasVerification = aiVerification.verification.length > 0;
  } else if (aiVerification.verification && typeof aiVerification.verification === "object") {
    hasVerification = Object.keys(aiVerification.verification).length > 0;
  }

  const hasFalsePositives =
    Array.isArray(aiVerification.false_positives) && aiVerification.false_positives.length > 0;

  const hasMissed =
    Array.isArray(aiVerification.missed_vulnerabilities) && aiVerification.missed_vulnerabilities.length > 0;

  return hasVerification || hasFalsePositives || hasMissed;
}

// ----------------------------------------------------------------------------
// Project Interface
interface Project {
  id: string;
  name: string;
  address: string;
  status: "In Progress" | "Completed" | "Pending";
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
  timestamp: string;
  scan_results?: any;
}

// ----------------------------------------------------------------------------
export default function SecurityPortal() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("https://sec3-an3-production.up.railway.app/api/scan/results")
      .then((res) => res.json())
      .then((data) => {
        let items: any[] = [];
        if (Array.isArray(data)) {
          items = data;
        } else if (data.projects && Array.isArray(data.projects)) {
          items = data.projects;
        } else if (data.audit_id) {
          items = [data];
        }
        // IMPORTANT: Use item.scan_results rather than item.result
        const mappedProjects: Project[] = items.map((item: any) => ({
          id: item.id,
          name: item.contract_name || "Untitled Contract",
          address: item.contract_address || "",
          status: "Pending", // Update as needed.
          criticalIssues: item.criticalIssues || 0,
          highIssues: item.highIssues || 0,
          mediumIssues: item.mediumIssues || 0,
          lowIssues: item.lowIssues || 0,
          timestamp: item.created_at ? new Date(item.created_at).toISOString() : new Date().toISOString(),
          scan_results: {
            scanner_results: (item.scan_results && item.scan_results.scanner_results) || {},
            ai_verification: (item.scan_results && item.scan_results.ai_verification) || {},
            ai_remediation: (item.scan_results && item.scan_results.ai_remediation) || {},
            verified: (item.scan_results && item.scan_results.verified) || false,
          },
        }));

        console.log("Mapped Projects:", mappedProjects);
        setProjects(mappedProjects);
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* ---------- HEADER SECTION ---------- */}
      <header className="border-b">
        <div className="flex my-4 h-16 items-center px-4 justify-between">
          <h1 className="text-xl font-bold">N3XUS AI-Powered Security Portal</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <UploadContractModal />
          </div>
        </div>
      </header>
      {/* ---------- /HEADER SECTION ---------- */}

      <div className="flex flex-1 overflow-hidden">
        {/* ---------- LEFT PANEL: PROJECTS LIST ---------- */}
        <div className="w-1/3 border-r flex flex-col overflow-auto">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Audit Projects</h2>
              <Button size="sm" variant="default">
                <Plus className="h-4 w-4 mr-1" /> Audit
              </Button>
            </div>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <ProjectList
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
              projects={projects}
            />
          </div>
        </div>
        {/* ---------- /LEFT PANEL: PROJECTS LIST ---------- */}

        {/* ---------- RIGHT PANEL: PROJECT DETAILS ---------- */}
        <div className="flex-1 overflow-auto">
          {selectedProject ? (
            <div className="h-full">
              <div className="p-6">
                {/* ---------- Selected Project Header ---------- */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedProject?.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Contract Address: {selectedProject?.address || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" /> View on Explorer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                </div>

                {/* ---------- TABS ---------- */}
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
                    <TabsTrigger value="copilot">Security Copilot</TabsTrigger>
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                    <TabsTrigger value="attestation">Attestation</TabsTrigger>
                  </TabsList>

                  {/* ---------- OVERVIEW TAB ---------- */}
                  <TabsContent value="overview" className="space-y-4">
                    {/* 1) Security Score */}
                    <RiskScoreCard
                      score={selectedProject ? computeRiskScoreSWC(selectedProject) : null}
                    />

                    {/* 2) AI Analysis Status */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI Analysis Status</CardTitle>
                        <Brain className="h-4 w-4 text-cyan-500" />
                      </CardHeader>
                      <CardContent>
                        {console.log("AI Verification Data:", JSON.stringify(selectedProject?.scan_results?.ai_verification, null, 2))}
                        <div className="text-2xl font-bold text-green-500">
                          {isAIAnalysisComplete(selectedProject?.scan_results?.ai_verification)
                            ? "Complete"
                            : "Pending"}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last updated: {new Date(selectedProject?.timestamp).toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>

                    {/* 3) Vulnerabilities */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </CardHeader>
                      <CardContent className="flex gap-8">
                        <div className="text-2xl font-bold">
                          {(() => {
                            const sev =
                              selectedProject?.scan_results?.scanner_results?.summary
                                ?.severity_breakdown || {};
                            const missed =
                              selectedProject?.scan_results?.ai_verification
                                ?.missed_vulnerabilities || [];
                            const critical = missed.filter(
                              (vuln: any) =>
                                vuln.severity === "High" || vuln.severity === "Critical"
                            ).length;
                            return critical + (sev["High"] || 0) + (sev["Medium"] || 0);
                          })()}
                        </div>
                        <div className="flex flex-wrap space-x-1 gap-2">
                          {(() => {
                            const missed =
                              selectedProject?.scan_results?.ai_verification
                                ?.missed_vulnerabilities || [];
                            const sev =
                              selectedProject?.scan_results?.scanner_results?.summary
                                ?.severity_breakdown || {};
                            const high = sev["High"] || 0;
                            const medium = sev["Medium"] || 0;
                            const critical = missed.filter(
                              (vuln: any) =>
                                vuln.severity === "High" || vuln.severity === "Critical"
                            ).length;
                            return (
                              <>
                                {critical > 0 && (
                                  <Badge variant="destructive" className="text-xs flex-1 min-w-max h-6">
                                    {critical} Critical
                                  </Badge>
                                )}
                                {high > 0 && (
                                  <Badge variant="outline" className="text-xs flex-1 min-w-max h-6 border-orange-500 text-orange-500">
                                    {high} High
                                  </Badge>
                                )}
                                {medium > 0 && (
                                  <Badge variant="outline" className="text-xs flex-1 min-w-max h-6 border-yellow-500 text-yellow-500">
                                    {medium} Medium
                                  </Badge>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </CardContent>
                    </Card>

                    {/* 4) Auto-Fix Suggestions */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Auto-Fix Suggestions</CardTitle>
                        <Code className="h-4 w-4 text-green-500" />
                      </CardHeader>
                      <CardContent>
                        {(() => {
                          const fixes =
                            selectedProject?.scan_results?.ai_remediation?.fix_suggestions || [];
                          const fixCount = fixes.length;
                          return (
                            <>
                              <div className="text-2xl font-bold">{fixCount}</div>
                              <p className="text-xs text-muted-foreground">
                                {fixCount > 0 ? "Ready to implement" : "No auto-fixes generated"}
                              </p>
                              {fixCount > 0 && (
                                <Button variant="link" size="sm" className="px-0 h-6 mt-1">
                                  Apply fixes <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                              )}
                            </>
                          );
                        })()}
                      </CardContent>
                    </Card>

                    {/* 5) Project Progress */}
                    {(() => {
                      const scan = selectedProject?.scan_results || {};
                      const aiDone = !!scan?.ai_verification;
                      const fixesDone = (scan?.ai_remediation?.fix_suggestions || []).length > 0;
                      let progress = 25;
                      let phase = "Phase 1: Analysis Started";
                      if (aiDone) {
                        progress = 50;
                        phase = "Phase 2: AI Analysis";
                      }
                      if (fixesDone) {
                        progress = 75;
                        phase = "Phase 3: Fix Suggestions";
                      }
                      if (aiDone && fixesDone && scan?.verified) {
                        progress = 100;
                        phase = "Phase 4: Verified";
                      }
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Project Progress: {progress}%</h3>
                            <span className="text-sm text-muted-foreground">{phase}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      );
                    })()}

                    {/* 6) Audit Timeline */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Audit Timeline</CardTitle>
                        <CardDescription>Project milestones and verification steps</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ol className="relative border-l border-muted">
                          {(() => {
                            const scan = selectedProject?.scan_results || {};
                            const aiDone = !!scan?.ai_verification;
                            const fixes = scan?.ai_remediation?.fix_suggestions || [];
                            const fixesDone = fixes.length > 0;
                            const isVerified = !!scan?.verified;
                            const timeline = [
                              {
                                title: "Project Created",
                                date: new Date(selectedProject?.timestamp).toLocaleDateString(),
                                status: "complete",
                              },
                              {
                                title: "AI Analysis Started",
                                date: aiDone ? new Date(selectedProject?.timestamp).toLocaleDateString() : "Pending",
                                status: aiDone ? "complete" : "pending",
                              },
                              {
                                title: "Vulnerability Analysis Complete",
                                date: aiDone ? new Date(selectedProject?.timestamp).toLocaleDateString() : "Pending",
                                status: aiDone ? "complete" : "pending",
                              },
                              {
                                title: "Auto-Fix Suggestions Generated",
                                date: fixesDone ? new Date(selectedProject?.timestamp).toLocaleDateString() : "Pending",
                                status: fixesDone ? "complete" : "pending",
                              },
                              {
                                title: "Fixes Implementation",
                                date: "Pending",
                                status: aiDone && fixesDone ? "current" : "pending",
                              },
                              {
                                title: "Verification & Re-audit",
                                date: "Pending",
                                status: isVerified ? "complete" : "pending",
                              },
                              {
                                title: "Final Report & Attestation",
                                date: "Pending",
                                status: isVerified ? "current" : "pending",
                              },
                            ];
                            return timeline.map((step, index) => (
                              <TimelineItem
                                key={step.title}
                                title={step.title}
                                date={step.date}
                                status={step.status as "complete" | "current" | "pending"}
                                isLast={index === timeline.length - 1}
                              />
                            ));
                          })()}
                        </ol>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* VULNERABILITIES TAB */}
                  <TabsContent value="vulnerabilities" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>AI-Driven Vulnerability Analysis</CardTitle>
                        <CardDescription>
                          Comprehensive analysis with auto-triage and prioritization
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <VulnerabilityAnalysis detailed={true} project={selectedProject} />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* SECURITY COPILOT TAB */}
                  <TabsContent value="copilot" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Copilot</CardTitle>
                        <CardDescription>
                          Live AI-assisted security feedback and guidance
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <SecurityCopilot />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* VERIFICATION TAB */}
                  <TabsContent value="verification" className="space-y-4">
                    <ReportCollaboration project={selectedProject} isPaidUser={true} />
                  </TabsContent>

                  {/* ATTESTATION TAB */}
                  <TabsContent value="attestation" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Decentralized & Transparent Attestation</CardTitle>
                        <CardDescription>
                          Zero-knowledge proofs (ZKPs) for verifiable security attestations
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <ShieldCheck className="h-6 w-6 text-green-500" />
                              <div>
                                <h4 className="font-medium">Security Attestation</h4>
                                <p className="text-sm text-muted-foreground">
                                  Verifiable on-chain proof of security audit
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className="border-green-500 text-green-500">
                              Pending
                            </Badge>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">ZKP Verification Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Attestation Hash:</span>
                                <span className="font-mono">0x7a9d...e3f2</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Verification Method:</span>
                                <span>Zero-Knowledge Proof</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Attestation Chain:</span>
                                <span>Ethereum</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <span className="text-yellow-500">Awaiting Final Verification</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline">Preview Attestation</Button>
                            <Button disabled>Generate Attestation</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No Project Selected</h3>
                <p className="text-muted-foreground">
                  Select a project from the list or create a new audit
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Audit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- TIMELINE ITEM COMPONENT ---------- */
interface TimelineItemProps {
  title: string;
  date: string;
  status: "complete" | "current" | "pending";
  isLast?: boolean;
}

function TimelineItem({ title, date, status, isLast = false }: TimelineItemProps) {
  return (
    <li className={`ml-6 ${!isLast ? "mb-6" : ""}`}>
      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-background border">
        {status === "complete" ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : status === "current" ? (
          <div className="h-3 w-3 rounded-full bg-blue-500" />
        ) : (
          <div className="h-3 w-3 rounded-full bg-muted" />
        )}
      </span>
      <div className="flex items-center justify-between">
        <h3 className={`font-medium ${status === "pending" ? "text-muted-foreground" : ""}`}>{title}</h3>
        <time className="text-xs text-muted-foreground">{date}</time>
      </div>
    </li>
  );
}
