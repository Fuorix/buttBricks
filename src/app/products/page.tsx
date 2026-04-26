import { Header } from '@/components/Header/Header';
import { CatalogHeader } from '@/components/CatalogHeader/CatalogHeader';
import { CategoryFilter } from '@/components/CategoryFilter/CategoryFilter';
import { CatalogGrid } from '@/components/CatalogGrid/CatalogGrid';
import { CustomShapeCTA } from '@/components/CustomShapeCTA/CustomShapeCTA';
import { Footer } from '@/components/Footer/Footer';

export default function ProductsCatalog() {
  return (
    <>
      <Header />
      <main className="max-w-[var(--space-container-max)] mx-auto px-8 lg:px-[var(--space-margin)]">
        <CatalogHeader />
        <CategoryFilter />
        <CatalogGrid />
        <CustomShapeCTA />
      </main>
      <Footer />
    </>
  );
}
