import Link from 'next/link';
import { getCategories, getProducts } from '@/lib/data/catalog';
import ui from '@/components/admin/ui/admin.module.css';
import styles from './page.module.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default async function AdminDashboardPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const featured = products.filter((p) => p.isFeatured).length;
  const missingCover = products.filter((p) => !p.coverImage).length;
  const recent = [...products]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const stats = [
    { label: 'Total products', value: products.length, icon: 'inventory_2', href: '/admin/products' },
    { label: 'Featured', value: featured, icon: 'star', href: '/admin/products' },
    { label: 'Categories', value: categories.length, icon: 'category', href: '/admin/categories' },
    { label: 'Missing cover image', value: missingCover, icon: 'image_not_supported', href: '/admin/products', warn: missingCover > 0 },
  ];

  return (
    <>
      <div className={ui.pageHeader}>
        <div>
          <span className={`${ui.pageLabel} font-label-caps`}>Overview</span>
          <h1 className={ui.pageTitle}>Dashboard</h1>
          <p className={ui.pageSubtitle}>A quick look at the catalogue as visitors see it.</p>
        </div>
        <div className={styles.quickActions}>
          <Link href="/admin/products/new" className={ui.btnPrimary}>
            <span className="material-symbols-outlined">add</span>
            New product
          </Link>
          <Link href="/admin/categories" className={ui.btnSecondary}>
            <span className="material-symbols-outlined">category</span>
            Manage categories
          </Link>
        </div>
      </div>

      <div className={styles.statGrid}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`${styles.stat} ${s.warn ? styles.statWarn : ''}`}>
            <span className={`material-symbols-outlined ${styles.statIcon}`}>{s.icon}</span>
            <span className={styles.statValue}>{s.value}</span>
            <span className={`${styles.statLabel} font-label-caps`}>{s.label}</span>
          </Link>
        ))}
      </div>

      <section className={ui.card}>
        <span className={`${ui.sectionLabel} font-label-caps`}>Activity</span>
        <h2 className={ui.sectionTitle}>Recently updated</h2>

        {recent.length === 0 ? (
          <div className={ui.emptyState}>
            <h3>No products yet</h3>
            <p>Create your first product to see it here.</p>
            <Link href="/admin/products/new" className={ui.btnPrimary}>
              Create product
            </Link>
          </div>
        ) : (
          <ul className={styles.recentList}>
            {recent.map((p) => (
              <li key={p.id}>
                <Link href={`/admin/products/${p.id}/edit`} className={styles.recentRow}>
                  <div className={styles.recentMain}>
                    <span className={styles.recentTitle}>{p.title}</span>
                    <span className={ui.muted}>
                      {p.categoryName || 'Uncategorised'} · /products/{p.slug}
                    </span>
                  </div>
                  <span className={ui.muted}>{formatDate(p.updatedAt)}</span>
                  <span className={`material-symbols-outlined ${styles.recentArrow}`}>chevron_right</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
