import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UploadContractModal } from "./upload-modal";
import {
  AlertTriangle,
  CheckCircle,
  Code,
  FileText,
  Search,
  Upload,
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
}

export default function SecurityPortal() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/scan/results");
      const data = await res.json();
      const parsed = data.map((item: any) => {
        const sev = item.scan_results?.scanner_results?.summary?.severity_breakdown ?? {};
        return {
          id: item.id,
          name: item.contract_name || "Unnamed Contract",
          address: item.contract_address || "N/A",
          status: "Completed",
          criticalIssues: sev["Critical"] ?? 0,
          highIssues: sev["High"] ?? 0,
          mediumIssues: sev["Medium"] ?? 0,
          lowIssues: sev["Low"] ?? 0,
          timestamp: item.created_at,
        };
      });
      setProjects(parsed);
      if (parsed.length > 0) {
        setSelectedProject(parsed[0].id);
      }
    };
    fetchProjects();
  }, []);

  const selected = projects.find((p) => p.id === selectedProject);

  return (
    <div className="flex">
      <div className="w-1/3">
        <ProjectList
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
        />
      </div>
      <div className="w-2/3">
        {selected ? (
          <div className="p-6">
            <h2 className="text-2xl font-bold">{selected.name}</h2>
            <p className="text-sm text-muted-foreground">
              Contract Address: {selected.address}
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
              <RiskScoreCard />
              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis Status</CardTitle>
                  <Brain className="h-4 w-4 text-cyan-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">Complete</div>
                  <p className="text-xs text-muted-foreground">Last updated: 2 hours ago</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Vulnerabilities</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent className="flex gap-8">
                  <div className="text-2xl font-bold">
                    {selected.criticalIssues + selected.highIssues + selected.mediumIssues + selected.lowIssues}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selected.criticalIssues > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {selected.criticalIssues} Critical
                      </Badge>
                    )}
                    {selected.highIssues > 0 && (
                      <Badge variant="outline" className="text-xs border-orange-500 text-orange-500">
                        {selected.highIssues} High
                      </Badge>
                    )}
                    {selected.mediumIssues > 0 && (
                      <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-500">
                        {selected.mediumIssues} Medium
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Auto-Fix Suggestions</CardTitle>
                  <Code className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Ready to implement</p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-2 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Project Progress: 75%</h3>
                <span className="text-sm text-muted-foreground">Phase 3: Vulnerability Analysis</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">No project selected</div>
        )}
      </div>
    </div>
  );
}
