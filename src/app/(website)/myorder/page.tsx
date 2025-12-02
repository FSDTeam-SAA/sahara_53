"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout";
import { Header } from "@/components/dashboard/layout/header";
import { OrdersTable } from "@/components/dashboard/orders/orders-table";
import { OrderDetailModal } from "@/components/dashboard/modals/order-detail-modal";
import { CreateBookHeader } from "@/components/ReusableSection/page-header";

export default function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  return (
    <DashboardLayout>
    <CreateBookHeader
          title="My"
          highlightedWord="Orders"
          subtitle="Track your purchases, downloads, and order status in one place."
        />
      <OrdersTable onViewOrder={setSelectedOrderId} />
      <OrderDetailModal
        orderId={selectedOrderId}
        open={!!selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
      />
    </DashboardLayout>
  );
}
