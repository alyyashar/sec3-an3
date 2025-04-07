"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Upload, FileCode, Code, Loader2, Download, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

// Dynamically set API URL based on environment
const API_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8000" // ✅ Local FastAPI Server
    : "https://sec3-an3-production.up.railway.app"; // ✅ Production API

export default function UploadContract() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [codeInput, setCodeInput] = useState("")
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [auditId, setAuditId] = useState<string | null>(null) // Store audit ID
  const router = useRouter()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      setFile(files[0])
    }
  }

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a contract file to analyze.")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    setUploading(true)
    setProcessing(true) // Show processing UI

    try {
      console.log("Uploading and analyzing contract...")

      const response = await fetch(`${API_URL}/api/scan/file`, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      })

      if (!response.ok) throw new Error("Failed to upload contract for analysis")

      const data = await response.json()
      console.log("Analysis started. Audit ID:", data.audit_id)

      setAuditId(data.audit_id)
      pollForResults(data.audit_id) // Start polling for results
    } catch (error) {
      console.error("Error during analysis:", error)
      alert("An error occurred during contract analysis.")
      setProcessing(false)
    } finally {
      setUploading(false)
    }
  }

  const pollForResults = async (auditId: string) => {
    let attempts = 0
    const maxAttempts = 10

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 3000)) // Poll every 3 seconds

      try {
        const response = await fetch(`${API_URL}/api/scan/results`)
        if (!response.ok) throw new Error("Failed to fetch scan results")

        const results = await response.json()
        const auditResult = results.find((res: any) => res.id === auditId)

        if (auditResult) {
          console.log("Audit completed:", auditResult)
          setResult(auditResult)
          setProcessing(false)
          return
        }
      } catch (error) {
        console.error("Error fetching scan results:", error)
      }

      attempts++
    }

    console.warn("Analysis took too long. Please check manually.")
    setProcessing(false)
  }

  return (
    <div className="text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-6">Upload Smart Contract</h1>

        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <CardTitle>Contract Upload</CardTitle>
            <CardDescription>Upload your smart contract file or paste code directly for security analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload" className="space-y-4">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Upload File
                </TabsTrigger>
                <TabsTrigger value="paste" className="flex items-center gap-2">
                  <Code className="h-4 w-4" /> Paste Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDragging ? "border-primary bg-primary/10" : "border-[#333]"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    {file ? file.name : "Drag and drop your contract file here"}
                  </h3>
                  <Input type="file" className="hidden" accept=".sol" onChange={(e) => {
                      const files = e.target.files
                      if (files?.length) setFile(files[0])
                    }} id="contract-upload" />
                  <Button asChild>
                    <label htmlFor="contract-upload">Select File</label>
                  </Button>
                </div>

                {file && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between p-4 border border-[#333] rounded-lg">
                      <FileCode className="w-6 h-6 text-primary" />
                      <p className="font-medium">{file.name} ({(file.size / 1024).toFixed(2)} KB)</p>
                      <Button variant="destructive" size="sm" onClick={() => setFile(null)}>Remove</Button>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => setFile(null)}>Cancel</Button>
                      <Button onClick={handleFileUpload} disabled={uploading}>
                        {uploading ? "Analyzing..." : "Start Analysis"}
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {processing && (
          <div className="text-center">
            <Loader2 className="animate-spin h-6 w-6 mx-auto text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">Processing... Please wait</p>
          </div>
        )}

        {result && (
          <Card className="bg-[#1a1a1a] border-[#333] mt-6">
            <CardHeader>
              <CardTitle>Analysis Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/n3xus/reports")}>
                <Eye className="h-4 w-4 mr-2" /> View Reports
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
