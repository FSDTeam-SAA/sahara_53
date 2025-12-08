"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout";
import { Header } from "@/components/dashboard/layout/header";
import { UsersTable } from "@/components/dashboard/users/users-table";
import { UserDetailModal } from "@/components/dashboard/modals/user-detail-modal";

import type { User } from "@/lib/types";

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <DashboardLayout>
      <Header title="Users" />
      <UsersTable onViewUser={setSelectedUser} />
      <UserDetailModal
        user={selectedUser}
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </DashboardLayout>
  );
}
