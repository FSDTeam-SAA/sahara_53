// components/auth/AuthReusable.tsx
import Image from "next/image";
import React, { ReactNode } from "react";

interface AuthReusableProps {
  children: ReactNode;
}

export default function AuthReusable({ children }: AuthReusableProps) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <Image
          src="/images/auth.jpg"
          alt="bg-image"
          width={3000}
          height={1500}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-4">
        
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="logo"
          width={220}
          height={120}
          className="object-contain"
        />

        {/* Form */}
        <div className="w-[80%] md:w-full max-w-xl">
          {children}
        </div>

      </div>
    </section>
  );
}
