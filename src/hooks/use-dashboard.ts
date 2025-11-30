"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { DashboardStats, RevenueData } from "@/lib/types";

export function useDashboardStats() {
  const { data, error, isLoading } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.getDashboardStats(),
  });

  return {
    stats: data,
    isLoading,
    error,
  };
}

export function useRevenueData() {
  const { data, error, isLoading } = useQuery<RevenueData[]>({
    queryKey: ["revenue-data"],
    queryFn: () => api.getRevenueData(),
  });

  return {
    revenueData: data ?? [],
    isLoading,
    error,
  };
}
