"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ApiFilters, PaginatedResponse, User } from "@/lib/types";

export function useUsers(filters: ApiFilters = {}) {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<PaginatedResponse<User>>({
    queryKey: ["users", filters],
    queryFn: () => api.getUsers(filters),
    placeholderData: (previousData) => previousData,
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  return {
    users: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    error,
    mutate: refetch,
  };
}
