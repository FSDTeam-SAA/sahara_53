"use client";

import React from "react";

const steps = [
  { label: "Details" },
  { label: "Face" },
  { label: "Story" },
  { label: "Voice" },
];

export default function CreateBookStep({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-between w-[90%] md:w-1/2 mx-auto mt-6">
      {steps.map((item, index) => {
        const isCompleted = index <= step; //  gives gradient to all previous
        const isActive = index === step;

        return (
          <div key={index} className="flex items-center md:w-full md:w-full  mx-auto ">
            {/* STEP CIRCLE + LABEL */}
            <div className="flex flex-col items-center">
              {/* Number Circle */}
              <div
                className={`
                  w-10 h-10 flex items-center justify-center rounded-full border 
                  text-sm font-semibold
                  ${isCompleted
                    ? "bg-linear-to-r from-[#FF7CE5] to-[#5D5FEF] text-white border-transparent"
                    : "bg-white border-gray-300 text-gray-700"}
                `}
              >
                {index + 1}
              </div>

              {/* Step Label */}
              <span
                className={`
                  mt-2 text-sm
                  ${isActive ? "text-[#5D5FEF] font-medium" : "text-gray-600"}
                `}
              >
                {item.label}
              </span>
            </div>

            {/* Line (except last) */}
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4
                  ${isCompleted ? "bg-linear-to-r from-[#FF7CE5] to-[#5D5FEF]" : "bg-gray-300"}
                `}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}