"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Headphones,
  ShoppingCart,
  SquarePen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { OrderCreate, paymentCreate } from "@/lib/api";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { IBook } from "@/lib/type/book";
import { handleDownloadEpub } from "./epub";

export interface BookDetails {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  language: string;
  type: string;
  chapters: number;
  status: "Completed" | "In Progress" | "Draft";
  price?: number;
}

interface ReviewBookProps {
  books: IBook;
  book: BookDetails | null;
  onEdit?: () => void;
  onListen?: () => void;
}

export function ReviewBook({ books, book, onEdit, onListen }: ReviewBookProps) {
  const userId = useSession().data?.user.id || "";
  const paymentMutation = useMutation({
    mutationKey: ["createorder"],
    mutationFn: paymentCreate,
    onSuccess: (data) => {
      // toast.success(data?.message || "Payment created successfully!");
      toast.success(data?.message || "Order created successfully!");
      if (data?.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Payment failed");
    },
  });

  const orderMutation = useMutation({
    mutationKey: ["createorder"],
    mutationFn: OrderCreate,
    onSuccess: (data) => {
      console.log("order Id", data);
      paymentMutation.mutate({
        userId,
        orderId: data?.data?._id,
        totalAmount: Number(book?.price),
      });
    },
    onError: (error) => {
      toast.error(error?.message || "Order failed");
    },
  });

  console.log("books", book);

  if (!book) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Book not found
          </h1>
          <Link href="/books">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Books
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = async () => {
    // if (!books) return;

    // try {
    //   const epubOptions = {
    //     title: books.title,
    //     author: books.characters?.[0]?.name || "Unknown",
    //     language: books.language || "en",
    //     content: books.generatedStory.map((ch: any) => ({
    //       title: ch.title,
    //       data: `
    //         <h2>${ch.title}</h2>
    //         <p>${ch.text.replace(/\n/g, "<br/>")}</p>

    //         ${
    //           ch.audioUrl
    //             ? `<p><b>Audio Version:</b> <a href="${ch.audioUrl}">Click to listen</a></p>`
    //             : ""
    //         }

    //         ${
    //           ch.chapterImage
    //             ? `<img src="${ch.chapterImage}" style="width:100%;margin-top:10px;" />`
    //             : ""
    //         }
    //       `,
    //     })),
    //   };

    //   // Generate EPUB file in-memory
    //   const epubFile = await epub(epubOptions);

    //   // Trigger browser download
    //   const blob = new Blob([epubFile], { type: "application/epub+zip" });
    //   const url = URL.createObjectURL(blob);

    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = `${books.title}.epub`;
    //   a.click();

    //   URL.revokeObjectURL(url);

    //   console.log("EPUB downloaded");
    // } catch (err) {
    //   console.error("EPUB error:", err);
    // }

    handleDownloadEpub(books);
  };

  const handleOrder = () => {
    orderMutation.mutate({
      userId,
      storyBookId: book.id,
      formate: "ebook",
      price: String(book?.price),
    });
  };

  console.log("single book image ", book);

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <Link href="/">
          <Button variant="ghost" className="gap-2 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Books
          </Button>
        </Link>
        {onEdit && (
          <Button
            onClick={onEdit}
            className="bg-transparent border border-purple-600 hover:bg-purple-50 text-transparent bg-linear-to-r from-[#FF7CE5] to-[#5D5FEF] bg-clip-text flex items-center gap-2 cursor-pointer"
          >
            <SquarePen className="text-purple-600" />
            <span className="bg-linear-to-r from-[#FF7CE5] to-[#5D5FEF] bg-clip-text text-transparent">
              Edit Book
            </span>
          </Button>
        )}
      </div>

      <div className="max-w-7xl flex flex-col justify-center mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center  gap-8">
          {/* Left: Book Cover */}
          <div className="flex items-center justify-center">
            <Card className="overflow-hidden shadow-xl py-0">
              <Image
                src={book?.coverImage || "/images/review.jpg"}
                alt={book.title}
                width={400}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
              />
            </Card>
          </div>

          {/* Right: Book Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-orange-600 mb-4">
                {book.title}
              </h1>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Book Metadata */}
            <Card className="p-4 bg-white border border-gray-200">
              <div className="flex flex-wrap justify-between items-center gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Language
                  </p>
                  <p className="text-base text-gray-900">{book.language}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Type</p>
                  <p className="text-base text-purple-600 font-semibold">
                    {book.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Chapters
                  </p>
                  <p className="text-base text-gray-900">
                    {book.chapters} Chapters
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Status</p>
                  <p
                    className={`text-base font-semibold ${
                      book.status === "Completed"
                        ? "text-green-600"
                        : book.status === "In Progress"
                          ? "text-yellow-600"
                          : "text-gray-600"
                    }`}
                  >
                    {book.status}
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-8">
                <Button
                  onClick={handleDownload}
                  className="w-full border-2 bg-transparent cursor-pointer border-purple-600 text-purple-600 hover:bg-purple-50 gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download E-Book
                </Button>
                {onListen && (
                  <Button
                    onClick={onListen}
                    className="w-full bg-transparent cursor-pointer border-2 border-purple-600 text-purple-600 hover:bg-purple-50 gap-2"
                  >
                    <Headphones className="w-5 h-5" />
                    Read & Listen
                  </Button>
                )}
              </div>
              <Button
                onClick={handleOrder}
                className="w-full bg-linear-to-r cursor-pointer from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Order Printed Book - ${book.price?.toFixed(2) || "12.00"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
