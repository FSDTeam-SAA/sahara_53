"use client"

import { BooksGrid } from "@/components/dashboard/books/books-grid"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"
import { Header } from "@/components/dashboard/layout/header"



export default function BooksPage() {
  return (
    <DashboardLayout>
      <Header title="Books" />
      <BooksGrid />
    </DashboardLayout>
  )
}
