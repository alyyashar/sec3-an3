"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, Code, RefreshCw, Shield } from "lucide-react";

interface VerificationStatusProps {
  project: any;
}

export function VerificationStatus({ project }: VerificationStatusProps) {
  const aiFixes = project?.scan_results?.ai_remediation?.fix_suggestions || [];
  const verifiedFixes = aiFixes.filter((fix: any) => fix.status === "verified");
  const partialFixes = aiFixes.filter((fix: any) => fix.status === "partial");

  const getCount = (severity: string) => {
    const issues = project?.scan_results?.scanner_results?.issues || [];
    const missed = project?.scan_results?.ai_verification?.missed_vulnerabilities || [];
    const all = [...issues, ...missed];
    return all.filter((v: any) => v.severity === severity).length;
  };

  const count = {
    Critical: getCount("Critical"),
    High: getCount("High"),
    Medium: getCount("Medium"),
  };

  const progress = Math.floor((verifiedFixes.length / (aiFixes.length || 1)) * 100);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Verification Progress: {progress}%</h3>
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            {progress === 100 ? "Complete" : "In Progress"}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium">Fixed Issues</h4>
                <p className="text-sm text-muted-foreground">
                  {verifiedFixes.length} of {aiFixes.length} issues fixed
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Critical Issues</span>
                <span className="text-sm">
                  {verifiedFixes.filter((f: any) => f.severity === "Critical").length}/
                  {count.Critical}
                </span>
              </div>
              <Progress
                value={Math.floor(
                  (verifiedFixes.filter((f: any) => f.severity === "Critical").length /
                    (count.Critical || 1)) *
                    100
                )}
                className="h-1.5"
              />

              <div className="flex justify-between items-center">
                <span className="text-sm">High Issues</span>
                <span className="text-sm">
                  {verifiedFixes.filter((f: any) => f.severity === "High").length}/{count.High}
                </span>
              </div>
              <Progress
                value={Math.floor(
                  (verifiedFixes.filter((f: any) => f.severity === "High").length / (count.High || 1)) * 100
                )}
                className="h-1.5"
              />

              <div className="flex justify-between items-center">
                <span className="text-sm">Medium Issues</span>
                <span className="text-sm">
                  {verifiedFixes.filter((f: any) => f.severity === "Medium").length}/{count.Medium}
                </span>
              </div>
              <Progress
                value={Math.floor(
                  (verifiedFixes.filter((f: any) => f.severity === "Medium").length / (count.Medium || 1)) * 100
                )}
                className="h-1.5"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <RefreshCw className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium">Re-audit Status</h4>
                <p className="text-sm text-muted-foreground">Verification in progress</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Code changes detected</span>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Complete
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">AI verification</span>
                </div>
                <Badge variant="outline" className="border-blue-500 text-blue-500">
                  In Progress
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Final security score</span>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">Auto-Fix Verification</h3>

          <div className="space-y-4">
            {aiFixes.map((fix: any, index: number) => (
              <div
                key={index}
                className={`p-3 border rounded-md ${
                  fix.status === "verified"
                    ? "bg-green-500/5 border-green-500/20"
                    : fix.status === "partial"
                    ? "bg-yellow-500/5 border-yellow-500/20"
                    : "bg-gray-500/5 border-gray-500/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {fix.status === "verified" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                    <h4 className="font-medium">{fix.title || `Fix ${index + 1}`}</h4>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      fix.status === "verified"
                        ? "border-green-500 text-green-500"
                        : fix.status === "partial"
                        ? "border-yellow-500 text-yellow-500"
                        : ""
                    }
                  >
                    {fix.status === "verified" ? "Verified" : fix.status === "partial" ? "Partial" : "Pending"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{fix.reason}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Re-run Verification
        </Button>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Generate Security Report
        </Button>
      </div>
    </div>
  );
}
