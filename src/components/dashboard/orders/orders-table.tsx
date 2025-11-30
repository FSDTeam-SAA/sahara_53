"use client"

import { useState, useMemo } from "react"
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from "@tanstack/react-table"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { StatusBadge } from "@/components/ui/status-badge"
import { SearchInput } from "@/components/ui/search-input"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { Eye, Download, ChevronDown } from "lucide-react"
import { useOrders } from "@/hooks/use-orders"
import type { Order } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

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
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 40,
      },
      {
        accessorKey: "invoiceNumber",
        header: () => (
          <div className="flex items-center gap-1">
            Invoice <ChevronDown className="h-3 w-3" />
          </div>
        ),
      },
      {
        accessorKey: "customer.name",
        header: "Customer",
        cell: ({ row }) => <span className="truncate max-w-[120px] block">{row.original.customer.name}</span>,
      },
      {
        accessorKey: "customer.email",
        header: "Mail address",
        cell: ({ row }) => <span className="truncate max-w-[120px] block">{row.original.customer.email}</span>,
      },
      {
        accessorKey: "customer.phone",
        header: "Phone Number",
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => <span className="truncate max-w-[120px] block">{row.original.location}</span>,
      },
      {
        accessorKey: "orderedItem",
        header: "Ordered Item",
        cell: ({ row }) => <span className="truncate max-w-[120px] block">{row.original.orderedItem}</span>,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
      },
      {
        accessorKey: "payment",
        header: "Payment",
        cell: ({ row }) => <StatusBadge status={row.original.payment} />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <StatusBadge status={row.original.status} showIcon={false} />
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>
        ),
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewOrder(row.original.id)}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Eye className="h-4 w-4 text-gray-500" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
              <Download className="h-4 w-4 text-purple-500" />
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
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            placeholder="Search by name, mail, phone number, order id"
          />
        </div>
        <div className="flex items-center gap-3">
          <FilterDropdown value={sortBy} onChange={setSortBy} options={sortOptions} placeholder="Sort by" />
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
      </div>

      {/* Table */}
      <Card className="bg-white shadow-sm border-0 overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className="border-b border-gray-100">
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50"
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
              <DataTablePagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
