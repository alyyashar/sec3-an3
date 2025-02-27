import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertCircle, Shield } from "lucide-react";

export default function N3RVPage() {
  return (
    <>
      <title>N3RV</title>
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white">N3RV</h1>
          <p className="text-zinc-400">Real-Time Monitoring Engine</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#242424] border-none rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Activity className="w-5 h-5" />
                Active Monitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24</div>
              <p className="text-sm text-zinc-400">Across 3 chains</p>
            </CardContent>
          </Card>

          <Card className="bg-[#242424] border-none rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertCircle className="w-5 h-5" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#ff4444]">12</div>
              <p className="text-sm text-zinc-400">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="bg-[#242424] border-none rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5" />
                Protected Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#4ee2b5]">$2.4M</div>
              <p className="text-sm text-zinc-400">Total value monitored</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#242424] border-none rounded-xl">
          <CardHeader>
            <CardTitle className="text-white">Event Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-zinc-400">Real-time blockchain events will appear here</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
