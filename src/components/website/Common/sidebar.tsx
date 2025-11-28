"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "/", label: "Books" ,idon:"" },
    { href: "/search-book", label: "Search Book" },
    { href: "/how-it-work", label: "How It Works" },
    { href: "/create-book", label: "Create Book" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/my-order", label: "My Orders" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? "bg-[#EFEFFD] backdrop-opacity-90 shadow-md"
          : "bg-transparent backdrop-grayscale"
      }`}
    >
      <div className="container mx-auto px-8 flex flex-col justify-between items-center py-4">
        {/* Logo */}
        <div className="flex  items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Menu Items */}
        <div
          className={`hidden md:flex md:flex-col space-y-8 h-screen font-medium transition-colors duration-300 ${
            scrolled ? "text-[#6C757D]" : "text-primary"
          }`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:underline hover:font-semibold transition-all duration-200 ${
                scrolled ? "hover:text-gray-200" : "hover:text-primary/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="">
          <Link href="/contact-us">
            <Button
              variant="outline"
              className="w-35  text-white bg-[#CA9520] rounded-lg font-medium
                             transition-all duration-300
                             group-hover:bg-[#CA9520] cursor-pointer group-hover:text-black "
            >
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                className="text-gray-500 bg-white hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {open ? <X size={28} /> : <Menu size={28} />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-6 mt-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-gray-700 px-5 hover:underline font-medium text-lg hover:text-primary hover:font-semibold transition-all duration-200 py-2"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
