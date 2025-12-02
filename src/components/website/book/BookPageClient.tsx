"use client";

import { EditBook } from "@/components/website/reviewbook/EditBook";
import { ReviewBook } from "@/components/website/reviewbook/Reviewbook";
import { BookDetails } from "@/components/website/reviewbook/Reviewbook";
import { ReadListenBook } from "@/components/website/reviewbook/ReadListenBook";
import { SAMPLE_BOOKS } from "@/lib/data/sampleBook";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface BookPageClientProps {
  id: string;
}

export default function BookPageClient() {
  const [edit, setEdit] = useState(false);
  const [listen, setListen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const id = "sdaa5468";

  const maindata = SAMPLE_BOOKS.find((book) => book.id === id);

  const bookDetails: BookDetails = maindata
    ? {
        id: maindata.id,
        title: maindata.title,
        description: maindata.description,
        coverImage: maindata.image,
        language: "English",
        type: maindata.category,
        chapters: parseInt(maindata.chapter?.split(": ")[1]) || 0,
        status:
          maindata.status === "Reading"
            ? "In Progress"
            : maindata.status === "Completed"
              ? "Completed"
              : "Draft",
        price: 12.0,
      }
    : {
        id: "0",
        title: "This is your Story",
        description: "The book you are looking for does not exist.",
        coverImage: "/placeholder.svg",
        language: "English",
        type: "Unknown",
        chapters: 0,
        status: "Draft",
        price: 0,
      };

  const sampleChapters = [
    {
      id: "1",
      title: "The Beginning",
      content: `Once upon a time...`,
      number: 1,
    },
    {
      id: "2",
      title: "The First Computer",
      content: `After months of saving...`,
      number: 2,
    },
  ];

  return (
    <div>
      {listen ? (
        <ReadListenBook
          bookTitle={bookDetails.title}
          chapters={sampleChapters}
          currentChapter={currentChapter}
          onChapterChange={setCurrentChapter}
          onReadAloud={() => console.log("Reading chapter:", currentChapter)}
        />
      ) : edit ? (
        <EditBook book={bookDetails} onBack={() => setEdit(false)} />
      ) : (
        <ReviewBook
          book={bookDetails}
          onEdit={() => setEdit(true)}
          onListen={() => setListen(true)}
        />
      )}
    </div>
  );
}
