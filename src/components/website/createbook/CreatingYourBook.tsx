import { Mic } from "lucide-react";
import React from "react";

const CreatingYourBook = () => {
  const data = [
    {
      id: 1,
      title: "Crafting your story",
    },

    {
      id: 2,
      title: "Creating chapters",
    },

    {
      id: 3,
      title: "Designing characters",
    },

    {
      id: 4,
      title: "Generating illustrations",
    },

    {
      id: 5,
      title: "Preparing narration",
    },
  ];

  return (
    <div>
      <div>
        <div
          className="flex items-center mx-auto justify-center w-16 h-16 rounded-full shadow-lg text-white transition-transform duration-200 hover:scale-105"
          style={{
            borderRadius: "100px",
            background:
              "var(--2-gr, linear-gradient(135deg, #F472B6 0%, #A855F7 100%))",
            boxShadow: "0 6px 12px 0 rgba(0, 0, 0, 0.12)",
          }}
        >
          <Mic className="w-5 h-5" />
        </div>
        <h3>Creating Your Book</h3>
        <p>“Book Name Here”</p>
        {data.map((item) => (
          <p
            key={item.id}
            className="p-4 mb-8 flex gap-3 items-center rounded-md border border-[#FF7CE5] bg-gradient-to-r from-[rgba(255,124,229,0.06)] to-[rgba(93,95,239,0.06)]"
          >
            <span className="text-3xl">✨</span>
            <span className="text-gray-600 flex items-center gap-3">
              {item.title}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default CreatingYourBook;