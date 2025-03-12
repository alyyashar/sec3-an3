"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  ClipboardList,
  Clock,
  FileText,
  Shield,
  Upload,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Bug,
  LogOut,
} from "lucide-react"
import { AuditHistoryTable } from "@/app/n3xus/_components/audit-history-table"
import { AuditTimeline } from "@/app/n3xus/_components/audit-timeline"
import { RecentAudits } from "@/app/n3xus/_components/recent-audits"
import { ContractAuditTable } from "@/app/n3xus/dashboard/_components/auditTable"

export function MainDashboard() {
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
                  <div className="text-2xl font-bold">156</div>
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
                  <div className="text-2xl font-bold text-red-500">23</div>
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
                  <div className="text-2xl font-bold text-green-500">89%</div>
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
                  <div className="text-2xl font-bold">3.2m</div>
                  <p className="text-xs text-muted-foreground">Per contract</p>
                  <div className="mt-2 flex items-center text-xs text-green-500">
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                    <span>-15% from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="">
              <ContractAuditTable />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Audits</CardTitle>
                  <CardDescription>Latest smart contract audits</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentAudits />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Audit Timeline</CardTitle>
                  <CardDescription>Recent audit activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <AuditTimeline />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Vulnerability Types</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Vulnerability Types Chart"
                      className="h-full w-auto"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Audit Success Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Audit Success Rate Chart"
                      className="h-full w-auto"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Detection Accuracy</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="AI Detection Accuracy Chart"
                      className="h-full w-auto"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Audit Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators for the N3XUS auditing engine</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">False Positive Rate</p>
                        <p className="text-xs text-muted-foreground">Percentage of incorrectly flagged issues</p>
                      </div>
                      <p className="text-sm font-medium">4.3%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[4.3%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">AI Refinement Impact</p>
                        <p className="text-xs text-muted-foreground">Improvement over raw toolchain results</p>
                      </div>
                      <p className="text-sm font-medium">76%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[76%] rounded-full bg-cyan-500"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Auto-Patch Adoption</p>
                        <p className="text-xs text-muted-foreground">Percentage of suggested fixes implemented</p>
                      </div>
                      <p className="text-sm font-medium">62%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[62%] rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Exploit Simulation Accuracy</p>
                        <p className="text-xs text-muted-foreground">Correctly predicted exploit vectors</p>
                      </div>
                      <p className="text-sm font-medium">91%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[91%] rounded-full bg-purple-500"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Critical</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">8</div>
                  <p className="text-xs text-muted-foreground">Immediate action required</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-500">15</div>
                  <p className="text-xs text-muted-foreground">Urgent attention needed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Medium</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">27</div>
                  <p className="text-xs text-muted-foreground">Should be addressed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">42</div>
                  <p className="text-xs text-muted-foreground">Minor concerns</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Common Vulnerability Types</CardTitle>
                <CardDescription>Most frequent issues detected in smart contracts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Reentrancy</p>
                        <p className="text-xs text-muted-foreground">
                          External calls allowing attackers to re-enter functions
                        </p>
                      </div>
                      <p className="text-sm font-medium">24%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[24%] rounded-full bg-red-500"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Integer Overflow/Underflow</p>
                        <p className="text-xs text-muted-foreground">Arithmetic operations exceeding variable limits</p>
                      </div>
                      <p className="text-sm font-medium">18%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[18%] rounded-full bg-orange-500"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Access Control</p>
                        <p className="text-xs text-muted-foreground">Improper permission management</p>
                      </div>
                      <p className="text-sm font-medium">15%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[15%] rounded-full bg-yellow-500"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Front-Running</p>
                        <p className="text-xs text-muted-foreground">Transaction order exploitation</p>
                      </div>
                      <p className="text-sm font-medium">12%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[12%] rounded-full bg-blue-500"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Other Vulnerabilities</p>
                        <p className="text-xs text-muted-foreground">Various other security issues</p>
                      </div>
                      <p className="text-sm font-medium">31%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[31%] rounded-full bg-purple-500"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

