"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AuthReusable from "./authreuseable";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { verify } from "@/lib/api";

const formSchema = z.object({
  code: z.string().length(6, "Please enter the 6-digit code"),
});

type FormValues = z.infer<typeof formSchema>;

// Type for the API response
interface VerifyResponse {
  success: boolean;
  message: string;
  data: {
    resetToken: string;
  };
}

export default function VerifyOTP() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });

  // Get email from query params
  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) setEmail(emailFromParams);
  }, [searchParams]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(30);
    setCanResend(false);
    form.setValue("code", "");
    inputRefs.current[0]?.focus();
  };

  // OTP input handlers
  const handleChange = (index: number, value: string) => {
    const currentCode = form.getValues("code") || "";
    const newCode = currentCode.split("");
    newCode[index] = value;
    form.setValue("code", newCode.join(""));
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      e.key === "Backspace" &&
      !form.getValues("code")?.[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasted)) {
      form.setValue("code", pasted);
      inputRefs.current[Math.min(5, pasted.length - 1)]?.focus();
    }
  };

  // TanStack Mutation
  const mutation = useMutation<
    VerifyResponse,
    Error,
    { email: string; otp: string }
  >({
    mutationFn: (data) => verify(data),
    onSuccess: (res) => {
      const token = res.data.resetToken;
      if (token) router.push(`/create-new-password?token=${token}`);
      else alert("No token returned from server.");
    },
    onError: (error) => {
      form.setError("code", { type: "manual", message: error.message });
    },
  });

  const currentCode = form.watch("code") || "";

  const onSubmit = (values: FormValues) => {
    if (!email) {
      form.setError("code", { type: "manual", message: "Email not found." });
      return;
    }
    mutation.mutate({ email, otp: values.code });
  };

  return (
    <AuthReusable>
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-2">
          Verify Your Account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter the 6-digit code sent to your email.
        </p>

        {email && (
          <p className="text-center text-sm text-gray-500 mb-4">
            Code sent to: <strong>{email}</strong>
          </p>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div
                      className="flex justify-center space-x-2"
                      onPaste={handlePaste}
                    >
                      {[...Array(6)].map((_, index) => (
                        <Input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el ?? null;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          className="w-12 h-12 text-center text-xl font-semibold"
                          value={currentCode[index] || ""}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            if (val.length <= 1) handleChange(index, val);
                          }}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-4">
                {timeLeft > 0 ? (
                  <>00:{timeLeft.toString().padStart(2, "0")}</>
                ) : (
                  <>Code expired</>
                )}
              </div>
              <Button
                type="button"
                variant="link"
                className="text-blue-600 p-0"
                onClick={handleResend}
                disabled={!canResend}
              >
                Didn’t receive a code? Resend
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-pink-400 to-indigo-600 text-white"
              // disabled={mutation.isMutating || currentCode.length !== 6} // ✅ use isMutating instead of isLoading
            >
              {"Verify"}
            </Button>
          </form>
        </Form>
      </div>
    </AuthReusable>
  );
}
