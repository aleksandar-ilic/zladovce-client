import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Zladovce — organski proizvodi sa južne Srbije",
    template: "%s | Zladovce",
  },
  description:
    "Domaći džemovi, sokovi, kompoti i sveže bobice sa porodičnog imanja u Zladovcu.",
  openGraph: {
    siteName: "Zladovce",
    locale: "sr_RS",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sr"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--color-cream)] text-[var(--color-ink)]">
        <Header />
        {children}
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
