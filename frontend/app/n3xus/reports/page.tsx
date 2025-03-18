"use client"

import { useState, useEffect } from "react"
import { FileText, Download, Eye, Share2, Clock, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

// Dynamically set API URL
const API_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8000" // Local FastAPI Server
    : "https://sec3-an3-production.up.railway.app" // Production API

export default function Reports() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch(`${API_URL}/api/scan/results`)
        if (!response.ok) throw new Error("Failed to fetch reports")

        const data = await response.json()
        setReports(data)
      } catch (error) {
        console.error("Error fetching reports:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const countInProgress = reports.filter((r) => !r.scan_results).length
  const totalReports = reports.length
  const totalCriticalFindings = reports.reduce((sum, r) => {
    const criticalIssues = r.scan_results?.scanner_results?.summary?.severity_breakdown?.Critical || 0
    return sum + criticalIssues
  }, 0)

  return (
    <div className="text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Security Reports</h1>
            <p className="text-muted-foreground mt-1">Comprehensive security analysis reports</p>
          </div>
          <Button onClick={() => router.push("/n3xus/upload-contract")}>
            Generate New Report
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReports}</div>
              <p className="text-xs text-muted-foreground">Generated this month</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{countInProgress}</div>
              <p className="text-xs text-muted-foreground">Reports being generated</p>
              <Progress value={countInProgress > 0 ? 60 : 100} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Critical Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{totalCriticalFindings}</div>
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
            {loading ? (
              <div className="text-center py-6">
                <Loader2 className="animate-spin h-6 w-6 mx-auto text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Loading reports...</p>
              </div>
            ) : reports.length === 0 ? (
              <p className="text-muted-foreground text-center py-6">No reports found.</p>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => {
                  const { id, contract_name, created_at, scan_results } = report
                  const status = scan_results ? "Complete" : "In Progress"
                  const criticalIssues = scan_results?.scanner_results?.summary?.severity_breakdown?.Critical || 0
                  const highIssues = scan_results?.scanner_results?.summary?.severity_breakdown?.High || 0

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between p-4 border border-[#333] rounded-lg hover:bg-[#252525] transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{contract_name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(created_at).toLocaleDateString()}
                            </span>
                            <Badge
                              variant="outline"
                              className={
                                status === "Complete"
                                  ? "border-green-500 text-green-500"
                                  : "border-blue-500 text-blue-500"
                              }
                            >
                              {status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                          {criticalIssues > 0 && (
                            <Badge variant="destructive">{criticalIssues} Critical</Badge>
                          )}
                          {highIssues > 0 && (
                            <Badge variant="outline" className="border-orange-500 text-orange-500">
                              {highIssues} High
                            </Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => router.push(`/n3xus/reports/${id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(`${API_URL}/api/reports/${id}/download`, "_blank")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
