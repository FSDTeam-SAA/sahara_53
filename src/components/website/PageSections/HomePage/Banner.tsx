"use client";

import Link from "next/link";

export default function Banner() {
  return (
    <section
      className="relative lg:grid lg:h-[70vh] m-6 lg:place-content-center
                 bg-[url('/images/hero.png')]
                 bg-cover bg-center"
    >
      <div className=" absolute inset-0 bg-black/30 ">

      </div>
      {/* Content */}
      <div className="relative z-10 mx-auto   px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className=" text-start">
          <h1 className="text-4xl font-bold w-[60%] text-[#2B2B2B] sm:text-5xl lg:text-[60px] font-serif">
            Strength Meets Precision in Every Steel Solution for Your Projects
          </h1>
          <p className="mt-4 text-base text-gray-200 w-[60%] sm:text-lg/relaxed">
            Explore our premium iron and steel products with custom cutting,
            bending, and rebar services built for maximum performance, delivered
            with industrial precision, and tailored to your exact specifications.
          </p>
          <div className="mt-6 flex justify-start gap-4 flex-wrap">
            <Link
              href="#"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Get Started
            </Link>
            <Link
              href="#"
              className="inline-block rounded border border-gray-200 bg-white/10 px-5 py-3 font-medium text-gray-200 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
