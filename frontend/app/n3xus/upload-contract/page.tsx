"use client"

import type React from "react"
import { useState } from "react"
import { Upload, FileCode, AlertTriangle, Code } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function UploadContract() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [codeInput, setCodeInput] = useState("")
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null) // store scan result

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

    try {
      console.log("Uploading and analyzing contract...")

      const response = await fetch("https://sec3-an3-production.up.railway.app/api/scan/file", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to upload contract for analysis")

      const data = await response.json()
      console.log("Analysis result:", data)
      setResult(data) // Store result to display
      alert("Analysis completed successfully! Check below for results.")
    } catch (error) {
      console.error("Error during analysis:", error)
      alert("An error occurred during contract analysis.")
    } finally {
      setUploading(false)
    }
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

              {/* ---- UPLOAD FILE TAB ---- */}
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
                  <p className="text-sm text-muted-foreground mb-4">or click to select from your computer</p>
                  <Input
                    type="file"
                    className="hidden"
                    accept=".sol"
                    onChange={(e) => {
                      const files = e.target.files
                      if (files?.length) setFile(files[0])
                    }}
                    id="contract-upload"
                  />
                  <Button asChild>
                    <label htmlFor="contract-upload">Select File</label>
                  </Button>
                </div>

                {file && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between p-4 border border-[#333] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileCode className="w-6 h-6 text-primary" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => setFile(null)}>
                        Remove
                      </Button>
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

              {/* ---- PASTE CODE TAB ---- */}
              <TabsContent value="paste">
                <div className="space-y-4">
                  <div className="p-4 border border-[#333] rounded-lg bg-[#121212]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Code className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Solidity Code</h3>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {codeInput.length > 0 ? `${codeInput.length} characters` : "No code entered"}
                      </div>
                    </div>
                    <Textarea
                      placeholder="// Paste your Solidity contract code here..."
                      className="min-h-[300px] font-mono text-sm bg-[#121212] border-none focus-visible:ring-1 focus-visible:ring-primary"
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setCodeInput("")} disabled={!codeInput}>
                      Clear
                    </Button>
                    <Button disabled={!codeInput}>Start Analysis</Button> {/* We will hook paste code API later */}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* ---- RESULT DISPLAY ---- */}
        {result && (
          <Card className="bg-[#1a1a1a] border-[#333] mt-6">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>Detailed report generated from AI and tools</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
