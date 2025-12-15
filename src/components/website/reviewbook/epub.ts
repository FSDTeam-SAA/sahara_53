import { IBook } from "@/lib/type/book";

// Helper to ensure URLs are absolute
const toAbsoluteUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("data:")) return url; // Base64
  // If running in browser/client
  if (typeof window !== "undefined") {
    return `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
  }
  return url;
};

// Helper to generate the HTML content for the book
const generateBookHtmlContent = (books: IBook) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${books.title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather&family=Roboto&display=swap" rel="stylesheet">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Roboto:wght@300;400;500&display=swap');
      
      @page {
        margin: 20mm;
        size: A4;
      }
      
      body {
        font-family: 'Merriweather', serif;
        margin: 40px;
        line-height: 1.8;
        background: #fff;
        color: #333;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }

      @media print {
        body {
          margin: 0;
          max-width: 100%;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print {
          display: none;
        }
      }

      h1 {
        text-align: center;
        font-size: 3em;
        color: #4B0082;
        margin-bottom: 2em;
        margin-top: 30vh;
        page-break-after: always;
      }

      h2 {
        font-size: 2em;
        color: #6A5ACD;
        margin-top: 2em;
        margin-bottom: 1em;
        border-bottom: 2px solid #ddd;
        padding-bottom: 10px;
        page-break-after: avoid;
        page-break-before: always;
      }

      p {
        font-size: 12pt;
        margin: 1em 0;
        text-align: justify;
        orphans: 3;
        widows: 3;
      }

      .chapter {
        margin-bottom: 30px;
        page-break-inside: auto;
      }

      img {
        max-width: 100%;
        max-height: 50vh;
        width: auto;
        height: auto;
        display: block;
        margin: 2em auto;
        border-radius: 4px;
        page-break-inside: avoid;
        box-shadow: none;
      }

      audio {
        display: block;
        margin: 20px auto;
        width: 100%;
      }

      .meta {
        text-align: center;
        font-style: italic;
        margin-bottom: 40px;
        color: #555;
        page-break-after: always;
      }

      .book-cover {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        page-break-after: always;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <!-- Title Page -->
    <div class="book-cover">
      <h1>${books.title}</h1>
      <p style="text-align: center; font-size: 1.4em;"><strong>Author:</strong> ${books.characters?.[0]?.name || "Unknown"}</p>
      <p style="text-align: center;"><strong>Language:</strong> ${books.language || "English"}</p>

    </div>

    ${books.generatedStory
      .map(
        (ch) => `
      <div class="chapter">
        <h2>${ch.title}</h2>
        ${ch.chapterImage ? `<img src="${toAbsoluteUrl(ch.chapterImage)}" alt="Chapter image" />` : ""}
        <p>${ch.text.replace(/\n/g, "<br/>")}</p>
        ${
          ch.audioUrl
            ? `
          <div class="no-print">
            <p>🎧 Listen to chapter:</p>
            <audio controls>
              <source src="${toAbsoluteUrl(ch.audioUrl)}" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        `
            : ""
        }
      </div>
    `,
      )
      .join("")}
  </body>
</html>
`;
};

// Handle HTML Download
export const handleDownloadHtml = async (books: IBook) => {
  if (!books) return;

  try {
    const htmlContent = generateBookHtmlContent(books);

    // Trigger browser download as HTML
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${books.title.replace(/\s+/g, "_")}.html`;
    a.click();

    URL.revokeObjectURL(url);

    console.log("Book downloaded as HTML");
  } catch (err) {
    console.error("Download error:", err);
  }
};

// Handle PDF Download (via Print)
export const handleDownloadPdf = async (books: IBook) => {
  if (!books) return;

  try {
    const htmlContent = generateBookHtmlContent(books);

    // Open a new window
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to download PDF");
      return;
    }

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500); // Small delay to ensure styles/images load
    };
  } catch (err) {
    console.error("PDF Download error:", err);
  }
};
