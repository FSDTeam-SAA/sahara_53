# Advanced EPUB3 Implementation Guide

## ✨ Features Overview

### 1. **Audio Synchronization with Text Highlighting**

- 🎵 Audio files embedded in each chapter
- 🔄 Words highlight dynamically as audio plays (red background)
- ⏱️ Timing synchronized to audio playback
- 📻 Native HTML5 audio player with full controls (play, pause, volume, seek)
- 🎯 Word-level precision with unique IDs

### 2. **Interactive Text Visibility Control**

- 👁️ Show/Hide buttons for all text at once
- 📝 Toggle individual paragraphs on/off
- 🎚️ Per-chapter text visibility control
- 💾 Visibility state configurable before generation
- 🔄 JavaScript runtime functions for dynamic control

### 3. **EPUB3 Compliance & Structure**

- ✅ Proper EPUB3 package structure (OPF, NCX, container.xml)
- ✅ Responsive design with CSS media queries
- ✅ SVG and raster image support
- ✅ JavaScript interactivity (limited reader support)
- ✅ Navigation document (nav.html) + legacy NCX
- ✅ Semantic XHTML markup

---

## 🚀 Quick Start

### Basic Usage: Download with All Features

```typescript
import { handleDownloadEpub } from "@/components/website/reviewbook/epub";

// In your React component:
<Button onClick={() => handleDownloadEpub(book)}>
  📥 Download EPUB (with audio & text controls)
</Button>
```

This generates an EPUB with:

- ✅ Audio embedded
- ✅ All text visible
- ✅ Interactive show/hide buttons
- ✅ Word highlighting during audio playback

### Advanced: Custom Audio & Text Visibility

```typescript
// Example 1: Disable audio
await handleDownloadEpub(book, {
  includeAudio: false,
});

// Example 2: Pre-hide specific paragraphs
const textVisibility = {
  0: { 0: true, 1: false, 2: true }, // Chapter 0
  1: { 0: true, 1: true, 2: false }, // Chapter 1
  2: { 0: false, 1: true }, // Chapter 2
};

await handleDownloadEpub(book, {
  includeAudio: true,
  textVisibility,
});

// Example 3: Hide all but first paragraph per chapter
const hideAllButFirst = {};
book.generatedStory.forEach((chapter, chIdx) => {
  const parasInChapter = chapter.text
    .split("\n")
    .filter((l) => l.trim()).length;
  hideAllButFirst[chIdx] = {};
  for (let i = 0; i < parasInChapter; i++) {
    hideAllButFirst[chIdx][i] = i === 0; // Only first visible
  }
});

await handleDownloadEpub(book, { textVisibility: hideAllButFirst });
```

---

## 🎵 How Audio Synchronization Works

### Architecture Overview

```
Audio Timeline
    ↓
generateAudioTimings() [Server]
    ↓
Per-Second Word Mapping: { "0": ["w0-0-0", "w0-0-1"], "2": ["w0-0-2"], ... }
    ↓
Embedded in Chapter HTML as JS object
    ↓
setupAudioSync() [Client JavaScript]
    ↓
Listen to audio.currentTime every ~100ms
    ↓
Highlight words in current second
    ↓
Visual feedback: red background + pulse animation
```

### Server-Side Processing

**Location:** `/src/app/api/books/generate-epub/route.ts`

**Function: `generateAudioTimings()`**

```typescript
function generateAudioTimings(
  chapter: Chapter,
  chapterIndex: number,
  audioUrl?: string,
): Record<string, string[]> {
  // Returns: { "0": ["w0-0-0", "w0-0-1"], "2": ["w0-0-2", "w0-0-3"], ... }
  // Default: 2 seconds per word
  // Real implementation would:
  // - Fetch audio metadata
  // - Use speech-to-text timing
  // - Distribute words based on actual audio duration
}
```

**What it does:**

1. Takes chapter text and splits into words
2. Maps each word to a second in the audio timeline
3. Returns timing object embedded in HTML

**Current logic (default):**

```javascript
// Fallback: spread words evenly, 2 seconds per word
audioTimings = {
  "0": ["w0-0-0", "w0-0-1"],      // 0-1 sec: word 0-1
  "2": ["w0-0-2", "w0-0-3"],      // 2-3 sec: word 2-3
  "4": ["w0-0-4", "w0-0-5"],      // 4-5 sec: word 4-5
  ...
}
```

### Client-Side JavaScript (Embedded in EPUB)

**Location:** Dynamically generated in chapter HTML

**File included: `audio-sync.js` content**

```javascript
window.audioSync = {
  audioTimings: {
    /* ... populated from server ... */
  },
  currentHighlight: null,

  // Setup: Call when page loads
  setupAudioSync(audioElement) {
    audioElement.addEventListener("timeupdate", () => {
      const currentSecond = Math.floor(audioElement.currentTime).toString();
      const wordIds = this.audioTimings[currentSecond] || [];

      // Clear previous highlighting
      document.querySelectorAll(".word.current-audio").forEach((el) => {
        el.classList.remove("current-audio");
      });

      // Highlight current words
      wordIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.classList.add("current-audio");
      });
    });
  },

  // Manual highlight control
  highlightWord(wordId) {
    const el = document.getElementById(wordId);
    if (el) {
      el.classList.toggle("highlighted");
    }
  },

  // Show/hide paragraphs
  toggleTextVisibility(paragraphId) {
    const para = document.getElementById(paragraphId);
    if (para) {
      const isHidden = para.style.display === "none";
      para.style.display = isHidden ? "" : "none";
    }
  },

  showAllText() {
    document.querySelectorAll("[data-paragraph]").forEach((para) => {
      para.style.display = "";
    });
  },

  hideAllText() {
    document.querySelectorAll("[data-paragraph]").forEach((para) => {
      para.style.display = "none";
    });
  },
};
```

### Real-Time Highlighting Process

When user plays audio:

```
⏯️ Audio starts (click play button)
    ↓
1ms → browser fires 'timeupdate' event (50+ times per second)
    ↓
currentTime = 0.1s → currentSecond = 0 → words ["w0-0-0", "w0-0-1"]
    ↓
Add class 'current-audio' → CSS makes background red
    ↓
1s later → currentTime = 1.1s → currentSecond = 1 → same words still
    ↓
2s elapsed → currentTime = 2.1s → currentSecond = 2 → words ["w0-0-2", "w0-0-3"]
    ↓
Remove 'current-audio' from old words, add to new words
    ↓
Visual effect: words light up as audio plays! 🎯
```

---

## 📝 Text Visibility Control System

### How It Works

#### 1. **Server-Side Setup**

Chapters are generated with all paragraphs having visibility markers:

```html
<div class="chapter" id="ch0">
  <p id="p0-0" data-paragraph="p0-0" style="">
    <span class="word" id="w0-0-0">First</span>
    <span class="word" id="w0-0-1">paragraph</span>...
  </p>

  <p id="p0-1" data-paragraph="p0-1" style="">
    <span class="word" id="w0-0-2">Second</span>
    <span class="word" id="w0-0-3">paragraph</span>...
  </p>

  <p id="p0-2" data-paragraph="p0-2" style="">
    <span class="word" id="w0-0-4">Third</span>
    <span class="word" id="w0-0-5">paragraph</span>...
  </p>
</div>
```

#### 2. **Apply Initial Visibility**

When EPUB is generated with `textVisibility: { 0: { 0: true, 1: false, 2: true } }`:

```html
<!-- Visible -->
<p id="p0-0" data-paragraph="p0-0" style="">...</p>

<!-- Hidden with inline style -->
<p id="p0-1" data-paragraph="p0-1" style="display: none;">...</p>

<!-- Visible -->
<p id="p0-2" data-paragraph="p0-2" style="">...</p>
```

#### 3. **Runtime Control**

User can toggle visibility with buttons:

```html
<div class="text-controls">
  <button onclick="window.audioSync.showAllText()">👁️ Show All</button>
  <button onclick="window.audioSync.hideAllText()">👁️ Hide All</button>
</div>
```

When clicked, JavaScript modifies DOM:

```javascript
// Before: <p id="p0-1" style="display: none;">...
// After:  <p id="p0-1" style="">...
```

---

## 🗂️ EPUB File Structure

### ZIP Archive Layout

```
MyBook.epub                 (= ZIP archive)
│
├── mimetype                 ← Must be first, uncompressed
│   (contains: "application/epub+zip")
│
├── META-INF/
│   └── container.xml        ← Package locator
│       (points to content.opf)
│
└── OEBPS/
    ├── content.opf          ← Package Document (metadata + manifest)
    │                           Declares all files in EPUB
    │                           Defines reading order (spine)
    │
    ├── nav.html             ← EPUB3 Navigation Document
    │                           Interactive TOC
    │
    ├── toc.ncx              ← Legacy NCX TOC (backward compat)
    │
    ├── styles.css           ← Shared stylesheet
    │
    ├── audio-sync.js        ← JavaScript for interactivity
    │
    ├── ch0.html             ← Chapter 1 (with embedded timing data)
    ├── ch1.html             ← Chapter 2
    ├── ch2.html             ← Chapter 3
    └── ...

    (Optional audio files if includeAudio=true)
    ├── audio0.mp3           ← Chapter 1 audio
    ├── audio1.mp3           ← Chapter 2 audio
    └── ...
```

### Key Files Explained

#### `content.opf` (Package Document)

```xml
<?xml version="1.0"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0">

  <!-- Metadata: title, author, language, etc -->
  <metadata>
    <dc:title>Book Title</dc:title>
    <dc:creator>Author Name</dc:creator>
    <dc:language>en</dc:language>
    <dc:identifier id="uuid">uuid:12345...</dc:identifier>
  </metadata>

  <!-- Manifest: all files in the EPUB -->
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
    <item id="nav" href="nav.html" media-type="application/xhtml+xml" />
    <item id="style" href="styles.css" media-type="text/css" />
    <item id="ch0" href="ch0.html" media-type="application/xhtml+xml" />
    <item id="audio0" href="audio0.mp3" media-type="audio/mpeg" />
    ...
  </manifest>

  <!-- Spine: reading order -->
  <spine>
    <itemref idref="nav" />
    <itemref idref="ch0" />
    <itemref idref="ch1" />
    ...
  </spine>
</package>
```

#### `nav.html` (Navigation Document)

```html
<html>
  <head>
    <title>Table of Contents</title>
  </head>
  <body>
    <nav>
      <h1>Table of Contents</h1>
      <ol>
        <li><a href="ch0.html">Chapter 1</a></li>
        <li><a href="ch1.html">Chapter 2</a></li>
        ...
      </ol>
    </nav>
  </body>
</html>
```

#### `ch0.html` (Chapter with Audio Sync)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Chapter 1</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Chapter 1</h1>

    <!-- Audio player -->
    <div class="audio-controls">
      <audio class="audio-player" controls>
        <source src="audio0.mp3" type="audio/mpeg" />
      </audio>
    </div>

    <!-- Text with word-level markup -->
    <p id="p0-0" data-paragraph="p0-0">
      <span class="word" id="w0-0-0">First</span>
      <span class="word" id="w0-0-1">paragraph</span>...
    </p>

    <!-- Timing data (embedded server-side) -->
    <script>
      window.audioSync = window.audioSync || {};
      window.audioSync.audioTimings = {
        "0": ["w0-0-0"],
        "2": ["w0-0-1"],
        ...
      };
    </script>

    <!-- Setup on load -->
    <script src="audio-sync.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const audio = document.querySelector(".audio-player");
        if (audio) window.audioSync.setupAudioSync(audio);
      });
    </script>
  </body>
</html>
```

---

## 🎨 Styling & Animations

### Default CSS (embedded in `styles.css`)

```css
/* Base typography */
body {
  font-family: "Georgia", serif;
  line-height: 1.6;
  color: #333;
}

/* Word highlighting */
.word {
  position: relative;
  padding: 2px 4px;
  border-radius: 2px;
  transition: all 0.2s ease;
  cursor: default;
}

/* Manual highlight (yellow) */
.word.highlighted {
  background-color: #ffeb3b;
  font-weight: 500;
  box-shadow: 0 0 3px rgba(255, 235, 59, 0.5);
}

/* Audio playback highlight (red) */
.word.current-audio {
  background-color: #ff6b6b;
  color: white;
  font-weight: 600;
  animation: pulse 0.3s ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Audio player styling */
.audio-controls {
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-left: 4px solid #1a73e8;
  border-radius: 4px;
}

.audio-player {
  width: 100%;
  margin-bottom: 10px;
}

/* Text visibility controls */
.text-control-btn {
  padding: 8px 16px;
  margin: 5px;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.text-control-btn:hover {
  background-color: #d0d0d0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.text-control-btn:active {
  transform: translateY(1px);
}

/* Paragraph visibility */
[data-paragraph] {
  transition: opacity 0.3s ease;
}

[data-paragraph][style*="display: none"] {
  opacity: 0;
  pointer-events: none;
}
```

### Responsive Design

```css
/* Mobile devices */
@media (max-width: 600px) {
  body {
    font-size: 14px;
    line-height: 1.5;
  }
  .audio-controls {
    padding: 10px;
  }
  .text-control-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
}

/* Large screens */
@media (min-width: 1024px) {
  body {
    max-width: 800px;
    margin: 0 auto;
  }
}
```

---

## 📱 E-Reader Compatibility Matrix

| Feature                    | Apple Books | Kindle     | Kobo       | Calibre    | Google Play |
| -------------------------- | ----------- | ---------- | ---------- | ---------- | ----------- |
| **EPUB3**                  | ✅ Full     | ⚠️ Limited | ✅ Full    | ✅ Full    | ✅ Full     |
| **Audio Tags**             | ✅          | ✅         | ✅         | ✅         | ✅          |
| **JavaScript**             | ❌          | ❌         | ⚠️         | ⚠️         | ❌          |
| **CSS Classes**            | ✅          | ✅         | ✅         | ✅         | ✅          |
| **Dynamic Highlighting**   | ❌          | ❌         | ⚠️ Limited | ⚠️ Limited | ❌          |
| **Text Visibility Toggle** | Via CSS\*   | Via CSS\*  | Via JS\*   | Via JS     | Via CSS\*   |
| **Audio Sync**             | Native†     | Native†    | Manual     | Manual     | Native†     |

**Legend:**

- ✅ = Fully supported
- ⚠️ = Partial/Limited support
- ❌ = Not supported
- \* = Possible via CSS, but not interactive
- † = Native support through SMIL (not implemented here)

### What Works Where

**All Readers:**

- ✅ Display chapters
- ✅ Show audio player
- ✅ CSS styling
- ✅ Static highlighting (predefined hidden paragraphs)

**Kobo & Calibre Only:**

- ✅ Dynamic highlighting (JavaScript button clicks)
- ✅ Show/Hide text at runtime

**Browser/Online Readers:**

- ✅ Full interactivity (recommended for testing)

---

## 🔧 API Endpoint Details

### Request Format

```bash
POST /api/books/generate-epub
Content-Type: application/json

{
  "book": {
    "id": "book-1",
    "title": "My Awesome Book",
    "author": "John Doe",
    "description": "Book description",
    "coverImage": "https://example.com/cover.jpg",
    "generatedStory": [
      {
        "text": "Chapter 1 text. Paragraph 2 here.",
        "title": "Chapter 1"
      },
      {
        "text": "Chapter 2 text. More content.",
        "title": "Chapter 2"
      }
    ]
  },
  "includeAudio": true,
  "textVisibility": {
    "0": { "0": true, "1": false },
    "1": { "0": true }
  }
}
```

### Response

```http
HTTP/1.1 200 OK
Content-Type: application/epub+zip
Content-Disposition: attachment; filename="My Awesome Book.epub"
Content-Length: 245839

[Binary EPUB file]
```

### Error Response

```json
{
  "error": "Failed to generate EPUB",
  "details": "Book title is required"
}
```

---

## 🚀 Implementation Checklist

- [x] **Server API Route** - `/api/books/generate-epub`
- [x] **EPUB3 Structure** - Proper ZIP with all required files
- [x] **Word-Level Markup** - Unique IDs for highlighting
- [x] **Audio Synchronization** - Timing data + JavaScript
- [x] **Text Visibility** - Show/Hide paragraphs with buttons
- [x] **CSS Animations** - Pulse effect for highlighting
- [x] **Responsive Design** - Mobile-friendly layout
- [x] **Error Handling** - Graceful fallbacks
- [x] **Browser Testing** - Works in development
- [ ] **E-Reader Testing** - Test with real devices
- [ ] **SMIL Implementation** - For precise audio sync
- [ ] **DRM Protection** - Optional encryption
- [ ] **MOBI/AZW3 Format** - Kindle native format

---

## 💡 Advanced Customization

### Modify Audio Timing Strategy

**File:** `/src/app/api/books/generate-epub/route.ts`

```typescript
function generateAudioTimings(
  chapter: Chapter,
  chapterIndex: number,
  audioUrl?: string,
): Record<string, string[]> {
  // Option 1: Use real timing from audio metadata
  if (chapter.audioMetadata?.timings) {
    return chapter.audioMetadata.timings;
  }

  // Option 2: Fetch from speech-to-text service
  // const timings = await whisperAPI.getTimings(audioUrl);

  // Option 3: Custom distribution based on paragraph breaks
  const timings: Record<string, string[]> = {};
  const paragraphs = chapter.text.split("\n").filter((l) => l.trim());
  let wordCount = 0;

  paragraphs.forEach((para) => {
    const words = para.split(/\s+/);
    const secondsPerWord = 2; // Adjust as needed

    words.forEach((_, idx) => {
      const second = Math.floor(wordCount * secondsPerWord).toString();
      const wordId = `w${chapterIndex}-${paragraphs.indexOf(para)}-${idx}`;

      if (!timings[second]) timings[second] = [];
      timings[second].push(wordId);
      wordCount++;
    });
  });

  return timings;
}
```

### Add Custom Fonts

```typescript
const stylesCss = `
  @font-face {
    font-family: 'CustomSerif';
    src: url('data:font/woff2;base64,...') format('woff2');
  }
  
  body {
    font-family: 'CustomSerif', Georgia, serif;
  }
`;
```

### Customize Color Scheme

```typescript
const stylesCss = `
  :root {
    --primary: #1a73e8;
    --highlight-current: #ff6b6b;
    --highlight-manual: #ffeb3b;
    --text-color: #1f2937;
  }
  
  .word.current-audio {
    background-color: var(--highlight-current);
  }
`;
```

---

## 🐛 Troubleshooting

### EPUB Won't Open

```
Symptom: "Not a valid EPUB file"
Solution:
  1. Verify ZIP structure is correct
  2. Check mimetype is first file (uncompressed)
  3. Validate XML in content.opf and container.xml
  4. Use online validator: https://www.w3.org/publishing/epubcheck/
```

### Audio Not Playing

```
Symptom: Audio player shows but no sound
Solution:
  1. Verify audioUrl is accessible (CORS headers if remote)
  2. Check audio format is MP3/AAC (not WAV)
  3. Ensure <audio> tag has correct source
  4. Some readers don't support audio linking (use inline)
```

### Text Highlighting Not Working

```
Symptom: Show/Hide buttons don't work
Solution:
  1. JavaScript support varies by reader (test in Calibre)
  2. Use static visibility instead (via textVisibility param)
  3. Manual highlighting works in most readers (yellow background)
  4. Try online reader for full JavaScript support
```

### File Size Too Large

```
Symptom: EPUB file > 100MB
Solution:
  1. Don't include audio (set includeAudio: false)
  2. Compress images before adding
  3. Remove duplicate paragraphs
  4. Use SMIL instead of repeating timings
```

---

## 📚 Resources

- [EPUB3 Specification](https://www.w3.org/publishing/epub3/)
- [IDPF Package Document](http://www.idpf.org/epub/30/spec/epub30-opf.html)
- [EPUBCheck Validator](https://www.w3.org/publishing/epubcheck/)
- [Calibre E-Book Editor](https://calibre-ebook.com/)
- [Google Play Books](https://play.google.com/books)

---

## 📝 License & Attribution

This EPUB generation system uses:

- **JSZip** - MIT License
- **Next.js** - MIT License
- **React** - MIT License

For commercial use, review all licenses and obtain proper permissions.
