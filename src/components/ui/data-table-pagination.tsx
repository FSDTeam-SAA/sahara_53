"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DataTablePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function DataTablePagination({ currentPage, totalPages, onPageChange }: DataTablePaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, 2, 3)

      if (currentPage > 4) {
        pages.push("...")
      }

      if (currentPage > 3 && currentPage < totalPages - 2) {
        if (!pages.includes(currentPage - 1)) pages.push(currentPage - 1)
        if (!pages.includes(currentPage)) pages.push(currentPage)
        if (!pages.includes(currentPage + 1)) pages.push(currentPage + 1)
      }

      if (currentPage < totalPages - 3) {
        pages.push("...")
      }

      if (!pages.includes(totalPages - 1)) pages.push(totalPages - 1)
      if (!pages.includes(totalPages)) pages.push(totalPages)
    }

    // Remove duplicates and filter
    return [...new Set(pages)].filter((p) => typeof p === "string" || (p >= 1 && p <= totalPages))
  }

  const pages = getPageNumbers()

  return (
    <div className="flex items-center justify-between px-4 py-4 border-t bg-white rounded-b-xl">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((page, idx) =>
          typeof page === "string" ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "h-9 w-9 rounded-lg text-sm font-medium transition-colors",
                currentPage === page ? "bg-purple-100 text-purple-600" : "text-gray-600 hover:bg-gray-100",
              )}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
