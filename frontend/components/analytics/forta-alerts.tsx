"use client";
import React, { useEffect, useState } from "react";
import { Shield, RefreshCw, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Alert {
  id: string;
  protocol: string;
  type: string;
  blockchain: string;
  timestamp: string;
  link?: string;
}

export default function LiveSmartContractExploitTracker() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true); // Set loading state before fetching
      const response = await fetch("https://api.llama.fi/hacks");

      if (!response.ok) {
        throw new Error("Failed to fetch alert data");
      }

      const data = await response.json();

      const transformedAlerts: Alert[] = data.slice(0, 5).map((hack: any) => ({
        id: hack.id || `hack-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        protocol: hack.name || hack.project || "Unknown Protocol",
        type: hack.technique || "Smart Contract Exploit",
        blockchain: hack.chain || "Unknown Chain",
        timestamp: new Date(hack.date * 1000).toLocaleString(),
        link: hack.source
      }));

      setAlerts(transformedAlerts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching alerts:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const intervalId = setInterval(fetchAlerts, 5 * 60 * 1000); // Fetch every 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => fetchAlerts(), 500);
  };

  return (
    <Card className="bg-[#121212] border-none rounded-xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-[#68E06F]" />
              Recent Smart Contract Exploits
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400 mt-1">
              Track the latest smart contract exploits and security incidents across major blockchain protocols. Stay informed about past hacks, vulnerabilities, and their impact on the Web3 ecosystem. Data is sourced from trusted security platforms and updated regularly.
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-gray-400 text-xs">
            Latest
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <h4 className="font-medium text-white">Recent Exploits</h4>
              <button className="text-xs text-zinc-400 flex items-center gap-1" onClick={handleRefresh}>
                <RefreshCw className="h-3 w-3" /> Refresh
              </button>
            </div>
            <div className="space-y-2">
              {loading && <p className="text-zinc-400">Loading alerts...</p>}
              {error && <p className="text-red-500">Error: {error}</p>}
              {!loading && !error && alerts.length === 0 && <p className="text-zinc-400">No recent alerts found.</p>}
              {!loading &&
                alerts.map((alert) => (
                  <div key={alert.id} className="p-2 rounded-md flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-white">{alert.protocol}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-2">
                        <Badge variant="outline" className="text-[#68E06F] border-[#68E06F] text-[10px]">
                          {alert.type}
                        </Badge>
                        <span>{alert.blockchain}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-zinc-400">{alert.timestamp}</div>
                      {alert.link && (
                        <a
                          href={alert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    </div>                  
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
