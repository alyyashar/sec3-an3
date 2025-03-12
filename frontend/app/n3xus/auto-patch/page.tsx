"use client"

import { Code, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AutoPatch() {
  return (
    <div className="text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Auto-Patch</h1>
            <p className="text-muted-foreground mt-1">Automated vulnerability fixes powered by AI</p>
          </div>
          <Button>
            Run Auto-Patch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Fixes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Ready to implement</p>
              <Button variant="link" size="sm" className="px-0 h-6 mt-1">
                View fixes <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">94%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
              <Progress value={94} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Fixes Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">Across all contracts</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <CardTitle>Available Auto-Fixes</CardTitle>
            <CardDescription>Ready to implement security patches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Reentrancy Guard Implementation",
                  contract: "TokenSwap.sol",
                  severity: "Critical",
                  confidence: "High",
                  description:
                    "Implements a reentrancy guard modifier to prevent recursive calls in vulnerable functions.",
                },
                {
                  title: "SafeMath Integration",
                  contract: "StakingPool.sol",
                  severity: "High",
                  confidence: "High",
                  description:
                    "Replaces standard arithmetic operations with SafeMath library calls to prevent overflow/underflow.",
                },
                {
                  title: "Access Control Fix",
                  contract: "Governance.sol",
                  severity: "Medium",
                  confidence: "Medium",
                  description: "Adds proper role-based access control checks to administrative functions.",
                },
              ].map((fix) => (
                <div
                  key={fix.title}
                  className="p-4 border border-[#333] rounded-lg hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Code className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">{fix.title}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          fix.severity === "Critical" ? "destructive" : fix.severity === "High" ? "outline" : "outline"
                        }
                        className={
                          fix.severity === "High"
                            ? "border-orange-500 text-orange-500"
                            : fix.severity === "Medium"
                              ? "border-yellow-500 text-yellow-500"
                              : ""
                        }
                      >
                        {fix.severity}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          fix.confidence === "High"
                            ? "border-green-500 text-green-500"
                            : "border-yellow-500 text-yellow-500"
                        }
                      >
                        {fix.confidence === "High" ? (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        ) : (
                          <AlertTriangle className="mr-1 h-3 w-3" />
                        )}
                        {fix.confidence} Confidence
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{fix.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{fix.contract}</span>
                    <Button size="sm">Apply Fix</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <CardTitle>Recent Auto-Patches</CardTitle>
            <CardDescription>History of recently applied fixes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Integer Overflow Fix",
                  contract: "TokenSwap.sol",
                  status: "Success",
                  timestamp: "2 hours ago",
                },
                {
                  title: "Access Control Implementation",
                  contract: "Governance.sol",
                  status: "Success",
                  timestamp: "5 hours ago",
                },
                {
                  title: "Return Value Check",
                  contract: "Bridge.sol",
                  status: "Failed",
                  timestamp: "1 day ago",
                },
              ].map((patch) => (
                <div
                  key={patch.title}
                  className="flex items-center justify-between p-3 border border-[#333] rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{patch.title}</div>
                    <div className="text-sm text-muted-foreground">{patch.contract}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant="outline"
                      className={
                        patch.status === "Success" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
                      }
                    >
                      {patch.status === "Success" ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <AlertTriangle className="mr-1 h-3 w-3" />
                      )}
                      {patch.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{patch.timestamp}</span>
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

