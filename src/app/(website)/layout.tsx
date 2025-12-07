import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/website/Common/sidebar";
import Footer from "@/components/website/Common/Footer";
import SideBar from "@/components/website/PageSections/HomePage/SideBar";
import LayoutVisibilityWrapper from "@/Providers/visibilityWraper";

export const metadata: Metadata = {
  title: "Services Services",
  description:
    "Elite craftsmanship in custom stone, tile, and masonry for homes & businesses across the Valley.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid grid-cols-12 relative">
        {/* Sidebar / Navbar */}
        <div className=" absolute md:fixed top-5 left-5 md:top-0 md:left-0 md:col-span-2 z-50 w-[312px]">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-10 md:ml-[312px] h-screen flex flex-col justify-between  w-full">
          <LayoutVisibilityWrapper>
            {children}
            {/* <Footer /> */}
          </LayoutVisibilityWrapper>
        </div>
      </div>
    </>
  );
}
