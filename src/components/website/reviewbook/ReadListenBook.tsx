"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReadListenBookProps {
  bookTitle?: string;
  chapters?: Array<{
    id: string;
    title: string;
    content: string;
    number: number;
  }>;
  currentChapter?: number;
  onChapterChange?: (chapter: number) => void;
  onReadAloud?: () => void;
}

export function ReadListenBook({
  bookTitle = "Story Name Here",
  chapters = [],
  currentChapter = 1,
  onChapterChange,
  onReadAloud,
}: ReadListenBookProps) {
  const [isReading, setIsReading] = useState(false);
  const chapter = chapters[currentChapter - 1] || {
    title: "Chapter Title",
    content: "Lorem ipsum dolor sit amet...",
    number: currentChapter,
  };

  const handlePrevious = () => {
    if (currentChapter > 1) {
      onChapterChange?.(currentChapter - 1);
    }
  };

  const handleNext = () => {
    if (currentChapter < chapters.length) {
      onChapterChange?.(currentChapter + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative bg-[url('/images/readbg.jpg')] bg-cover bg-center w-screen h-[50vh]">
        <div className="p-4">
          <Link href="/books">
            <Button
              variant="ghost"
              className="gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Book
            </Button>
            <div className=" absolute inset-0 bg-black/20"></div>
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center">
              {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-8">
            {bookTitle}
          </h1>
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="flex items-center justify-end p-4 md:p-6">
              <Button
                onClick={() => {
                  setIsReading(!isReading);
                  onReadAloud?.();
                }}
                className={`gap-2 ${
                  isReading
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border border-purple-600 text-purple-600 hover:bg-purple-50"
                }`}
              >
                <Volume2 className="w-5 h-5" />
                {isReading ? "Stop" : "Read"} Chapter Aloud
              </Button>
            </div>
          </div>
      
        </div>

        {/* Chapter Content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-4">
            {chapter.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 mx-auto bg-gradient-to-t from-purple-50 to-white border-t border-purple-200 p-4 md:p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentChapter === 1}
            className="gap-2 border-gray-300 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700">
              Chapter {currentChapter} of {Math.max(chapters.length, 10)}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentChapter >= chapters.length}
            className="gap-2 border-gray-300"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
