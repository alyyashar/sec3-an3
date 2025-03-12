"use client"

import { FileText, Download, Eye, Share2, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function Reports() {
  return (
    <div className="text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Security Reports</h1>
            <p className="text-muted-foreground mt-1">Comprehensive security analysis reports</p>
          </div>
          <Button>Generate New Report</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Generated this month</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">3</div>
              <p className="text-xs text-muted-foreground">Reports being generated</p>
              <Progress value={60} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Critical Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">7</div>
              <p className="text-xs text-muted-foreground">Across all reports</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>View and download security analysis reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "TokenSwap Security Audit",
                  date: "Mar 5, 2025",
                  status: "Complete",
                  criticalIssues: 2,
                  highIssues: 3,
                },
                {
                  title: "StakingPool Analysis",
                  date: "Mar 4, 2025",
                  status: "In Progress",
                  criticalIssues: 1,
                  highIssues: 2,
                },
                {
                  title: "Governance Contract Review",
                  date: "Mar 3, 2025",
                  status: "Complete",
                  criticalIssues: 0,
                  highIssues: 1,
                },
              ].map((report) => (
                <div
                  key={report.title}
                  className="flex items-center justify-between p-4 border border-[#333] rounded-lg hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{report.date}</span>
                        <Badge
                          variant="outline"
                          className={
                            report.status === "Complete"
                              ? "border-green-500 text-green-500"
                              : "border-blue-500 text-blue-500"
                          }
                        >
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      {report.criticalIssues > 0 && (
                        <Badge variant="destructive">{report.criticalIssues} Critical</Badge>
                      )}
                      {report.highIssues > 0 && (
                        <Badge variant="outline" className="border-orange-500 text-orange-500">
                          {report.highIssues} High
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

