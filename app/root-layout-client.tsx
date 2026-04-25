'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SidebarProvider } from '@/_components/ui/sidebar';
import SideBar from '@/_components/fixed-components/SideBar/SideBar';
import { SidebarInset } from '@/_components/ui/sidebar';
import ClientLayout from './client-layout';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const dashboardPages = ['/home', '/sensors', '/control', '/ai', '/prototype', '/reports', '/alerts'];
  const isDashboardPage = dashboardPages.includes(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(isDashboardPage);

  // Sync sidebar state with pathname
  useEffect(() => {
    setSidebarOpen(isDashboardPage);
  }, [isDashboardPage]);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SideBar />
      <SidebarInset>
        <ClientLayout>{children}</ClientLayout>
      </SidebarInset>
    </SidebarProvider>
  );
}
