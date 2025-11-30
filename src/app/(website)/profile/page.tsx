"use client"

import ProfileTabs from "@/components/website/profile/profile-tabs"
import { useState } from "react"


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "books">("profile")

  return (
    <div className="min-h-screen bg-background">
 
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
