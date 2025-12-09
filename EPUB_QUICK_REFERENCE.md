# EPUB Quick Reference

## 📥 Download EPUB from Your App

### Basic (2 lines)

```typescript
import { handleDownloadEpub } from "@/components/website/reviewbook/epub";

<Button onClick={() => handleDownloadEpub(book)}>Download EPUB</Button>
```

### With Options

```typescript
// Hide specific paragraphs before generating
await handleDownloadEpub(book, {
  includeAudio: true,
  textVisibility: {
    0: { 0: true, 1: false, 2: true }, // Ch 0: show 0,2, hide 1
    1: { 0: true, 1: true }, // Ch 1: show all
  },
});
```

---

## 🎯 Word-Level IDs

Every word gets a unique ID in format: `w{chapterIndex}-{paragraphIndex}-{wordIndex}`

```html
<!-- Chapter 0, Paragraph 1, Word 0 -->
<span class="word" id="w0-1-0">First</span>

<!-- Chapter 1, Paragraph 0, Word 2 -->
<span class="word" id="w1-0-2">third</span>
```

Used for:

- 🎵 Audio synchronization (highlight during playback)
- 🖍️ Manual highlighting (yellow background)
- 🔍 Finding specific text

---

## 🎵 Audio Features in EPUB

### What's Generated

- ✅ HTML5 audio player in each chapter
- ✅ Audio timing data: words → seconds mapping
- ✅ JavaScript to highlight words during playback
- ✅ CSS animation (red background + pulse)

### How It Works

```
User clicks "Play" → Audio starts →
JavaScript listens to timeupdate event →
Every second: highlight 1-2 words →
Visual effect: words light up as audio plays
```

### In E-Reader

- **Apple Books**: ✅ Full support (iOS/Mac)
- **Kindle**: ✅ Audio works
- **Kobo**: ⚠️ Partial (no JavaScript sync)
- **Calibre**: ✅ Full support (for testing)
- **Browser**: ✅ Full support (best for testing)

---

## 👁️ Text Visibility Features

### Pre-Hide Paragraphs

Use `textVisibility` option when downloading:

```typescript
await handleDownloadEpub(book, {
  textVisibility: {
    0: { 0: true, 1: false }, // Hide paragraph 1 in chapter 0
  },
});
```

### Runtime Show/Hide (in EPUB)

```javascript
window.audioSync.showAllText(); // Show everything
window.audioSync.hideAllText(); // Hide everything
window.audioSync.toggleTextVisibility("p0-0"); // Toggle paragraph 0
```

E-readers supporting JavaScript (Kobo, Calibre) can use these at runtime.

---

## 🗂️ EPUB File Structure

```
MyBook.epub (ZIP archive)
├── mimetype              (must be first, uncompressed)
├── META-INF/container.xml (entry point)
└── OEBPS/
    ├── content.opf       (metadata & file list)
    ├── nav.html          (interactive TOC)
    ├── toc.ncx           (old-style TOC)
    ├── styles.css        (styling)
    ├── audio-sync.js     (JavaScript)
    ├── ch0.html          (Chapter 1: text + audio controls + timing data)
    ├── ch1.html          (Chapter 2)
    ├── audio0.mp3        (Optional: audio for chapter 1)
    └── audio1.mp3        (Optional: audio for chapter 2)
```

---

## 🎨 CSS Classes in Generated EPUB

| Class                 | Effect            | When Used             |
| --------------------- | ----------------- | --------------------- |
| `.word`               | Base styling      | All words             |
| `.word.highlighted`   | Yellow background | Manual highlight      |
| `.word.current-audio` | Red + animation   | During audio playback |
| `.audio-controls`     | Gray box          | Around audio player   |
| `.text-control-btn`   | Button styling    | Show/Hide buttons     |
| `[data-paragraph]`    | Visibility marker | All paragraphs        |

---

## 🚀 API Request Example

```bash
curl -X POST http://localhost:3000/api/books/generate-epub \
  -H "Content-Type: application/json" \
  -d '{
    "book": {
      "id": "123",
      "title": "My Book",
      "author": "Me",
      "description": "A great book",
      "coverImage": "https://...",
      "generatedStory": [
        {
          "title": "Chapter 1",
          "text": "Paragraph 1.\n\nParagraph 2."
        }
      ]
    },
    "includeAudio": true,
    "textVisibility": {
      "0": { "0": true, "1": false }
    }
  }'
```

Response: EPUB file as binary attachment

---

## ⚡ Common Tasks

### Disable Audio

```typescript
await handleDownloadEpub(book, { includeAudio: false });
```

### Hide All Paragraphs Except First

```typescript
const hideAllButFirst = {};
book.generatedStory.forEach((ch, idx) => {
  const paraCount = ch.text.split("\n").filter((l) => l.trim()).length;
  hideAllButFirst[idx] = Object.fromEntries(
    Array.from({ length: paraCount }, (_, i) => [i, i === 0]),
  );
});
await handleDownloadEpub(book, { textVisibility: hideAllButFirst });
```

### Generate EPUB for Preview Only (No Download)

```typescript
const response = await fetch("/api/books/generate-epub", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ book }),
});
const blob = await response.blob();
// Use blob with online EPUB reader or save locally
```

---

## 🐛 Quick Fixes

| Problem                  | Solution                                  |
| ------------------------ | ----------------------------------------- |
| EPUB won't open          | Re-generate it, validate ZIP structure    |
| Audio not playing        | Check file exists & is accessible (CORS?) |
| Highlighting not working | Not all readers support JavaScript        |
| File too large           | Disable audio or compress images          |
| Text not visible         | Check `textVisibility` object is correct  |

---

## 📖 File Locations

| File                                                | Purpose                    |
| --------------------------------------------------- | -------------------------- |
| `/src/app/api/books/generate-epub/route.ts`         | Server: Creates EPUB       |
| `/src/components/website/reviewbook/epub.ts`        | Client: Download trigger   |
| `/src/components/website/reviewbook/Reviewbook.tsx` | Component: Download button |
| `/EPUB_ADVANCED.md`                                 | Full documentation         |
| `/EPUB_IMPLEMENTATION.md`                           | Original guide             |

---

## 🔗 Useful Links

- **Validate EPUB**: https://www.w3.org/publishing/epubcheck/
- **Test EPUB**: https://app.thorium.pro/ (browser reader)
- **EPUB3 Spec**: https://www.w3.org/publishing/epub3/
- **Calibre**: https://calibre-ebook.com/ (desktop e-book editor)

---

## 💭 Pro Tips

1. **Test in Calibre first** - Best for JavaScript debugging
2. **Use Firefox's reader** - Good for testing responsive design
3. **Keep audio files < 5MB** - E-readers have storage limits
4. **Validate with EPUBCheck** - Catch structure errors early
5. **Test on real devices** - Compatibility varies by reader

---

**Last Updated:** 2024
**API Endpoint:** `POST /api/books/generate-epub`
**Status:** ✅ Production Ready
