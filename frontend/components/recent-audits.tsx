"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ArrowRight, CheckCircle, Clock } from "lucide-react"

const recentAudits = [
  {
    id: "AUD-005",
    contractName: "GovernanceToken.sol",
    timestamp: "2025-02-28T11:10:00",
    status: "In Progress",
    criticalIssues: 3,
    highIssues: 4,
  },
  {
    id: "AUD-004",
    contractName: "StakingRewards.sol",
    timestamp: "2025-03-01T14:20:00",
    status: "Completed",
    criticalIssues: 0,
    highIssues: 0,
  },
  {
    id: "AUD-003",
    contractName: "NFTMarketplace.sol",
    timestamp: "2025-03-02T09:45:00",
    status: "Completed",
    criticalIssues: 1,
    highIssues: 2,
  },
]

export function RecentAudits() {
  return (
    <div className="space-y-4">
      {recentAudits.map((audit) => (
        <Card key={audit.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{audit.contractName}</h4>
                  <Badge variant={audit.status === "Completed" ? "success" : "secondary"}>{audit.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{new Date(audit.timestamp).toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {audit.status === "In Progress" ? (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  ) : audit.criticalIssues > 0 || audit.highIssues > 0 ? (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <span className="text-sm">
                    {audit.criticalIssues > 0
                      ? `${audit.criticalIssues} critical`
                      : audit.highIssues > 0
                        ? `${audit.highIssues} high`
                        : "No issues"}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" className="w-full">
        View All Audits
      </Button>
    </div>
  )
}

