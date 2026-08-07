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
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050608]"
    >
      <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-[#0B6839]/30 blur-[120px]" />
      <div className="absolute top-1/4 -right-40 h-[32rem] w-[32rem] rounded-full bg-[#EA0A60]/15 blur-[130px]" />
      <div className="absolute bottom-[-12rem] left-1/4 h-[30rem] w-[30rem] rounded-full bg-[#FAE323]/[0.08] blur-[140px]" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hh-logo.jpg"
            alt="Hacker House Goa 2026"
            className="h-8 w-8 rounded-lg ring-1 ring-white/15"
          />
          <span className="text-sm font-semibold tracking-tight text-white">
            Hacker House Goa
          </span>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/50 sm:flex">
          Builder ID Generator
        </span>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-8 text-center text-xs text-white/35">
      Made for Hacker House Goa 2026 · #FrameInGoa
    </footer>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className={`${inter.variable} h-full antialiased dark`} lang="en">
      <body className="flex min-h-full flex-col font-sans text-white">
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
