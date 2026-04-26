import { Header } from '@/components/Header/Header';
import { ProductHero } from '@/components/ProductHero/ProductHero';
import { ProductOverview } from '@/components/ProductOverview/ProductOverview';
import { TechnicalSpecs } from '@/components/TechnicalSpecs/TechnicalSpecs';
import { RelatedProducts } from '@/components/RelatedProducts/RelatedProducts';
import { FloatingCTA } from '@/components/FloatingCTA/FloatingCTA';
import { Footer } from '@/components/Footer/Footer';

// Use a dynamic route segment for the slug.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProductDetail({ params }: { params: { slug: string } }) {
  // Normally, we'd fetch product data based on params.slug here.
  // For now, we're rendering the Fare Face Gutka layout as provided.
  return (
    <>
      <Header />
      <main className="max-w-[var(--space-container-max)] mx-auto px-8 lg:px-[var(--space-margin)]">
        <ProductHero />
        <ProductOverview />
      </main>
      <TechnicalSpecs />
      <main className="max-w-[var(--space-container-max)] mx-auto px-8 lg:px-[var(--space-margin)]">
        <RelatedProducts />
      </main>
      <FloatingCTA />
      <Footer />
    </>
  );
}
