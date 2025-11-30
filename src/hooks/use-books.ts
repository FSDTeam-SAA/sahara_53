"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ApiFilters, PaginatedResponse, Book } from "@/lib/types";

export function useBooks(filters: ApiFilters = {}) {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<PaginatedResponse<Book>>({
    queryKey: ["books", filters],
    queryFn: () => api.getBooks(filters),
    placeholderData: (previousData) => previousData,
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["books"] });
  };

  return {
    books: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    error,
    mutate: refetch,
  };
}
