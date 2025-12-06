"use client"

import type React from "react"

interface CreateBookHeaderProps {
  title: string
  highlightedWord: string
  subtitle: string
}

/**
 * Page header component with main title, highlighted word accent, and subtitle
 * Used for book creation section headers
 */
export const CreateBookHeader: React.FC<CreateBookHeaderProps> = ({ title, highlightedWord, subtitle }) => {
  return (
    <div className="text-center py-8">
      {/* Main title with highlighted word */}
      <div className="mb-2">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-gray-900">{title}</span>{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FB923C 0%, #EC4899 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="inline-block"
          >
            {highlightedWord}
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">{subtitle}</p>
    </div>
  )
}

export default CreateBookHeader
