"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { SearchInput } from "@/components/ui/search-input";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Eye, MoreHorizontal } from "lucide-react";
import { useUsers } from "@/hooks/use-users";
import type { User } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface UsersTableProps {
  onViewUser: (userId: string) => void;
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "createdAt", label: "Date" },
  { value: "role", label: "Role" },
];

export function UsersTable({ onViewUser }: UsersTableProps) {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const [rowSelection, setRowSelection] = useState({});

  const { users, totalPages, isLoading } = useUsers({
    search: searchQuery,
    status: statusFilter,
    sortBy,
    page,
    pageSize: 10,
  });

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={row.original.avatar || "/placeholder.svg"} />
              <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{row.original.name}</span>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <span className="capitalize text-gray-600">{row.original.role}</span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewUser(row.original.id)}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Eye className="h-4 w-4 text-gray-500" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        ),
      },
    ],
    [onViewUser],
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const handleSearch = () => {
    setSearchQuery(search);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            placeholder="Search by name, email, phone"
          />
        </div>
        <div className="flex items-center gap-3">
          <FilterDropdown
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
            placeholder="Sort by"
          />
          <FilterDropdown
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value);
              setPage(1);
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
                      <tr
                        key={headerGroup.id}
                        className="border-b border-gray-100"
                      >
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50"
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
              <DataTablePagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
