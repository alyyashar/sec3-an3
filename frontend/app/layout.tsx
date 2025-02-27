import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { N3Sidebar } from "@/components/n3-sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex h-screen bg-[#161717] w-svw">
            <N3Sidebar />
            <main className="flex-1 overflow-auto ">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
