"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { MainDashboard } from "@/components/main-dashboard"


export default function N3XUSDashboard() {
  return (
   <div className="flex h-screen bg-background w-svw">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <MainDashboard />
        </main>
      </div>
  )
}

