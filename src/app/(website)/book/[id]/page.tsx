// app/(website)/book/[id]/page.tsx
'use client'
import { EditBook } from '@/components/website/reviewbook/EditBook';
import { ReviewBook } from '@/components/website/reviewbook/Reviewbook';
import { BookDetails } from '@/components/website/reviewbook/Reviewbook';
import { ReadListenBook } from '@/components/website/reviewbook/ReadListenBook';
import { SAMPLE_BOOKS } from '@/lib/data/sampleBook';
import { useState } from 'react';

interface BookPageParams {
  params: {
    id: string;
  };
}

export default function Page({ params }: BookPageParams) {
  const { id } = params;
  const [edit, setEdit] = useState(false);
  const [listen, setListen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);

  // Find the book by ID
  const maindata = SAMPLE_BOOKS.find(book => book.id === id);
  
  // Convert SAMPLE_BOOKS data to BookDetails format
  const bookDetails: BookDetails = maindata ? {
    id: maindata.id,
    title: maindata.title,
    description: maindata.description,
    coverImage: maindata.image,
    language: "English",
    type: maindata.category,
    chapters: parseInt(maindata.chapter?.split(": ")[1]) || 0,
    status: (maindata.status === "Completed" || maindata.status === "Reading") 
      ? maindata.status === "Reading" ? "In Progress" : maindata.status 
      : "Draft",
    price: 12.00
  } : {
    id: "0",
    title: "This is your Story",
    description: "The book you are looking for does not exist.",
    coverImage: "/placeholder.svg",
    language: "English",
    type: "Unknown",
    chapters: 0,
    status: "Draft",
    price: 0
  };

  // Sample chapters for Read/Listen view
  const sampleChapters = [
    {
      id: "1",
      title: "The Beginning",
      content: `Once upon a time, in a land far away, there was a young boy who dreamed of becoming a software engineer. His name was Alex, and he lived in a small town where technology was just beginning to make its mark.\n\nAlex would spend hours watching old computers at the local library, fascinated by how they worked. He would ask questions about everything: "How do websites work?" "What is code?" "Can I make my own game?"\n\nThe librarian, Mrs. Jenkins, noticed his curiosity and gave him his first programming book. It was an old, worn-out book about BASIC programming. Alex devoured every page, writing his first lines of code on paper since he didn't have a computer.`,
      number: 1
    },
    {
      id: "2",
      title: "The First Computer",
      content: `After months of saving his allowance and doing odd jobs around the neighborhood, Alex finally had enough money to buy his first computer. It was an old, refurbished machine that his teacher helped him find.\n\nThe moment he turned it on, Alex felt a rush of excitement. He installed the free programming tools he had read about and began typing his first real code. The screen flickered to life with "Hello, World!" and in that moment, Alex knew he had found his passion.\n\nHe spent every free moment learning—watching online tutorials, joining coding forums, and experimenting with small projects. His first complete program was a simple calculator, but to him, it felt like he had built something magnificent.`,
      number: 2
    },
    // Add more chapters as needed
  ];

  const handleEditClick = () => {
    setEdit(true);
    setListen(false);
  };

  const handleListenClick = () => {
    setListen(true);
    setEdit(false);
  };

  const handleBackToReview = () => {
    setEdit(false);
    setListen(false);
  };

  const handleChapterChange = (chapter: number) => {
    setCurrentChapter(chapter);
  };

  const handleReadAloud = () => {
    // Implement text-to-speech functionality here
    console.log("Reading chapter aloud:", currentChapter);
    // You can use the Web Speech API or a library like react-speech-kit
  };

  return (
    <div>
      {listen ? (
        <ReadListenBook
          bookTitle={bookDetails.title}
          chapters={sampleChapters}
          currentChapter={currentChapter}
          onChapterChange={handleChapterChange}
          onReadAloud={handleReadAloud}
        />
      ) : edit ? (
        <EditBook 
          book={bookDetails} 
          onBack={handleBackToReview} 
        />
      ) : (
        <ReviewBook 
          book={bookDetails} 
          onEdit={handleEditClick}
          onListen={handleListenClick}
        />
      )}
    </div>
  );
}