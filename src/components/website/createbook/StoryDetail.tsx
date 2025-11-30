"use client";

import React from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the form data type
interface StoryFormValues {
  bookTitle: string;
  language: string;
  writingStyle: string;
  genre: string;
}

const StoryDetail = () => {
  const form = useForm<StoryFormValues>({
    defaultValues: {
      bookTitle: "",
      language: "",
      writingStyle: "",
      genre: "",
    },
  });

  // Fixed: use correct type
  function onSubmit(data: StoryFormValues) {
    console.log(data);
    // Handle form submission
  }

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
  ];

  const writingStyleOptions = [
    { value: "formal", label: "Formal" },
    { value: "casual", label: "Casual" },
    { value: "professional", label: "Professional" },
    { value: "creative", label: "Creative" },
  ];

  const genreOptions = [
    { value: "fiction", label: "Fiction" },
    { value: "non-fiction", label: "Non-Fiction" },
    { value: "mystery", label: "Mystery" },
    { value: "romance", label: "Romance" },
    { value: "sci-fi", label: "Science Fiction" },
  ];

  return (
    <div className="w-full">
      {/* HEADER TITLE */}
      <h2
        className="text-2xl font-bold flex items-center gap-2"
        style={{
          background: "linear-gradient(135deg, #FB923C 0%, #EC4899 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        <span className="text-3xl">✨</span>
        Story Details
      </h2>

      {/* CONTENT WRAPPER */}
      <div className="mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Book Title Field */}
            <FormField
              control={form.control}
              name="bookTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Book Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write here..."
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Language Field */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Language
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value} // controlled value
                  >
                    <FormControl>
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <SelectValue placeholder="Select from here" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Writing Style & Genre Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-between">
              <FormField
                control={form.control}
                name="writingStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Writing Style
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                          <SelectValue placeholder="Select from here" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {writingStyleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Genre
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                          <SelectValue placeholder="Select from here" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genreOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            {/* <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              Submit
            </button> */}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StoryDetail;
