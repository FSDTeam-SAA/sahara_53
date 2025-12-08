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
import { getSession } from "next-auth/react";




const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    } else {
      console.warn("No token in session");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add Authorization header automatically
axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" 
    ? localStorage.getItem("accessToken")
    : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
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
//user update

export async function userProfileUpdate(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
}) {
  try {
    console.log("Updating profile...");

    // Convert to the format your API expects
    const apiData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    };

    const res = await api.patch(`/user/me`, apiData);
    const data = await res.data;
    console.log("Response data", data);
    return data;
  } catch (err) {
    console.error("Update failed:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Failed to update profile");
  }
}

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

// API Functions
export const apiFunction = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    const res = await api.get("/statistics/dashboard");
    return res.data?.data;
  },

  getRevenueData: async (): Promise<RevenueData[]> => {
    const res = await api.get("/statistics/monthly-revenue");
    return res.data?.data || [];
  },

  // Users
  getUsers: async (
    filters: ApiFilters = {},
  ): Promise<PaginatedResponse<User>> => {
    const { page = 1, pageSize = 10 } = filters;
    const res = await api.get(`/user?page=${page}&limit=${pageSize}`);
    const responseData = res.data?.data;

    return {
      data: responseData?.users || [],
      total: responseData?.total || 0,
      page: responseData?.page || page,
      pageSize: responseData?.limit || pageSize,
      totalPages: responseData?.totalPages || 0,
    };
  },

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
