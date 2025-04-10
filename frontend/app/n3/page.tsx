"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Activity, Bug, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import FortaAlerts from "@/components/analytics/forta-alerts"
import TotalAmountLost from "@/components/analytics/amount-loss"
import TopDeFiExploits from "@/components/analytics/top-exploits"

export default function LandingPage() {
  return (
    <>
      <title>N3 Security Suite</title>
      <div className="min-h-screen bg-[#121212] text-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-[#1a1a1a] to-[#121212] py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="flex items-center mb-6">
                <Shield className="h-12 w-12 mr-3 text-[#4ee2b5]" />
                <h1 className="text-4xl md:text-5xl font-bold">N3 Security Suite</h1>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mb-8">
                Comprehensive blockchain security solutions powered by advanced AI technology
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/n3/solutions">
                  <Button className="bg-[#1e3a2f] text-[#4ee2b5] hover:bg-[#2a5040] px-6 py-6 text-lg">
                    Explore Solutions
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-[#333] hover:bg-[#1a1a1a] px-6 py-6 text-lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="py-16 container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Security Products</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose from our suite of specialized security tools designed to protect your blockchain assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Link href={"/n3xus"}>
              <Card className="border-none hover:scale-[1.02] transition-all duration-300 rounded-xl overflow-hidden bg-[#0f2620]">
                <div className="h-2 w-full bg-gradient-to-r from-[#4ee2b5] to-[#2a8066]" />
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-white text-2xl">
                    <Shield className="w-6 h-6 text-[#4ee2b5]" />
                    N3XUS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">
                    Smart contract auditing with AI-powered verification and real-time reporting
                  </p>
                  <ul className="space-y-3 text-gray-400 mb-6">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-[#1e3a2f] flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-[#4ee2b5] text-xs">✓</span>
                      </div>
                      Automated contract scanning
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-[#1e3a2f] flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-[#4ee2b5] text-xs">✓</span>
                      </div>
                      AI-enhanced verification
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-[#1e3a2f] flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-[#4ee2b5] text-xs">✓</span>
                      </div>
                      PDF report generation
                    </li>
                  </ul>
                  <Button className="w-full bg-[#1e3a2f] text-[#4ee2b5] hover:bg-[#2a5040]">
                    Access N3XUS
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href={"/n3rv"}>
              <Card className="border-none hover:scale-[1.02] transition-all duration-300 rounded-xl overflow-hidden bg-[#231a36]">
                <div className="h-2 w-full bg-gradient-to-r from-[#a36bfd] to-[#5a3c8e]" />
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-white text-2xl">
                    <Activity className="w-6 h-6 text-[#a36bfd]" />
                    N3RV
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">
                    Real-time monitoring engine for blockchain events and anomaly detection
                  </p>
                  <ul className="space-y-3 text-gray-400 mb-6">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-[#2a1f40] flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-[#a36bfd] text-xs">✓</span>
                      </div>
                      Event monitoring
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-[#2a1f40] flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-[#a36bfd] text-xs">✓</span>
                      </div>
                      Anomaly detection
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-[#2a1f40] flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-[#a36bfd] text-xs">✓</span>
                      </div>
                      Multi-channel alerts
                    </li>
                  </ul>
                  <Button className="w-full bg-[#2a1f40] text-[#a36bfd] hover:bg-[#352650]">
                    Access N3RV
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href={"/n3st"}>
              <Card className="border-none hover:scale-[1.02] transition-all duration-300 rounded-xl overflow-hidden bg-[#2e1e05]">
                <div className="h-2 w-full bg-gradient-to-r from-[#f59e0b] to-[#b97708]" />
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-white text-2xl">
                    <Bug className="w-6 h-6 text-[#f59e0b]" />
                    N3ST
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">Community-driven red team and bug bounty platform</p>
                  <ul className="space-y-3 text-gray-400 mb-6">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-[#3d2807] flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-[#f59e0b] text-xs">✓</span>
                      </div>
                      Bug bounty programs
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-[#3d2807] flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-[#f59e0b] text-xs">✓</span>
                      </div>
                      Token rewards
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-[#3d2807] flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-[#f59e0b] text-xs">✓</span>
                      </div>
                      Community challenges
                    </li>
                  </ul>
                  <Button className="w-full bg-[#3d2807] text-[#f59e0b] hover:bg-[#4d3209]">
                    Access N3ST
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Analytics Preview Section */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Security Analytics</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Preview our security analytics capabilities that help you stay ahead of threats
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <FortaAlerts />
              <TopDeFiExploits />
            </div>

            <div className="mb-12">
              <TotalAmountLost />
            </div>

            <div className="text-center">
              <Button className="bg-[#1e3a2f] text-[#4ee2b5] hover:bg-[#2a5040] px-6 py-6 text-lg">
                Get Full Access
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#0a0a0a] py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <Shield className="h-8 w-8 mr-2 text-[#4ee2b5]" />
                <span className="text-xl font-bold">N3 Security Suite</span>
              </div>
              <div className="flex gap-6">
                <Link href="#" className="text-gray-400 hover:text-white">
                  About
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Features
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Documentation
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
            <div className="border-t border-[#311c1c] mt-8 pt-8 text-center text-gray-500 text-sm">
              © 2025 N3 Security Suite. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
