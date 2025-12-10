import React from "react";

interface SectionHeaderProps {
  title1: string;
  title2: string;
  dis: string;
}

const SectionHeader = ({ title1, title2, dis }: SectionHeaderProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-[32px] font-bold leading-tight font-serif">
        {title1}{" "}
        <span
          className="px-2 bg-gradient-to-r from-[#FF7CE5] to-[#5D5FEF] bg-clip-text text-transparent font-serif"
        >
          {title2}
        </span>
      </h2>

      <p className="text-[16px] text-gray-600 dark:text-gray-300">
        {dis}
      </p>
    </div>
  );
};

export default SectionHeader;
