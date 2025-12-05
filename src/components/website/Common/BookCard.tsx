"use client";
import { Card } from "@/components/ui/card";
import { BackendBook } from "@/lib/type/order";
import Image from "next/image";


const BookCard = ({ item }: { item: BackendBook }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer pt-0">

      {/* Book Cover */}
      <div className="relative w-full aspect-video bg-muted overflow-hidden">
        <Image
          src={item.generatedStory[0].chapterImage || "/placeholder.svg"}
          width={500}
          height={500}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Genre + Chapters */}
      <div className="px-4 py-3 flex items-center gap-2 flex-wrap border-b">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#E7E7FD] text-[#5D5FEF] text-xs font-medium">
          {item.genre}
        </span>

        <span className="ml-auto text-xs font-semibold text-[#5D5FEF]">
          Chapter: {item.chapterCount}
        </span>
      </div>

      {/* Title + Short Description */}
      <div className="px-4 py-4">
        <h3 className="font-semibold text-xl font-serif text-[#2B2B2B] mb-2 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-sm md:base font-medium text-[#6C757D] line-clamp-3 mb-2">
          {item.beginning || item.generatedStory?.[0]?.text?.slice(0, 120)}
        </p>

        <a
          href={`/book/${item._id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Read More
        </a>
      </div>

    </Card>
  );
};

export default BookCard;
