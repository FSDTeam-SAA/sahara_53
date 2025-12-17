"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { BookCard } from "./book-card";
import { useBooks } from "@/hooks/use-books";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useDelete } from "@/hooks/storydelete";

// const statusOptions = [
//   { value: "all", label: "All Status" },
//   { value: "Completed", label: "Completed" },
//   { value: "In Progress", label: "In Progress" },
//   { value: "Draft", label: "Draft" },
// ];

const sortOptions = [
  { value: "title", label: "Title" },
  { value: "createdAt", label: "Date" },
  { value: "chapterCount", label: "Chapters" },
];

export function BooksGrid() {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [page, setPage] = useState(1);
const { mutate:deleteBook } = useDelete()

  const { books, totalPages, isLoading, mutate } = useBooks({
    search: searchQuery,
    // status: statusFilter,
    sortBy,
    page,
    pageSize: 9,
  });

  const handleSearch = () => {
    setSearchQuery(search);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      // await api.deleteBook(id);
      toast.success("Book deleted successfully");
      deleteBook(id)
    } catch {
      toast.error("Failed to delete book");
    }
  };

  const handleAddBook = () => {
    toast.info("Add new book functionality coming soon!");
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            placeholder="Search by name"
          />
        </div>
        <div className="flex items-center gap-3">
          <FilterDropdown
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
            placeholder="Sort by"
          />
          {/* <FilterDropdown
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
            options={statusOptions}
            placeholder="Select Status"
          /> */}
          <Button
            onClick={handleAddBook}
            className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Book
          </Button>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} onDelete={handleDelete} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="bg-white rounded-xl">
              <DataTablePagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
