"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout";
import { Header } from "@/components/dashboard/layout/header";
import { OrdersTable } from "@/components/dashboard/orders/orders-table";
import { OrderDetailModal } from "@/components/dashboard/modals/order-detail-modal";

export default function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <Header title="Orders" />
      <OrdersTable onViewOrder={setSelectedOrderId} />
      <OrderDetailModal
        orderId={selectedOrderId}
        open={!!selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
      />
    </DashboardLayout>
  );
}
