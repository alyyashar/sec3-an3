"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  BarChart2,
  Shield,
  AlertTriangle,
  CheckCircle,
  Code,
  Clock,
  FileText,
  Wallet,
  Settings,
  HelpCircle,
  Upload,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarItem {
  icon: React.ElementType
  href: string
  label: string
  badge?: number
  isActive?: (pathname: string) => boolean
}

export function IconSidebar() {
  const pathname = usePathname()

  const securityTools: SidebarItem[] = [
    {
      icon: BarChart2,
      href: "/n3xus",
      label: "Dashboard",
      isActive: (path) => path === "/n3xus" || path === "/n3xus/dashboard",
    },
    {
      icon: Shield,
      href: "/n3xus/security-portal",
      label: "Security Portal",
    },
    {
      icon: AlertTriangle,
      href: "/n3xus/vulnerabilities",
      label: "Vulnerabilities",
      badge: 23,
    },
    {
      icon: CheckCircle,
      href: "/n3xus/resolved-issues",
      label: "Resolved Issues",
    },
    {
      icon: Code,
      href: "/n3xus/auto-patch",
      label: "Auto-Patch",
    },
    {
      icon: Clock,
      href: "/n3xus/audit-history",
      label: "Audit History",
    },
    {
      icon: FileText,
      href: "/n3xus/reports",
      label: "Reports",
    },
    {
      icon: Upload,
      href: "/n3xus/upload-contract",
      label: "Upload Contract",
    },
  ]

  const accountItems: SidebarItem[] = [
    {
      icon: Wallet,
      href: "/n3xus/wallet",
      label: "Wallet",
    },
    {
      icon: Settings,
      href: "/n3xus/settings",
      label: "Settings",
    },
    {
      icon: HelpCircle,
      href: "/n3xus/help",
      label: "Help",
    },
  ]

  return (
    <TooltipProvider delayDuration={300}>
      <div className="h-screen w-16 bg-[#0a0a0a] border-r border-[#222] flex flex-col items-center py-4">
        <div className="mb-8">
          <Link href="/" className="flex items-center justify-center">
            <div className="h-10 w-10 rounded-md bg-[#1e3a2f] flex items-center justify-center">
              <Shield className="h-6 w-6 text-[#68E06F]" />
            </div>
          </Link>
        </div>

        <div className="flex-1 w-full space-y-1 px-2">
          {securityTools.map((item) => {
            const isActive = item.isActive ? item.isActive(pathname) : pathname === item.href

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex h-10 w-10 mx-auto items-center justify-center rounded-md transition-colors",
                      isActive ? "bg-[#1e3a2f] text-[#68E06F]" : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.badge && (
                      <span className="absolute top-0 right-0 h-4 w-4 text-[10px] font-medium rounded-full bg-red-600 text-white flex items-center justify-center">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="border-[#333] bg-[#1a1a1a] text-white">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        <div className="w-full space-y-1 px-2 pt-4 border-t border-[#222]">
          {accountItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-10 w-10 mx-auto items-center justify-center rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-[#1e3a2f] text-[#68E06F]"
                      : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="border-[#333] bg-[#1a1a1a] text-white">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-9 w-9 rounded-full bg-[#1e3a2f] flex items-center justify-center cursor-pointer">
                <span className="text-[#68E06F] text-sm font-medium">JD</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="border-[#333] bg-[#1a1a1a] text-white">
              John Doe
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
