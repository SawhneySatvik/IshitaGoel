import type { Metadata } from "next";
import { Fraunces, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import CustomCursor from "@/components/cursor/CustomCursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Preloader from "@/components/Preloader";
import PageCurtain from "@/components/PageCurtain";
import { SITE_URL } from "@/lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ishita Goel — AI Research & Design",
  description:
    "Ishita Goel — AI researcher and designer working at the intersection of human-centered and sustainable machine learning. Founder of Kaushal Up.",
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    title: "Ishita Goel — AI Research & Design",
    description:
      "AI researcher and designer at the intersection of human-centered and sustainable machine learning.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${newsreader.variable} antialiased`}
    >
      <body>
        <Providers>
          <Preloader />
          <CustomCursor />
          <ScrollProgress />
          <PageCurtain />
          <div className="grain" aria-hidden="true" />
          <SmoothScroll>
            <a
              href="#about"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
            >
              Skip to content
            </a>
            <Nav />
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
