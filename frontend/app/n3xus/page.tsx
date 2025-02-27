import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, AlertTriangle, CheckCircle } from "lucide-react";

export default function N3XUSPage() {
  return (
    <>
      <title>N3XUS</title>
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white">N3XUS</h1>
          <p className="text-zinc-400">Smart Contract Auditing Engine</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#242424] border-none rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileSearch className="w-5 h-5" />
                Total Audits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">156</div>
              <p className="text-sm text-zinc-400">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="bg-[#242424] border-none rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="w-5 h-5" />
                Critical Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#ff4444]">23</div>
              <p className="text-sm text-zinc-400">Requiring attention</p>
            </CardContent>
          </Card>

          <Card className="bg-[#242424] border-none rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CheckCircle className="w-5 h-5" />
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#4ee2b5]">89%</div>
              <p className="text-sm text-zinc-400">Resolution rate</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#242424] border-none rounded-xl">
          <CardHeader>
            <CardTitle className="text-white">Recent Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-zinc-400">Submit a smart contract to begin auditing</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
