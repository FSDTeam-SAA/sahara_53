import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/website/Common/sidebar";
import Footer from "@/components/website/Common/Footer";

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
      <div className="grid grid-cols-12">
        {/* Sidebar / Navbar */}
        <div className="col-span-2">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="col-span-10">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
