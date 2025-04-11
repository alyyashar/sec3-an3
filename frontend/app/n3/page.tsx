"use client"

import { Shield, Activity, Bug, Search, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-[#222] bg-[#121212]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-md bg-[#1e3a2f] flex items-center justify-center">
              <Shield className="h-6 w-6 text-[#4ee2b5]" />
            </div>
            <h1 className="text-2xl font-bold">N3</h1>
          </div>

          <div className="text-xl font-semibold">Security Command Center</div>

          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search" className="pl-10 bg-[#1a1a1a] border-[#333] text-white" />
            </div>
            <div className="h-9 w-9 rounded-full bg-[#1e3a2f] flex items-center justify-center">
              <span className="text-[#4ee2b5]">👤</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* N3XUS Card */}
          <Card className="bg-[#121212] border-[#222] hover:border-[#1e3a2f] transition-colors">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#4ee2b5] mb-1">N3XUS</h2>
                  <h3 className="text-lg font-semibold mb-2">AI-Powered Smart Contract Auditing</h3>
                </div>
                <div className="h-12 w-12 rounded-md bg-[#1e3a2f] flex items-center justify-center">
                  <Shield className="h-7 w-7 text-[#4ee2b5]" />
                </div>
              </div>
              <p className="text-gray-400 mb-6">Utilize AI for auditing smart contracts.</p>
              <div className="mt-auto">
                <Link href="/n3xus" className="">
                  <Button className="bg-[#1e3a2f] text-[#4ee2b5] hover:bg-[#2a5040]">Access</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* N3RV Card */}
          <Card className="bg-[#121212] border-[#222] hover:border-[#1e3a2f] transition-colors">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#4ee2b5] mb-1">N3RV</h2>
                  <h3 className="text-lg font-semibold mb-2">Real-Time Anomaly Detection</h3>
                </div>
                <div className="h-12 w-12 rounded-md bg-[#1e3a2f] flex items-center justify-center">
                  <Activity className="h-7 w-7 text-[#4ee2b5]" />
                </div>
              </div>
              <p className="text-gray-400 mb-6">Monitor blockchain activity continuously.</p>
              <div className="mt-auto">
                <Link href="/n3rv">
                  <Button className="bg-[#1e3a2f] text-[#4ee2b5] hover:bg-[#2a5040]">Access</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* N3ST Card */}
          <Card className="bg-[#121212] border-[#222] hover:border-[#1e3a2f] transition-colors">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#4ee2b5] mb-1">N3ST</h2>
                  <h3 className="text-lg font-semibold mb-2">Community-Driven Red Teaming & Bug Bounty</h3>
                </div>
                <div className="h-12 w-12 rounded-md bg-[#1e3a2f] flex items-center justify-center">
                  <Bug className="h-7 w-7 text-[#4ee2b5]" />
                </div>
              </div>
              <p className="text-gray-400 mb-6">Engage users in finding and reporting vulnerabilities.</p>
              <div className="mt-auto">
                <Link href="/n3st">
                  <Button className="bg-[#1e3a2f] text-[#4ee2b5] hover:bg-[#2a5040]">Access</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-6">
          {/* Stats Cards */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {/* Recent Hacks */}
              <Card className="bg-[#121212] border-[#222]">
                <CardContent className="p-6">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Recent Hacks</h3>
                    <div className="text-4xl font-bold">32</div>
                  </div>
                </CardContent>
              </Card>

              {/* Total Funds Lost */}
              <Card className="bg-[#121212] border-[#222]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Total Funds Lost in 2025</h3>
                      <div className="text-4xl font-bold">$1.82B</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                      <div className="h-8 w-8 rounded-full bg-[#1e3a2f] border-4 border-[#4ee2b5]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top 5 Most Attacked */}
              <Card className="bg-[#121212] border-[#222]">
                <CardContent className="p-6">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Top 5 Most Attacked Contracts</h3>
                    <div className="mt-2 space-y-1">
                      <div className="text-sm">1. UniswapV3 Pool</div>
                      <div className="text-sm">2. AAVE Lending</div>
                      <div className="text-sm">3. Curve Finance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gas Spike Alerts */}
              <Card className="bg-[#121212] border-[#222]">
                <CardContent className="p-6">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Gas Spike Alerts</h3>
                    <div className="text-4xl font-bold">6%</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attack Trends */}
              <Card className="bg-[#121212] border-[#222]">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Attack Trends Overview</CardTitle>
                  <Button variant="link" className="text-[#4ee2b5] p-0">
                    Daily &gt;
                  </Button>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Simplified chart visualization */}
                      <div className="absolute inset-0 flex items-end">
                        <div className="flex-1 flex items-end space-x-2">
                          {[30, 45, 25, 60, 40, 75, 50, 65, 35, 70, 55, 80].map((height, i) => (
                            <div key={i} className="flex-1">
                              <div
                                className="bg-gradient-to-t from-[#1e3a2f] to-[#4ee2b5] rounded-sm"
                                style={{ height: `${height}%` }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Trend lines */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <TrendingUp className="h-16 w-16 text-[#4ee2b5] opacity-20" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Funds Lost by Attack Type */}
              <Card className="bg-[#121212] border-[#222]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Funds Lost in 2025 by Attack Type</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="w-1/2 flex items-center justify-center">
                      <div className="relative h-40 w-40 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-8 border-[#4ee2b5] clip-half"></div>
                        <div className="text-2xl font-bold">50%</div>
                      </div>
                    </div>
                    <div className="w-1/2 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-[#4ee2b5] rounded-full mr-2"></div>
                          <span>Reentrancy</span>
                        </div>
                        <span>30%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-[#2a5040] rounded-full mr-2"></div>
                          <span>Flash Loans</span>
                        </div>
                        <span>20%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-[#1e3a2f] rounded-full mr-2"></div>
                          <span>Rugpulls</span>
                        </div>
                        <span>20%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-[#173025] rounded-full mr-2"></div>
                          <span>Oracle Attacks</span>
                        </div>
                        <span>15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-[#0f201a] rounded-full mr-2"></div>
                          <span>Other</span>
                        </div>
                        <span>15%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="h-full">
            {/* Top Chains Affected */}
            <Card className="bg-[#121212] border-[#222] row-span-2 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Top Chains Affected</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Ethereum</span>
                    <span className="font-semibold">$1.2B</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>BNB Chain</span>
                    <span className="font-semibold">$300M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Solana</span>
                    <span className="font-semibold">$350M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Polygon</span>
                    <span className="font-semibold">$310M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
