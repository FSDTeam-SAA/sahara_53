"use client";

import type React from "react";

import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#faf9fb]">
      <Sidebar />
      <main className="ml-[220px] p-6">{children}</main>
    </div>
  );
}
