"use client"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BookDetails } from "./Reviewbook"

interface EditBookProps {
  books: BookDetails
  onBack: () => void
  onSave?: (updatedBook: BookDetails) => void
}

export function EditBook({ books, onBack, onSave }: EditBookProps) {
  const [editedBook, setEditedBook] = useState<BookDetails>({ ...books })
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (field: keyof BookDetails, value: string | number) => {
    setEditedBook(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Here you would make an API call to save the changes
      console.log("Saving book:", editedBook)
      
      if (onSave) {
        onSave(editedBook)
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onBack()
    } catch (error) {
      console.error("Failed to save book:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel Edit
        </Button>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          {isSaving ? (
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

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-8">Edit Book Details</h1>
        
        <div className="space-y-6">
          {/* Book Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Title *
            </label>
            <Input
              value={editedBook.title}
              onChange={(e) => handleChange('title', e.target.value)}
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
              value={editedBook.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter book description"
              className="w-full min-h-[150px]"
            />
          </div>

          {/* Language and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language *
              </label>
              <Select
                value={editedBook.language}
                onValueChange={(value) => handleChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <Select
                value={editedBook.type}
                onValueChange={(value) => handleChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Children">Children</SelectItem>
                  <SelectItem value="Adventure">Adventure</SelectItem>
                  <SelectItem value="Fantasy">Fantasy</SelectItem>
                  <SelectItem value="Sci-Fi">Science Fiction</SelectItem>
                  <SelectItem value="Mystery">Mystery</SelectItem>
                  <SelectItem value="Romance">Romance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Chapters and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapters *
              </label>
              <Input
                type="number"
                value={editedBook.chapters}
                onChange={(e) => handleChange('chapters', parseInt(e.target.value) || 0)}
                placeholder="Number of chapters"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <Select
                value={editedBook.status}
                onValueChange={(value: "Completed" | "In Progress" | "Draft") => 
                  handleChange('status', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              placeholder="Enter price"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}