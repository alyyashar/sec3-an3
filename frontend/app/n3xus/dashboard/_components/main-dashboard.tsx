'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertTriangle,
  CheckCircle,
  ClipboardList,
  Clock,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Upload,
  TrendingUp,
} from 'lucide-react';
import { AuditTimeline } from '@/app/n3xus/_components/audit-timeline';
import { RecentAudits } from '@/app/n3xus/_components/recent-audits';
import { ContractAuditTable } from '@/app/n3xus/dashboard/_components/auditTable';

export default function N3XUSDashboard() {
  const [auditData, setAuditData] = useState({
    totalAudits: 0,
    criticalIssues: 0,
    resolvedRate: 0,
    avgAuditTime: 0,
    recentAudits: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuditResults() {
      try {
        const response = await fetch('/api/scan/results'); // 🔥 FIXED API CALL
        if (!response.ok) throw new Error('Failed to fetch audit results');

        const results = await response.json();

        // Aggregate data from results
        const totalAudits = results.length;
        const criticalIssues = results.filter(
          (r: any) =>
            r.scan_results?.scanner_results?.summary?.severity_breakdown?.High >
            0
        ).length;
        const resolvedRate =
          totalAudits > 0
            ? Math.round(((totalAudits - criticalIssues) / totalAudits) * 100)
            : 0;
        const avgAuditTime = 3.2; // Placeholder for now

        setAuditData({
          totalAudits,
          criticalIssues,
          resolvedRate,
          avgAuditTime,
          recentAudits: results,
        });
      } catch (error) {
        console.error('Error fetching audit results:', error);
        setError('Failed to load audit results');
      } finally {
        setLoading(false);
      }
    }

    fetchAuditResults();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">N3XUS Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button
            className="bg-[#1e3a2f] text-[#68E06F] hover:bg-[#2a5040]"
            size="sm"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Contract
          </Button>
          <Button variant="outline" size="sm" className="border-[#333]">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {error && (
        <Card className="bg-red-900/20 border-red-800">
          <CardContent className="p-4 text-red-400">
            <AlertTriangle className="h-5 w-5 inline-block mr-2" />
            {error}
          </CardContent>
        </Card>
      )}

      {loading ? (
        <Card className="bg-[#121212] border-[#222]">
          <CardContent className="p-8 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-4 border-[#68E06F] border-t-transparent rounded-full mb-4"></div>
              <p className="text-gray-400">Loading audit results...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-[#121212] border border-[#333]">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#1e3a2f] data-[state=active]:text-[#68E06F]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-[#1e3a2f] data-[state=active]:text-[#68E06F]"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="vulnerabilities"
              className="data-[state=active]:bg-[#1e3a2f] data-[state=active]:text-[#68E06F]"
            >
              Vulnerabilities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-[#121212] border-[#222]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Audits
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                    <ClipboardList className="h-4 w-4 text-[#68E06F]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {auditData.totalAudits}
                  </div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                  <div className="mt-2 flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>+12% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#121212] border-[#222]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Critical Issues
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">
                    {auditData.criticalIssues}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Requiring attention
                  </p>
                  <div className="mt-2 flex items-center text-xs text-red-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>+5% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#121212] border-[#222]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Resolved
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">
                    {auditData.resolvedRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Resolution rate
                  </p>
                  <div className="mt-2 flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>+3% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#121212] border-[#222]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Audit Time
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                    <Clock className="h-4 w-4 text-[#68E06F]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {auditData.avgAuditTime}m
                  </div>
                  <p className="text-xs text-muted-foreground">Per contract</p>
                  <div className="mt-2 flex items-center text-xs text-green-500">
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                    <span>-15% from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-[#121212] border-[#222]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#68E06F]" />
                  Smart Contract Security Audit Results
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#333] h-8 gap-1"
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <ContractAuditTable audits={auditData.recentAudits} />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-[#121212] border-[#222]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#68E06F]" />
                    Recent Audits
                  </CardTitle>
                  <CardDescription>
                    Latest smart contract audits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentAudits audits={auditData.recentAudits} />
                </CardContent>
              </Card>

              <Card className="col-span-3 bg-[#121212] border-[#222]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#68E06F]" />
                    Audit Timeline
                  </CardTitle>
                  <CardDescription>Recent audit activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <AuditTimeline audits={auditData.recentAudits} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="bg-[#121212] border-[#222]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#68E06F]" />
                  Security Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 mx-auto text-gray-700 mb-4" />
                    <p className="text-gray-500 mb-2">Analytics coming soon</p>
                    <p className="text-sm text-gray-600 mb-4">
                      We're working on advanced analytics features
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-4">
            <Card className="bg-[#121212] border-[#222]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#68E06F]" />
                  Vulnerability Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {auditData.criticalIssues > 0 ? (
                  <div className="space-y-4">
                    <p className="text-red-400">
                      {auditData.criticalIssues} critical vulnerabilities
                      detected across your contracts
                    </p>
                    {/* You can add vulnerability details here */}
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="h-16 w-16 mx-auto text-green-700 mb-4" />
                      <p className="text-gray-500 mb-2">
                        No critical vulnerabilities found
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Your contracts are secure
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
