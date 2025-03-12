"use client"
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Activity, Bug, LogOut, Shield } from 'lucide-react';
import Link from 'next/link';
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
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center space-x-4">
              {!isActive('/n3xus') && (
                <Button variant="outline" size="sm">
                  <Link href="/n3xus" className={`flex items-center gap-0.5`}>
                    {' '}
                    <Shield className={`text-cyan-500 h-4 w-4`} /> N3XUS{' '}
                  </Link>{' '}
                </Button>
              )}
              {!isActive('/n3rv') && (
                <Button variant="outline" size="sm">
                  <Link href="/n3rv" className={`flex items-center gap-0.5 `}>
                    <Activity className={`text-purple-500 h-4 w-4`} /> N3RV{' '}
                  </Link>{' '}
                </Button>
              )}
              {!isActive('/n3st') && (
                <Button variant="outline" size="sm">
                  <Link href="/n3st" className={`flex items-center gap-0.5 `}>
                    {' '}
                    <Bug className={`text-amber-500 h-4 w-4`} /> N3ST{' '}
                  </Link>{' '}
                </Button>
              )}
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <Button size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
