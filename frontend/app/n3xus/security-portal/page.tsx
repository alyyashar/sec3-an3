"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
} from "lucide-react"
import { ProjectList } from "@/app/n3xus/security-portal/_components/security-portal/project-list"
import { VulnerabilityAnalysis } from "@/app/n3xus/security-portal/_components/security-portal/vulnerability-analysis"
import { SecurityCopilot } from "@/app/n3xus/security-portal/_components/security-portal/security-copilot"
import { RiskScoreCard } from "@/app/n3xus/security-portal/_components/security-portal/risk-score-card"
import { VerificationStatus } from "@/app/n3xus/security-portal/_components/security-portal/verification-status"
import { AppSidebar } from "@/components/app-sidebar"

export default function SecurityPortal() {
  const [selectedProject, setSelectedProject] = useState<string | null>("project1")

  return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b">
          <div className="flex my-4 h-16 items-center px-4 justify-between">
            <h1 className="text-xl font-bold">N3XUS AI-Powered Security Portal</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload Contract
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Projects Panel */}
          <div className="w-1/3 border-r flex flex-col overflow-hidden">
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
              <ProjectList selectedProject={selectedProject} onSelectProject={setSelectedProject} />
            </div>
          </div>

          {/* Project Details */}
          <div className="flex-1 overflow-auto">
            {selectedProject ? (
              <div className="h-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">TokenSwap.sol</h2>
                      <p className="text-sm text-muted-foreground">Contract Address: 0x1a2b...3c4d</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View on Explorer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>

                  <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
                      <TabsTrigger value="copilot">Security Copilot</TabsTrigger>
                      <TabsTrigger value="verification">Verification</TabsTrigger>
                      <TabsTrigger value="attestation">Attestation</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <RiskScoreCard />

                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">AI Analysis Status</CardTitle>
                            <Brain className="h-4 w-4 text-cyan-500" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-500">Complete</div>
                            <p className="text-xs text-muted-foreground">Last updated: 2 hours ago</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          </CardHeader>
                          <CardContent className="flex gap-8">
                            <div className="text-2xl font-bold">7</div>
                            <div className="flex flex-wrap space-x-1 gap-2">
                              <Badge variant="destructive" className="text-xs flex-1 min-w-max h-6">
                                2 Critical
                              </Badge>
                              <Badge variant="outline" className="text-xs flex-1 min-w-max h-6 border-orange-500 text-orange-500">
                                3 High
                              </Badge>
                              <Badge variant="outline" className="text-xs flex-1 min-w-max h-6 border-yellow-500 text-yellow-500">
                                2 Medium
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Auto-Fix Suggestions</CardTitle>
                            <Code className="h-4 w-4 text-green-500" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">Ready to implement</p>
                            <Button variant="link" size="sm" className="px-0 h-6 mt-1">
                              Apply fixes <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Project Progress: 75%</h3>
                          <span className="text-sm text-muted-foreground">Phase 3: Vulnerability Analysis</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>

                      {/* <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle>AI-Driven Vulnerability Analysis</CardTitle>
                            <CardDescription>Auto-triaged findings based on exploitability and context</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <VulnerabilityAnalysis />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Dynamic Risk Assessment</CardTitle>
                            <CardDescription>
                              Adaptive scoring based on emerging threats and blockchain data
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="h-[300px]">
                            <div className="flex h-full items-center justify-center">
                              <img
                                src="/placeholder.svg?height=300&width=400"
                                alt="Risk Assessment Chart"
                                className="h-full w-auto"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div> */}

                      <Card>
                        <CardHeader>
                          <CardTitle>Audit Timeline</CardTitle>
                          <CardDescription>Project milestones and verification steps</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ol className="relative border-l border-muted">
                            <TimelineItem title="Project Created" date="Mar 4, 2025" status="complete" />
                            <TimelineItem title="AI Analysis Started" date="Mar 4, 2025" status="complete" />
                            <TimelineItem
                              title="Vulnerability Analysis Complete"
                              date="Mar 5, 2025"
                              status="complete"
                            />
                            <TimelineItem title="Auto-Fix Suggestions Generated" date="Mar 5, 2025" status="complete" />
                            <TimelineItem title="Fixes Implementation" date="Pending" status="current" />
                            <TimelineItem title="Verification & Re-audit" date="Pending" status="pending" />
                            <TimelineItem
                              title="Final Report & Attestation"
                              date="Pending"
                              status="pending"
                              isLast={true}
                            />
                          </ol>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="vulnerabilities" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>AI-Driven Vulnerability Analysis</CardTitle>
                          <CardDescription>Comprehensive analysis with auto-triage and prioritization</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <VulnerabilityAnalysis detailed={true} />
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="copilot" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Security Copilot</CardTitle>
                          <CardDescription>Live AI-assisted security feedback and guidance</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <SecurityCopilot />
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="verification" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Auto-Reaudit & Verification</CardTitle>
                          <CardDescription>
                            AI scans fixes and validates remediation before triggering re-audits
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <VerificationStatus />
                        </CardContent>
                      </Card>
                    </TabsContent>

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
                  <p className="text-muted-foreground">Select a project from the list or create a new audit</p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Audit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  )
}

interface TimelineItemProps {
  title: string
  date: string
  status: "complete" | "current" | "pending"
  isLast?: boolean
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
  )
}

