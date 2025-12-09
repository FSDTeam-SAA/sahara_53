"use client";

import { EditBook } from "@/components/website/reviewbook/EditBook";
import { ReviewBook } from "@/components/website/reviewbook/Reviewbook";
import { ReadListenBook } from "@/components/website/reviewbook/ReadListenBook";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SingleBookFetch } from "@/lib/api";
import { IBook } from "@/lib/type/book";

export default function BookPageClient() {
  const [edit, setEdit] = useState(false);
  const [listen, setListen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);

  const pathname = usePathname();
  const bookId = pathname.replace("/book/", "");

  const { data: book, isLoading } = useQuery<IBook>({
    queryKey: ["singlebook", bookId],
    queryFn: () => SingleBookFetch(bookId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  // Format data for your existing ReviewBook component
  const bookDetails = {
    id: book._id,
    title: book.beginning,
    description: book.generatedStory[0].text,
    coverImage: book.generatedStory[0]?.chapterImage || "/images/no-image.jpg",
    language: book.language,
    type: book.style,
    chapters: book.chapterCount,

    status: "Completed" as const,
    price: 12,
  };

  // Prepare chapters for ReadListenBook
  const chapters = book.generatedStory.map((ch) => ({
    id: ch._id,
    title: ch.title,
    content: ch.text,
    number: ch.chapter,
    audio: ch.audioUrl || "",
  }));

  console.log("1", book);
  return (
    <div>
      {listen ? (
        <ReadListenBook
        id={bookId}
          bookTitle={book.title}
          chapters={chapters}
          currentChapter={currentChapter}
          onChapterChange={setCurrentChapter}
        />
      ) : edit ? (
        <EditBook
          book={book}
          books={bookDetails}
          onBack={() => setEdit(false)}
        />
      ) : (
        <ReviewBook
          books={book}
          book={bookDetails}
          onEdit={() => setEdit(true)}
          onListen={() => setListen(true)}
        />
      )}
    </div>
  );
}
