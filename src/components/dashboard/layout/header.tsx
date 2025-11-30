"use client"

import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({
  title,
  subtitle = "Welcome back! Here's what's happening with your app today.",
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-purple-600">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-green-400">
            <AvatarImage src="/olivia-rhye-avatar.jpg" />
            <AvatarFallback>OR</AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Olivia Rhye</p>
            <p className="text-xs text-gray-500">olivia@untitledui.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}
