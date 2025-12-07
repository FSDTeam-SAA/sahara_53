/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useRef, useEffect } from "react";
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
    audio: string | null;
  }>;
  currentChapter?: number;
  onChapterChange?: (chapter: number) => void;
}

export function ReadListenBook({
  bookTitle = "Story Name Here",
  chapters = [],
  currentChapter = 1,
  onChapterChange,
}: ReadListenBookProps) {
  const [isReading, setIsReading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const chapter = chapters[currentChapter - 1] || {
    title: "Chapter Title",
    content: "Lorem ipsum dolor sit amet...",
    number: currentChapter,
    audio: null,
  };

  // Play or pause audio when isReading changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isReading && chapter.audio) {
      audioRef.current.play().catch(err => console.error("Audio play error:", err));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isReading, chapter.audio]);

  // Stop reading when chapter changes
  useEffect(() => {
    setIsReading(false);
  }, [currentChapter]);

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

  const toggleReading = () => {
    if (!chapter.audio) return;
    setIsReading(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col justify-between gap-5">
      <div className="relative bg-[url('/images/readbg.jpg')] bg-cover bg-center w-screen h-[50vh]">
        <div className="p-4">
          <Link href="/">
            <Button
              variant="ghost"
              className="gap-2 bg-gradient-to-r cursor-pointer from-pink-500 to-purple-600 text-white hover:opacity-90"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Book
            </Button>
          </Link>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      <main className=" mx-auto p-4 md:px-12  ">
        <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-15">{bookTitle}</h1>

        <Button
          onClick={toggleReading}
          className={`gap-2 mb-6 ${
            isReading
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "border border-purple-600 text-purple-600 hover:bg-purple-50"
          }`}
          disabled={!chapter.audio}
        >
          <Volume2 className="w-5 h-5" />
          {isReading ? "Stop" : "Read"} Chapter Aloud
        </Button>

        </div>
        <h2 className="text-2xl font-semibold mb-4">{chapter.title}</h2>
        
        <article className="prose prose-lg max-w-none mb-10">
          {chapter.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="text-base md:text-lg text-gray-700">
              {paragraph}
            </p>
          ))}
        </article>

        <audio ref={audioRef} src={chapter.audio || undefined} />

        {/* Footer Navigation */}
        <footer className=" mx-auto bg-[#EFEFFD] w-full from-purple-50 to-white border-t border-purple-200 p-4 md:p-6">
          <div className=" mx-auto flex items-center justify-between">
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
                Chapter {currentChapter} of {chapters.length || 1}
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
      </main>
    </div>
  );
}
