import React from "react";

const RecentSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-full bg-white p-4 rounded-xl shadow animate-pulse space-y-4"
        >
          <div className="h-20 bg-gray-200 rounded-md"></div>

          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>

          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default RecentSkeleton;
