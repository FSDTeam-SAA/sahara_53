"use client";

import { recentBookFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useMyOrder(id?: string) {
  return useQuery({
    queryKey: ["myorder", id],
    queryFn: () => recentBookFetch(id!),
    enabled: !!id, // only run when id exists
  });
}
