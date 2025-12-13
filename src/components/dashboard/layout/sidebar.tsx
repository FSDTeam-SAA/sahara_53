"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  BookOpen,
  CreditCard,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/books", label: "Books", icon: BookOpen },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[220px] bg-[#f3ecff] flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="relative">
          <span className="text-3xl">📚</span>
          <span className="absolute -top-1 -right-1 text-xs">✨</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-purple-600 text-lg leading-tight">
            Build
          </span>
          <span className="text-purple-400 text-sm italic">A Story Time</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 ">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-purple-100",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-white" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="mt-4">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-purple-100 w-full transition-all">
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </nav>

      {/* Promo Card */}
      <div className="px-4 pb-6">
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                fill="white"
                d="M0,100 Q50,50 100,100 T200,100 L200,200 L0,200 Z"
              />
            </svg>
          </div>
          <h3 className="font-bold text-lg relative z-10">
            Transform Memories
          </h3>
          <p className="text-sm opacity-90 mt-1 relative z-10">
            Into beautiful AI-illustrated books.
          </p>
        </div>
      </div>
    </aside>
  );
}
