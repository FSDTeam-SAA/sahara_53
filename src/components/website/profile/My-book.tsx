"use client";

import { useMyOrder } from "@/hooks/useMyorder";
import BookCard from "../Common/BookCard";
import { BackendBook } from "@/lib/type/order";
import { useSession } from "next-auth/react";

// interface BookItem {
//   id: string;
//   image: string;
//   status: string;
//   category: string;
//   chapter: string;
//   title: string;
//   description: string;
// }

export default function MyBooksTab() {
  const userId = useSession().data?.user?.id;
  const { data, isLoading } = useMyOrder(userId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((book: BackendBook) => (
        <BookCard key={book._id} item={book} />
      ))}
    </div>
  );
}
