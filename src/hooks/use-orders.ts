"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
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
  const { data, isLoading, error } = useOrders();

  const filtered = data?.filter((order: Order) => order._id === userId) ?? [];

  return {
    data: filtered[0],
    isLoading,
    error,
  };
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
