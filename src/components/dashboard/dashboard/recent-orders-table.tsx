"use client"

import { useState } from "react"
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { StatusBadge } from "@/components/ui/status-badge"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { Eye, Download, ChevronDown } from "lucide-react"
import { Order } from "@/lib/type/order"


interface RecentOrdersTableProps {
  orders: Order[]
  onViewOrder: (orderId: string) => void
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "Delivered", label: "Delivered" },
  { value: "In Progress", label: "In Progress" },
  { value: "Pending", label: "Pending" },
  { value: "Cancelled", label: "Cancelled" },
]

export function RecentOrdersTable({ orders, onViewOrder }: RecentOrdersTableProps) {
  const [statusFilter, setStatusFilter] = useState("all")
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Order>[] = [
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
      cell: ({ row }) => <span className="truncate max-w-[100px] block">{row.original.userId?.name}</span>,
    },
    {
      accessorKey: "customer.email",
      header: "Mail address",
      cell: ({ row }) => <span className="truncate max-w-[100px] block">{row.original.userId?.email}</span>,
    },
    {
      accessorKey: "customer.phone",
      header: "Phone Number",
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <span className="truncate max-w-[100px] block">{row.original.location}</span>,
    },
    {
      accessorKey: "orderedItem",
      header: "Ordered Item",
      cell: ({ row }) => <span className="truncate max-w-[100px] block">{row.original.bookName}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
    },
    {
      accessorKey: "payment",
      header: "Payment",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
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
            onClick={() => onViewOrder(row.original._id)}
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
  ]

  const filteredOrders = statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter)

  const table = useReactTable({
    data: filteredOrders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  return (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
          <CardDescription>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</CardDescription>
        </div>
        <FilterDropdown
          value={statusFilter}
          onChange={setStatusFilter}
          options={statusOptions}
          placeholder="Select Status"
        />
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-100">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
      </CardContent>
    </Card>
  )
}
