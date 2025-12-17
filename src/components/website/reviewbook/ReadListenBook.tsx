/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Chapter {
  id: string;
  title: string;
  content: string;
  number: number;
  audio: string | null;
  image: string | null;
}

interface ReadListenBookProps {
  id: string;
  bookTitle?: string;
  chapters?: Array<Chapter>;
  currentChapter?: number;
  onChapterChange?: (chapter: number) => void;
  onlistenChange?: (listen: boolean) => void;
}

export function ReadListenBook({
  id,
  bookTitle = "Story Name Here",
  chapters = [],
  currentChapter = 1,
  onChapterChange,
  onlistenChange,
}: ReadListenBookProps) {
  const [isReading, setIsReading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const chapter = chapters[currentChapter - 1] || {
    title: "Chapter Title",
    content: "Lorem ipsum dolor sit amet...",
    number: currentChapter,
    audio: null,
    image: null,
  };

  // Play or pause audio when isReading changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isReading && chapter.audio) {
      audioRef.current
        .play()
        .catch((err) => console.error("Audio play error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isReading, chapter.audio]);

  // Stop reading when chapter changes, or if auto-play is desired, keep it.
  // For now, let's stop to avoid confusion.
  useEffect(() => {
    setIsReading(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    // Scroll to top on chapter change
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    setIsReading((prev) => !prev);
  };

  const handleChapterClick = (chapterNum: number) => {
    onChapterChange?.(chapterNum);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col relative overflow-x-hidden">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Table of Contents */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out border-r border-gray-100",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-800">Chapters</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleChapterClick(ch.number)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors text-sm font-medium",
                  ch.number === currentChapter
                    ? "bg-orange-100 text-orange-700 border-l-4 border-orange-500"
                    : "hover:bg-gray-100 text-gray-600",
                )}
              >
                <span className="opacity-70 mr-2">Ch {ch.number}.</span>
                {ch.title}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Header/Nav */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-600 hover:text-orange-600"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              className="gap-2 text-gray-600 hover:text-orange-600 p-0 hover:bg-transparent"
              onClick={() => onlistenChange?.(false)}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Book</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-sm md:text-lg font-semibold text-gray-800 truncate max-w-[150px] md:max-w-md">
              {bookTitle}
            </h1>
          </div>
          <div className="w-10" /> {/* Spacer for balance */}
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-10 flex flex-col gap-8">
        {/* Chapter Header & Image */}
        <section className="flex flex-col md:flex-row gap-8 items-start animate-fade-in-up">
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg bg-gray-200 aspect-video md:aspect-[4/3] relative">
            {chapter.image ? (
              <Image
                width={400}
                height={400}
                src={chapter.image}
                alt={`Chapter ${chapter.number} illustration`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold w-fit">
              CHAPTER {chapter.number}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {chapter.title}
            </h2>

            {chapter.audio && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 sticky top-20">
                <Button
                  onClick={toggleReading}
                  className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center transition-all shadow-md shrink-0",
                    isReading
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-white",
                  )}
                >
                  {isReading ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {isReading ? "Now Playing" : "Listen to Chapter"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isReading ? "Audio active..." : "Click play to start"}
                  </p>
                </div>
                <audio
                  ref={audioRef}
                  src={chapter.audio}
                  onEnded={() => setIsReading(false)}
                />
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <article className="prose prose-lg prose-orange max-w-none text-gray-700 leading-relaxed font-serif">
          {chapter.content.split("\n\n").map((paragraph, idx) => (
            <p
              key={idx}
              className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-orange-900 first-letter:mr-3 first-letter:float-left"
            >
              {paragraph}
            </p>
          ))}
        </article>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentChapter === 1}
            className="gap-2 border-gray-300 hover:border-orange-500 hover:text-orange-600"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Chapter</span>
            <span className="sm:hidden">Prev</span>
          </Button>

          <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            {currentChapter} / {chapters.length}
          </span>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentChapter >= chapters.length}
            className="gap-2 border-gray-300 hover:border-orange-500 hover:text-orange-600"
          >
            <span className="hidden sm:inline">Next Chapter</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
