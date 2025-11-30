"use client"

import Image from "next/image"
import { Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import type { Book } from "@/lib/types"

interface BookCardProps {
  book: Book
  onDelete: (id: string) => void
}

export function BookCard({ book, onDelete }: BookCardProps) {
  return (
    <Card className="bg-white shadow-sm border-0 overflow-hidden group">
      <div className="relative">
        <Image
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onDelete(book.id)}
          className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StatusBadge status={book.status} />
            <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full border border-purple-100">
              {book.category}
            </span>
          </div>
          <span className="text-xs text-gray-500">Chapter: {book.chapters}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{book.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {book.description}
          <button className="text-purple-600 hover:underline ml-1">Read More</button>
        </p>
      </CardContent>
    </Card>
  )
}
