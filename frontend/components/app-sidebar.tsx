'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Shield,
  Zap,
  Server,
  Wallet,
  Settings,
  HelpCircle,
  ChevronDown,
  Upload,
  FileText,
  History,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Code,
  Search,
  Bell,
  Activity,
  Users,
  Target,
  Award,
  DollarSign,
  LogOut,
  Moon,
  Sun,
  Bug,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

export function AppSidebar() {
  const pathname = usePathname();
  const [n3xusOpen, setN3xusOpen] = useState(true);
  const [n3rvOpen, setN3rvOpen] = useState(false);
  const [n3stOpen, setN3stOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isActive = (path : string) => pathname.includes(path);

  return (
    <Sidebar variant="floating" className="border-r-0">
      <SidebarHeader className="p-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md">
            <span className="font-bold text-white text-lg">N3</span>
          </div>
          <div className="flex flex-col">
          <span className="font-semibold text-lg" style={{ fontFamily: 'Rajdhani' }}>
  N3XUS
</span>
            <span className="text-xs text-muted-foreground">v1.2.0</span>
          </div>
        </div>
      </SidebarHeader>

      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>

      <SidebarContent>
        <div className="px-3 py-2">
          <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground">
            SECURITY TOOLS
          </h3>
        </div>

        <SidebarMenu>
          {isActive('/n3xus') && (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton className={'!bg-primary/10 !cursor-default'}>
                  <Shield className={`text-cyan-500`} />
                  <span>N3XUS</span>
                  <div className="ml-auto flex items-center">
                    <span className="mr-2 rounded-full bg-primary/20 px-1.5 py-0.5 text-xs font-medium text-primary">
                      New
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3xus/dashboard"
                      className={
                        isActive('/n3xus/dashboard')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3xus/upload-contract"
                      className={
                        isActive('/n3xus/upload-contract')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Contract</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                {/* <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3xus/contract-address"
                      className={
                        isActive('/n3xus/contract-address')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <Search className="h-4 w-4" />
                      <span>Contract Address</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem> */}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3xus/vulnerabilities"
                      className={
                        isActive('/n3xus/vulnerabilities')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <span>Vulnerabilities</span>
                      <span className="ml-auto rounded-full bg-red-500/20 px-1.5 py-0.5 text-xs font-medium text-red-500">
                        23
                      </span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3xus/resolved-issues"
                      className={
                        isActive('/n3xus/resolved-issues')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Resolved Issues</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3xus/auto-patch"
                      className={
                        isActive('/n3xus/auto-patch')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <Code className="h-4 w-4" />
                      <span>Auto-Patch</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3xus/audit-history"
                      className={
                        isActive('/n3xus/audit-history')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <History className="h-4 w-4" />
                      <span>Audit History</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3xus/reports"
                      className={
                        isActive('/n3xus/reports')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <FileText className="h-4 w-4" />
                      <span>Reports</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3xus/security-portal"
                      className={
                        isActive('/n3xus/security-portal')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <Shield className="h-4 w-4" />
                      <span>Security Portal</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </>
          )}
          {isActive('/n3rv') && (
            <>
              <SidebarMenuItem>
              <SidebarMenuButton className={'!bg-primary/10 !cursor-default'}>
              <Activity className={`text-purple-500`} />
                  <span>N3RV</span>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3rv"
                      className={
                        isActive('/n3rv')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3rv/contracts"
                      className={
                        isActive('/n3rv/contracts')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <Server className="h-4 w-4" />
                      <span>Monitored Contracts</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3rv/alerts"
                      className={
                        isActive('/n3rv/alerts')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <Bell className="h-4 w-4" />
                      <span>Alerts</span>
                      <span className="ml-auto rounded-full bg-orange-500/20 px-1.5 py-0.5 text-xs font-medium text-orange-500">
                        5
                      </span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3rv/bots"
                      className={
                        isActive('/n3rv/bots')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <Zap className="h-4 w-4" />
                      <span>Forta Bots</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3rv/analytics"
                      className={
                        isActive('/n3rv/analytics')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <Activity className="h-4 w-4" />
                      <span>Analytics</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </>
          )}

          {isActive('/n3st') && (
            <>
              <SidebarMenuItem>
              <SidebarMenuButton className={'!bg-primary/10 !cursor-default'}>
              <Bug className={`text-amber-500`} />
                  <span>N3ST</span>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3st"
                      className={
                        isActive('/n3st')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3st/bounties"
                      className={
                        isActive('/n3st/bounties')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <Award className="h-4 w-4" />
                      <span>Bug Bounties</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3st/researchers"
                      className={
                        isActive('/n3st/researchers')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <Users className="h-4 w-4" />
                      <span>Researchers</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3st/submissions"
                      className={
                        isActive('/n3st/submissions')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <FileText className="h-4 w-4" />
                      <span>Submissions</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href="/n3st/rewards"
                      className={
                        isActive('/n3st/rewards')
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }
                    >
                      <DollarSign className="h-4 w-4" />
                      <span>Rewards</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </>
          )}
        </SidebarMenu>
        <div className="px-3 py-1 mt-2">
          <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground">
            ACCOUNT
          </h3>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/wallet"
                className={
                  isActive('/wallet')
                    ? 'bg-primary/10 text-primary font-medium'
                    : ''
                }
              >
                <Wallet className="h-4 w-4" />
                <span>Wallet</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/settings"
                className={
                  isActive('/settings')
                    ? 'bg-primary/10 text-primary font-medium'
                    : ''
                }
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/help"
                className={
                  isActive('/help')
                    ? 'bg-primary/10 text-primary font-medium'
                    : ''
                }
              >
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-primary/10 text-primary">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">
                john@example.com
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
