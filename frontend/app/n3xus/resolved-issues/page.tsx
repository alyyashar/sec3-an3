"use client"

import { CheckCircle, ArrowUpDown, Search, Filter, ExternalLink, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ResolvedIssues() {
  return (
    <div className="text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Resolved Issues</h1>
          <Badge variant="outline" className="border-green-500 text-green-500 text-base px-3 py-1">
            15 Issues Resolved
          </Badge>
        </div>

        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Resolution History</CardTitle>
                <CardDescription>Track and verify resolved security issues</CardDescription>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search resolved issues..." className="pl-9 w-[300px]" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[#333]">
                  <TableHead className="text-white">
                    <Button variant="ghost" className="flex items-center gap-1 p-0 font-semibold">
                      Resolution Date
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-white">Issue</TableHead>
                  <TableHead className="text-white">Contract</TableHead>
                  <TableHead className="text-white">Resolution Method</TableHead>
                  <TableHead className="text-white">Time to Fix</TableHead>
                  <TableHead className="text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    date: "Mar 5, 2025",
                    issue: "Reentrancy Vulnerability",
                    contract: "TokenSwap.sol",
                    method: "Auto-Patch",
                    timeToFix: "2 hours",
                  },
                  {
                    date: "Mar 4, 2025",
                    issue: "Unchecked Return Value",
                    contract: "TokenSwap.sol",
                    method: "Manual Fix",
                    timeToFix: "4 hours",
                  },
                  {
                    date: "Mar 3, 2025",
                    issue: "Integer Overflow",
                    contract: "StakingPool.sol",
                    method: "Auto-Patch",
                    timeToFix: "1 hour",
                  },
                ].map((item) => (
                  <TableRow key={item.issue} className="border-[#333]">
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="font-medium">{item.issue}</TableCell>
                    <TableCell>{item.contract}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.method === "Auto-Patch"
                            ? "border-green-500 text-green-500"
                            : "border-blue-500 text-blue-500"
                        }
                      >
                        {item.method === "Auto-Patch" ? (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        ) : (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {item.method}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.timeToFix}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

