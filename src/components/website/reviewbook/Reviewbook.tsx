"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, Headphones, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export interface BookDetails {
  id: string
  title: string
  description: string
  coverImage: string
  language: string
  type: string
  chapters: number
  status: "Completed" | "In Progress" | "Draft"
  price?: number
}

interface ReviewBookProps {
  book: BookDetails | null
  onEdit?: () => void
  onListen?: () => void
}

export function ReviewBook({ book, onEdit, onListen }: ReviewBookProps) {
  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Book not found</h1>
          <Link href="/books">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Books
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDownload = () => {
    // Implement download functionality
    console.log("Downloading book:", book.id);
    // You can trigger a file download here
  };

  const handleOrder = () => {
    // Implement order functionality
    console.log("Ordering book:", book.id);
    // Redirect to checkout or open modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <Link href="/">
          <Button variant="ghost" className="gap-2 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Books
          </Button>
        </Link>
        {onEdit && (
          <Button onClick={onEdit} className="bg-transparent border border-bg-purple-700  text-bg-purple-700 cursor-pointer gap-2">
            ✏️ Edit Book
          </Button>
        )}
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Book Cover */}
          <div className="flex items-center justify-center">
            <Card className="overflow-hidden shadow-xl py-0">
              <Image
                src={"/images/review.jpg"} // just default image use 
                alt={book.title}
                width={400}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
              />
            </Card>
          </div>

          {/* Right: Book Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-orange-600 mb-4">{book.title}</h1>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>

            {/* Book Metadata */}
            <Card className="p-4 bg-white border border-gray-200">
              <div className="flex flex-wrap justify-between items-center gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Language</p>
                  <p className="text-base text-gray-900">{book.language}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Type</p>
                  <p className="text-base text-purple-600 font-semibold">{book.type}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Chapters</p>
                  <p className="text-base text-gray-900">{book.chapters} Chapters</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Status</p>
                  <p className={`text-base font-semibold ${
                    book.status === "Completed" ? "text-green-600" :
                    book.status === "In Progress" ? "text-yellow-600" : "text-gray-600"
                  }`}>
                    {book.status}
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-8">

              <Button 
                onClick={handleDownload}
                className="w-full border-2 bg-transparent cursor-pointer border-purple-600 text-purple-600 hover:bg-purple-50 gap-2"
              >
                <Download className="w-5 h-5" />
                Download E-Book
              </Button>
              {onListen && (
                <Button 
                  onClick={onListen}
                  className="w-full bg-transparent cursor-pointer border-2 border-purple-600 text-purple-600 hover:bg-purple-50 gap-2"
                >
                  <Headphones className="w-5 h-5" />
                  Listen to Story
                </Button>
              )}
              </div>
              <Button 
                onClick={handleOrder}
                className="w-full bg-gradient-to-r cursor-pointer from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Order Printed Book - ${book.price?.toFixed(2) || "12.00"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}