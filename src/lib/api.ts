import axios from "axios";
import { CreateAccountPayload, CreateAccountResponse } from "./type/auth";
// Mock API service layer
import type {
  User,
  // Order,
  Book,
  Payment,
  DashboardStats,
  RevenueData,
  PaginatedResponse,
  ApiFilters,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Export API methods wrapper
export const api = {
  // Dashboard
  getDashboardStats: () => apiFunction.getDashboardStats(),
  getRevenueData: () => apiFunction.getRevenueData(),
  // Users
  getUsers: (filters?: ApiFilters) => apiFunction.getUsers(filters),

  // Orders
  // getOrders: (filters?: ApiFilters) => apiFunction.getOrders(filters),
  // getOrderById: (id: string) => apiFunction.getOrderById(id),
  // Books
  getBooks: (filters?: ApiFilters) => apiFunction.getBooks(filters),
  deleteBook: (id: string) => apiFunction.deleteBook(id),
  // Payments
  getPayments: (filters?: ApiFilters) => apiFunction.getPayments(filters),
  // Auth & axios methods
  post: axiosInstance.post.bind(axiosInstance),
  get: axiosInstance.get.bind(axiosInstance),
  put: axiosInstance.put.bind(axiosInstance),
  delete: axiosInstance.delete.bind(axiosInstance),
  patch: axiosInstance.patch.bind(axiosInstance),
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data generators
// const generateUsers = (count: number): User[] => {
//   const names = [
//     "Ronald Richards",
//     "Jane Cooper",
//     "Floyd Miles",
//     "Darlene Robertson",
//     "Robert Fox",
//     "Marvin McKinney",
//     "Ralph Edwards",
//     "Jerome Bell",
//     "Cody Fisher",
//     "Cameron Williamson",
//     "Brooklyn Simmons",
//     "Leslie Alexander",
//     "Jenny Wilson",
//     "Guy Hawkins",
//     "Jacob Jones",
//   ];
//   const roles: User["role"][] = ["admin", "user", "moderator"];
//   const statuses: User["status"][] = ["active", "inactive", "suspended"];

//   return Array.from({ length: count }, (_, i) => ({
//     id: `user-${i + 1}`,
//     name: names[i % names.length],
//     email: `example@example.com`,
//     phone: "+1234567890",
//     avatar: `/placeholder.svg?height=40&width=40&query=avatar ${i}`,
//     role: roles[i % roles.length],
//     status: statuses[Math.floor(Math.random() * 3)],
//     createdAt: "14 November, 2025",
//     lastLogin: "14 November, 2025",
//   }));
// };

// Get reviews all with pagination and dynamic params
export async function getAllReview(page = 1, limit = 10) {
  try {
    const res = await api.get(`/reviews/all?page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching reviewss:", err);
    throw new Error("Failed to fetch all reviews with pagination");
  }
}

export async function createAccount(
  data: CreateAccountPayload,
): Promise<CreateAccountResponse> {
  try {
    const payload = {
      ...data,
      gender: data.gender ?? "Male",
    };

    const response = await api.post<CreateAccountResponse>(
      "/auth/register",
      payload,
    );
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}

export async function verifying(data: { email: string; otp: string }) {
  try {
    const response = await api.post("/auth/verify-otp", data); // Changed endpoint to verify-otp
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}

// lib/api/auth.ts - Corrected version
export async function userLogin(data: { email: string; password: string }) {
  try {
    const response = await api.post("/auth/login", data); // Changed to login endpoint
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}

export async function resetPassword(data: { email: string }) {
  try {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}

export async function verify(data: { email: string; otp: string }) {
  try {
    const response = await api.post("/auth/reset/password/verify-otp", data);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred");
  }
}

export async function newPassword(data: {
  newPassword: string;
  token: string;
}) {
  try {
    const response = await api.post(
      "auth/reset-password",
      { newPassword: data.newPassword },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    throw new Error(` ${err} ` || "Something went wrong");
  }
}

// create book
export async function createBook(data: {
  userId: string;
  title: string;
  language: string;
  style: string;
  genre: string;
  characters: { name: string; image: string }[];
  beginning: string;
}) {
  try {
    const res = await api.post(`/story/generate`, data);
    return res.data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("Unknown error occurred");
  }
}

// contact post

export async function createContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}) {
  try {
    const response = await api.post("/contact-us", data);
    return response.data;
  } catch (error) {
    throw new Error("Fail to Send Message");
  }
}

// image genarate

// lib/api.ts
export async function imageGenerate(data: FormData) {
  try {
    const res = await api.post("/image/ghibli", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Image upload failed: ${err.message}`);
    }
    throw new Error("Unknown error occurred");
  }
}

// recent book get

export async function recentBookFetch(id: string) {
  try {
    const res = await api.get(`/story/user/${id}`);
    const data = await res.data;
    console.log("respons data", data);
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
// single book
export async function SingleBookFetch(id: string) {
  try {
    const res = await api.get(`/story/${id}`);
    const data = await res.data;
    console.log("respons data", data);
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

//  my order

export async function myOrderFetch() {
  try {
    console.log("fuck");
    const res = await api.get(`/orders`);
    const data = await res.data;
    console.log("respons data", data);
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export async function SearchFetch(userId: string, search: string) {
  try {
    console.log("fuck");
    const res = await api.get(`/story/user/${userId}?/${search}`);
    const data = await res.data;
    console.log("respons data", data);
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

// const generateOrders = (count: number): Order[] => {
//   const names = [
//     "Ronald Richards",
//     "Jane Cooper",
//     "Floyd Miles",
//     "Darlene Robertson",
//     "Robert Fox",
//     "Marvin McKinney",
//     "Ralph Edwards",
//     "Jerome Bell",
//     "Cody Fisher",
//     "Cameron Williamson",
//   ];
//   const locations = [
//     "2715 Ash Dr. San Jose, S...",
//     "3517 W. Gray St...",
//     "2118 Thornridge...",
//     "4517 Washington...",
//     "1901 Thornridge...",
//     "8502 Preston R...",
//     "6391 Elgin St. C...",
//     "3891 Ranchvie...",
//     "4140 Parker Rd...",
//     "2972 Westheim...",
//   ];
//   const payments: Order["payment"][] = ["Paid", "Pending", "Cancelled"];
//   const statuses: Order["status"][] = [
//     "Delivered",
//     "In Progress",
//     "Pending",
//     "Cancelled",
//   ];

//   return Array.from({ length: count }, (_, i) => ({
//     id: `order-${i + 1}`,
//     invoiceNumber: `#${3066 - i}`,
//     customer: {
//       name: names[i % names.length],
//       email: `example@exa...`,
//       phone: "+1234567890",
//     },
//     location: locations[i % locations.length],
//     orderedItem: "Book Name H...",
//     price: Number.parseFloat((Math.random() * 500 + 200).toFixed(2)),
//     payment: payments[Math.floor(Math.random() * 3)],
//     status: statuses[Math.floor(Math.random() * 4)],
//     createdAt: "14 November, 2025",
//   }));
// };

const generateBooks = (count: number): Book[] => {
  const images = [
    "https://imgen.x.ai/xai-imgen/xai-tmp-imgen-140e117e-e39b-43be-9761-76741dd9f943.jpeg",
    "https://imgen.x.ai/xai-imgen/xai-tmp-imgen-2615a52f-c478-490d-a921-109f0d5d39b8.jpeg",
    "https://imgen.x.ai/xai-imgen/xai-tmp-imgen-3704d02c-2452-4052-8a33-376955c8404e.jpeg",
    "https://imgen.x.ai/xai-imgen/xai-tmp-imgen-1f899276-13c0-43ad-970c-6b1618d7dafc.jpeg",
  ];
  const genres = ["adventure", "fantasy", "sci-fi", "mystery"];
  const styles = ["fantasy", "realistic", "cartoon", "anime"];
  const languages = ["en", "es", "fr", "de"];

  return Array.from({ length: count }, (_, i) => ({
    _id: `book-${i + 1}`,
    userId: `user-${i + 1}`,
    title: `Story Name ${i + 1}`,
    language: languages[i % languages.length],
    style: styles[i % styles.length],
    genre: genres[i % genres.length],
    characters: [
      {
        name: "John",
        _id: `char-${i + 1}`,
      },
    ],
    beginning: "Story was about a boy who wants to be a software Engineer.",
    chapterCount: 4,
    generatedStory: Array.from({ length: 4 }, (_, j) => ({
      chapter: j + 1,
      title: `CHAPTER ${j + 1}: The Adventure Begins`,
      text: "Once upon a time...",
      audioUrl: null,
      _id: `chapter-${i + 1}-${j + 1}`,
      chapterImage: images[j % images.length],
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  }));
};

const generateRevenueData = (): RevenueData[] => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.map((month) => ({
    month,
    revenue: Math.floor(Math.random() * 150) + 50,
    orders: Math.floor(Math.random() * 100) + 20,
  }));
};

// API Functions
export const apiFunction = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    await delay(300);
    return {
      totalUsers: 1234,
      totalOrders: 1234,
      revenue: 1234,
      storiesCreated: 1234,
      percentageChange: {
        users: 36,
        orders: 36,
        revenue: 36,
        stories: 36,
      },
    };
  },

  getRevenueData: async (): Promise<RevenueData[]> => {
    await delay(300);
    return generateRevenueData();
  },

  // Users
  getUsers: async (
    filters: ApiFilters = {},
  ): Promise<PaginatedResponse<User>> => {
    const { page = 1, pageSize = 10 } = filters;
    const res = await api.get(`/user?page=${page}&limit=${pageSize}`);

    // The API response structure is:
    // {
    //   success: true,
    //   message: "Users retrieved successfully",
    //   data: {
    //     users: User[],
    //     total: number,
    //     page: number,
    //     limit: number,
    //     totalPages: number
    //   }
    // }

    const responseData = res.data?.data;

    return {
      data: responseData?.users || [],
      total: responseData?.total || 0,
      page: responseData?.page || page,
      pageSize: responseData?.limit || pageSize,
      totalPages: responseData?.totalPages || 0,
    };
  },

  // getUserById: async (id: string): Promise<User | null> => {
  //   await delay(200);
  //   const users = generateUsers(100);
  //   return users.find((u) => u.id === id) || null;
  // },

  // Orders
  // getOrders: async (
  //   filters: ApiFilters = {},
  // ): Promise<PaginatedResponse<Order>> => {
  //   await delay(300);
  //   const {
  //     page = 1,
  //     pageSize = 10,
  //     search,
  //     status,
  //     sortBy,
  //     sortOrder,
  //   } = filters;
  //   let orders = generateOrders(100);

  //   if (search) {
  //     orders = orders.filter(
  //       (o) =>
  //         o.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
  //         o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
  //         o.customer.email.toLowerCase().includes(search.toLowerCase()),
  //     );
  //   }

  //   if (status && status !== "all") {
  //     orders = orders.filter((o) => o.status === status);
  //   }

  //   if (sortBy) {
  //     orders.sort((a, b) => {
  //       const aVal = a[sortBy as keyof Order];
  //       const bVal = b[sortBy as keyof Order];
  //       if (sortOrder === "desc") {
  //         return String(bVal).localeCompare(String(aVal));
  //       }
  //       return String(aVal).localeCompare(String(bVal));
  //     });
  //   }

  //   const total = orders.length;
  //   const start = (page - 1) * pageSize;
  //   const data = orders.slice(start, start + pageSize);

  //   return {
  //     data,
  //     total,
  //     page,
  //     pageSize,
  //     totalPages: Math.ceil(total / pageSize),
  //   };
  // },

  // getOrderById: async (id: string): Promise<Order | null> => {
  //   await delay(200);
  //   const orders = generateOrders(100);
  //   return orders.find((o) => o.id === id) || null;
  // },

  // Books
  getBooks: async (
    filters: ApiFilters = {},
  ): Promise<PaginatedResponse<Book>> => {
    // await delay(300);
    const { page = 1, pageSize = 10, search } = filters;

    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        ...(search && { search }),
      });

      const res = await api.get(`/story?${queryParams.toString()}`);

      // The API response structure matches the example provided
      const responseData = res.data;

      if (responseData.success && responseData.data) {
        return {
          data: responseData.data.stories,
          total: responseData.data.total,
          page: responseData.data.page,
          pageSize: responseData.data.limit,
          totalPages: responseData.data.totalPages,
        };
      }

      // Fallback if response structure is unexpected but successful
      return {
        data: [],
        total: 0,
        page,
        pageSize,
        totalPages: 0,
      };
    } catch (error) {
      console.error("Failed to fetch books:", error);
      // Fallback to mock data if API fails (or for development if API is not ready)
      // Remove this fallback if you want to strictly use the API

      let books = generateBooks(10); // Generate fewer mock items for fallback

      if (search) {
        books = books.filter((b) =>
          b.title.toLowerCase().includes(search.toLowerCase()),
        );
      }

      const total = books.length;
      // Mock pagination
      // const start = (page - 1) * pageSize;
      // const data = books.slice(start, start + pageSize);

      return {
        data: books,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    }
  },

  deleteBook: async (id: string): Promise<boolean> => {
    await delay(300);
    console.log("Deleting book:", id);
    return true;
  },

  // Payments
  getPayments: async (
    filters: ApiFilters = {},
  ): Promise<PaginatedResponse<Payment>> => {
    const { page = 1, pageSize = 10 } = filters;

    try {
      const res = await api.get(`/payments?page=${page}&limit=${pageSize}`);
      const responseData = res.data;

      if (responseData.success && responseData.data) {
        return {
          data: responseData.data.payments,
          total: responseData.data.total,
          page: responseData.data.page,
          pageSize: responseData.data.limit,
          totalPages: responseData.data.totalPages,
        };
      }

      return {
        data: [],
        total: 0,
        page,
        pageSize,
        totalPages: 0,
      };
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      return {
        data: [],
        total: 0,
        page,
        pageSize,
        totalPages: 0,
      };
    }
  },
};
