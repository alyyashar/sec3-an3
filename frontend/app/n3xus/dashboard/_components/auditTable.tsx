"use client"

import { AlertTriangle, Clock, Shield, ArrowRight } from "lucide-react"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table"
import Link from "next/link"

// Define the type for our contract data
interface SmartContract {
  id: string
  name: string
  address: string
  securityScore: number
  vulnerabilities: {
    critical: number
    high: number
    medium: number
    low: number
  }
  auditDate: string
}

// Sample data
const contracts: SmartContract[] = [
  {
    id: "1",
    name: "TokenSwap",
    address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    securityScore: 92,
    vulnerabilities: {
      critical: 0,
      high: 1,
      medium: 3,
      low: 5,
    },
    auditDate: "2025-03-05",
  },
  {
    id: "2",
    name: "LiquidityPool",
    address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    securityScore: 78,
    vulnerabilities: {
      critical: 1,
      high: 2,
      medium: 4,
      low: 3,
    },
    auditDate: "2025-03-01",
  },
  {
    id: "3",
    name: "NFTMarketplace",
    address: "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8",
    securityScore: 85,
    vulnerabilities: {
      critical: 0,
      high: 2,
      medium: 2,
      low: 7,
    },
    auditDate: "2025-02-28",
  },
  {
    id: "4",
    name: "StakingContract",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    securityScore: 65,
    vulnerabilities: {
      critical: 2,
      high: 3,
      medium: 5,
      low: 4,
    },
    auditDate: "2025-02-25",
  },
  {
    id: "5",
    name: "GovernanceToken",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    securityScore: 95,
    vulnerabilities: {
      critical: 0,
      high: 0,
      medium: 2,
      low: 3,
    },
    auditDate: "2025-02-20",
  },
]

// Helper function to determine security score color
const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-500"
  if (score >= 70) return "text-yellow-500"
  if (score >= 50) return "text-orange-500"
  return "text-red-500"
}

export function ContractAuditTable() {
  return (
    <div className="p-6 bg-[#1a1a1a] rounded-lg border border-[#333] shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Smart Contract Security Audit Results
        </h2>
        <div className="text-sm text-gray-400">Showing {contracts.length} contracts</div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-[#333]">
            <TableHead className="text-white">Contract Name</TableHead>
            <TableHead className="text-white">Security Score</TableHead>
            <TableHead className="text-white text-center">
              <span className="flex items-center justify-center gap-1">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Critical
              </span>
            </TableHead>
            <TableHead className="text-white text-center">
              <span className="flex items-center justify-center gap-1">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                High
              </span>
            </TableHead>
            <TableHead className="text-white text-center">
              <span className="flex items-center justify-center gap-1">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Medium
              </span>
            </TableHead>
            <TableHead className="text-white text-center">
              <span className="flex items-center justify-center gap-1">
                <AlertTriangle className="h-4 w-4 text-blue-500" />
                Low
              </span>
            </TableHead>
            <TableHead className="text-white">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Audit Date
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.id} className="border-[#333] hover:bg-[#252525]">
              <TableCell className="font-medium text-white">
                <div>
                  <div>{contract.name}</div>
                  <div className="text-xs text-gray-400 truncate max-w-[180px]">{contract.address}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className={`flex items-center gap-1 font-bold ${getScoreColor(contract.securityScore)}`}>
                  <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center">
                    {contract.securityScore}
                  </div>
                  <div className="w-16 h-2 bg-[#333] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        contract.securityScore >= 90
                          ? "bg-green-500"
                          : contract.securityScore >= 70
                            ? "bg-yellow-500"
                            : contract.securityScore >= 50
                              ? "bg-orange-500"
                              : "bg-red-500"
                      }`}
                      style={{ width: `${contract.securityScore}%` }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-md ${
                    contract.vulnerabilities.critical > 0 ? "bg-red-950 text-red-400" : "bg-[#222] text-gray-400"
                  }`}
                >
                  {contract.vulnerabilities.critical}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-md ${
                    contract.vulnerabilities.high > 0 ? "bg-orange-950 text-orange-400" : "bg-[#222] text-gray-400"
                  }`}
                >
                  {contract.vulnerabilities.high}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-md ${
                    contract.vulnerabilities.medium > 0 ? "bg-yellow-950 text-yellow-400" : "bg-[#222] text-gray-400"
                  }`}
                >
                  {contract.vulnerabilities.medium}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-md ${
                    contract.vulnerabilities.low > 0 ? "bg-blue-950 text-blue-400" : "bg-[#222] text-gray-400"
                  }`}
                >
                  {contract.vulnerabilities.low}
                </span>
              </TableCell>
              <TableCell className="text-gray-300">
                {new Date(contract.auditDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 flex justify-end">
        <Link
          href="/n3xus/audit-history"
          className="flex items-center gap-2 px-2 py-1 text-sm bg-[#252525] hover:bg-[#333] text-white rounded-md transition-colors border border-[#444]"
        >
          View Audit History
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

