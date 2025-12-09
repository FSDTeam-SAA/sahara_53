import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { IBook } from "@/lib/type/book";

interface Chapter {
  title: string;
  text: string;
  audioUrl?: string | null;
  chapterImage?: string;
}

export async function POST(request: NextRequest) {
  try {
    const {
      book,
      includeAudio = true,
      textVisibility = {},
    } = await request.json();

    if (!book || !book.generatedStory) {
      return NextResponse.json({ error: "Invalid book data" }, { status: 400 });
    }

    const epubBook = book as IBook;
    const zip = new JSZip();

    // 1. Add mimetype (uncompressed)
    zip.file("mimetype", "application/epub+zip", { compression: "STORE" });

    // 2. Create META-INF folder with container.xml
    zip.folder("META-INF")?.file(
      "container.xml",
      `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`,
    );

    // 3. Create OEBPS folder for content
    const oebps = zip.folder("OEBPS");

    // 4. Create content.opf (package metadata)
    const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uuid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${escapeXml(epubBook.title)}</dc:title>
    <dc:creator>${escapeXml(epubBook.characters?.[0]?.name || "Unknown")}</dc:creator>
    <dc:language>${epubBook.language || "en"}</dc:language>
    <dc:identifier id="uuid">urn:uuid:${generateUUID()}</dc:identifier>
  </metadata>
  
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="nav" href="nav.html" media-type="application/xhtml+xml"/>
    <item id="style" href="styles.css" media-type="text/css"/>
    <item id="script" href="audio-sync.js" media-type="application/javascript"/>
    ${epubBook.generatedStory.map((_, i) => `<item id="ch${i}" href="ch${i}.html" media-type="application/xhtml+xml"/>`).join("")}
    ${
      includeAudio
        ? epubBook.generatedStory
            .filter((ch: Chapter) => ch.audioUrl)
            .map((ch: Chapter, i: number) => {
              const fileName =
                new URL(ch.audioUrl!).pathname.split("/").pop() ||
                `audio${i}.mp3`;
              return `<item id="audio${i}" href="${fileName}" media-type="audio/mpeg"/>`;
            })
            .join("")
        : ""
    }
  </manifest>
  
  <spine toc="ncx">
    ${epubBook.generatedStory.map((_, i) => `<itemref idref="ch${i}"/>`).join("")}
  </spine>
</package>`;

    oebps?.file("content.opf", opf);

    // 5. Create shared CSS file
    const stylesCss = `body { font-family: Georgia, serif; line-height: 1.8; margin: 20px; color: #333; }
h2 { color: #1a73e8; margin-bottom: 20px; font-size: 1.3em; }
p { margin-bottom: 15px; text-align: justify; }
.word { cursor: pointer; transition: background-color 0.15s ease; }
.word.highlighted { background-color: #ffeb3b; padding: 2px 4px; border-radius: 2px; font-weight: 500; }
.word.current-audio { background-color: #ff6b6b; color: white; padding: 2px 4px; border-radius: 2px; animation: pulse 0.3s ease-in-out; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
img { max-width: 100%; height: auto; margin: 20px 0; }
.audio-controls { margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px; border-left: 4px solid #1a73e8; }
.audio-player { width: 100%; margin-bottom: 10px; }
.text-controls { margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px; }
.text-control-btn { padding: 8px 15px; margin-right: 10px; margin-bottom: 10px; border: 1px solid #ddd; background-color: white; border-radius: 4px; cursor: pointer; font-size: 14px; }
.text-control-btn:hover { background-color: #e8f4f8; }`;
    oebps?.file("styles.css", stylesCss);

    // 6. Create JavaScript for audio synchronization and text control
    const audioSyncJs = `(function() { window.audioSync = { audioTimings: {}, highlightWord(wordId) { document.querySelectorAll('.word.current-audio').forEach(el => { el.classList.remove('current-audio'); }); const word = document.getElementById(wordId); if (word) word.classList.add('current-audio'); }, toggleTextVisibility(paragraphId) { const p = document.getElementById(paragraphId); if (p) { p.style.display = p.style.display === 'none' ? 'block' : 'none'; } }, showAllText() { document.querySelectorAll('[data-paragraph]').forEach(el => { el.style.display = 'block'; }); }, hideAllText() { document.querySelectorAll('[data-paragraph]').forEach(el => { el.style.display = 'none'; }); }, setupAudioSync(audioElement) { if (!audioElement) return; audioElement.addEventListener('timeupdate', () => { const currentTime = audioElement.currentTime; const timingKey = Math.floor(currentTime); if (window.audioSync.audioTimings[timingKey]) { const wordIds = window.audioSync.audioTimings[timingKey]; wordIds.forEach(wordId => this.highlightWord(wordId)); } }); } }; document.addEventListener('DOMContentLoaded', () => { const audioElements = document.querySelectorAll('audio'); audioElements.forEach(audio => window.audioSync.setupAudioSync(audio)); }); })();`;
    oebps?.file("audio-sync.js", audioSyncJs);

    // 7. Create navigation document
    const navHtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Table of Contents</title>
    <link rel="stylesheet" type="text/css" href="styles.css"/>
  </head>
  <body>
    <nav xmlns:epub="http://www.idpf.org/2007/ops" epub:type="toc">
      <h1>Table of Contents</h1>
      <ol>
        ${epubBook.generatedStory.map((ch: Chapter, i: number) => `<li><a href="ch${i}.html">${escapeXml(ch.title)}</a></li>`).join("")}
      </ol>
    </nav>
  </body>
</html>`;

    oebps?.file("nav.html", navHtml);

    // 8. Create chapter files with text highlighting and audio sync
    epubBook.generatedStory.forEach(
      (chapter: Chapter, chapterIndex: number) => {
        const shouldIncludeAudio = includeAudio && chapter.audioUrl;
        const chapterTextVisibility = textVisibility[chapterIndex] || {};

        const paragraphs = chapter.text
          .split("\n")
          .filter((line) => line.trim())
          .map((paragraph, pIndex) => {
            const paraId = `p${chapterIndex}-${pIndex}`;
            const isVisible = chapterTextVisibility[pIndex] !== false;
            const displayStyle = isVisible ? "" : 'style="display: none;"';

            const words = paragraph.split(" ").map((word, wIndex) => {
              const wordId = `w${chapterIndex}-${pIndex}-${wIndex}`;
              return `<span class="word" id="${wordId}">${escapeXml(word)}</span>`;
            });

            return `<p class="paragraph" id="${paraId}" data-paragraph="${paraId}" ${displayStyle}>${words.join(" ")}</p>`;
          });

        const audioSection = shouldIncludeAudio
          ? `<div class="audio-controls"><h3>🎧 Listen to Chapter</h3><audio class="audio-player" controls><source src="${chapter.audioUrl}" type="audio/mpeg">Your browser does not support the audio element.</audio></div>`
          : "";

        const chapterHtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>${escapeXml(chapter.title)}</title>
    <link rel="stylesheet" type="text/css" href="styles.css"/>
    <script src="audio-sync.js"></script>
  </head>
  <body>
    <h2>${escapeXml(chapter.title)}</h2>
    ${chapter.chapterImage ? `<img src="${escapeXml(chapter.chapterImage)}" alt="Illustration"/>` : ""}
    ${audioSection}
    <div class="text-controls">
      <button class="text-control-btn" onclick="window.audioSync.showAllText()">Show All</button>
      <button class="text-control-btn" onclick="window.audioSync.hideAllText()">Hide All</button>
    </div>
    <div class="text-content">${paragraphs.join("")}</div>
    <script>window.audioSync.audioTimings = ${JSON.stringify(generateAudioTimings(chapter, chapterIndex))};</script>
  </body>
</html>`;

        oebps?.file(`ch${chapterIndex}.html`, chapterHtml);
      },
    );

    // 9. Create NCX (table of contents)
    const ncx = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:${generateUUID()}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle><text>${escapeXml(epubBook.title)}</text></docTitle>
  <navMap>
    ${epubBook.generatedStory
      .map(
        (ch: Chapter, i: number) =>
          `<navPoint id="navPoint${i + 1}" playOrder="${i + 1}"><navLabel><text>${escapeXml(ch.title)}</text></navLabel><content src="ch${i}.html"/></navPoint>`,
      )
      .join("")}
  </navMap>
</ncx>`;

    oebps?.file("toc.ncx", ncx);

    // 10. Generate EPUB file
    const epubBuffer = await zip.generateAsync({ type: "arraybuffer" });

    return new NextResponse(epubBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/epub+zip",
        "Content-Disposition": `attachment; filename="${epubBook.title}.epub"`,
      },
    });
  } catch (error) {
    console.error("EPUB generation error:", error);
    return NextResponse.json(
      {
        error: `Failed to generate EPUB: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    );
  }
}

function generateAudioTimings(
  chapter: Chapter,
  chapterIndex: number,
): Record<string, string[]> {
  const timings: Record<string, string[]> = {};
  if (!chapter.audioUrl) return timings;

  const words = chapter.text.split(/\s+/).filter((w) => w);
  words.forEach((_, wordIndex) => {
    const timeKey = Math.floor(wordIndex * 2).toString();
    const wordId = `w${chapterIndex}-0-${wordIndex}`;
    if (!timings[timeKey]) timings[timeKey] = [];
    timings[timeKey].push(wordId);
  });

  return timings;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
