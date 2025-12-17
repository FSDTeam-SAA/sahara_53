"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({
  title,
  subtitle = "Welcome back! Here's what's happening with your app today.",
}: HeaderProps) {
  const { data: session } = useSession();
  const user = session?.user?.name;
  const useremail = session?.user?.email;

  const initials =
    user
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() ?? "U";

  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-purple-600">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-green-400">
            <AvatarImage src="/olivia-rhye-avatar.jpg" />

            <AvatarImage src="/olivia-rhye-avatar.jpg" />

            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {user ?? "Sahara"}
            </p>

            <p className="text-xs text-gray-500">
              {useremail ?? "m.hilly1972@gmail.com"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
