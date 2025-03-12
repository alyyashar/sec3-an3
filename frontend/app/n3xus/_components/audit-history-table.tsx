"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink } from "lucide-react"

const auditHistory = [
  {
    id: "AUD-001",
    contractName: "TokenSwap.sol",
    address: "0x1a2b...3c4d",
    timestamp: "2025-03-04T15:30:00",
    criticalIssues: 2,
    highIssues: 3,
    mediumIssues: 5,
    lowIssues: 8,
    status: "Completed",
  },
  {
    id: "AUD-002",
    contractName: "LiquidityPool.sol",
    address: "0x5e6f...7g8h",
    timestamp: "2025-03-03T12:15:00",
    criticalIssues: 0,
    highIssues: 1,
    mediumIssues: 3,
    lowIssues: 6,
    status: "Completed",
  },
  {
    id: "AUD-003",
    contractName: "NFTMarketplace.sol",
    address: "0x9i0j...1k2l",
    timestamp: "2025-03-02T09:45:00",
    criticalIssues: 1,
    highIssues: 2,
    mediumIssues: 4,
    lowIssues: 5,
    status: "Completed",
  },
  {
    id: "AUD-004",
    contractName: "StakingRewards.sol",
    address: "0x3m4n...5o6p",
    timestamp: "2025-03-01T14:20:00",
    criticalIssues: 0,
    highIssues: 0,
    mediumIssues: 2,
    lowIssues: 7,
    status: "Completed",
  },
  {
    id: "AUD-005",
    contractName: "GovernanceToken.sol",
    address: "0x7q8r...9s0t",
    timestamp: "2025-02-28T11:10:00",
    criticalIssues: 3,
    highIssues: 4,
    mediumIssues: 2,
    lowIssues: 3,
    status: "In Progress",
  },
]

export function AuditHistoryTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Contract</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Issues</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditHistory.map((audit) => (
            <TableRow key={audit.id}>
              <TableCell className="font-medium">{audit.id}</TableCell>
              <TableCell>{audit.contractName}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="mr-1">{audit.address}</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{new Date(audit.timestamp).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  {audit.criticalIssues > 0 && <Badge variant="destructive">{audit.criticalIssues}</Badge>}
                  {audit.highIssues > 0 && (
                    <Badge variant="outline" className="border-orange-500 text-orange-500">
                      {audit.highIssues}
                    </Badge>
                  )}
                  {audit.mediumIssues > 0 && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                      {audit.mediumIssues}
                    </Badge>
                  )}
                  {audit.lowIssues > 0 && (
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                      {audit.lowIssues}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={audit.status === "Completed" ? "success" : "secondary"}>{audit.status}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <FileText className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

