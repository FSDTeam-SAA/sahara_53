"use client"
import { Card } from "@/components/ui/card"

interface BookItem {
  id: string
  image: string
  status: string
  category: string
  chapter: string
  title: string
  description: string
}

const BookCard = ({ item }: { item: BookItem }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer pt-0">
      <div className="relative w-full aspect-video bg-muted overflow-hidden">
        <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
      </div>

      <div className="px-4 py-3 flex items-center gap-2 flex-wrap border-b">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#E7E7FD] text-[#5D5FEF] text-xs font-medium  ">
          ✓ {item.status}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#E7E7FD] text-[#5D5FEF] text-xs  font-medium">
          {item.category}
        </span>
        <span className="ml-auto text-xs font-semibold text-[#5D5FEF]">{item.chapter}</span>
      </div>

      <div className="px-4 py-4">
        <h3 className="font-semibold text-xl font-serif text-[#2B2B2B] mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-sm md:base font-medium text-[#6C757D] line-clamp-3 mb-2">{item.description}</p>
        <a href="#" className="text-sm font-medium text-primary hover:underline">
          Read More
        </a>
      </div>
    </Card>
  )
}

export default BookCard
