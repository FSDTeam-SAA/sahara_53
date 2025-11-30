"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"
import { Header } from "@/components/dashboard/layout/header"
import { UsersTable } from "@/components/dashboard/users/users-table"
import { UserDetailModal } from "@/components/dashboard/modals/user-detail-modal"

export default function UsersPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  return (
    <DashboardLayout>
      <Header title="Users" />
      <UsersTable onViewUser={setSelectedUserId} />
      <UserDetailModal userId={selectedUserId} open={!!selectedUserId} onClose={() => setSelectedUserId(null)} />
    </DashboardLayout>
  )
}
