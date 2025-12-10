"use client"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { IBook, IGeneratedChapter } from "@/lib/type/book"
import { useMutation } from "@tanstack/react-query"
import { storyUpdate } from "@/lib/api"
import { BookDetails } from "./Reviewbook"

interface EditBookProps {
  book: IBook
  books?: BookDetails // keeping this as optional/unused if not needed strictly for logic, or remove if truly unused
  onBack: () => void
  onSave?: (updatedBook: IBook) => void
}

export function EditBook({ book, onBack, onSave }: EditBookProps) {
  // Initialize state with the full book object
  const [editedBook, setEditedBook] = useState<IBook>({ ...book })

  const mutation = useMutation({
    mutationFn: (data: Partial<IBook>) => storyUpdate(data, book._id),
    onSuccess: (data) => {
       if (onSave) onSave(data)
       onBack()
    },
    onError: (error) => {
      console.error("Failed to update book:", error)
    }
  })

  // Handler for top-level book metadata (Title, Description, Price)
  const handleMetadataChange = (field: keyof IBook, value: string | number) => {
    setEditedBook((prev) => ({ ...prev, [field]: value }))
  }

  // Handler for specific chapter updates
  const handleChapterChange = (chapterId: string, field: keyof IGeneratedChapter, value: string) => {
    setEditedBook((prev) => {
      const updatedChapters = prev.generatedStory.map((chapter) =>
        chapter._id === chapterId ? { ...chapter, [field]: value } : chapter
      )
      return { ...prev, generatedStory: updatedChapters }
    })
  }

  const handleSave = () => {
    // Basic validation or data preparation can go here
    mutation.mutate(editedBook)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 mt-20 md:mt-0">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <Button onClick={onBack} variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Cancel Edit
        </Button>
        <Button
          onClick={handleSave}
          disabled={mutation.isPending}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          {mutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-orange-600">Edit Book Details</h1>

        <Accordion type="single" collapsible defaultValue="book-info" className="w-full space-y-4">
          
          {/* Section 1: Book Information */}
          <AccordionItem value="book-info" className="bg-white border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Book Information
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-6 p-4">
              {/* Book Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title *
                </label>
                <Input
                  value={editedBook.title}
                  onChange={(e) => handleMetadataChange("title", e.target.value)}
                  placeholder="Enter book title"
                  className="w-full"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <Textarea
                  value={editedBook.description || ""}
                  onChange={(e) => handleMetadataChange("description", e.target.value)}
                  placeholder="Enter book description"
                  className="w-full min-h-[120px]"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={editedBook.price || ""}
                  onChange={(e) => handleMetadataChange("price", parseFloat(e.target.value) || 0)}
                  placeholder="Enter price"
                  className="w-full"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Section 2: Chapters */}
          {editedBook.generatedStory.map((chapter) => (
            <AccordionItem 
              key={chapter._id} 
              value={`chapter-${chapter._id}`} 
              className="bg-white border rounded-lg px-4"
            >
              <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                Chapter {chapter.chapter}: {chapter.title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-6 p-4">
                {/* Chapter Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chapter Title
                  </label>
                  <Input
                    value={chapter.title}
                    onChange={(e) => handleChapterChange(chapter._id, "title", e.target.value)}
                    placeholder="Enter chapter title"
                    className="w-full"
                  />
                </div>

                {/* Chapter Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chapter Content
                  </label>
                  <Textarea
                    value={chapter.text}
                    onChange={(e) => handleChapterChange(chapter._id, "text", e.target.value)}
                    placeholder="Enter chapter text"
                    className="w-full min-h-[300px] font-serif leading-relaxed"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}