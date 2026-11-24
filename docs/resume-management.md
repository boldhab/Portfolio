# Résumé & Curriculum Vitae Management

This document details how **Habtamu Befekadu** manages the curriculum vitae / résumé file within the portfolio codebase.

---

## 1. File Location & Naming

The portfolio expects your resume PDF file to be stored at:

```
public/
└── documents/
    └── resume.pdf
```

The file name must be exactly `resume.pdf` under `public/documents/`.

---

## 2. Dynamic Asset Checking Architecture

To guarantee that broken links are never presented to visitors:

- The system uses `hasPublicAsset("/documents/resume.pdf")` (defined in `src/lib/public-asset.ts`).
- When `public/documents/resume.pdf` **exists** on disk:
  1. The `ResumeCTA` component renders a high-contrast **Download PDF** button (`download="Habtamu-Befekadu-Resume.pdf"`).
  2. A secondary **View Online** button opens the PDF in a new browser tab with `target="_blank"` and `rel="noopener noreferrer"`.
  3. The homepage hero action button for Résumé is activated.
- When `public/documents/resume.pdf` **does not exist**:
  1. The download buttons are automatically withheld.
  2. A friendly card notice informs visitors that an updated CV is available upon request, providing a direct link to `/contact`.
  3. Zero broken links or 404 download errors are ever produced.

---

## 3. Recommended PDF Guidelines

1. **Format:** Standard Portable Document Format (`.pdf`).
2. **File Size:** Keep below `5 MB` (ideally `500 KB — 2 MB`) for instant mobile downloads.
3. **Accessibility:** Ensure the PDF contains selectable, searchable text rather than flat scanned images.
4. **Metadata:** Verify the document title inside the PDF properties matches `"Habtamu Befekadu — Software Engineer Résumé"`.
