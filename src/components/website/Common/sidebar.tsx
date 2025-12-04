"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuItem, ResponsiveMenuProps } from "@/lib/type/navbar";
import { usePathname } from "next/navigation";

export default function SideMenu({
  menuItems,
  logo,
  contactLink,
}: ResponsiveMenuProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname(); // <-- reliable current path

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="static top-0 z-50 transition-all min-h-screen  duration-300  md:bg-[#EFEFFD] ">
      <div className="container mx-auto px-8 flex flex-col justify-between  items-center py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={96}
            height={80}
            className=" object-cover hidden md:block"
          />
        </Link>

        {/* Desktop Menu */}
 <div className="hidden md:flex md:flex-col h-[80vh] justify-between">
  {/* Top menu items */}
  <div className="flex flex-col space-y-6 font-medium transition-colors duration-300">
    {menuItems.map((item: MenuItem) => {
      const active = isItemActive(item.href);

      return (
        <Link key={item.href} href={item.href}>
          <div
            className={`flex gap-2 items-center px-3 py-2 cursor-pointer transition-all duration-200 ${
              active ? "text-white font-semibold" : "hover:text-primary/70"
            }`}
            style={
              active
                ? {
                    borderRadius: "4px",
                    background: "linear-gradient(90deg,#FF7CE5 0%,#5D5FEF 100%)",
                  }
                : {}
            }
          >
            {item.icon && <Image src={item.icon} alt={item.label} width={22} height={22} />}
            {item.label}
          </div>
        </Link>
      );
    })}
  </div>

  {/* Bottom section sticks here */}
  {contactLink && (
    <Link href={contactLink}>
      <div
        className="p-4 rounded-lg cursor-pointer m-2"
        style={{
          borderRadius: "8px",
          background: "linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%)",
        }}
      >
        <h2 className="text-base md:text-2xl text-white font-semibold">
          Transform Memories
        </h2>
        <p className="text-[14px] leading-tight text-white">
          Into beautiful Ai-illustrated books.
        </p>
      </div>
    </Link>
  )}
</div>



        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={`${open ? ' absolute right-16  top-3' : 'absolute -right-16  top-3'}`} asChild>
              <Button
                aria-label="Toggle menu"
                className="text-gray-500 bg-white"
              >
                {open ? <X size={28} /> : <Menu size={28} />}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] flex justify-between sm:w-[400px] md:hidden"
            >
              <nav className="flex flex-col  space-y-6 mt-20">
                {menuItems.map((item: MenuItem) => {
                  const active = isItemActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                    >
                      <div
                        className="text-gray-700 px-5 py-2 font-medium text-lg transition-all duration-200 hover:text-primary hover:underline rounded-md"
                        style={
                          active
                            ? {
                                borderRadius: "4px",
                                background:
                                  "linear-gradient(90deg,#FF7CE5 0%,#5D5FEF 100%)",
                                color: "white",
                              }
                            : {}
                        }
                      >
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
              </nav>
              {contactLink && (
                <Link href={contactLink}>
                  <div
                    className="p-4 rounded-lg cursor-pointer mb-15 mx-5"
                    style={{
                      borderRadius: "8px",
                      background:
                        "linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%)",
                    }}
                  >
                    <h2 className="text-base md:text-2xl text-white font-semibold">
                      Transform Memories
                    </h2>
                    <p className="text-[14px] leading-tight text-white">
                      Into beautiful Ai-illustrated books.
                    </p>
                  </div>
                </Link>
              )}
            </SheetContent>
          </Sheet>
          {/* Contact Button */}
        </div>
      </div>
    </nav>
  );
}
