"use client";

import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout";
import { Header } from "@/components/dashboard/layout/header";
import { PaymentsTable } from "@/components/dashboard/payments/payments-table";

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <Header title="Payments" />
      <PaymentsTable />
    </DashboardLayout>
  );
}
