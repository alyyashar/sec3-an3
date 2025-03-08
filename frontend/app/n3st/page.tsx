"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Award,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Plus,
  Search,
  Shield,
  Target,
  Users,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const bountyData = [
  { name: "Open", value: 12, color: "#3b82f6" },
  { name: "In Progress", value: 8, color: "#f97316" },
  { name: "Completed", value: 24, color: "#22c55e" },
]

const activeBounties = [
  {
    id: "bounty-1",
    title: "TokenSwap.sol Security Audit",
    reward: 5000,
    currency: "AN3",
    submissions: 3,
    deadline: "2025-03-20T00:00:00",
    status: "open",
    description: "Looking for comprehensive security audit of our TokenSwap contract",
  },
  {
    id: "bounty-2",
    title: "LiquidityPool.sol Vulnerability Assessment",
    reward: 7500,
    currency: "AN3",
    submissions: 1,
    deadline: "2025-03-15T00:00:00",
    status: "open",
    description: "Need thorough assessment of potential vulnerabilities in our liquidity pool contract",
  },
  {
    id: "bounty-3",
    title: "StakingRewards.sol Pentest",
    reward: 3000,
    currency: "AN3",
    submissions: 5,
    deadline: "2025-03-25T00:00:00",
    status: "in-progress",
    description: "Seeking penetration testing for our staking rewards contract",
  },
  {
    id: "bounty-4",
    title: "GovernanceToken.sol Code Review",
    reward: 4000,
    currency: "AN3",
    submissions: 2,
    deadline: "2025-03-18T00:00:00",
    status: "in-progress",
    description: "Looking for detailed code review of our governance token implementation",
  },
]

const topResearchers = [
  {
    id: "researcher-1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    findings: 28,
    reputation: 95,
    specialization: "Reentrancy, Access Control",
  },
  {
    id: "researcher-2",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    findings: 32,
    reputation: 98,
    specialization: "Flash Loans, Oracle Manipulation",
  },
  {
    id: "researcher-3",
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    findings: 19,
    reputation: 92,
    specialization: "Integer Overflow, Gas Optimization",
  },
]

export default function N3STDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="flex flex-col">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <h1 className="text-xl font-bold">N3ST Dashboard</h1>
              <div className="ml-auto flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  View Researchers
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Bounty
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Bug Bounty Hub</h2>
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
                <TabsTrigger value="bounties">Bounties</TabsTrigger>
                <TabsTrigger value="researchers">Researchers</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Bounties</CardTitle>
                      <Target className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">20</div>
                      <p className="text-xs text-muted-foreground">Open for submissions</p>
                      <div className="mt-2 flex items-center text-xs text-green-500">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        <span>+5 from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
                      <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-500">125,000 AN3</div>
                      <p className="text-xs text-muted-foreground">Available in bounties</p>
                      <div className="mt-2 flex items-center text-xs text-green-500">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        <span>+15% from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Researchers</CardTitle>
                      <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-500">48</div>
                      <p className="text-xs text-muted-foreground">Active security experts</p>
                      <div className="mt-2 flex items-center text-xs text-green-500">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        <span>+8 from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Vulnerabilities Found</CardTitle>
                      <Shield className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-500">132</div>
                      <p className="text-xs text-muted-foreground">Issues identified</p>
                      <div className="mt-2 flex items-center text-xs text-green-500">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        <span>+12 this week</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Bounty Status</CardTitle>
                      <CardDescription>Distribution of current bounties</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={bountyData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              labelLine={false}
                            >
                              {bountyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [`${value} bounties`, "Count"]}
                              contentStyle={{ background: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Top Researchers</CardTitle>
                      <CardDescription>Security experts with highest reputation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {topResearchers.map((researcher) => (
                          <div key={researcher.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={researcher.avatar} />
                                <AvatarFallback>
                                  {researcher.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{researcher.name}</p>
                                <p className="text-xs text-muted-foreground">{researcher.specialization}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex flex-col items-end">
                                <div className="flex items-center">
                                  <Shield className="mr-1 h-3 w-3 text-primary" />
                                  <span className="text-sm">{researcher.findings} findings</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <Award className="mr-1 h-3 w-3 text-amber-500" />
                                  <span className="text-xs">{researcher.reputation}% reputation</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full">
                          View All Researchers
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Bounties</CardTitle>
                      <CardDescription>Currently open security bounties</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activeBounties.slice(0, 3).map((bounty) => (
                          <div key={bounty.id} className="flex items-center justify-between border-b pb-4">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{bounty.title}</h3>
                                <Badge
                                  className="ml-2"
                                  variant={
                                    bounty.status === "open"
                                      ? "outline"
                                      : bounty.status === "in-progress"
                                        ? "default"
                                        : "success"
                                  }
                                  style={
                                    bounty.status === "open"
                                      ? { borderColor: "rgb(59, 130, 246)", color: "rgb(59, 130, 246)" }
                                      : {}
                                  }
                                >
                                  {bounty.status === "open"
                                    ? "Open"
                                    : bounty.status === "in-progress"
                                      ? "In Progress"
                                      : "Completed"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{bounty.description}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex flex-col items-end">
                                <div className="flex items-center">
                                  <DollarSign className="mr-1 h-3 w-3 text-green-500" />
                                  <span className="text-sm font-medium">
                                    {bounty.reward.toLocaleString()} {bounty.currency}
                                  </span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(bounty.deadline).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full">
                          View All Bounties
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bounties" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Bounties</CardTitle>
                    <CardDescription>Create and manage your bug bounty programs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="relative w-64">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search bounties..."
                            className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Create New Bounty
                        </Button>
                      </div>

                      <div className="rounded-md border">
                        {activeBounties.map((bounty, index) => (
                          <div key={bounty.id} className={`p-4 ${index < activeBounties.length - 1 ? "border-b" : ""}`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-lg font-medium">{bounty.title}</h3>
                                  <Badge
                                    className="ml-2"
                                    variant={
                                      bounty.status === "open"
                                        ? "outline"
                                        : bounty.status === "in-progress"
                                          ? "default"
                                          : "success"
                                    }
                                    style={
                                      bounty.status === "open"
                                        ? { borderColor: "rgb(59, 130, 246)", color: "rgb(59, 130, 246)" }
                                        : {}
                                    }
                                  >
                                    {bounty.status === "open"
                                      ? "Open"
                                      : bounty.status === "in-progress"
                                        ? "In Progress"
                                        : "Completed"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{bounty.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-medium text-green-500">
                                  {bounty.reward.toLocaleString()} {bounty.currency}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Deadline: {new Date(bounty.deadline).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Submissions</p>
                                <p className="font-medium">{bounty.submissions} researchers</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Time Remaining</p>
                                <p className="font-medium">
                                  {Math.ceil(
                                    (new Date(bounty.deadline).getTime() - new Date().getTime()) /
                                      (1000 * 60 * 60 * 24),
                                  )}{" "}
                                  days
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Visibility</p>
                                <p className="font-medium">Public</p>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                View Submissions
                              </Button>
                              <Button variant="outline" size="sm">
                                <Users className="mr-2 h-4 w-4" />
                                Manage Researchers
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="researchers" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Researchers</CardTitle>
                    <CardDescription>View and manage security experts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="relative w-64">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search researchers..."
                            className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                        <Button variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          Invite Researchers
                        </Button>
                      </div>

                      <div className="rounded-md border">
                        {[
                          ...topResearchers,
                          {
                            id: "researcher-4",
                            name: "Emily Wilson",
                            avatar: "/placeholder.svg?height=40&width=40",
                            findings: 15,
                            reputation: 88,
                            specialization: "Logic Errors, Front-Running",
                          },
                          {
                            id: "researcher-5",
                            name: "David Kim",
                            avatar: "/placeholder.svg?height=40&width=40",
                            findings: 22,
                            reputation: 91,
                            specialization: "Signature Verification, MEV",
                          },
                        ].map((researcher, index, array) => (
                          <div key={researcher.id} className={`p-4 ${index < array.length - 1 ? "border-b" : ""}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={researcher.avatar} />
                                  <AvatarFallback>
                                    {researcher.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{researcher.name}</h3>
                                  <p className="text-sm text-muted-foreground">{researcher.specialization}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-8">
                                <div>
                                  <div className="flex items-center justify-end">
                                    <Shield className="mr-1 h-4 w-4 text-primary" />
                                    <span className="font-medium">{researcher.findings} findings</span>
                                  </div>
                                  <div className="mt-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-muted-foreground">Reputation</span>
                                      <span className="text-xs font-medium">{researcher.reputation}%</span>
                                    </div>
                                    <Progress value={researcher.reputation} className="h-1 mt-1" />
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Profile
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Submissions
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submissions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Vulnerability Submissions</CardTitle>
                    <CardDescription>Review and manage security findings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="relative w-64">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search submissions..."
                            className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Verified
                          </Button>
                          <Button variant="outline">
                            <Clock className="mr-2 h-4 w-4" />
                            Pending
                          </Button>
                          <Button variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-md border">
                        {[
                          {
                            id: "submission-1",
                            title: "Reentrancy Vulnerability in TokenSwap.sol",
                            researcher: "Alex Johnson",
                            contract: "TokenSwap.sol",
                            severity: "Critical",
                            status: "Verified",
                            date: "2025-03-04T15:30:00",
                            reward: 2500,
                          },
                          {
                            id: "submission-2",
                            title: "Flash Loan Attack Vector in LiquidityPool.sol",
                            researcher: "Sarah Chen",
                            contract: "LiquidityPool.sol",
                            severity: "High",
                            status: "Pending",
                            date: "2025-03-05T09:15:00",
                            reward: 1500,
                          },
                          {
                            id: "submission-3",
                            title: "Integer Overflow in Fee Calculation",
                            researcher: "Michael Rodriguez",
                            contract: "TokenSwap.sol",
                            severity: "Medium",
                            status: "Verified",
                            date: "2025-03-03T11:45:00",
                            reward: 1000,
                          },
                          {
                            id: "submission-4",
                            title: "Access Control Issue in Admin Functions",
                            researcher: "Emily Wilson",
                            contract: "GovernanceToken.sol",
                            severity: "High",
                            status: "Pending",
                            date: "2025-03-05T14:20:00",
                            reward: 1800,
                          },
                        ].map((submission, index, array) => (
                          <div key={submission.id} className={`p-4 ${index < array.length - 1 ? "border-b" : ""}`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-medium">{submission.title}</h3>
                                  <Badge
                                    className="ml-2"
                                    variant={
                                      submission.severity === "Critical"
                                        ? "destructive"
                                        : submission.severity === "High"
                                          ? "outline"
                                          : "outline"
                                    }
                                    style={
                                      submission.severity === "High"
                                        ? { borderColor: "rgb(249, 115, 22)", color: "rgb(249, 115, 22)" }
                                        : submission.severity === "Medium"
                                          ? { borderColor: "rgb(234, 179, 8)", color: "rgb(234, 179, 8)" }
                                          : {}
                                    }
                                  >
                                    {submission.severity}
                                  </Badge>
                                  <Badge
                                    className="ml-2"
                                    variant={submission.status === "Verified" ? "outline" : "default"}
                                    style={
                                      submission.status === "Verified"
                                        ? { borderColor: "rgb(34, 197, 94)", color: "rgb(34, 197, 94)" }
                                        : {}
                                    }
                                  >
                                    {submission.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <span>{submission.contract}</span>
                                  <span className="mx-2">•</span>
                                  <span>By {submission.researcher}</span>
                                  <span className="mx-2">•</span>
                                  <span>{new Date(submission.date).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <div className="font-medium text-green-500">
                                    {submission.reward.toLocaleString()} AN3
                                  </div>
                                  <p className="text-xs text-muted-foreground">Reward</p>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </Button>
                                  {submission.status === "Pending" && (
                                    <Button variant="outline" size="sm">
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Verify
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

