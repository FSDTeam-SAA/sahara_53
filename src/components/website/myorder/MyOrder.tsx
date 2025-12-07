"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Eye, Download, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useUserOrders } from "@/hooks/use-orders";
import { Order } from "@/lib/type/order";
import { UserDetailModal } from "./UserOrdermodal";

export default function MyOrder() {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: orders = [], isLoading } = useUserOrders(userId);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const columns: ColumnDef<Order>[] = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Order ID",
        cell: ({ row }) => <span>#{row.original._id.slice(0, 5)}</span>,
      },
      {
        accessorKey: "bookName",
        header: "Book Name",
        cell: ({ row }) => (
          <div className="flex gap-2 items-center">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={
                  row.original.storyBookId?.generatedStory?.[0]?.chapterImage ??
                  "/images/mybook.png"
                }
                alt={row.original.bookName ?? "Book"}
                fill
                className="object-cover rounded-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">
                {row.original.storyBookId?.title ?? row.original.bookName}
              </span>
              <StatusBadge status={row.original.status} />
            </div>
          </div>
        ),
      },
      {
        accessorKey: "formate",
        header: "Format",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `$${row.original.price?.toFixed(2) ?? "0.00"}`,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleViewOrder(row.original)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Eye className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1 rounded hover:bg-gray-100">
              <Download className="w-4 h-4 text-purple-500" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="px-4 py-2 text-left bg-gray-50">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-2 text-sm text-gray-700">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

      {selectedOrder && (
        <UserDetailModal
          data={selectedOrder}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
