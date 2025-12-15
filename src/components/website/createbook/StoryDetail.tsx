"use client";
"use no memo";

import React, { useEffect, useRef } from "react";
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

// Define props interface
interface StoryDetailProps {
  data: Partial<StoryFormValues>;
  onChange: (data: StoryFormValues) => void;
}

const StoryDetail: React.FC<StoryDetailProps> = ({ data, onChange }) => {
  const form = useForm<StoryFormValues>({
    defaultValues: {
      bookTitle: "",
      language: "",
      writingStyle: "",
      genre: "",
      ...data, // Spread existing data if any
    },
  });

  const lastValueRef = useRef<string>("");

  // Watch form changes and call onChange only when values actually change
  useEffect(() => {
    const subscription = form.watch((value) => {
      const currentValue = JSON.stringify(value);
      // Only call onChange if the value has actually changed
      if (lastValueRef.current !== currentValue) {
        lastValueRef.current = currentValue;
        const formValues = form.getValues();
        onChange({
          bookTitle: formValues.bookTitle || "",
          language: formValues.language || "",
          writingStyle: formValues.writingStyle || "",
          genre: formValues.genre || "",
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  // Reset form when data changes
  useEffect(() => {
    if (data) {
      form.reset({
        bookTitle: data.bookTitle || "",
        language: data.language || "",
        writingStyle: data.writingStyle || "",
        genre: data.genre || "",
      });
    }
  }, [data, form]);

  // Form submission handler
  const onSubmit = (data: StoryFormValues) => {
    console.log("Form submitted:", data);
  };

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "hindi", label: "Hindi" },
    { value: "chinese", label: "Chinese" },
    { value: "japanese", label: "Japanese" },
    { value: "Banglish", label: "Bangla" },

  ];

  const writingStyleOptions = [
    { value: "formal", label: "Formal" },
    { value: "casual", label: "Casual" },
    { value: "professional", label: "Professional" },
    { value: "creative", label: "Creative" },
    { value: "academic", label: "Academic" },
    { value: "conversational", label: "Conversational" },
    { value: "descriptive", label: "Descriptive" },
    { value: "narrative", label: "Narrative" },
  ];

  const genreOptions = [
    { value: "fiction", label: "Fiction" },
    { value: "non-fiction", label: "Non-Fiction" },
    { value: "mystery", label: "Mystery" },
    { value: "romance", label: "Romance" },
    { value: "sci-fi", label: "Science Fiction" },
    { value: "fantasy", label: "Fantasy" },
    { value: "thriller", label: "Thriller" },
    { value: "horror", label: "Horror" },
    { value: "biography", label: "Biography" },
    { value: "history", label: "History" },
    { value: "children", label: "Children's" },
    { value: "young-adult", label: "Young Adult" },
  ];

  return (
    <div className="w-full z-50 ">
      <h2 className="text-2xl md:text-4xl font-bold flex items-center gap-2 mb-6">
        <span className="text-3xl">✨</span>

        <span
          className="inline-block"
          style={{
            background: "linear-gradient(135deg, #FB923C 0%, #EC4899 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Story Details
        </span>
      </h2>

      {/* CONTENT WRAPPER */}
      <div className="mt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Form {...form}>
            {/* Book Title Field */}
            <FormField
              control={form.control}
              name="bookTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm leading-[150%]  font-medium text-[#2B2B2B]">
                    Book Title
                  </FormLabel>
                  <FormControl>
                    {/* <Input
                      placeholder="Enter your story title..."
                      {...field}
                      className="w-full px-3 py-6 border border-gray-300 rounded-md  focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      type="text"
                      // value={field.value || ""}
                    /> */}

                    <Input
                      placeholder="Enter your story title..."
                      {...field} // শুধু এইটাই যথেষ্ট
                      className="w-full px-3 py-6 border border-gray-300 rounded-md  focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      type="text"
                      // autoComplete="off"
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
                  <FormLabel className="text-sm leading-[150%]  font-medium text-[#2B2B2B]">
                    Language
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full px-3 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <SelectValue placeholder="Select language" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="writingStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm leading-[150%]  font-medium text-[#2B2B2B]">
                      Writing Style
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full px-3 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                          <SelectValue placeholder="Select style" />
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
                    <FormLabel className="text-sm leading-[150%]  font-medium text-[#2B2B2B]">
                      Genre
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full px-3 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                          <SelectValue placeholder="Select genre" />
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

            {/* Required fields note */}
            {/* <div className="text-sm text-gray-500 mt-4">
              <p>* Required fields</p>
            </div> */}
          </Form>
        </form>
      </div>
    </div>
  );
};

export default StoryDetail;