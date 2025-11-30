"use client";
import React, { useState } from "react";
import { User } from "lucide-react";

const YourStoryBeginning = () => {
  const [story, setStory] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* HEADER TITLE */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-2xl font-bold flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg, #FB923C 0%, #EC4899 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span className="text-3xl">✨</span>
          Your Story Beginning
        </h2>
      </div>

      {/* Story Textarea */}
      <div className="mb-6">
        <label
          htmlFor="story"
          className="block mb-2 font-medium text-gray-700"
        >
          Share Your Memory or Story Beginning
        </label>
        <textarea
          id="story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Start typing your story..."
          className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Inspiration Box */}
      <div className="p-4 mb-8 rounded-md border border-[#FF7CE5] bg-gradient-to-r from-[rgba(255,124,229,0.06)] to-[rgba(93,95,239,0.06)]">
       <p
  className="flex items-center gap-3 mb-2 text-2xl font-bold"
  style={{
    background: "var(--1gr, linear-gradient(135deg, #FB923C 0%, #EC4899 100%))",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  <User className="w-6 h-6"  />
  Need inspiration?
</p>

        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            I remember the summer when I was seven, sitting on my grandmother&apos;s
            porch watching fireflies...
          </li>
          <li>
            It was the day I discovered I could talk to animals. I was walking
            in the forest when...
          </li>
          <li>
            The old bookstore on the corner of Main Street held a secret. Every
            midnight, the books...
          </li>
        </ul>
      </div>
    </div>
  );
};

export default YourStoryBeginning;
