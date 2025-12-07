"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout";
import { Header } from "@/components/dashboard/layout/header";
import { OrdersTable } from "@/components/dashboard/orders/orders-table";
import { OrderDetailModal } from "@/components/dashboard/modals/order-detail-modal";
import { CreateBookHeader } from "@/components/ReusableSection/page-header";
import MyOrder from "@/components/website/myorder/MyOrder";

export default function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  return (
    <section className="mx-auto m-8 w-[95%] flex flex-col justify-between  space-y-8">
    <CreateBookHeader
          title="My"
          highlightedWord="Orders"
          subtitle="Track your purchases, downloads, and order status in one place."
        />
      <MyOrder  />
      {/* <OrderDetailModal
        orderId={selectedOrderId}
        open={!!selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
      /> */}
    </section>
  );
}
