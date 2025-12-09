"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const [isPending, setIsPending] = useState(false);
  const [showPassword,setShowPassword]=useState(false)
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsPending(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        
        redirect: false,
      });

      console.log('SignIn Result:', result);

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      if (result?.ok && !result?.error) {
        router.push(callbackUrl);
        router.refresh();
      }
      console.log('user data',result)
    } catch (error) {
      console.error('Login error:', error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <AuthReusable>
      <div className="bg-white p-10 shadow-xl rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome!</h2>
        <p className="text-gray-500 text-center mb-6">
          Manage your orders, track shipments, and configure products easily.
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
                    <Input 
                      placeholder="example@example.com" 
                      {...field} 
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className=" relative">

                    <Input 
                      type={showPassword? "text":"password"} 
                      {...field} 
                      disabled={isPending}
                    />
                  <button type="button" 
                  onClick={()=> setShowPassword(!showPassword)}
                  className=" absolute right-3 top-1/2 -translate-y-1/2 text-shadow-gray-600"
                  >
                    {
                      showPassword ? <EyeOff size={20} /> :<Eye size={20} />
                    }
                  </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="remember"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  disabled={isPending}
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="/reset-your-password" className="text-[#5D5FEF] text-sm hover:underline">
                Forget Password
              </a>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 py-2 px-3 rounded border border-red-200">
                {error}
              </div>
            )}

            <Button 
              disabled={isPending} 
              className="w-full bg-gradient-to-r cursor-pointer from-pink-400 to-indigo-600 text-white hover:from-pink-500 hover:to-indigo-700 disabled:opacity-50"
              type="submit"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <p className="text-center mt-4 text-gray-600 text-sm">
          Don&apos;t have an account?
          <a 
            href="/create-your-account" 
            className="text-indigo-600 font-semibold ml-1 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </AuthReusable>
  );
}