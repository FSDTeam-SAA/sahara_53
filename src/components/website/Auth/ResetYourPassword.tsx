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
import { useResetPassword } from "@/lib/hoock/Useauth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
});

export default function ResetYourPassword() {
  const router = useRouter();
  const { mutate, isPending } = useResetPassword();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: { email: string }) {
    mutate(
      { email: values.email },
      {
        onSuccess: () => {
          alert("Reset code sent to your email!");
          router.push(`/verify-otp?email=${values.email}`);
        },
        onError: (error) => {
          alert(error.message || "Something went wrong");
        },
      }
    );
  }

  return (
    <AuthReusable>
      <div className="bg-white p-10 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-2">
          Reset Your Password
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your email address and we’ll send you a code to reset your
          password.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              className="w-full bg-gradient-to-r from-pink-400 to-indigo-600 text-white"
            >
              {isPending ? "Sending code..." : "Send Code"}
            </Button>
          </form>
        </Form>
      </div>
    </AuthReusable>
  );
}
