"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuItem, ResponsiveMenuProps } from "@/lib/type/navbar";
import { usePathname } from "next/navigation";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function SideMenu({
  menuItems,
  logo,
  contactLink,
}: ResponsiveMenuProps) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <nav className="relative md:h-screen md:bg-[#EFEFFD] transition-all duration-300">
      <div className="container mx-auto px-4 md:px-0 flex flex-col justify-between items-center py-4 md:py-8 h-full">
        {/* Logo - Desktop */}
        <div className="hidden md:block mb-8">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={120}
              height={100}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Logo - Mobile (Optional, currently hidden based on design) */}
        <div className="md:hidden w-full flex justify-between items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={80}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-col flex-1 w-full px-4 gap-4">
          {/* Top menu items */}
          <div className="flex flex-col space-y-2 font-medium">
            {menuItems.map((item: MenuItem) => {
              const active = isItemActive(item.href);

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex gap-3 items-center px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 ${
                      active
                        ? "text-white font-semibold shadow-md"
                        : "hover:bg-white/50 text-gray-600 hover:text-primary"
                    }`}
                    style={
                      active
                        ? {
                            background:
                              "linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%)",
                          }
                        : {}
                    }
                  >
                    {item.icon && (
                      <div
                        className={`relative w-5 h-5 ${active ? "brightness-0 invert" : ""}`}
                      >
                        <Image
                          src={item.icon}
                          alt={item.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Bottom section (Contact) */}
          {contactLink && (
            <Link href={contactLink}>
              <div
                className="py-6 px-4 rounded-xl cursor-pointer mt-4 transform hover:scale-[1.02] transition-transform"
                style={{
                  background:
                    "linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%)",
                }}
              >
                <h2 className="text-xl md:text-2xl text-white mb-2 font-bold font-serif leading-tight">
                  Transform Memories
                </h2>
                <p className="text-sm text-white/90">
                  Into beautiful Ai-illustrated books.
                </p>
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden absolute top-4 right-4 z-50">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                aria-label="Toggle menu"
                className="border-primary/20 bg-white/80 backdrop-blur-sm"
              >
                {open ? (
                  <X className="w-6 h-6 text-primary" />
                ) : (
                  <Menu className="w-6 h-6 text-primary" />
                )}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[300px] sm:w-[350px] p-0 border-r-0"
            >
              <VisuallyHidden.Root>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigation Menu</SheetDescription>
              </VisuallyHidden.Root>

              <div className="flex flex-col h-full bg-[#EFEFFD] overflow-y-auto">
                <div className="p-6 flex justify-center">
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Image
                      src={logo}
                      alt="logo"
                      width={100}
                      height={80}
                      className="object-contain"
                    />
                  </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                  {menuItems.map((item: MenuItem) => {
                    const active = isItemActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                      >
                        <div
                          className={`flex gap-3 items-center px-4 py-3 rounded-lg font-medium transition-all ${
                            active
                              ? "text-white shadow-md"
                              : "text-gray-700 hover:bg-white/50"
                          }`}
                          style={
                            active
                              ? {
                                  background:
                                    "linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%)",
                                }
                              : {}
                          }
                        >
                          {item.icon && (
                            <div
                              className={`relative w-5 h-5 ${active ? "brightness-0 invert" : ""}`}
                            >
                              <Image
                                src={item.icon}
                                alt={item.label}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          {item.label}
                        </div>
                      </Link>
                    );
                  })}
                </nav>

                {contactLink && (
                  <div className="p-4 mt-4">
                    <Link href={contactLink} onClick={() => setOpen(false)}>
                      <div
                        className="p-6 rounded-xl text-center"
                        style={{
                          background:
                            "linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%)",
                        }}
                      >
                        <h2 className="text-xl font-bold text-white mb-1">
                          Transform Memories
                        </h2>
                        <p className="text-sm text-white/90">
                          Into beautiful Ai-illustrated books.
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
