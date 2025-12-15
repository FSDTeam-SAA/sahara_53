"use client";

import { CreateBookHeader } from "@/components/ReusableSection/page-header";
import ProfileTabs from "@/components/website/profile/profile-tabs";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "books">("profile");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <CreateBookHeader
        title="My"
        highlightedWord="Profile"
        subtitle="Manage your account settings and preferences "
      />

      <div className="px-6 py-8 max-w-full mx-auto">
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
