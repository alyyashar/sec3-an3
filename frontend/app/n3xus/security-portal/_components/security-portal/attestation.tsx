"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

interface AttestationProps {
  auditId: string;
}

export function Attestation({ auditId }: AttestationProps) {
  const [loading, setLoading] = useState(false);
  const [attestation, setAttestation] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Fetch existing attestation on mount
  useEffect(() => {
    const fetchAttestation = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/attestation/${auditId}`);
        if (!res.ok) return;
        const data = await res.json();
        setAttestation(data);
      } catch (err) {
        // Do nothing silently
      } finally {
        setLoading(false);
      }
    };

    fetchAttestation();
  }, [auditId]);

  // 🛠 Generate new attestation
  const generateAttestation = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/attestation/${auditId}`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Failed to generate attestation.");
      setAttestation(data);
    } catch (err: any) {
      setError(err.message || "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Decentralized & Transparent Attestation</CardTitle>
        <CardDescription>
          Zero-knowledge proofs (ZKPs) for verifiable security attestations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {attestation ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="h-6 w-6 text-green-500" />
                <div>
                  <h4 className="font-medium">Security Attestation</h4>
                  <p className="text-sm text-muted-foreground">
                    Verifiable on-chain proof of security audit
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="border-green-500 text-green-500">
                {attestation.status}
              </Badge>
            </div>

            <div className="p-4 border rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Attestation Hash:</span>
                <span className="font-mono truncate max-w-xs">{attestation.attestation_hash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification Method:</span>
                <span>{attestation.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Attestation Chain:</span>
                <span>{attestation.chain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created At:</span>
                <span>{new Date(attestation.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">No attestation has been generated yet.</p>
            <Button onClick={generateAttestation} disabled={loading}>
              {loading ? "Generating..." : "Generate Attestation"}
            </Button>
          </div>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
}
