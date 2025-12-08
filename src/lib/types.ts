// Core types for the admin dashboard

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  totalStories: number;
}

// export interface Order {
//   private _id(_id: any): void
//   userId: any
//   id: string
//   invoiceNumber: string
//   customer: {
//     name: string
//     email: string
//     phone: string
//   }
//   location: string
//   orderedItem: string
//   price: number
//   payment: "Paid" | "Pending" | "Cancelled"
//   status: "Delivered" | "In Progress" | "Pending" | "Cancelled"
//   createdAt: string
// }

export interface Book {
  _id: string;
  userId: string;
  title: string;
  language: string;
  style: string;
  genre: string;
  characters: {
    name: string;
    _id: string;
  }[];
  beginning: string;
  chapterCount: number;
  generatedStory: {
    chapter: number;
    title: string;
    text: string;
    audioUrl: string | null;
    _id: string;
    chapterImage?: string;
  }[];
  createdAt: string;
  updatedAt: string;
  voiceId?: string;
  __v?: number;
}

export interface Payment {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNum: string | null;
  };
  orderId: string;
  totalAmount: number;
  status: string;
  sessionId: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  revenue: number;
  storiesCreated: number;
  percentageChange: {
    users: number;
    orders: number;
    revenue: number;
    stories: number;
  };
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiFilters {
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}
