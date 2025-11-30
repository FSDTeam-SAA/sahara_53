"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ApiFilters, PaginatedResponse, Order } from "@/lib/types";

export function useOrders(filters: ApiFilters = {}) {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<PaginatedResponse<Order>>({
    queryKey: ["orders", filters],
    queryFn: () => api.getOrders(filters),
    placeholderData: (previousData) => previousData,
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  return {
    orders: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    error,
    mutate: refetch,
  };
}

export function useOrder(id: string | null) {
  const { data, error, isLoading } = useQuery<Order | null>({
    queryKey: ["order", id],
    queryFn: () => (id ? api.getOrderById(id) : null),
    enabled: !!id,
  });

  return {
    order: data,
    isLoading,
    error,
  };
}
