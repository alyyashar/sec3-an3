import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Activity, Bug, BarChart3, TrendingUp, AlertOctagon, Clock, DollarSign, AlertTriangle, Flame, RefreshCw, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FortaAlerts from "@/components/analytics/forta-alerts";

export default function DashboardPage() {
  // Mock data for all components
  const recentExploits = [
    { id: 1, protocol: "Example Protocol", type: "Reentrancy", blockchain: "Ethereum", timestamp: "2 hours ago" },
    { id: 2, protocol: "DeFi Project", type: "Flash Loan", blockchain: "BSC", timestamp: "5 hours ago" },
    { id: 3, protocol: "Yield Farm", type: "Oracle Manipulation", blockchain: "Polygon", timestamp: "1 day ago" },
  ];

  const riskScores = [
    { id: 1, protocol: "Protocol Alpha", score: 85, riskLevel: "High", tvl: "$1.2B" },
    { id: 2, protocol: "Protocol Beta", score: 62, riskLevel: "Medium", tvl: "$450M" },
    { id: 3, protocol: "Protocol Gamma", score: 38, riskLevel: "Low", tvl: "$780M" },
    { id: 4, protocol: "Protocol Delta", score: 91, riskLevel: "Critical", tvl: "$2.1B" },
  ];

  const attackTrends = [
    { id: 1, type: "Reentrancy", count: 12, change: "+8%", trend: "increasing", months: [4, 5, 7, 8, 6, 9, 12] },
    { id: 2, type: "Flash Loans", count: 8, change: "+15%", trend: "increasing", months: [2, 3, 3, 5, 6, 7, 8] },
    { id: 3, type: "Oracle Manipulation", count: 6, change: "-3%", trend: "decreasing", months: [8, 7, 9, 6, 5, 7, 6] },
  ];

  const anomalies = [
    { id: 1, contract: "0x1a2b...3c4d", type: "Gas Spike", severity: "Medium", time: "10 minutes ago", details: "Unusual gas consumption pattern detected" },
    { id: 2, contract: "0x5e6f...7g8h", type: "Large Withdrawal", severity: "High", time: "25 minutes ago", details: "Withdrawal of 500 ETH to flagged address" },
    { id: 3, contract: "0x9i0j...1k2l", type: "Privileged Call", severity: "Critical", time: "1 hour ago", details: "Owner function called after long inactivity" },
  ];

  const recentHacks = [
    { id: 1, protocol: "Protocol X", date: "Feb 28, 2025", amount: "$12.5M", type: "Flash Loan Attack" },
    { id: 2, protocol: "Protocol Y", date: "Feb 15, 2025", amount: "$8.2M", type: "Reentrancy" },
    { id: 3, protocol: "Protocol Z", date: "Feb 3, 2025", amount: "$4.7M", type: "Oracle Manipulation" },
  ];

  const mostAttacked = [
    { id: 1, contract: "Lending Protocol A", alerts: 28 },
    { id: 2, contract: "DEX B", alerts: 23 },
    { id: 3, contract: "Yield Aggregator C", alerts: 19 },
  ];

  const topExploits = [
    { id: 1, protocol: "Major Protocol", date: "Aug 2024", amount: "$620M", type: "Bridge Exploit" },
    { id: 2, protocol: "DeFi Platform", date: "Mar 2024", amount: "$326M", type: "Flash Loan Attack" },
    { id: 3, protocol: "Yield Farm", date: "Nov 2023", amount: "$185M", type: "Governance Attack" },
  ];

  return (
    <>
      <title>N3</title>
      <div className="p-6">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome to N3 Security Suite</h1>
          <p className="text-zinc-400">Access our comprehensive Web3 security tools</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
      
        {/* <div className="p-6 grid gap-6">
          <FortaAlerts />
        </div> */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Live Smart Contract Exploit Tracker */}
          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2 text-white">
                    <Shield className="h-5 w-5 text-red-400" />
                    Live Smart Contract Exploit Tracker
                  </CardTitle>
                  <p className="text-sm text-zinc-400 mt-1">Aggregates real-time attack data from sources like rekt.news, Forta alerts, and Etherscan API</p>
                </div>
                <Badge variant="outline" className="bg-gray-400 text-xs">
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <h4 className="font-medium text-white">Recent Exploits</h4>
                    <button className="text-xs text-zinc-400 flex items-center gap-1">
                      <RefreshCw className="h-3 w-3" /> Refresh
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentExploits.map((exploit) => (
                      <div key={exploit.id} className="bg-gray-700/30 p-2 rounded-md flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm text-white">{exploit.protocol}</div>
                          <div className="text-xs text-zinc-400 flex items-center gap-2">
                            <Badge variant="outline" className="bg-red-900/30 text-red-400 border-red-800 text-[10px]">
                              {exploit.type}
                            </Badge>
                            <span>{exploit.blockchain}</span>
                          </div>
                        </div>
                        <div className="text-xs text-zinc-400">{exploit.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protocol Security Risk Index */}
          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2 text-white">
                    <BarChart3 className="h-5 w-5 text-yellow-400" />
                    Protocol Security Risk Index
                  </CardTitle>
                  <p className="text-sm text-zinc-400 mt-1">Ranks top protocols based on historical exploits and security audits</p>
                </div>
                <Badge variant="outline" className="bg-gray-400 text-xs">
                  Updated Daily
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Top Protocol Risk Scores</h4>
                  <div className="space-y-2">
                    {riskScores.map((protocol) => (
                      <div key={protocol.id} className="bg-gray-700/30 p-2 rounded-md">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium text-sm text-white">{protocol.protocol}</div>
                          <div className="text-xs text-zinc-400">TVL: {protocol.tvl}</div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className={`h-2.5 rounded-full ${protocol.riskLevel === "Critical" ? "bg-red-600" : protocol.riskLevel === "High" ? "bg-orange-500" : protocol.riskLevel === "Medium" ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${protocol.score}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <Badge className={`text-[10px] ${protocol.riskLevel === "Critical" ? "bg-red-900/30 text-red-400 border-red-800" : protocol.riskLevel === "High" ? "bg-orange-900/30 text-orange-400 border-orange-800" : protocol.riskLevel === "Medium" ? "bg-yellow-900/30 text-yellow-400 border-yellow-800" : "bg-green-900/30 text-green-400 border-green-800"}`}>{protocol.riskLevel} Risk</Badge>
                          <div className="text-xs text-zinc-400">Score: {protocol.score}/100</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Attack Patterns */}
          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    Trending Attack Patterns
                  </CardTitle>
                  <p className="text-sm text-zinc-400 mt-1">AI-powered insights on most common exploit vectors (Reentrancy, Flash Loans, Oracle Manipulation, etc.)</p>
                </div>
                <Badge variant="outline" className="bg-gray-400 text-[12px] w-3/12 justify-center">
                  AI-Powered
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Current Attack Trends</h4>
                  <div className="space-y-3">
                    {attackTrends.map((trend) => (
                      <div key={trend.id} className="bg-gray-700/30 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium flex items-center gap-1.5 text-white">
                            <Zap className="h-4 w-4 text-yellow-400" />
                            {trend.type}
                          </div>
                          <Badge className={`text-[10px] ${trend.trend === "increasing" ? "bg-red-900/30 text-red-400 border-red-800" : "bg-green-900/30 text-green-400 border-green-800"}`}>{trend.change}</Badge>
                        </div>
                        <div className="flex items-end h-12 gap-1 mb-1">
                          {trend.months.map((value, index) => (
                            <div key={index} className={`w-full rounded-t ${trend.trend === "increasing" ? "bg-red-500/60" : "bg-green-500/60"}`} style={{ height: `${(value / 12) * 100}%` }}></div>
                          ))}
                        </div>
                        <div className="text-xs text-zinc-400 flex justify-between">
                          <span>Last 7 months</span>
                          <span>{trend.count} incidents this month</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live On-Chain Anomaly Detection */}
          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2 text-white">
                    <AlertOctagon className="h-5 w-5 text-red-400" />
                    Live On-Chain Anomaly Detection
                  </CardTitle>
                  <p className="text-sm text-zinc-400 mt-1">Uses Forta APIs to track suspicious contract interactions, rug pulls, and privileged function calls</p>
                </div>
                <Badge variant="outline" className="bg-gray-400 text-[12px] w-2/12 justify-center">
                  Real-time
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white">Recent Anomalies</h4>
                    <Badge className="bg-red-900/30 text-red-400 border-red-800 text-[10px]">
                      <Activity className="h-3 w-3 mr-1" />3 Active Alerts
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {anomalies.map((anomaly) => (
                      <div key={anomaly.id} className="bg-gray-700/30 p-2 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-sm flex items-center gap-1.5 text-white">
                              <span className="font-mono">{anomaly.contract}</span>
                              <Badge className={`text-[10px] ${anomaly.severity === "Critical" ? "bg-red-900/30 text-red-400 border-red-800" : anomaly.severity === "High" ? "bg-orange-900/30 text-orange-400 border-orange-800" : "bg-yellow-900/30 text-yellow-400 border-yellow-800"}`}>{anomaly.severity}</Badge>
                            </div>
                            <div className="text-xs text-zinc-400 mt-1">{anomaly.details}</div>
                          </div>
                          <div className="text-xs text-zinc-400">{anomaly.time}</div>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between">
                          <Badge variant="outline" className="bg-gray-700 text-[10px]">
                            {anomaly.type}
                          </Badge>
                          <button className="text-xs text-blue-400 hover:underline">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        {/* </div> */}
        {/* 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <Clock className="h-5 w-5 text-blue-400" />
                Recent Web3 Hacks Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400 mb-3">Shows a chronological view of the latest DeFi hacks and exploits.</p>
              <div className="space-y-4">
                {recentHacks.map((hack) => (
                  <div key={hack.id} className="relative pl-5 pb-4 border-l border-gray-700">
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 top-1"></div>
                    <div className="text-sm font-medium text-white">{hack.protocol}</div>
                    <div className="text-xs text-zinc-400">{hack.date}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full">{hack.type}</span>
                      <span className="text-sm font-medium text-white">{hack.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <DollarSign className="h-5 w-5 text-green-400" />
                Total Amount Lost in Web3 Hacks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400 mb-3">Aggregates total monetary losses from recent security breaches.</p>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="text-4xl font-bold text-green-400">$1.28B</div>
                <div className="text-sm text-zinc-400 mt-1">Lost in the last 12 months</div>
                <div className="w-full bg-gray-700 h-2 rounded-full mt-4">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <div className="flex justify-between w-full text-xs text-zinc-400 mt-1">
                  <span>Q1 2024</span>
                  <span>Q2 2024</span>
                  <span>Q3 2024</span>
                  <span>Q4 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Most Attacked Smart Contracts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400 mb-3">Identifies frequently targeted contracts based on Forta threat alerts.</p>
              <div className="space-y-3">
                {mostAttacked.map((contract) => (
                  <div key={contract.id} className="bg-gray-700/30 p-2 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-sm text-white">{contract.contract}</div>
                      <div className="text-xs px-2 py-0.5 bg-yellow-900/30 text-yellow-400 rounded-full">{contract.alerts} alerts</div>
                    </div>
                    <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2">
                      <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${(contract.alerts / 30) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <Flame className="h-5 w-5 text-orange-400" />
                Top 5 DeFi Exploits of All Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400 mb-3">Displays historic high-profile exploits ranked by impact.</p>
              <div className="space-y-3">
                {topExploits.map((exploit) => (
                  <div key={exploit.id} className="bg-gray-700/30 p-2 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-sm text-white">{exploit.protocol}</div>
                      <div className="text-sm font-bold text-orange-400">{exploit.amount}</div>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-400 mt-1">
                      <span>{exploit.date}</span>
                      <span>{exploit.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                Gas Price Trends & Security Implications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400 mb-3">Shows abnormal gas usage trends correlated with potential attack events.</p>
              <div className="space-y-3">
                <div className="bg-gray-700/30 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-white">Gas Price Anomalies</div>
                    <div className="text-xs text-zinc-400">Last 30 days</div>
                  </div>
                  <div className="h-24 flex items-end gap-1">
                    {Array.from({ length: 30 }).map((_, i) => {
                      const height = Math.random() * 80 + 20;
                      const isSpike = height > 80;
                      return <div key={i} className={`w-full rounded-t ${isSpike ? "bg-red-500" : "bg-purple-500/60"}`} style={{ height: `${height}%` }}></div>;
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-zinc-400 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Gas spikes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Normal gas</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-zinc-400">Gas price spikes often correlate with exploit attempts, as attackers may pay higher gas to prioritize their transactions during an attack.</div>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </>
  );
}
