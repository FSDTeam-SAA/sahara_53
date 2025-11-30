
'use client'

import { useMutation } from "@tanstack/react-query";
import { createAccount, newPassword, resetPassword } from "../api";
import { CreateAccountPayload, CreateAccountResponse } from "../type/auth";


export const useCreateAccount = () =>
  useMutation<CreateAccountResponse, Error, CreateAccountPayload>({
    mutationKey: ["create-account"],
    mutationFn: (data) => createAccount(data),
  });


export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}

export function useNewPassword() {
  return useMutation({
    mutationFn: newPassword,
  });
}