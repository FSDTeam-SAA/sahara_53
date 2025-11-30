"use client"

import BookCard from "../Common/BookCard"


interface BookItem {
  id: string
  image: string
  status: string
  category: string
  chapter: string
  title: string
  description: string
}

export default function MyBooksTab() {
  const books: BookItem[] = [
    {
      id: "1",
      image: "https://placeholder.com/300x200?text=Book+1",
      status: "Completed",
      category: "Children",
      chapter: "Chapter: 10",
      title: "Story Name Here",
      description:
        "Discover vibrant, fun, and personalized stories brought to life with your own voice and favorite characters...",
    },
    {
      id: "2",
      image: "https://placeholder.com/300x200?text=Book+2",
      status: "Completed",
      category: "Children",
      chapter: "Chapter: 10",
      title: "Story Name Here",
      description:
        "Discover vibrant, fun, and personalized stories brought to life with your own voice and favorite characters...",
    },
    {
      id: "3",
      image: "https://placeholder.com/300x200?text=Book+3",
      status: "Completed",
      category: "Children",
      chapter: "Chapter: 10",
      title: "Story Name Here",
      description:
        "Discover vibrant, fun, and personalized stories brought to life with your own voice and favorite characters...",
    },
    {
      id: "4",
      image: "https://placeholder.com/300x200?text=Book+4",
      status: "Completed",
      category: "Children",
      chapter: "Chapter: 10",
      title: "Story Name Here",
      description:
        "Discover vibrant, fun, and personalized stories brought to life with your own voice and favorite characters...",
    },
    {
      id: "5",
      image: "https://placeholder.com/300x200?text=Book+5",
      status: "Completed",
      category: "Children",
      chapter: "Chapter: 10",
      title: "Story Name Here",
      description:
        "Discover vibrant, fun, and personalized stories brought to life with your own voice and favorite characters...",
    },
    {
      id: "6",
      image: "https://placeholder.com/300x200?text=Book+6",
      status: "Completed",
      category: "Children",
      chapter: "Chapter: 10",
      title: "Story Name Here",
      description:
        "Discover vibrant, fun, and personalized stories brought to life with your own voice and favorite characters...",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} item={book} />
      ))}
    </div>
  )
}
