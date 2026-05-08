import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Butt Bricks | Pakistan's Premier Brick Manufacturer",
  description:
    "Supplying architects, engineers and contractors with premium quality face bricks, floor designs and khaprail across Pakistan and the world since 1979.",
  icons: {
    icon: "/favicon.png", 
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerif.variable} light`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
