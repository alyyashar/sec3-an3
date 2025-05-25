import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-[#0a0a0a] min-w-[100vw]">{children}</div>
}
