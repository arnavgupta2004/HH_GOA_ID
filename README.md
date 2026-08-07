# Builder ID — Hacker House Goa 2026

A single-page generator for the Hacker House Goa 2026 shortlisting task. Upload a photo, pick a format, and export a shareable **Profile Frame** or **Builder Card** — no login, no backend, everything runs client-side.

## Features

- **Upload → Crop → Format → Generate** flow with a live step indicator
- JPG / PNG / HEIC uploads, with HEIC auto-converted to JPEG in the browser (`heic2any`)
- Draggable, zoomable crop editor with auto-centering (`react-easy-crop`)
- Two exportable formats, switchable via a segmented toggle:
  - **Profile Frame** — circular photo frame with a gold/magenta gradient ring and event branding
  - **Builder Card** — name, role, an auto-generated "builder title," and a stack chip list on a collectible card
- High-resolution PNG export (≥2048px wide, regardless of on-screen size) via `html-to-image`
- One-click **Share on X** with the caption and `#FrameInGoa` prefilled — on devices that support the Web Share API (most phones), the actual generated image is attached directly via the native share sheet; desktop falls back to a prefilled X compose window
- Dark, glassmorphic UI themed on the real Hacker House Goa logo colors (forest green / gold / magenta), built with Tailwind CSS, shadcn/ui, and Framer Motion
- Fully responsive, mobile-first

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/) for transitions and the sliding format toggle
- [react-easy-crop](https://github.com/ValentinH/react-easy-crop) for cropping
- [html-to-image](https://github.com/bubkoo/html-to-image) for PNG export
- [heic2any](https://github.com/alexcorvi/heic2any) for HEIC → JPEG conversion

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint     # eslint
```

## Project structure

```
app/
  layout.tsx        # site chrome: aurora background, header, footer, metadata
  page.tsx           # the entire flow (upload → crop → format → details → result)
  icon.jpg            # favicon (Next.js metadata file convention)
components/
  UploadSection.tsx    # drag-and-drop / file picker, HEIC handling
  CropEditor.tsx        # crop + zoom UI
  ProfileFrame.tsx        # circular frame format
  BuilderCard.tsx          # builder ID card format
  ToggleFormat.tsx          # segmented Profile Frame / Builder Card switch
  StackSelector.tsx          # stack/skill chip input
  StepIndicator.tsx           # progress stepper
  DownloadButton.tsx           # PNG export
  ShareButton.tsx                # X (Twitter) share intent
lib/
  builderTitles.ts    # random builder-title pool
  gradients.ts          # brand palette + gradient/ring definitions
  imageUtils.ts           # HEIC conversion, canvas cropping
  utils.ts                  # cn() helper, slugify, shared CTA styles
public/
  hh-logo.jpg          # official Hacker House Goa 2026 logo
  decorative-pattern.svg # tileable dot/frond background texture
```

No environment variables or external services are required — the app has no database, auth, or API routes.

## Deploying on Vercel

This repo is a stock Next.js 15 App Router project, so Vercel needs no extra configuration:

1. Push to GitHub (already connected to this repo's `origin`).
2. In Vercel, **Add New Project** → import this repository.
3. Framework preset: **Next.js** (auto-detected). Build command `next build`, output handled automatically.
4. Deploy — no environment variables needed.

To deploy from the CLI instead:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```
