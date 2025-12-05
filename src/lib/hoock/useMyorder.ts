"use client";

import { useQuery } from "@tanstack/react-query";
import { recentBookFetch } from "../api";

export function useMyOrder(id?: string) {
  return useQuery({
    queryKey: ["myorder", id],
    queryFn: () => recentBookFetch(id!),
    enabled: !!id, // only run when id exists
  });
}
