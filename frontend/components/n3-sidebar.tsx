"use client"

import {
  Shield,
  Activity,
  Bug,
  Home,
  FileSearch,
  Bell,
  Users,
  Settings,
  BarChart3,
  Wallet,
  HelpCircle,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const mainNavItems = [
  // {
  //   title: "Dashboard",
  //   icon: Home,
  //   href: "/dashboard",
  // },
  {
    title: "N3XUS",
    icon: Shield,
    href: "/n3xus",
    description: "Smart Contract Auditing",
  },
  {
    title: "N3RV",
    icon: Activity,
    href: "/n3rv",
    description: "Real-Time Monitoring",
  },
  {
    title: "N3ST",
    icon: Bug,
    href: "/n3st",
    description: "Red Team & Bug Bounty",
  },
]

const secondaryNavItems = [
  {
    title: "Reports",
    icon: FileSearch,
    href: "/reports",
  },
  {
    title: "Alerts",
    icon: Bell,
    href: "/alerts",
  },
  {
    title: "Team",
    icon: Users,
    href: "/team",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
]

const bottomNavItems = [
  {
    title: "Wallet",
    icon: Wallet,
    href: "/wallet",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/help",
  },
]

export function N3Sidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="text-white mx-auto pl-3">
      <SidebarHeader>
        <Link href={"/"} className="flex items-center gap-2 py-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#4ee2b5] to-[#2ec9ff]" />
          <div>
            <h1 className="text-lg font-bold text-white">N3</h1>
            <p className="text-xs text-zinc-400">Security Suite</p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href} className="">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* <div className="mt-8">
          <div className="px-4 mb-2">
            <h2 className="text-xs font-semibold text-zinc-400">Management</h2>
          </div>
          <SidebarMenu>
            {secondaryNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

