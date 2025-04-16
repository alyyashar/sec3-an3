"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Clock, Shield, ArrowRight } from "lucide-react"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table"
import Link from "next/link"

interface SmartContract {
  id: string
  contract_name: string
  contract_address: string | null
  scan_results: any
  created_at: string
}

export function ContractAuditTable({ audits }: any) {
  const [contracts, setContracts] = useState<SmartContract[]>([])

  useEffect(() => {
    async function fetchAuditResults() {
      try {
        const response = await fetch("/api/results")
        const data = await response.json()
        setContracts(data)
      } catch (error) {
        console.error("Error fetching audit results:", error)
      }
    }
    fetchAuditResults()
  }, [])

  return (
    <div className="p-6 bg-[#1a1a1a] rounded-lg border border-[#333] shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Smart Contract Security Audit Results
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-[#333]">
            <TableHead className="text-white">Contract Name</TableHead>
            <TableHead className="text-white">Contract Address</TableHead>
            <TableHead className="text-white">Scan Results</TableHead>
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
              <TableCell className="font-medium text-white">{contract.contract_name}</TableCell>
              <TableCell className="text-gray-300 truncate max-w-[180px]">
                {contract.contract_address || "N/A"}
              </TableCell>
              <TableCell className="text-gray-300 truncate max-w-[180px]">
                {JSON.stringify(contract.scan_results).slice(0, 50)}...
              </TableCell>
              <TableCell className="text-gray-300">
                {new Date(contract.created_at).toLocaleDateString("en-US", {
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