import Link from 'next/link';
import { getCategories, getProducts } from '@/lib/data/catalog';
import { ProductForm } from '@/components/admin/ProductForm/ProductForm';
import { Notice } from '@/components/admin/ui/Notice';
import ui from '@/components/admin/ui/admin.module.css';

export default async function NewProductPage() {
  const [categories, allProducts] = await Promise.all([getCategories(), getProducts()]);

  return (
    <>
      <div className={ui.pageHeader}>
        <div>
          <span className={`${ui.pageLabel} font-label-caps`}>Catalogue</span>
          <h1 className={ui.pageTitle}>New product</h1>
          <p className={ui.pageSubtitle}>Fill in the details below. Images upload straight to Cloudinary.</p>
        </div>
        <Link href="/admin/products" className={ui.btnGhost}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to products
        </Link>
      </div>

      {categories.length === 0 && (
        <Notice kind="info">
          You have no categories yet. <Link href="/admin/categories">Create one first</Link> so the
          product can be filed under it.
        </Notice>
      )}

      <ProductForm categories={categories} allProducts={allProducts} />
    </>
  );
}
