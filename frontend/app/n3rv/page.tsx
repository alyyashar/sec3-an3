"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Activity,
  AlertTriangle,
  Bell,
  Eye,
  FileText,
  Plus,
  Server,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const monitoringData = [
  { date: "Mar 1", transactions: 120, anomalies: 2 },
  { date: "Mar 2", transactions: 132, anomalies: 1 },
  { date: "Mar 3", transactions: 101, anomalies: 0 },
  { date: "Mar 4", transactions: 134, anomalies: 3 },
  { date: "Mar 5", transactions: 190, anomalies: 5 },
  { date: "Mar 6", transactions: 230, anomalies: 4 },
  { date: "Mar 7", transactions: 220, anomalies: 1 },
]

const recentAlerts = [
  {
    id: "alert-1",
    contract: "TokenSwap.sol",
    address: "0x1a2b...3c4d",
    type: "Suspicious Wallet",
    severity: "high",
    timestamp: "2025-03-05T10:30:00",
    description: "Interaction with known malicious address detected",
  },
  {
    id: "alert-2",
    contract: "LiquidityPool.sol",
    address: "0x5e6f...7g8h",
    type: "Flash Loan",
    severity: "critical",
    timestamp: "2025-03-05T09:15:00",
    description: "Unusual flash loan activity detected",
  },
  {
    id: "alert-3",
    contract: "StakingRewards.sol",
    address: "0x3m4n...5o6p",
    type: "Abnormal Gas",
    severity: "medium",
    timestamp: "2025-03-04T22:45:00",
    description: "Abnormal gas usage pattern detected",
  },
  {
    id: "alert-4",
    contract: "GovernanceToken.sol",
    address: "0x7q8r...9s0t",
    type: "Privileged Role",
    severity: "high",
    timestamp: "2025-03-04T18:20:00",
    description: "Unusual admin function call detected",
  },
]

export default function N3RVDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="flex flex-col">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <h1 className="text-xl font-bold">N3RV Dashboard</h1>
              <div className="ml-auto flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Contracts
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Contract
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">On-Chain Monitoring</h2>
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
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="contracts">Contracts</TabsTrigger>
                <TabsTrigger value="bots">Forta Bots</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Monitored Contracts</CardTitle>
                      <Server className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">Active monitoring</p>
                      <div className="mt-2 flex items-center text-xs text-green-500">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        <span>+2 from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-500">5</div>
                      <p className="text-xs text-muted-foreground">Requiring attention</p>
                      <div className="mt-2 flex items-center text-xs text-red-500">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        <span>+3 from yesterday</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Forta Bots</CardTitle>
                      <Zap className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-500">8</div>
                      <p className="text-xs text-muted-foreground">Active bots</p>
                      <div className="mt-2 flex items-center text-xs text-green-500">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        <span>+1 from last week</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Anomaly Score</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Low</div>
                      <p className="text-xs text-muted-foreground">Current risk level</p>
                      <div className="mt-2 flex items-center text-xs text-green-500">
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                        <span>-15% from last week</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Monitoring Activity</CardTitle>
                      <CardDescription>Transactions and anomalies over time</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={monitoringData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                borderColor: "hsl(var(--border))",
                              }}
                              labelStyle={{ color: "hsl(var(--foreground))" }}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="transactions"
                              stroke="hsl(var(--primary))"
                              activeDot={{ r: 8 }}
                              strokeWidth={2}
                            />
                            <Line type="monotone" dataKey="anomalies" stroke="#ef4444" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Alerts</CardTitle>
                      <CardDescription>Latest detected anomalies</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentAlerts.slice(0, 3).map((alert) => (
                          <div key={alert.id} className="flex items-center space-x-4">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                                alert.severity === "critical"
                                  ? "bg-red-500/10"
                                  : alert.severity === "high"
                                    ? "bg-orange-500/10"
                                    : "bg-yellow-500/10"
                              }`}
                            >
                              <AlertTriangle
                                className={`h-5 w-5 ${
                                  alert.severity === "critical"
                                    ? "text-red-500"
                                    : alert.severity === "high"
                                      ? "text-orange-500"
                                      : "text-yellow-500"
                                }`}
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium leading-none">{alert.type}</p>
                              <p className="text-xs text-muted-foreground">{alert.contract}</p>
                            </div>
                            <div className="ml-auto text-xs text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full text-xs">
                          View All Alerts
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Anomaly Detection</CardTitle>
                      <CardDescription>AI-powered detection metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Suspicious Wallet Interactions</p>
                              <p className="text-xs text-muted-foreground">
                                Interactions with known malicious addresses
                              </p>
                            </div>
                            <p className="text-sm font-medium">3</p>
                          </div>
                          <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                            <div className="h-2 w-[30%] rounded-full bg-red-500"></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Abnormal Gas Usage</p>
                              <p className="text-xs text-muted-foreground">Potential exploit attempts</p>
                            </div>
                            <p className="text-sm font-medium">1</p>
                          </div>
                          <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                            <div className="h-2 w-[10%] rounded-full bg-orange-500"></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Flash Loan Detection</p>
                              <p className="text-xs text-muted-foreground">Unusual loan-based activity</p>
                            </div>
                            <p className="text-sm font-medium">1</p>
                          </div>
                          <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                            <div className="h-2 w-[10%] rounded-full bg-red-500"></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Privileged Role Calls</p>
                              <p className="text-xs text-muted-foreground">Admin or owner function calls</p>
                            </div>
                            <p className="text-sm font-medium">0</p>
                          </div>
                          <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                            <div className="h-2 w-[0%] rounded-full bg-green-500"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Monitored Contracts</CardTitle>
                      <CardDescription>Active contract monitoring status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                <Server className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {["TokenSwap.sol", "LiquidityPool.sol", "StakingRewards.sol"][i - 1]}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {["0x1a2b...3c4d", "0x5e6f...7g8h", "0x3m4n...5o6p"][i - 1]}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex flex-col items-end">
                                <Badge
                                  variant={i === 1 ? "destructive" : "outline"}
                                  className={i === 1 ? "" : "border-green-500 text-green-500"}
                                >
                                  {i === 1 ? "Alert" : "Normal"}
                                </Badge>
                                <span className="text-xs text-muted-foreground mt-1">
                                  {i === 1 ? "3 active alerts" : "No alerts"}
                                </span>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full">
                          View All Contracts
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Alert Management</CardTitle>
                    <CardDescription>View and manage detected anomalies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-center justify-between border-b pb-4">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                                alert.severity === "critical"
                                  ? "bg-red-500/10"
                                  : alert.severity === "high"
                                    ? "bg-orange-500/10"
                                    : "bg-yellow-500/10"
                              }`}
                            >
                              <AlertTriangle
                                className={`h-5 w-5 ${
                                  alert.severity === "critical"
                                    ? "text-red-500"
                                    : alert.severity === "high"
                                      ? "text-orange-500"
                                      : "text-yellow-500"
                                }`}
                              />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <p className="text-sm font-medium">{alert.type}</p>
                                <Badge
                                  className="ml-2"
                                  variant={
                                    alert.severity === "critical"
                                      ? "destructive"
                                      : alert.severity === "high"
                                        ? "outline"
                                        : "outline"
                                  }
                                  style={
                                    alert.severity === "high"
                                      ? { borderColor: "rgb(249, 115, 22)", color: "rgb(249, 115, 22)" }
                                      : alert.severity === "medium"
                                        ? { borderColor: "rgb(234, 179, 8)", color: "rgb(234, 179, 8)" }
                                        : {}
                                  }
                                >
                                  {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {alert.contract} • {alert.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleString()}
                            </span>
                            <Button variant="outline" size="sm">
                              Investigate
                            </Button>
                            <Button variant="ghost" size="sm">
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contracts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Monitored Contracts</CardTitle>
                    <CardDescription>Manage your monitored smart contracts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Contract
                      </Button>

                      <div className="rounded-md border">
                        <div className="p-4 border-b">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium">TokenSwap.sol</h3>
                              <p className="text-sm text-muted-foreground">0x1a2b...3c4d</p>
                            </div>
                            <Badge variant="destructive">3 Alerts</Badge>
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Network</p>
                              <p className="font-medium">Ethereum Mainnet</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Monitoring Since</p>
                              <p className="font-medium">Mar 1, 2025</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Active Bots</p>
                              <p className="font-medium">4 Bots</p>
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Bell className="mr-2 h-4 w-4" />
                              Configure Alerts
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 border-b">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium">LiquidityPool.sol</h3>
                              <p className="text-sm text-muted-foreground">0x5e6f...7g8h</p>
                            </div>
                            <Badge variant="outline" className="border-green-500 text-green-500">
                              Normal
                            </Badge>
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Network</p>
                              <p className="font-medium">Ethereum Mainnet</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Monitoring Since</p>
                              <p className="font-medium">Feb 15, 2025</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Active Bots</p>
                              <p className="font-medium">3 Bots</p>
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Bell className="mr-2 h-4 w-4" />
                              Configure Alerts
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bots" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Forta Bots</CardTitle>
                    <CardDescription>Manage your Forta detection bots</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Bot
                        </Button>
                        <Button variant="outline" size="sm">
                          Browse Bot Library
                        </Button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {[
                          {
                            name: "Suspicious Wallet Detector",
                            description: "Detects interactions with known malicious addresses",
                            contracts: 12,
                            alerts: 3,
                            status: "active",
                          },
                          {
                            name: "Flash Loan Monitor",
                            description: "Identifies unusual flash loan activity",
                            contracts: 8,
                            alerts: 1,
                            status: "active",
                          },
                          {
                            name: "Gas Anomaly Detector",
                            description: "Tracks abnormal gas usage patterns",
                            contracts: 12,
                            alerts: 1,
                            status: "active",
                          },
                          {
                            name: "Admin Function Monitor",
                            description: "Monitors privileged role function calls",
                            contracts: 12,
                            alerts: 0,
                            status: "active",
                          },
                        ].map((bot, i) => (
                          <Card key={i} className="overflow-hidden">
                            <div className="p-4 border-b">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{bot.name}</h3>
                                <Badge
                                  variant={bot.alerts > 0 ? "destructive" : "outline"}
                                  className={bot.alerts === 0 ? "border-green-500 text-green-500" : ""}
                                >
                                  {bot.alerts > 0 ? `${bot.alerts} Alerts` : "No Alerts"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{bot.description}</p>
                            </div>
                            <div className="p-4 bg-muted/50">
                              <div className="flex justify-between text-sm">
                                <span>Monitoring {bot.contracts} contracts</span>
                                <span className="text-primary">Active</span>
                              </div>
                              <div className="mt-4 flex space-x-2">
                                <Button variant="outline" size="sm" className="w-full">
                                  Configure
                                </Button>
                                <Button variant="ghost" size="sm" className="w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
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

