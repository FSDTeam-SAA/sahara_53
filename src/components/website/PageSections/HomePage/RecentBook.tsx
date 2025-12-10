"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BookCard from "../../Common/BookCard";
import SectionHeader from "../../Common/SectionHeader";
import { useSession } from "next-auth/react";
import { useMyOrder } from "@/hooks/useMyorder";
import { BackendBook } from "@/lib/type/order";
import RecentSkeleton from "./RecentSkeleton";
import LoginRequired from "../../Common/LoginRequired";

const RecentBooks = () => {
  const [showAll, setShowAll] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data, isLoading } = useMyOrder(userId);

  const displayedBooks = showAll ? data : data?.slice(0, 6);

  // If user NOT logged in

  return (
    <div className="w-full my-16   max-w-7xl mx-auto">
      
      <div className="mb-6  text-center">
        <SectionHeader
          title1="Recent"
          title2=" Books"
          dis="Discover vibrant, fun, and personalized stories brought to life with your own voice and favorite characters!"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
        {!session && <div className=""></div>}

        {!session && <LoginRequired />}

        {/* Loading state */}
        {isLoading && (
          <div className="col-span-full text-center py-10 text-gray-500">
            <RecentSkeleton />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && session && (!displayedBooks || displayedBooks.length === 0) && (
          <div className="col-span-full text-center py-10">
            <h2>You have no data</h2>
          </div>
        )}

        {/* Books */}
        {!isLoading &&
          displayedBooks?.length > 0 &&
          displayedBooks.map((book: BackendBook) => (
            <BookCard key={book._id} item={book} />
          ))}
      </div>

      {!showAll && displayedBooks?.length > 6 && (
        <div className="flex justify-center">
          <Button
            onClick={() => setShowAll(true)}
            variant="outline"
            className="px-8"
          >
            See More
          </Button>
        </div>
      )}

      {showAll && (
        <div className="flex justify-center">
          <Button
            onClick={() => setShowAll(false)}
            variant="outline"
            className="px-8"
          >
            Show Less
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentBooks;
