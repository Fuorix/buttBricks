import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts, getProductsByIds } from '@/lib/data/catalog';
import { cld } from '@/lib/cloudinaryUrl';
import { ProductHero } from '@/components/ProductHero/ProductHero';
import { ProductOverview } from '@/components/ProductOverview/ProductOverview';
import { TechnicalSpecs } from '@/components/TechnicalSpecs/TechnicalSpecs';
import { RelatedProducts } from '@/components/RelatedProducts/RelatedProducts';
import { FloatingCTA } from '@/components/FloatingCTA/FloatingCTA';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Prerender every known product at build time; new slugs render on demand. */
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };

  const image = product.coverImage ?? product.images[0];
  return {
    title: product.title,
    description: product.description,
    openGraph: image ? { images: [cld(image.url, { width: 1200 })] } : undefined,
  };
}

export default async function ProductDetail({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getProductsByIds(product.relatedIds);

  return (
    <main>
      <ProductHero product={product} />
      <ProductOverview product={product} />
      {product.specs.length > 0 && <TechnicalSpecs specs={product.specs} />}
      <RelatedProducts products={related} />
      <FloatingCTA productTitle={product.title} />
    </main>
  );
}
