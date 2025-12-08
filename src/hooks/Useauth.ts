"use client";

import { useMutation } from "@tanstack/react-query";

import {
  CreateAccountPayload,
  CreateAccountResponse,
  ResetPasswordResponse,
} from "@/lib/type/auth";
import { createAccount, resetPassword, newPassword } from "@/lib/api";

export const useCreateAccount = () =>
  useMutation<CreateAccountResponse, Error, CreateAccountPayload>({
    mutationKey: ["create-account"],
    mutationFn: (data) => createAccount(data),
  });

export function useResetPassword() {
  return useMutation<ResetPasswordResponse, Error, { email: string }>({
    mutationFn: resetPassword,
  });
}

export function useNewPassword() {
  return useMutation<
    ResetPasswordResponse,
    Error,
    { newPassword: string; token: string }
  >({
    mutationFn: newPassword,
  });
}
