"use client";

import { useState } from "react";

import { useDashboardStats } from "@/hooks/use-dashboard";
import { useOrders } from "@/hooks/use-orders";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout";
import { Header } from "@/components/dashboard/layout/header";
import { StatsCard } from "@/components/dashboard/dashboard/stats-card";
import { RecentOrdersTable } from "@/components/dashboard/dashboard/recent-orders-table";
import { RevenueChart } from "@/components/dashboard/dashboard/revenue-chart";
import { OrderDetailModal } from "@/components/dashboard/modals/order-detail-modal";

export default function DashboardPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { stats, isLoading: statsLoading } = useDashboardStats();
  const { data: orders, isLoading: ordersLoading } = useOrders();

  return (
    <DashboardLayout>
      <Header title="Dashboard" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))
        ) : stats ? (
          <>
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              // percentageChange={stats.percentageChange.users}
            />
            <StatsCard
              title="Total Orders"
              value={stats.totalOrders}
              // percentageChange={stats.percentageChange.orders}
            />
            <StatsCard
              title="Revenue"
              value={stats.revenue}
              // percentageChange={stats.percentageChange.revenue}
            />
            <StatsCard
              title="Stories Created"
              value={stats.storiesCreated}
              // percentageChange={stats.percentageChange.stories}
              // prefix="$"
            />
          </>
        ) : null}
      </div>

      {/* Revenue Chart */}
      <div className="mb-6">
        <RevenueChart />
      </div>

      {/* Recent Orders */}
      {ordersLoading ? (
        <Skeleton className="h-[500px] rounded-xl" />
      ) : (
        <RecentOrdersTable orders={orders} onViewOrder={setSelectedOrderId} />
      )}

      {/* Order Detail Modal */}
      <OrderDetailModal
        orderId={selectedOrderId}
        open={!!selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
      />
    </DashboardLayout>
  );
}
