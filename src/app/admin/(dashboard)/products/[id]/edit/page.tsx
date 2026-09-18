import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getProductById, getProducts } from '@/lib/data/catalog';
import { ProductForm } from '@/components/admin/ProductForm/ProductForm';
import ui from '@/components/admin/ui/admin.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const [product, categories, allProducts] = await Promise.all([
    getProductById(id),
    getCategories(),
    getProducts(),
  ]);
  if (!product) notFound();

  return (
    <>
      <div className={ui.pageHeader}>
        <div>
          <span className={`${ui.pageLabel} font-label-caps`}>Catalogue</span>
          <h1 className={ui.pageTitle}>{product.title}</h1>
          <p className={ui.pageSubtitle}>
            Live at{' '}
            <a href={`/products/${product.slug}`} target="_blank" rel="noopener noreferrer">
              /products/{product.slug}
            </a>
          </p>
        </div>
        <Link href="/admin/products" className={ui.btnGhost}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to products
        </Link>
      </div>

      <ProductForm product={product} categories={categories} allProducts={allProducts} />
    </>
  );
}
