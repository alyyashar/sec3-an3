"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Shield, Activity, Bug, Search, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ProductNavbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <div className="h-16 border-b border-[#222] bg-[#121212] flex items-center justify-between px-4">
      <div className="flex items-center space-x-6">
        <div className="text-xl font-bold">N3XUS</div>

        <div className="flex items-center space-x-1">
          <Link href="/n3xus">
            <Button
              variant="ghost"
              className={cn(
                "h-9 px-4 gap-2",
                isActive("/n3xus") ? "bg-[#1e3a2f] text-[#68E06F]" : "text-gray-400 hover:text-white",
              )}
            >
              <Shield className="h-4 w-4" />
              <span>N3XUS</span>
            </Button>
          </Link>

          <Link href="/n3rv">
            <Button
              variant="ghost"
              className={cn(
                "h-9 px-4 gap-2",
                isActive("/n3rv") ? "bg-[#2a1f40] text-[#a36bfd]" : "text-gray-400 hover:text-white",
              )}
            >
              <Activity className="h-4 w-4" />
              <span>N3RV</span>
            </Button>
          </Link>

          <Link href="/n3st">
            <Button
              variant="ghost"
              className={cn(
                "h-9 px-4 gap-2",
                isActive("/n3st") ? "bg-[#3d2807] text-[#f59e0b]" : "text-gray-400 hover:text-white",
              )}
            >
              <Bug className="h-4 w-4" />
              <span>N3ST</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
