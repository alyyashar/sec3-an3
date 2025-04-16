"use client"

import { AppSidebar } from "@/components/app-sidebar"
import MainDashboard from "@/app/n3xus/dashboard/_components/main-dashboard"


export default function N3XUSDashboard() {
  return (
        <main className="flex-1 overflow-auto">
          <MainDashboard />
        </main>
  )
}

