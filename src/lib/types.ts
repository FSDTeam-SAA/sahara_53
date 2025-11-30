// Core types for the admin dashboard

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  role: "admin" | "user" | "moderator"
  status: "active" | "inactive" | "suspended"
  createdAt: string
  lastLogin?: string
}

export interface Order {
  id: string
  invoiceNumber: string
  customer: {
    name: string
    email: string
    phone: string
  }
  location: string
  orderedItem: string
  price: number
  payment: "Paid" | "Pending" | "Cancelled"
  status: "Delivered" | "In Progress" | "Pending" | "Cancelled"
  createdAt: string
}

export interface Book {
  id: string
  title: string
  description: string
  image: string
  status: "Completed" | "In Progress" | "Draft"
  category: string
  chapters: number
  createdAt: string
}

export interface Payment {
  id: string
  amount: number
  customerName: string
  email: string
  phone: string
  date: string
  status: "Succeeded" | "Pending" | "Failed"
}

export interface DashboardStats {
  totalUsers: number
  totalOrders: number
  revenue: number
  storiesCreated: number
  percentageChange: {
    users: number
    orders: number
    revenue: number
    stories: number
  }
}

export interface RevenueData {
  month: string
  revenue: number
  orders: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiFilters {
  search?: string
  status?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  page?: number
  pageSize?: number
}
