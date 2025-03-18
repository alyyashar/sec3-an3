"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  ClipboardList,
  Clock,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { AuditTimeline } from "@/app/n3xus/_components/audit-timeline"
import { RecentAudits } from "@/app/n3xus/_components/recent-audits"
import { ContractAuditTable } from "@/app/n3xus/dashboard/_components/auditTable"

export function MainDashboard() {
  const [auditData, setAuditData] = useState({
    totalAudits: 0,
    criticalIssues: 0,
    resolvedRate: 0,
    avgAuditTime: 0,
    recentAudits: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAuditResults() {
      try {
        const response = await fetch("/api/scan/results") // 🔥 FIXED API CALL
        if (!response.ok) throw new Error("Failed to fetch audit results")

        const results = await response.json()
        
        // Aggregate data from results
        const totalAudits = results.length
        const criticalIssues = results.filter((r: any) => r.scan_results?.scanner_results?.summary?.severity_breakdown?.High > 0).length
        const resolvedRate = totalAudits > 0 ? Math.round((totalAudits - criticalIssues) / totalAudits * 100) : 0
        const avgAuditTime = 3.2 // Placeholder for now
        
        setAuditData({ totalAudits, criticalIssues, resolvedRate, avgAuditTime, recentAudits: results })
      } catch (error) {
        console.error("Error fetching audit results:", error)
        setError("Failed to load audit results")
      } finally {
        setLoading(false)
      }
    }

    fetchAuditResults()
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">N3XUS Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {error && <div className="text-red-500 p-4">{error}</div>}
        {loading ? (
          <div className="text-white p-4">Loading audit results...</div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Audits</CardTitle>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{auditData.totalAudits}</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                    <div className="mt-2 flex items-center text-xs text-green-500">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+12% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-500">{auditData.criticalIssues}</div>
                    <p className="text-xs text-muted-foreground">Requiring attention</p>
                    <div className="mt-2 flex items-center text-xs text-red-500">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+5% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">{auditData.resolvedRate}%</div>
                    <p className="text-xs text-muted-foreground">Resolution rate</p>
                    <div className="mt-2 flex items-center text-xs text-green-500">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>+3% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Audit Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{auditData.avgAuditTime}m</div>
                    <p className="text-xs text-muted-foreground">Per contract</p>
                    <div className="mt-2 flex items-center text-xs text-green-500">
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                      <span>-15% from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="">
                <ContractAuditTable audits={auditData.recentAudits} />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Audits</CardTitle>
                    <CardDescription>Latest smart contract audits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentAudits audits={auditData.recentAudits} />
                  </CardContent>
                </Card>

                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Audit Timeline</CardTitle>
                    <CardDescription>Recent audit activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AuditTimeline audits={auditData.recentAudits} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
