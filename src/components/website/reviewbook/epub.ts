import { IBook } from "@/lib/type/book";

export const handleDownloadEpub = async (books: IBook) => {
  if (!books) return;

  try {
    // Create HTML content for download
    const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${books.title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather&family=Roboto&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Merriweather', serif;
        margin: 30px;
        line-height: 1.8;
        background: #f7f7f7;
        color: #333;
      }
      h1 {
        text-align: center;
        font-size: 3em;
        color: #4B0082;
        margin-bottom: 5px;
      }
      h2 {
        font-size: 2em;
        color: #6A5ACD;
        margin-top: 40px;
        border-bottom: 2px solid #ddd;
        padding-bottom: 5px;
      }
      p {
        font-size: 1.1em;
        margin: 15px 0;
      }
      .chapter {
        background: #fff;
        padding: 20px;
        margin-bottom: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
img {
  max-width: 50%;
  aspect-ratio: 5 / 3;
  object-fit: cover;
  margin: 10px 0;
  border-radius: 8px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

      audio {
        display: block;
        margin: 15px auto;
      }
      hr {
        margin: 40px 0;
        border: 0;
        height: 1px;
        background: #ccc;
      }
      .meta {
        text-align: center;
        font-style: italic;
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <h1>${books.title}</h1>
    <p class="meta"><strong>Author:</strong> ${books.characters?.[0]?.name || "Unknown"} | <strong>Language:</strong> ${books.language || "English"}</p>
    <hr>
    ${books.generatedStory
      .map(
        (ch) => `
      <div class="chapter">
        <h2>${ch.title}</h2>
        <p>${ch.text.replace(/\n/g, "<br/>")}</p>
        ${
          ch.audioUrl
            ? `
          <p>🎧 Listen to chapter:</p>
          <audio controls>
            <source src="${ch.audioUrl}" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        `
            : ""
        }
        ${ch.chapterImage ? `<img src="${ch.chapterImage}" alt="Chapter image" />` : `<img src="/home/habib/Web/sahara_53/public/images/no-image.jpg" alt="Chapter" />`}
      </div>
    `,
      )
      .join("")}
  </body>
</html>
`;

    // Trigger browser download as HTML
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${books.title}.html`;
    a.click();

    URL.revokeObjectURL(url);

    console.log("Book downloaded as HTML");
  } catch (err) {
    console.error("Download error:", err);
  }
};
