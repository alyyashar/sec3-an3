import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Shield, Activity, Bug, ArrowRight, Check, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white w-svw">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#333]">
        <div className="container mx-auto px-6 py-6">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span className="text-sm text-gray-400">Back to Home</span>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Our Security Solutions</h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Comprehensive blockchain security tools designed to protect your digital assets and smart contracts
          </p>
        </div>
      </div>

      {/* Solutions Tabs */}
      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-12">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#333] data-[state=active]:text-white">
              All Solutions
            </TabsTrigger>
            <TabsTrigger value="n3xus" className="data-[state=active]:bg-[#1e3a2f] data-[state=active]:text-[#4ee2b5]">
              N3XUS
            </TabsTrigger>
            <TabsTrigger value="n3rv" className="data-[state=active]:bg-[#2a1f40] data-[state=active]:text-[#a36bfd]">
              N3RV
            </TabsTrigger>
            <TabsTrigger value="n3st" className="data-[state=active]:bg-[#3d2807] data-[state=active]:text-[#f59e0b]">
              N3ST
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SolutionCard
                title="N3XUS"
                icon={Shield}
                iconColor="text-[#4ee2b5]"
                bgColor="bg-[#0f2620]"
                buttonBgColor="bg-[#1e3a2f]"
                buttonTextColor="text-[#4ee2b5]"
                buttonHoverColor="hover:bg-[#2a5040]"
                description="Smart contract auditing with AI-powered verification and real-time reporting"
                features={[
                  "Automated vulnerability scanning",
                  "AI-enhanced verification",
                  "PDF report generation",
                  "Auto-patch suggestions",
                  "Real-time monitoring",
                ]}
                link="/n3xus"
              />

              <SolutionCard
                title="N3RV"
                icon={Activity}
                iconColor="text-[#a36bfd]"
                bgColor="bg-[#231a36]"
                buttonBgColor="bg-[#2a1f40]"
                buttonTextColor="text-[#a36bfd]"
                buttonHoverColor="hover:bg-[#352650]"
                description="Real-time monitoring engine for blockchain events and anomaly detection"
                features={[
                  "Event monitoring",
                  "Anomaly detection",
                  "Multi-channel alerts",
                  "Custom alert rules",
                  "Historical data analysis",
                ]}
                link="/n3rv"
              />

              <SolutionCard
                title="N3ST"
                icon={Bug}
                iconColor="text-[#f59e0b]"
                bgColor="bg-[#2e1e05]"
                buttonBgColor="bg-[#3d2807]"
                buttonTextColor="text-[#f59e0b]"
                buttonHoverColor="hover:bg-[#4d3209]"
                description="Community-driven red team and bug bounty platform"
                features={[
                  "Bug bounty programs",
                  "Token rewards",
                  "Community challenges",
                  "Leaderboards",
                  "Security researcher network",
                ]}
                link="/n3st"
              />
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-8 border border-[#333]">
              <h2 className="text-2xl font-bold mb-6">Compare Solutions</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#333]">
                      <th className="text-left py-4 px-4">Feature</th>
                      <th className="text-center py-4 px-4">
                        <div className="flex flex-col items-center">
                          <Shield className="h-6 w-6 text-[#4ee2b5] mb-2" />
                          <span>N3XUS</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4">
                        <div className="flex flex-col items-center">
                          <Activity className="h-6 w-6 text-[#a36bfd] mb-2" />
                          <span>N3RV</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4">
                        <div className="flex flex-col items-center">
                          <Bug className="h-6 w-6 text-[#f59e0b] mb-2" />
                          <span>N3ST</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#333]">
                      <td className="py-4 px-4">Smart Contract Auditing</td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-[#4ee2b5] mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-[#333]">
                      <td className="py-4 px-4">Real-time Monitoring</td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-[#a36bfd] mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-[#333]">
                      <td className="py-4 px-4">Bug Bounty Platform</td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-[#f59e0b] mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-[#333]">
                      <td className="py-4 px-4">AI-Powered Analysis</td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-[#4ee2b5] mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-[#a36bfd] mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-[#333]">
                      <td className="py-4 px-4">PDF Report Generation</td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-[#4ee2b5] mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4">Community Features</td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-gray-500 mx-auto" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <CheckCircle className="h-5 w-5 text-[#f59e0b] mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="n3xus" className="space-y-8">
            <div className="bg-[#0f2620] rounded-xl p-8 border border-[#1e3a2f]">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-10 w-10 text-[#4ee2b5]" />
                <h2 className="text-3xl font-bold">N3XUS</h2>
              </div>

              <p className="text-xl text-gray-300 mb-8">
                Advanced smart contract auditing platform with AI-powered verification and real-time reporting
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#4ee2b5]">Key Features</h3>
                  <ul className="space-y-3">
                    {[
                      "Automated vulnerability scanning",
                      "AI-enhanced verification",
                      "PDF report generation",
                      "Auto-patch suggestions",
                      "Real-time monitoring",
                      "Security score metrics",
                      "Historical audit tracking",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-[#4ee2b5] mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#4ee2b5]">Use Cases</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                      <h4 className="font-medium mb-2">Pre-deployment Auditing</h4>
                      <p className="text-gray-400 text-sm">
                        Verify smart contracts before deployment to production networks
                      </p>
                    </div>
                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                      <h4 className="font-medium mb-2">Continuous Monitoring</h4>
                      <p className="text-gray-400 text-sm">Ongoing security checks for deployed contracts</p>
                    </div>
                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                      <h4 className="font-medium mb-2">Vulnerability Remediation</h4>
                      <p className="text-gray-400 text-sm">AI-powered suggestions to fix identified security issues</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/n3xus">
                <Button className="bg-[#1e3a2f] text-[#4ee2b5] hover:bg-[#2a5040] px-6 py-6 text-lg">
                  Access N3XUS
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="n3rv" className="space-y-8">
            <div className="bg-[#231a36] rounded-xl p-8 border border-[#2a1f40]">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="h-10 w-10 text-[#a36bfd]" />
                <h2 className="text-3xl font-bold">N3RV</h2>
              </div>

              <p className="text-xl text-gray-300 mb-8">
                Real-time monitoring engine for blockchain events and anomaly detection
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#a36bfd]">Key Features</h3>
                  <ul className="space-y-3">
                    {[
                      "Event monitoring",
                      "Anomaly detection",
                      "Multi-channel alerts",
                      "Custom alert rules",
                      "Historical data analysis",
                      "Real-time dashboards",
                      "Integration with popular platforms",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-[#a36bfd] mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#a36bfd]">Use Cases</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                      <h4 className="font-medium mb-2">DeFi Protocol Monitoring</h4>
                      <p className="text-gray-400 text-sm">Track unusual activities in liquidity pools and trading</p>
                    </div>
                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                      <h4 className="font-medium mb-2">Whale Movement Tracking</h4>
                      <p className="text-gray-400 text-sm">Monitor large transactions that could impact markets</p>
                    </div>
                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                      <h4 className="font-medium mb-2">Security Incident Response</h4>
                      <p className="text-gray-400 text-sm">Immediate alerts when suspicious activities are detected</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/n3rv">
                <Button className="bg-[#2a1f40] text-[#a36bfd] hover:bg-[#352650] px-6 py-6 text-lg">
                  Access N3RV
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="n3st" className="space-y-8">
            <div className="bg-[#2e1e05] rounded-xl p-8 border border-[#3d2807]">
              <div className="flex items-center gap-3 mb-6">
                <Bug className="h-10 w-10 text-[#f59e0b]" />
                <h2 className="text-3xl font-bold">N3ST</h2>
              </div>

              <p className="text-xl text-gray-300 mb-8">Community-driven red team and bug bounty platform</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#f59e0b]">Key Features</h3>
                  <ul className="space-y-3">
                    {[
                      "Bug bounty programs",
                      "Token rewards",
                      "Community challenges",
                      "Leaderboards",
                      "Security researcher network",
                      "Vulnerability disclosure platform",
                      "Reward distribution system",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-[#f59e0b] mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#f59e0b]">Use Cases</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                      <h4 className="font-medium mb-2">Protocol Bug Bounties</h4>
                      <p className="text-gray-400 text-sm">Incentivize security researchers to find vulnerabilities</p>
                    </div>
                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                      <h4 className="font-medium mb-2">Security Competitions</h4>
                      <p className="text-gray-400 text-sm">Time-limited challenges to test security measures</p>
                    </div>
                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                      <h4 className="font-medium mb-2">Community Engagement</h4>
                      <p className="text-gray-400 text-sm">Build a network of security professionals and enthusiasts</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/n3st">
                <Button className="bg-[#3d2807] text-[#f59e0b] hover:bg-[#4d3209] px-6 py-6 text-lg">
                  Access N3ST
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
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
              <Link href="/about" className="text-gray-400 hover:text-white">
                About
              </Link>
              <Link href="/solutions" className="text-gray-400 hover:text-white">
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
          <div className="border-t border-[#333] mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2025 N3 Security Suite. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

interface SolutionCardProps {
  title: string
  icon: React.ElementType
  iconColor: string
  bgColor: string
  buttonBgColor: string
  buttonTextColor: string
  buttonHoverColor: string
  description: string
  features: string[]
  link: string
}

function SolutionCard({
  title,
  icon: Icon,
  iconColor,
  bgColor,
  buttonBgColor,
  buttonTextColor,
  buttonHoverColor,
  description,
  features,
  link,
}: SolutionCardProps) {
  return (
    <Card className={`border-none rounded-xl overflow-hidden ${bgColor}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-white text-2xl">
          <Icon className={`w-6 h-6 ${iconColor}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-6">{description}</p>
        <ul className="space-y-3 text-gray-400 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={`h-5 w-5 ${iconColor} mr-2 mt-0.5 flex-shrink-0`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={link}>
          <Button className={`w-full ${buttonBgColor} ${buttonTextColor} ${buttonHoverColor}`}>
            Learn More
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
