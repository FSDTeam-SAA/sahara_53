import { IBook } from "@/lib/type/book";
import { toast } from "sonner";

export interface EpubOptions {
  includeAudio?: boolean;
  textVisibility?: Record<number, Record<number, boolean>>;
}

/**
 * Generates and downloads an EPUB file with:
 * - HTML text content with word-level highlighting
 * - Chapter images
 * - Audio files with synchronized highlighting
 * - Text visibility controls (show/hide paragraphs)
 */
export const handleDownloadEpub = async (
  book: IBook,
  options: EpubOptions = {},
) => {
  if (!book) {
    toast.error("No book data available");
    return;
  }

  try {
    const { includeAudio = true, textVisibility = {} } = options;

    // Call server API to generate EPUB
    const response = await fetch("/api/books/generate-epub", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book, includeAudio, textVisibility }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate EPUB");
    }

    // Get EPUB file as blob
    const blob = await response.blob();

    // Trigger download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${book.title}.epub`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(`"${book.title}" downloaded as EPUB`);
  } catch (error) {
    console.error("EPUB download error:", error);
    toast.error(
      error instanceof Error ? error.message : "Failed to download EPUB",
    );
  }
};