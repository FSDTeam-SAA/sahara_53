"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/ui/status-badge";
import { Eye, Download, ChevronDown } from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@/lib/type/order";
import Image from "next/image";

interface OrdersTableProps {
  onViewOrder: (orderId: string) => void;
}

const MyOrder = ({ onViewOrder }: OrdersTableProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const { data: orders = [], isLoading } = useOrders();

  const columns: ColumnDef<Order>[] = useMemo(
    () => [
      {
        accessorKey: "invoiceNumber",
        header: () => <div className="flex items-center gap-1">Order ID</div>,
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium text-sm md:text-base">
              #{row.original._id.slice(0, 5)}
            </span>

            <span className="text-xs text-gray-500 md:hidden">
              {row.original.createdAt}
            </span>
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
                src={
                  row.original?.storyBookId?.generatedStory?.[0]
                    ?.chapterImage ?? "/images/mybook.png"
                }
                alt="bookname"
                fill
                className="object-cover rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="truncate text-sm md:text-base font-medium leading-tight">
                {row.original?.userId?.name}
              </span>
              <span className="truncate text-xs md:text-sm text-gray-600">
                {row.original.bookName}
              </span>
              <div className="md:hidden flex items-center gap-2 mt-1">
                <StatusBadge status={row?.original?.status} showIcon={false} />
                <span className="text-sm font-medium">
                  ${(row.original?.price ?? 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "Date",
        header: "Date",
        cell: ({ row }) => (
          <span className="truncate hidden md:block">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(row.original.createdAt))}
          </span>
        ),
      },
      // {
      //   accessorKey: "location",
      //   header: "Location",
      //   cell: ({ row }) => (
      //     <span className="truncate hidden md:block">
      //       {row.original.location}
      //     </span>
      //   ),
      // },
      {
        accessorKey: "Format",
        header: "Format",
        cell: ({ row }) => (
          <span className="truncate hidden lg:block">
            {row.original.formate}
          </span>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <span className="hidden md:block">
            ${(row.original?.price ?? 0).toFixed(2)}
          </span>
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
              onClick={() => onViewOrder(row.original._id)}
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
  );

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  return (
    <div className="space-y-4">
      <Card className="bg-white shadow-sm border-0 overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border-b border-gray-100"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left text-base font-medium text-[#2B2B2B] leading-[150%] bg-gray-50"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                {/* Table Body */}
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 text-sm text-gray-700"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyOrder;
