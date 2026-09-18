import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

/** Public site shell: sticky header + footer around every marketing page. */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
