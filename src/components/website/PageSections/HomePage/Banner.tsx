"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section
      className="relative lg:grid lg:h-[70vh] m-6 lg:place-content-center
                 bg-[url('/images/hero.png')]
                 bg-cover bg-center"
    >
      <div className=" absolute inset-0 bg-black/30 "></div>
      {/* Content */}
      <div className="relative z-10 mx-auto   px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className=" text-start">
          <h1 className="text-4xl font-bold w-[60%] text-white sm:text-5xl lg:text-[60px] font-serif">
            writing Stories together, shared together
          </h1>
          <p className="mt-4 text-base text-gray-200 w-[60%] sm:text-lg/relaxed">
            Explore our premium iron and steel products with custom cutting,
            bending, and rebar services built for maximum performance, delivered
            with industrial precision, and tailored to your exact
            specifications.
          </p>
          <div className="mt-6 flex justify-start gap-4 flex-wrap">
            <Link
              href="#"
              className="inline-block rounded border gap-2 border-gray-200 bg-white/10 px-7 py-2 font-medium text-gray-200 shadow-sm transition-colors hover:bg-transparent hover:text-gray-900"
            >
              <p className="flex gap-2 w-full">

              <Image src={'/icon/noinfo.svg'} width={20} height={20} alt="noinfo" className=" object-cover" />
              How It works
              </p>
            </Link>
            <Link
              href="#"
              className="inline-block px-7 py-2 font-medium text-white transition-all"
              style={{
                borderRadius: "8px",
                background:
                  "var(--Gr, linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%))",
                boxShadow: "0 6px 12px 0 rgba(0, 0, 0, 0.12)",
              }}
            >
              
             + Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
