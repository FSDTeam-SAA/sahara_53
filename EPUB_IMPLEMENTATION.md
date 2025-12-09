# EPUB Generation Implementation

## Overview

This implementation generates **EPUB3-compliant** ebook files with:

- ✅ HTML text content with word-level highlighting markup
- ✅ Chapter images (cover illustrations)
- ✅ Audio file references and links
- ✅ Table of contents (NCX + HTML Navigation)
- ✅ Proper metadata (title, author, language)
- ✅ Mobile-friendly responsive layout

## Architecture

### Server-Side: `/api/books/generate-epub`

**File:** `src/app/api/books/generate-epub/route.ts`

- Uses **JSZip** to create EPUB files (EPUB = ZIP archive with specific structure)
- Builds proper EPUB3 package structure:
  - `mimetype` (uncompressed)
  - `META-INF/container.xml` (entry point)
  - `OEBPS/content.opf` (package metadata)
  - `OEBPS/nav.html` (navigation document)
  - `OEBPS/toc.ncx` (legacy table of contents)
  - `OEBPS/ch*.html` (chapter files)

### Client-Side: `src/components/website/reviewbook/epub.ts`

- `handleDownloadEpub(book: IBook)` function
- Makes POST request to `/api/books/generate-epub`
- Downloads generated EPUB file to user's device
- Shows toast notifications for feedback

## Features

### Text Highlighting

Each chapter's text is split into **paragraphs** and **words** with unique IDs:

```html
<p class="paragraph" id="p0-0">
  <span class="word" id="w0-0-0">Word</span>
  <span class="word" id="w0-0-1">by</span>
  <span class="word" id="w0-0-2">word</span>
</p>
```

CSS includes:

```css
.highlight-text {
  background-color: #ffeb3b;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 2px;
}
```

E-readers like Apple Books, Kindle, Kobo support highlighting text in chapters.

### Audio References

- Audio files are embedded as item references in the EPUB manifest
- Chapters include audio links: `<a href="audio.mp3">Click to listen</a>`
- E-readers can play audio if supported (Kindle, Kobo, Apple Books on iOS)

### Chapter Images

- Cover images are embedded in each chapter
- Responsive sizing: `<img src="..." style="max-width: 100%; height: auto;" />`

## Usage

### From React Component

```typescript
import { handleDownloadEpub } from "@/components/website/reviewbook/epub";

// In your component:
<Button onClick={() => handleDownloadEpub(book)}>
  <Download /> Download EPUB
</Button>
```

### API Request Example

```bash
curl -X POST http://localhost:3000/api/books/generate-epub \
  -H "Content-Type: application/json" \
  -d '{"book": {...IBook object...}}'
```

## EPUB Structure

```
book.epub
├── mimetype
├── META-INF/
│   └── container.xml
└── OEBPS/
    ├── content.opf        (metadata & manifest)
    ├── nav.html           (EPUB3 navigation)
    ├── toc.ncx            (legacy TOC)
    ├── ch0.html           (chapter 1)
    ├── ch1.html           (chapter 2)
    └── ...
```

## EPUB3 Standards

- **Metadata:** Title, author, language, unique ID (UUID)
- **Navigation:** HTML nav + NCX (backward compatibility)
- **Content:** XHTML with semantic markup
- **Images:** Referenced with proper media-type declarations
- **Audio:** Referenced in manifest with audio/mpeg type

## E-Reader Compatibility

| Feature      | Apple Books | Kindle    | Kobo | Google Play |
| ------------ | ----------- | --------- | ---- | ----------- |
| EPUB3        | ✅          | ⚠️ (Mobi) | ✅   | ✅          |
| Audio        | ✅ (iOS)    | ✅        | ✅   | ✅          |
| Images       | ✅          | ✅        | ✅   | ✅          |
| Highlighting | ✅          | ✅        | ✅   | ✅          |

## Future Enhancements

- [ ] SMIL synchronization (audio + text timing)
- [ ] CSS-based highlighting animation during audio playback
- [ ] Generate Kindle format (MOBI/AZW3)
- [ ] DRM protection option
- [ ] Dynamic TOC generation with page numbers

## Testing

1. Generate EPUB from a book:
   ```typescript
   await handleDownloadEpub(myBook);
   ```
2. Open with Apple Books, Calibre, or online reader (e.g., Google Play Books)
3. Verify:
   - All chapters display
   - Images render correctly
   - Audio links work
   - Highlighting is possible
   - TOC navigation works

## Dependencies

- **jszip** - ZIP archive creation
- **Next.js API Routes** - Server-side processing

## Error Handling

- Server validates book structure
- Returns detailed error messages if generation fails
- Client shows toast notifications
- Graceful fallback if EPUB generation errors
