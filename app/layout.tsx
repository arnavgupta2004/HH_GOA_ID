import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Builder ID — Hacker House Goa 2026",
  description:
    "Create your Hacker House Goa 2026 Profile Frame or Builder ID card and share it on X.",
};

function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f4ead6]"
    >
      <div className="absolute -top-24 right-[8%] h-72 w-72 rotate-12 rounded-[45%] border-[28px] border-[#f4d35e]/40" />
      <div className="absolute bottom-[-15rem] -left-24 h-96 w-96 rounded-full bg-[#8ac9a4]/25" />
      <div className="absolute top-1/3 right-0 h-px w-1/3 bg-[#e46647]/35" />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#17372a]/15 bg-[#f4ead6]/95">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hh-logo.jpg"
            alt="Hacker House Goa 2026"
            className="h-8 w-8 rounded-sm ring-1 ring-[#17372a]/20"
          />
          <span className="text-sm font-semibold tracking-tight text-[#17372a]">
            Hacker House Goa
          </span>
        </div>
        <span className="hidden items-center gap-1.5 border border-[#17372a]/20 bg-[#fff9ed] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#17372a]/70 sm:flex">
          Goa · 2026
        </span>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[#17372a]/15 px-6 py-8 text-center text-xs text-[#17372a]/55">
      Made for Hacker House Goa 2026 · #FrameInGoa
      <br className="sm:hidden" />
      <span className="sm:before:content-['_·_']">Built by 2:47 PM Studio</span>
    </footer>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className={`${inter.variable} h-full antialiased dark`} lang="en">
      <body className="flex min-h-full flex-col font-sans text-[#17372a]">
        <AuroraBackground />
        <TooltipProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </TooltipProvider>
      </body>
    </html>
  );
}
