"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/ui/status-badge";
import Image from "next/image";
import { Order } from "@/lib/type/order";

interface UserDetailModalProps {
  data: Order;
  open: boolean;
  onClose: () => void;
}

export function UserDetailModal({ data, open, onClose }: UserDetailModalProps) {
  const book = data.storyBookId;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] w-full p-6">
        <DialogHeader className="flex flex-col items-start gap-2 mb-4">
          <DialogTitle className="text-2xl md:text-3xl font-bold">
            Order Details
          </DialogTitle>
          {book?.title && (
            <p className="text-sm text-gray-500">{book.title}</p>
          )}
        </DialogHeader>

        {/* Book Cover */}
        {book?.generatedStory?.[0]?.chapterImage && (
          <div className="flex justify-center mb-6">
            <Image
              src={book.generatedStory[0].chapterImage}
              alt={book.title}
              width={200}
              height={250}
              className="rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Grid Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm space-y-5">
            <p><strong>Book:</strong> {book?.title ?? data.bookName}</p>
            <p><strong>Language:</strong> {book?.language ?? "-"}</p>
            <p><strong>Genre:</strong> {book?.genre ?? "-"}</p>
            <p>
              <strong>Characters:</strong>{" "}
              {book?.characters?.map(c => c.name).join(", ") ?? "-"}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm space-y-5s">
            <p><strong>Beginning:</strong> {book?.beginning ?? "-"}</p>
            <p><strong>Format:</strong> {data.formate}</p>
            <p><strong>Price:</strong> ${data.price?.toFixed(2) ?? "0.00"}</p>
            <p className="flex items-center gap-2">
              <strong>Status:</strong>
              <StatusBadge status={data.status} />
            </p>
            <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Optional Audio Preview */}
        {book?.generatedStory?.[0]?.audioUrl && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Listen to First Chapter</h3>
            <audio
              controls
              src={book.generatedStory[0].audioUrl}
              className="w-full rounded-md"
            />
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
