import type { Metadata } from 'next';
import { CatalogHeader } from '@/components/CatalogHeader/CatalogHeader';
import { Catalog } from '@/components/Catalog/Catalog';
import { CustomShapeCTA } from '@/components/CustomShapeCTA/CustomShapeCTA';
import { getCategories, getProducts } from '@/lib/data/catalog';

export const metadata: Metadata = {
  title: 'Our Collections',
  description:
    'Browse premium face bricks, gutka, architectural tiles, floor designs and khaprail fired in our heritage kilns.',
};

export default async function ProductsCatalog() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <main>
      <CatalogHeader />
      <Catalog products={products} categories={categories} />
      <CustomShapeCTA />
    </main>
  );
}
