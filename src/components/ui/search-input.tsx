"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder?: string
}

export function SearchInput({ value, onChange, onSearch, placeholder = "Search..." }: SearchInputProps) {
  return (
    <div className="flex">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder={placeholder}
        className="rounded-r-none border-r-0 bg-white"
      />
      <Button
        onClick={onSearch}
        className="rounded-l-none bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  )
}
