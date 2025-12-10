"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { createContact } from "@/lib/api";
import { error } from "console";

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(1, "Message is required"),
  // agree: z.boolean().refine((val) => val === true, {
  //   message: "You must agree to the terms and conditions",
  // }),
});

const SentMessage = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
      // agree: false,
    },
  });

const sentMessageMutation = useMutation({
  mutationKey: ["sentMessage"],

  mutationFn: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
    agree?: boolean; // ignored by backend
  }) => createContact(data),

  onError: (err: Error) => {
    setLoading(false);
    toast.error(err.message);
  },

  onSuccess: () => {
    setLoading(false);
    toast.success("Message sent successfully");
  },
});

function onSubmit(values: z.infer<typeof formSchema>) {
  sentMessageMutation.mutate(values);
}


  return (
    <section>
      <div className="container mx-auto my-16 md:my-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-16 px-4 items-center">
          {/* Image */}
          <div>
            <Image
              src="/images/contact.jpg"
              alt="sent message"
              width={735}
              height={890}
              className="w-full aspect-5/5 object-cover rounded-2xl"
            />
          </div>

          {/* Form */}
          <div>
            <h2 className="text-[#181D27] text-2xl md:text-4xl mb-3 font-semibold font-serif">
              Contact us
            </h2>
            <p className="text-[#717680] mb-8 md:mb-10 leading-relaxed text-sm md:text-base lg:text-xl">
              Our friendly team would love to hear from you.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="First Name"
                            {...field}
                            className="py-5 rounded-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Last Name"
                            {...field}
                            className="py-5 rounded-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@company.com"
                          {...field}
                          className="py-5 rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1234567890"
                          {...field}
                          className="py-5 rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your message here..."
                          {...field}
                          className="h-[150px] rounded-sm align-top"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Agree Checkbox */}
                {/* <FormField
                  control={form.control}
                  name="agree"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <span className="text-sm text-gray-600">
                        You agree to our{" "}
                        <Link
                          href="/terms-and-conditions"
                          target="_blank"
                          className="text-green-600 underline"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy-policy"
                          target="_blank"
                          className="text-green-600 underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="
    w-full cursor-pointer rounded-sm text-white 
    bg-gradient-to-r from-[#FF7CE5] to-[#5D5FEF]
    hover:opacity-90
    disabled:opacity-50 disabled:cursor-not-allowed
  "
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SentMessage;
