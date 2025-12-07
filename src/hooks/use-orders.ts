"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, myOrderFetch } from "@/lib/api";
import type { ApiFilters, PaginatedResponse } from "@/lib/types";
import { Order } from "@/lib/type/order";



export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/orders");
      return res.data.data; 
    },
  });
}

export function useUserOrders(userId?: string) {
  return useQuery({
    queryKey: ["userorders", userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await api.get(`/orders/user/${userId}`);
      return res.data.data; // assuming your API returns { data: [...] }
    },
    enabled: !!userId, // only run if userId exists
  });
}



// export function useOrder(id: string | null) {
//   const { data, error, isLoading } = useQuery<Order | null>({
//     queryKey: ["order", id],
//     queryFn: () => (id ? api.getOrderById(id) : null),
//     enabled: !!id,
//   });

//   return {
//     order: data,
//     isLoading,
//     error,
//   };
// }
