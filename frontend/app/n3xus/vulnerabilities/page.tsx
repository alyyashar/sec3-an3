"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowUpDown,
  Search,
  Filter,
  ExternalLink,
  Code,
  CheckCircle,
  Clock,
  Shield,
  ChevronDown,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function Vulnerabilities() {
  const [selectedVulnerability, setSelectedVulnerability] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const vulnerabilities = [
    {
      id: "VUL-001",
      severity: "Critical",
      title: "Reentrancy Vulnerability",
      contract: "TokenSwap.sol",
      status: "Open",
      detected: "2 hours ago",
      description: "External calls are made before state changes, allowing potential reentrancy attacks.",
      impact: "An attacker could drain funds by recursively calling the vulnerable function before state updates.",
      location: "TokenSwap.sol:142-156",
      codeSnippet: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    
    // Vulnerability: External call before state update
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    
    // State update happens after external call
    balances[msg.sender] -= amount;
}`,
      fixedCode: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    
    // Fix: Update state before external call
    balances[msg.sender] -= amount;
    
    // External call happens after state update
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
}`,
      recommendation:
        "Implement the checks-effects-interactions pattern by updating state variables before making external calls.",
    },
    {
      id: "VUL-002",
      severity: "High",
      title: "Unchecked Return Value",
      contract: "TokenSwap.sol",
      status: "In Progress",
      detected: "3 hours ago",
      description: "The contract does not check the return value of a low-level call.",
      impact: "Failed transfers might not be detected, leading to inconsistent state.",
      location: "TokenSwap.sol:203-205",
      codeSnippet: `// Vulnerability: Return value not checked
msg.sender.call{value: amount}("");`,
      fixedCode: `// Fix: Check return value
(bool success, ) = msg.sender.call{value: amount}("");
require(success, "Transfer failed");`,
      recommendation: "Always check the return value of low-level calls and handle failures appropriately.",
    },
    {
      id: "VUL-003",
      severity: "Medium",
      title: "Integer Overflow",
      contract: "StakingPool.sol",
      status: "Open",
      detected: "5 hours ago",
      description: "Potential integer overflow in fee calculation.",
      impact: "Incorrect fee calculations for large token amounts could lead to economic vulnerabilities.",
      location: "StakingPool.sol:87-89",
      codeSnippet: `// Vulnerability: Potential overflow for large amounts
uint256 fee = amount * feePercentage / 100;`,
      fixedCode: `// Fix: Use SafeMath or Solidity 0.8+ built-in overflow protection
uint256 fee = amount * feePercentage / 100;`,
      recommendation:
        "Use SafeMath library for Solidity <0.8.0 or upgrade to Solidity 0.8.0+ which has built-in overflow protection.",
    },
    {
      id: "VUL-004",
      severity: "Critical",
      title: "Access Control Vulnerability",
      contract: "Governance.sol",
      status: "Open",
      detected: "1 day ago",
      description: "Missing access control on critical function.",
      impact: "Any user can call administrative functions, potentially compromising the entire protocol.",
      location: "Governance.sol:112-118",
      codeSnippet: `// Vulnerability: No access control
function updateConfig(uint256 newValue) external {
    config = newValue;
}`,
      fixedCode: `// Fix: Add access control
function updateConfig(uint256 newValue) external onlyOwner {
    config = newValue;
}`,
      recommendation: "Implement proper access control using modifiers like onlyOwner or role-based access control.",
    },
    {
      id: "VUL-005",
      severity: "High",
      title: "Timestamp Dependence",
      contract: "LockingVault.sol",
      status: "In Progress",
      detected: "2 days ago",
      description: "Contract relies on block.timestamp for critical logic.",
      impact: "Miners can manipulate timestamps slightly, potentially affecting time-sensitive operations.",
      location: "LockingVault.sol:221-235",
      codeSnippet: `// Vulnerability: Timestamp dependence
if (block.timestamp >= unlockTime) {
    // Allow withdrawal
}`,
      fixedCode: `// Fix: Consider timestamp manipulation range
// Note: This is still using block.timestamp but with awareness of its limitations
if (block.timestamp >= unlockTime) {
    // Allow withdrawal
}`,
      recommendation:
        "Be aware of the limitations of block.timestamp and design your contract to tolerate small variations in time.",
    },
  ]

  const filteredVulnerabilities = vulnerabilities.filter((vuln) => {
    // Apply status filter
    if (filterStatus !== "all" && vuln.status !== filterStatus) return false

    // Apply severity filter
    if (filterSeverity !== "all" && vuln.severity !== filterSeverity) return false

    // Apply search query
    if (
      searchQuery &&
      !vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !vuln.contract.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  const handleViewDetails = (vulnerability: any) => {
    setSelectedVulnerability(vulnerability)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-900/20 border-red-800 text-red-400"
      case "High":
        return "bg-orange-900/20 border-orange-800 text-orange-400"
      case "Medium":
        return "bg-yellow-900/20 border-yellow-800 text-yellow-400"
      case "Low":
        return "bg-blue-900/20 border-blue-800 text-blue-400"
      default:
        return ""
    }
  }

  const getSeverityProgress = (severity: string) => {
    switch (severity) {
      case "Critical":
        return 100
      case "High":
        return 75
      case "Medium":
        return 50
      case "Low":
        return 25
      default:
        return 0
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vulnerabilities</h2>
          <p className="text-muted-foreground mt-1">Manage and resolve security issues in your smart contracts</p>
        </div>
        <Badge variant="destructive" className="text-base px-3 py-1">
          {vulnerabilities.filter((v) => v.status === "Open").length} Active Issues
        </Badge>
      </div>

      <Card className="bg-[#121212] border-[#222]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#4ee2b5]" />
                All Vulnerabilities
              </CardTitle>
              <CardDescription>View and manage all detected security vulnerabilities</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vulnerabilities..."
                  className="pl-9 w-[300px] bg-[#1a1a1a] border-[#333]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-[#333]">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a1a1a] border-[#333]">
                  <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#333]" />
                  <div className="p-2">
                    <div className="mb-2">
                      <label className="text-xs text-muted-foreground mb-1 block">Status</label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full bg-[#121212] border-[#333]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#333]">
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Severity</label>
                      <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                        <SelectTrigger className="w-full bg-[#121212] border-[#333]">
                          <SelectValue placeholder="Filter by severity" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#333]">
                          <SelectItem value="all">All Severities</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="bg-[#1e3a2f] text-[#4ee2b5] hover:bg-[#2a5040]">
                <Shield className="mr-2 h-4 w-4" />
                Run Auto-Patch
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-[#222] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-[#222] bg-[#0f0f0f]">
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
                {filteredVulnerabilities.length > 0 ? (
                  filteredVulnerabilities.map((item) => (
                    <TableRow key={item.id} className="border-[#222] hover:bg-[#1a1a1a]">
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
                                : item.severity === "Low"
                                  ? "border-blue-500 text-blue-500"
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
                            item.status === "Open"
                              ? "border-red-500 text-red-500"
                              : item.status === "In Progress"
                                ? "border-blue-500 text-blue-500"
                                : "border-green-500 text-green-500"
                          }
                        >
                          {item.status === "Open" ? (
                            <AlertTriangle className="mr-1 h-3 w-3" />
                          ) : item.status === "In Progress" ? (
                            <Clock className="mr-1 h-3 w-3" />
                          ) : (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          )}
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.detected}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(item)}
                            className="hover:bg-[#1e3a2f] hover:text-[#4ee2b5]"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-[#1e3a2f] hover:text-[#4ee2b5]">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#1a1a1a] border-[#333]">
                              <DropdownMenuItem className="hover:bg-[#1e3a2f] hover:text-[#4ee2b5]">
                                <Code className="mr-2 h-4 w-4" />
                                View Code
                              </DropdownMenuItem>
                              <DropdownMenuItem className="hover:bg-[#1e3a2f] hover:text-[#4ee2b5]">
                                <Shield className="mr-2 h-4 w-4" />
                                Apply Auto-Fix
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-[#333]" />
                              <DropdownMenuItem className="hover:bg-[#1e3a2f] hover:text-[#4ee2b5]">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Resolved
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <CheckCircle className="h-8 w-8 mb-2" />
                        <p>No vulnerabilities found matching your filters</p>
                        {(filterStatus !== "all" || filterSeverity !== "all" || searchQuery) && (
                          <Button
                            variant="link"
                            className="mt-2 text-[#4ee2b5]"
                            onClick={() => {
                              setFilterStatus("all")
                              setFilterSeverity("all")
                              setSearchQuery("")
                            }}
                          >
                            Clear filters
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-[#222] py-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredVulnerabilities.length} of {vulnerabilities.length} vulnerabilities
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-[#333]">
              <FileText className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Vulnerability Details Dialog */}
      <Dialog open={!!selectedVulnerability} onOpenChange={(open) => !open && setSelectedVulnerability(null)}>
        <DialogContent className="bg-[#121212] border-[#222] text-white max-w-4xl max-h-[90vh] overflow-auto">
          {selectedVulnerability && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        selectedVulnerability.severity === "Critical"
                          ? "text-red-500"
                          : selectedVulnerability.severity === "High"
                            ? "text-orange-500"
                            : selectedVulnerability.severity === "Medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                      }`}
                    />
                    <DialogTitle className="text-xl">{selectedVulnerability.title}</DialogTitle>
                  </div>
                  <Badge
                    variant={
                      selectedVulnerability.severity === "Critical"
                        ? "destructive"
                        : selectedVulnerability.severity === "High"
                          ? "outline"
                          : "outline"
                    }
                    className={
                      selectedVulnerability.severity === "High"
                        ? "border-orange-500 text-orange-500"
                        : selectedVulnerability.severity === "Medium"
                          ? "border-yellow-500 text-yellow-500"
                          : selectedVulnerability.severity === "Low"
                            ? "border-blue-500 text-blue-500"
                            : ""
                    }
                  >
                    {selectedVulnerability.severity}
                  </Badge>
                </div>
                <DialogDescription>
                  {selectedVulnerability.id} • {selectedVulnerability.contract} • {selectedVulnerability.location}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-4">
                {/* Severity Indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Severity Level</span>
                    <span
                      className={
                        selectedVulnerability.severity === "Critical"
                          ? "text-red-500"
                          : selectedVulnerability.severity === "High"
                            ? "text-orange-500"
                            : selectedVulnerability.severity === "Medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                      }
                    >
                      {selectedVulnerability.severity}
                    </span>
                  </div>
                  <Progress
                    value={getSeverityProgress(selectedVulnerability.severity)}
                    className={
                      "h-2 " +
                      (selectedVulnerability.severity === "Critical"
                        ? "bg-red-500"
                        : selectedVulnerability.severity === "High"
                          ? "bg-orange-500"
                          : selectedVulnerability.severity === "Medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500")
                    }
                  />
                </div>

                {/* Description */}
                <Card className={getSeverityColor(selectedVulnerability.severity)}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Description</h3>
                    <p>{selectedVulnerability.description}</p>
                  </CardContent>
                </Card>

                {/* Impact */}
                <Card className="bg-[#1a1a1a] border-[#333]">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Impact</h3>
                    <p>{selectedVulnerability.impact}</p>
                  </CardContent>
                </Card>

                {/* Vulnerable Code */}
                <Card className="bg-[#1a1a1a] border-[#333]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Code className="h-4 w-4 text-red-500" />
                      Vulnerable Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-[#0a0a0a] p-4 rounded-md overflow-x-auto">
                      <pre className="text-sm font-mono text-white">{selectedVulnerability.codeSnippet}</pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Fixed Code */}
                <Card className="bg-[#1a1a1a] border-[#333]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Code className="h-4 w-4 text-green-500" />
                      Recommended Fix
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-[#0a0a0a] p-4 rounded-md overflow-x-auto">
                      <pre className="text-sm font-mono text-white">{selectedVulnerability.fixedCode}</pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendation */}
                <Card className="bg-[#1e3a2f]/20 border-[#1e3a2f] text-[#4ee2b5]">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Recommendation
                    </h3>
                    <p>{selectedVulnerability.recommendation}</p>
                  </CardContent>
                </Card>
              </div>

              <DialogFooter className="flex justify-between items-center">
                <Badge
                  variant="outline"
                  className={
                    selectedVulnerability.status === "Open"
                      ? "border-red-500 text-red-500"
                      : selectedVulnerability.status === "In Progress"
                        ? "border-blue-500 text-blue-500"
                        : "border-green-500 text-green-500"
                  }
                >
                  {selectedVulnerability.status === "Open" ? (
                    <AlertTriangle className="mr-1 h-3 w-3" />
                  ) : selectedVulnerability.status === "In Progress" ? (
                    <Clock className="mr-1 h-3 w-3" />
                  ) : (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  )}
                  {selectedVulnerability.status}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setSelectedVulnerability(null)} className="border-[#333]">
                    Close
                  </Button>
                  <Button className="bg-[#1e3a2f] text-[#4ee2b5] hover:bg-[#2a5040]">
                    <Shield className="mr-2 h-4 w-4" />
                    Apply Auto-Fix
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
