'use client';

import { useState } from 'react';
import { Upload, FileCode, Code, Loader2, Eye } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const API_URL =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://sec3-an3-production.up.railway.app';

export function UploadContractModal() {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [codeInput, setCodeInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [auditId, setAuditId] = useState<string | null>(null);
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) setFile(files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return alert('Please select a contract file to analyze.');
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    setProcessing(true);

    try {
      const response = await fetch(`${API_URL}/api/scan/file`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to upload contract');
      const data = await response.json();
      setAuditId(data.audit_id);
      pollForResults(data.audit_id);
    } catch (err) {
      console.error(err);
      alert('Upload error.');
      setProcessing(false);
    } finally {
      setUploading(false);
    }
  };

  const handleCodeAnalysis = async () => {
    if (!codeInput.trim()) return alert('Please paste contract code to analyze.');
    setProcessing(true);
    try {
      const response = await fetch(`${API_URL}/api/scan/code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeInput }),
      });
      if (!response.ok) throw new Error('Failed to analyze code');
      const data = await response.json();
      setAuditId(data.audit_id);
      pollForResults(data.audit_id);
    } catch (err) {
      console.error(err);
      alert('Code analysis error.');
      setProcessing(false);
    }
  };

  const handleAddressAnalysis = async () => {
    if (!addressInput.trim()) return alert('Please enter a contract address.');
    setProcessing(true);
    try {
      const response = await fetch(`${API_URL}/api/scan/address`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: addressInput }),
      });
      if (!response.ok) throw new Error('Failed to analyze address');
      const data = await response.json();
      setAuditId(data.audit_id);
      pollForResults(data.audit_id);
    } catch (err) {
      console.error(err);
      alert('Address analysis error.');
      setProcessing(false);
    }
  };

  const pollForResults = async (auditId: string) => {
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
      await new Promise((r) => setTimeout(r, 3000));
      try {
        const res = await fetch(`${API_URL}/api/scan/results`);
        if (!res.ok) throw new Error('Scan error');
        const results = await res.json();
        const auditResult = results.find((res: any) => res.id === auditId);
        if (auditResult) {
          setResult(auditResult);
          setProcessing(false);
          return;
        }
      } catch (err) {
        console.error(err);
      }
      attempts++;
    }
    setProcessing(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Upload className="mr-2 h-4 w-4" /> Scan Contract
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <CardTitle>Scan Smart Contract</CardTitle>
            <CardDescription>Analyze contract via file, pasted code, or address</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="upload" className="space-y-4">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="upload">Upload File</TabsTrigger>
                <TabsTrigger value="paste">Paste Code</TabsTrigger>
                <TabsTrigger value="address">Contract Address</TabsTrigger>
              </TabsList>

              <TabsContent value="upload">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    isDragging ? 'border-primary bg-primary/10' : 'border-[#333]'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    {file ? file.name : 'Drag and drop your contract file here'}
                  </h3>
                  <Input
                    type="file"
                    className="hidden"
                    accept=".sol"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files?.length) setFile(files[0]);
                    }}
                    id="contract-upload"
                  />
                  <Button asChild>
                    <label htmlFor="contract-upload">Select File</label>
                  </Button>
                </div>

                {file && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between p-3 border border-[#333] rounded-lg">
                      <FileCode className="w-6 h-6 text-primary" />
                      <p className="font-medium">
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </p>
                      <Button variant="destructive" size="sm" onClick={() => setFile(null)}>
                        Remove
                      </Button>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => setFile(null)}>
                        Cancel
                      </Button>
                      <Button onClick={handleFileUpload} disabled={uploading}>
                        {uploading ? 'Analyzing...' : 'Start Analysis'}
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="paste">
                <Textarea
                  placeholder="Paste your Solidity contract code here..."
                  rows={10}
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  className="bg-background border-[#333]"
                />
                <div className="flex justify-end mt-3">
                  <Button onClick={handleCodeAnalysis} disabled={processing || !codeInput.trim()}>
                    Start Analysis
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="address">
                <Input
                  type="text"
                  placeholder="Enter Deployed Contract Address"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                />
                <div className="flex justify-end mt-3">
                  <Button onClick={handleAddressAnalysis} disabled={processing || !addressInput.trim()}>
                    Start Analysis
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {processing && (
              <div className="text-center mt-4">
                <Loader2 className="animate-spin h-6 w-6 mx-auto text-primary" />
                <p className="text-sm mt-2 text-muted-foreground">Processing... Please wait</p>
              </div>
            )}

            {result && (
              <Card className="bg-[#1a1a1a] border-[#333] mt-6">
                <CardHeader>
                  <CardTitle>Analysis Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => router.push('/n3xus/reports')}>View Report</Button>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
