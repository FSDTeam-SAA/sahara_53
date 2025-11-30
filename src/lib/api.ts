import axios from "axios";
import { error } from "console";
import { CreateAccountPayload, CreateAccountResponse } from "./type/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

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


export async function createAccount(data: CreateAccountPayload): Promise<CreateAccountResponse> {
  try {
    const payload = {
      ...data,
      gender: data.gender ?? "Male", 
    };

    const response = await api.post<CreateAccountResponse>("/auth/register", payload);
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



export async function verify(data: { email: string,otp:string }) {
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

export async function newPassword(data: { newPassword: string }) {
  try {
    const response = await api.post("auth/reset-password", data);
    return response.data;
  } catch (err) {
    throw new Error(` ${err} `|| "Something went wrong");
  }
}