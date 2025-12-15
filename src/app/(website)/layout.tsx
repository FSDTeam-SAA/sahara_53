import type { Metadata } from "next";
import "../globals.css";
import SideBar from "@/components/website/PageSections/HomePage/SideBar";
import LayoutVisibilityWrapper from "@/Providers/visibilityWraper";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Elite craftsmanship in custom stone, tile, and masonry for homes & businesses across the Valley.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen relative bg-[#EFEFFD]">
      {/* Sidebar / Navbar */}
      {/* Mobile: Sticky top, Full width. Desktop: Fixed left, specific width */}
      <aside className="w-full md:w-[280px] lg:w-[312px] md:fixed md:top-0 md:left-0 md:h-screen z-50 ">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full md:ml-[280px] lg:ml-[312px] min-h-screen transition-all duration-300  bg-white">
        <LayoutVisibilityWrapper>
          <div className="w-full">{children}</div>
        </LayoutVisibilityWrapper>
      </main>
    </div>
  );
}
