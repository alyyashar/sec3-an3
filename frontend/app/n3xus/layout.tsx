"use client"
import { IconSidebar } from "@/components/n3xus-sidebar";
import { ProductNavbar } from "@/components/product-navbar";
import { usePathname } from 'next/navigation';
import type React from 'react';
export default function N3XUSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path : string) => pathname.includes(path);

  return (
    <div className="flex h-screen bg-background w-svw">
      <IconSidebar />
      <main className="flex-1 overflow-auto">
        <ProductNavbar />
        {children}
      </main>
    </div>
  );
}
