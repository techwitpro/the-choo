import type { Metadata } from "next";
import { Playfair_Display, Poppins, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Choo Cafe — Discover Coffee That Changes Everything",
  description:
    "Where every sip tells a story. Brewed with passion and comfort, The Choo Cafe is your cozy escape filled with rich aromas and crafted flavors.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "The Choo Cafe — Discover Coffee That Changes Everything",
    description:
      "Where every sip tells a story. Brewed with passion and comfort, The Choo Cafe is your cozy escape filled with rich aromas and crafted flavors.",
    siteName: "The Choo Cafe",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#F4F0E9] text-[#111C24] font-poppins selection:bg-[#ECBA61] selection:text-[#111C24]">
        {children}
      </body>
    </html>
  );
}
