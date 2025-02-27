import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Activity, Bug } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <title>N3</title>
      <div className="p-6">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome to N3 Security Suite</h1>
          <p className="text-zinc-400">Access our comprehensive Web3 security tools</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <div className="h-1 bg-[#4ee2b5] w-full" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5" />
                N3XUS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">Smart contract auditing with AI-powered verification and real-time reporting</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li>• Automated contract scanning</li>
                <li>• AI-enhanced verification</li>
                <li>• PDF report generation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <div className="h-1 bg-[#a36bfd] w-full" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Activity className="w-5 h-5" />
                N3RV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">Real-time monitoring engine for blockchain events and anomaly detection</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li>• Event monitoring</li>
                <li>• Anomaly detection</li>
                <li>• Multi-channel alerts</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <div className="h-1 bg-[#2ec9ff] w-full" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bug className="w-5 h-5" />
                N3ST
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">Community-driven red team and bug bounty platform</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li>• Bug bounty programs</li>
                <li>• Token rewards</li>
                <li>• Community challenges</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
