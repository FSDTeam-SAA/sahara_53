"use client";

import MyBooksTab from "./My-book";
import MyProfileTab from "./my-profile";

interface ProfileTabsProps {
  activeTab: "profile" | "books";
  onTabChange: (tab: "profile" | "books") => void;
}

export default function ProfileTabs({
  activeTab,
  onTabChange,
}: ProfileTabsProps) {
  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        <button
          onClick={() => onTabChange("profile")}
          className={`pb-3 font-medium transition-colors ${
            activeTab === "profile"
              ? "gradient-text border-b-2 border-pink-500"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          My Profile
        </button>

        <button
          onClick={() => onTabChange("books")}
          className={`pb-3 font-medium transition-colors ${
            activeTab === "books"
              ? "gradient-text border-b-2 border-pink-500"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          My Books
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && <MyProfileTab />}
      {activeTab === "books" && <MyBooksTab />}
    </div>
  );
}
