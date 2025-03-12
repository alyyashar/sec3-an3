"use client"

import { AlertTriangle, ArrowUpDown, Search, Filter, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Vulnerabilities() {
  return (
    <div className="text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Vulnerabilities</h1>
          <Badge variant="destructive" className="text-base px-3 py-1">
            23 Active Issues
          </Badge>
        </div>

        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Vulnerabilities</CardTitle>
                <CardDescription>View and manage all detected security vulnerabilities</CardDescription>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search vulnerabilities..." className="pl-9 w-[300px]" />
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
                      Severity
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-white">Title</TableHead>
                  <TableHead className="text-white">Contract</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Detected</TableHead>
                  <TableHead className="text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    severity: "Critical",
                    title: "Reentrancy Vulnerability",
                    contract: "TokenSwap.sol",
                    status: "Open",
                    detected: "2 hours ago",
                  },
                  {
                    severity: "High",
                    title: "Unchecked Return Value",
                    contract: "TokenSwap.sol",
                    status: "In Progress",
                    detected: "3 hours ago",
                  },
                  {
                    severity: "Medium",
                    title: "Integer Overflow",
                    contract: "StakingPool.sol",
                    status: "Open",
                    detected: "5 hours ago",
                  },
                ].map((item) => (
                  <TableRow key={item.title} className="border-[#333]">
                    <TableCell>
                      <Badge
                        variant={
                          item.severity === "Critical"
                            ? "destructive"
                            : item.severity === "High"
                              ? "outline"
                              : "outline"
                        }
                        className={
                          item.severity === "High"
                            ? "border-orange-500 text-orange-500"
                            : item.severity === "Medium"
                              ? "border-yellow-500 text-yellow-500"
                              : ""
                        }
                      >
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {item.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.contract}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.status === "Open" ? "border-red-500 text-red-500" : "border-blue-500 text-blue-500"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.detected}</TableCell>
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

