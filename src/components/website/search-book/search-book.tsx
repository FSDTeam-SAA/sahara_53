"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";
import BookCard from "../Common/BookCard";
import Link from "next/link";
import { BackendBook } from "@/lib/type/order";

// ===============================
// ⭐ Types
// ===============================
export interface Character {
  name: string;
  _id: string;
}

export interface GeneratedStoryItem {
  _id: string;
  chapter: number;
  title: string;
  text: string;
  audioUrl: string | null;
  chapterImage: string;
}

// export interface BackendBook {
//   _id: string;
//   title: string;
//   description: string;
//   image?: string;
//   category?: string;
//   status?: "active" | "inactive";
//   chapters: number;

//   language: string;
//   style: string;
//   genre: string;
//   beginning: string;

//   characters: Character[];

//   generatedStory: GeneratedStoryItem[];

//   createdAt: string;
//   updatedAt: string;
// }

// ===============================
// STORY LIST ITEM
// ===============================
const StoryListItem = ({ story }: { story: BackendBook }) => (
  <Link
    href={`/book/${story._id}`}
    className="cursor-pointer px-4 py-3 flex items-center justify-between border-b hover:bg-gray-50 transition-all"
  >
    <div>
      <h3 className="text-lg font-medium">{story.title}</h3>
      <p className="text-sm text-gray-500">{story.genre}</p>
    </div>

    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
      {(story.chapterCount ?? story.generatedStory?.length ?? 0)} chapters
    </span>
  </Link>
);

// ===============================
// SEARCH BAR
// ===============================
interface SearchBarProps {
  placeholder?: string;
  stories?: BackendBook[];
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search your stories...",
  stories = [],
  search,
  setSearch,
}) => {
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredStories =
    search.trim().length > 0
      ? stories.filter((story) =>
          story.title.toLowerCase().includes(search.toLowerCase()),
        )
      : [];

  const isOpen = search.trim() !== "";

  // close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearch]);

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* INPUT */}
      <div className="relative">
        <Button
          onClick={() => {}}
          className="absolute right-0 top-0 h-full px-6 bg-primary-gradient hover:opacity-90 text-white rounded-l-none z-10 transition-opacity"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-40 h-12 text-base"
          placeholder={placeholder}
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-12 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}

        <Button className="absolute right-0 top-0 h-full px-4 rounded-l-none bg-purple-600 text-white hover:bg-purple-700 transition">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* DROPDOWN */}
      {isOpen && (
        <>


          <div className="absolute top-full mt-2 w-full bg-white overflow-y-scroll max-h-80   rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto border animate-slideDown">
            {filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <StoryListItem key={story._id} story={story} />
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-500">
                No stories found for {search}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// ===============================
// PAGE MAIN
// ===============================
const StorySearchApp = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ⭐ Debounce input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // ⭐ API calls only when user types
  const { data: stories = [] } = useQuery<BackendBook[]>({
    queryKey: ["search", userId, debouncedSearch],
    queryFn: async () => {
      const res = await api.get(
        `/story/user/${userId}?search=${debouncedSearch}`,
      );
      return res.data || [];
    },
    enabled: !!userId && debouncedSearch.trim().length > 0,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="w-full mx-auto flex flex-col  ">
        {/* HEADER */}
        <div className="flex gap-6 mb-8 justify-center mx-auto  items-center">
          {/* <h1 className="text-4xl font-light text-gray-800">My Stories</h1> */}

          <SearchBar stories={stories} search={search} setSearch={setSearch} />
        </div>

        {/* CARD LIST */}
        <div className=" gap-6 ">
          {debouncedSearch.trim().length === 0 ? (
            <p className="text-gray-400 col-span-full text-center">
              Type to search stories...
            </p>
          ) : stories.length > 0 ? (
            <div className="mt-20">
              <h2 className="text-3xl font-semibold leading-[150%] font-serif">
                Searched Result
                <span className="text-primary ">({stories.length})</span>
              </h2>
              <p className="text-[#6C757D] text-base font-normal leading-[150%] my-5">
                Discover vibrant, fun, and personalized stories brought to life
                with your own voice and favorite characters!
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-3  gap-6 z-50!">
                {stories.map((book) => (
                  <BookCard key={book._id} item={book} />
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 col-span-full">No stories found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorySearchApp;
