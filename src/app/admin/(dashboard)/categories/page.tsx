import { getCategories, getProducts } from '@/lib/data/catalog';
import { CategoryManager } from '@/components/admin/CategoryManager/CategoryManager';
import ui from '@/components/admin/ui/admin.module.css';

export default async function AdminCategoriesPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const counts: Record<string, number> = {};
  for (const p of products) {
    counts[p.categoryId] = (counts[p.categoryId] ?? 0) + 1;
  }

  return (
    <>
      <div className={ui.pageHeader}>
        <div>
          <span className={`${ui.pageLabel} font-label-caps`}>Catalogue</span>
          <h1 className={ui.pageTitle}>Categories</h1>
          <p className={ui.pageSubtitle}>
            Collections that group products and drive the catalogue filter.
          </p>
        </div>
      </div>

      <CategoryManager categories={categories} productCounts={counts} />
    </>
  );
}
