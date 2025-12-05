"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BookCard from "../../Common/BookCard";
import SectionHeader from "../../Common/SectionHeader";
import { useSession } from "next-auth/react";
import { useMyOrder } from "@/lib/hoock/useMyorder";
import { BackendBook } from "@/lib/type/order";

interface BookItem {
  id: string;
  image: string;
  status: "Completed" | "Reading" | "In Progress" | "Draft";
  category: string;
  chapter: string;
  title: string;
  description: string;
}

export const SAMPLE_BOOKS: BookItem[] = [
  {
    id: "1",
    image: "/images/book.jpg",
    status: "Completed",
    category: "Children",
    chapter: "Chapter: 10",
    title: "Story Name Here",
    description:
      "Discover vibrant, fun, and personalized stories brought to life with your own voice and favorite characters...",
  },
  {
    id: "2",
    image: "/images/book1.jpg",
    status: "Reading",
    category: "Adventure",
    chapter: "Chapter: 5",
    title: "The Great Adventure",
    description:
      "Embark on an epic journey through mystical lands and discover hidden treasures...",
  },
  {
    id: "3",
    image: "/images/book2.jpg",
    status: "Completed",
    category: "Fantasy",
    chapter: "Chapter: 15",
    title: "Magic Realm",
    description:
      "Step into a world of magic, mystery, and enchantment where anything is possible...",
  },
  {
    id: "4",
    image: "/images/book.jpg",
    status: "Reading",
    category: "Sci-Fi",
    chapter: "Chapter: 8",
    title: "Space Explorer",
    description:
      "Journey through the cosmos and encounter extraordinary civilizations and wonders...",
  },
  {
    id: "5",
    image: "/images/book2.jpg",
    status: "Completed",
    category: "Mystery",
    chapter: "Chapter: 12",
    title: "The Secret Detective",
    description:
      "Unravel complex mysteries and solve puzzling cases with our brilliant detective...",
  },
  {
    id: "6",
    image: "/images/book2.jpg",
    status: "Reading",
    category: "Romance",
    chapter: "Chapter: 9",
    title: "Hearts Connect",
    description:
      "A touching tale of love, friendship, and personal growth across beautiful landscapes...",
  },
];

const RecentBooks = () => {
  const [showAll, setShowAll] = useState(false);
  const userId = useSession().data?.user?.id;

  const { data, isLoading } = useMyOrder(userId);

  console.log("recent data", data);
  const displayedBooks = showAll ? SAMPLE_BOOKS : SAMPLE_BOOKS.slice(0, 6);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <SectionHeader
          title1="Recent"
          title2=" Books"
          dis="Discover vibrant, fun, and personalized stories brought to life with your own voice and favorite characters!"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data?.map((book: BackendBook) => (
          <BookCard key={book._id} item={book} />
        ))}
      </div>

      {!showAll && SAMPLE_BOOKS.length > 6 && (
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
