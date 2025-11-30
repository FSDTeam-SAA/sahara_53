// components/auth/AuthReusable.tsx
import Image from "next/image";
import React, { ReactNode } from "react";

interface AuthReusableProps {
  children: ReactNode;
}

export default function AuthReusable({ children }: AuthReusableProps) {
  return (
   <section className='relative min-h-screen w-full flex-col gap-10 bg-cover bg-center bg-[url("/images/auth.jpg")]  flex items-center justify-center p-4'>
  

  <div className="absolute inset-0 bg-black/20"></div>

  {/* Content (children) */}
      <Image  src={'/images/logo.png'} alt="logo" width={120} height={100} className=" object-cover "/>

  <div className="relative w-full max-w-xl z-10">
    {children}
  </div>
</section>


  );
}
