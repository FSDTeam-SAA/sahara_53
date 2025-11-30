// components/auth/AuthReusable.tsx
import Image from "next/image";
import React, { ReactNode } from "react";

interface AuthReusableProps {
  children: ReactNode;
}

export default function AuthReusable({ children }: AuthReusableProps) {
  return (
   <section className='relative min-h-screen overflow-hidden w-full   bg-cover bg-center  flex justify-center'>
  

  <div className="absolute inset-0 w-full min-h-screen opacity-20">
   <Image src={'/images/auth.jpg'} alt="bg-image" width={3000} height={1500} className=" object-cover bg-center w-full h-full"/>
  </div>

  {/* Content (children) */}
  <div className="flex flex-col justify-evenly items-center">

  <div className="">

      <Image  src={'/images/authlogo.svg'} alt="logo" width={120} height={100} className=" object-cover "/>
  </div>

  <div className="relative w-[80%] mx-auto md:w-full max-w-xl z-10">
    {children}
  </div>
  </div>
</section>


  );
}
