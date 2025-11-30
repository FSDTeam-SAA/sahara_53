"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthReusable from "./authreuseable";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useNewPassword } from "@/lib/hoock/Useauth";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z
  .object({
    password: z.string().min(6, "Min 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function CreateNewPassword() {
  const { mutate, isPending } = useNewPassword();
  const route=useRouter()
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: FormValues) {
    mutate(
      { newPassword: values.password },
      {
        onSuccess: () => {
          alert("Password updated successfully!");
          route.push("/login")
        },
        onError: (err) => {
          alert(err.message || "Something went wrong");
        },
      }
    );
  }

  return (
    <AuthReusable>
      <div className="bg-white p-10 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-2">Create New Password</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your new password below.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="Enter new password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="Confirm password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              className="w-full bg-gradient-to-r from-pink-400 to-indigo-600 text-white"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </div>
    </AuthReusable>
  );
}
