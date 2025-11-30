"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ApiFilters, PaginatedResponse, Payment } from "@/lib/types";

export function usePayments(filters: ApiFilters = {}) {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<PaginatedResponse<Payment>>({
    queryKey: ["payments", filters],
    queryFn: () => api.getPayments(filters),
    placeholderData: (previousData) => previousData,
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["payments"] });
  };

  return {
    payments: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    error,
    mutate: refetch,
  };
}
