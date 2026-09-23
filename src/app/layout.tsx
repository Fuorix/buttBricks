import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buttbricks.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Butt Bricks | Pakistan's Premier Brick Manufacturer",
    template: "%s | Butt Bricks",
  },
  description:
    "Supplying architects, engineers and contractors with premium quality face bricks, floor designs and khaprail across Pakistan and the world since 1979.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

/**
 * Root layout: fonts, global CSS and the document shell only.
 * The public site chrome (Header/Footer) lives in `(site)/layout.tsx`;
 * the admin module has its own shell under `admin/`.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable} light`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {/* Cookieless page analytics. Inert unless deployed on Vercel. */}
        <Analytics />
      </body>
    </html>
  );
}
