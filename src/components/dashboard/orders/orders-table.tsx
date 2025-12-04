"use client"

import { useState, useMemo } from "react"
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from "@tanstack/react-table"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { StatusBadge } from "@/components/ui/status-badge"
import { SearchInput } from "@/components/ui/search-input"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { Eye, Download, ChevronDown, Menu, X } from "lucide-react"
import { useOrders } from "@/hooks/use-orders"
import type { Order } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

interface OrdersTableProps {
  onViewOrder: (orderId: string) => void
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "Delivered", label: "Delivered" },
  { value: "In Progress", label: "In Progress" },
  { value: "Pending", label: "Pending" },
  { value: "Cancelled", label: "Cancelled" },
]

const sortOptions = [
  { value: "invoiceNumber", label: "Invoice" },
  { value: "customer.name", label: "Customer" },
  { value: "price", label: "Price" },
  { value: "createdAt", label: "Date" },
]

export function OrdersTable({ onViewOrder }: OrdersTableProps) {
  const [search, setSearch] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("invoiceNumber")
  const [page, setPage] = useState(1)
  const [rowSelection, setRowSelection] = useState({})
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const { orders, totalPages, isLoading } = useOrders({
    search: searchQuery,
    status: statusFilter,
    sortBy,
    page,
    pageSize: 10,
  })

  const columns: ColumnDef<Order>[] = useMemo(
    () => [
      {
        accessorKey: "invoiceNumber",
        header: () => (
          <div className="flex items-center gap-1">
            Order ID
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium text-sm md:text-base">#{row.original.invoiceNumber}</span>
            <span className="text-xs text-gray-500 md:hidden">{row.original.createdAt}</span>
          </div>
        ),
      },
      {
        accessorKey: "Book Name",
        header: "Book Name",
        cell: ({ row }) => (
          <div className="flex gap-2 md:gap-3 items-center">
            <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
              <Image 
                src={'/images/mybook.png'} 
                alt="bookname" 
                fill
                className="object-cover rounded-sm" 
              />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="truncate text-sm md:text-base font-medium leading-tight">
                {row.original.customer.name}
              </span>
              <span className="truncate text-xs md:text-sm text-gray-600">
                {row.original.orderedItem}
              </span>
              <div className="md:hidden flex items-center gap-2 mt-1">
                <StatusBadge status={row.original.status} showIcon={false} />
                <span className="text-sm font-medium">${row.original.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "Date",
        header: "Date",
        cell: ({ row }) => (
          <span className="truncate hidden md:block">{row.original.createdAt}</span>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <span className="truncate hidden md:block">{row.original.location}</span>
        ),
      },
      {
        accessorKey: "Format",
        header: "Format",
        cell: ({ row }) => (
          <span className="truncate hidden lg:block">{row.original.orderedItem}</span>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <span className="hidden md:block">${row.original.price.toFixed(2)}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="hidden md:flex items-center gap-1">
            <StatusBadge status={row.original.status} showIcon={false} />
          </div>
        ),
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => onViewOrder(row.original.id)}
              className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="View order"
            >
              <Eye className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
            </button>
            <button 
              className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Download order"
            >
              <Download className="h-4 w-4 md:h-5 md:w-5 text-purple-500" />
            </button>
          </div>
        ),
      },
    ],
    [onViewOrder],
  )

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  const handleSearch = () => {
    setSearchQuery(search)
    setPage(1)
  }

  return (
    <div className="space-y-3 md:space-y-4 mt-12 md:mt-20">
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
        <div className="w-full md:flex-1 md:max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            placeholder="Search by name, mail, phone number, order id"
          />
        </div>
        
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm"
        >
          {showMobileFilters ? <X size={16} /> : <Menu size={16} />}
          Filters
        </button>

        {/* Desktop Filters */}
        <div className="hidden md:flex items-center gap-3">
          <FilterDropdown 
            value={sortBy} 
            onChange={setSortBy} 
            options={sortOptions} 
            placeholder="Sort by" 
          />
          <FilterDropdown
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value)
              setPage(1)
            }}
            options={statusOptions}
            placeholder="Select Status"
          />
        </div>

        {/* Mobile Filters Dropdown */}
        {showMobileFilters && (
          <div className="w-full md:hidden grid grid-cols-2 gap-3 p-4 border border-gray-200 rounded-lg bg-white">
            <FilterDropdown 
              value={sortBy} 
              onChange={setSortBy} 
              options={sortOptions} 
              placeholder="Sort by"
            />
            <FilterDropdown
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value)
                setPage(1)
              }}
              options={statusOptions}
              placeholder="Select Status"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <Card className="bg-white shadow-sm border-0 pt-0 overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-12 md:h-14 w-full" />
              ))}
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className="border-b border-gray-100">
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-4 py-3 text-left text-xs md:text-sm font-medium text-[#2B2B2B] bg-gray-50"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-3 text-sm text-gray-700">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden">
                {table.getRowModel().rows.map((row) => (
                  <div key={row.id} className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-sm">#{row.original.invoiceNumber}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onViewOrder(row.original.id)}
                              className="p-1 rounded-full hover:bg-gray-100"
                              aria-label="View order"
                            >
                              <Eye className="h-4 w-4 text-gray-500" />
                            </button>
                            <button 
                              className="p-1 rounded-full hover:bg-gray-100"
                              aria-label="Download order"
                            >
                              <Download className="h-4 w-4 text-purple-500" />
                            </button>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{row.original.customer.email}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 flex-shrink-0">
                        <Image 
                          src={'/images/mybook.png'} 
                          alt="bookname" 
                          fill
                          className="object-cover rounded-sm" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">
                              {row.original.customer.name}
                            </h4>
                            <p className="text-xs text-gray-600 truncate">
                              {row.original.orderedItem}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <StatusBadge status={row.original.status} showIcon={false} />
                          <span className="text-sm font-medium">${row.original.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-500">Location</span>
                        <p className="text-sm truncate">{row.original.location}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Format</span>
                        <p className="text-sm truncate">{row.original.orderedItem}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="px-4 py-3 border-t border-gray-100">
                <DataTablePagination 
                  currentPage={page} 
                  totalPages={totalPages} 
                  onPageChange={setPage} 
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}