import Link from 'next/link';
import { getProducts } from '@/lib/data/catalog';
import { cld } from '@/lib/cloudinaryUrl';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton/DeleteProductButton';
import { Notice } from '@/components/admin/ui/Notice';
import ui from '@/components/admin/ui/admin.module.css';
import styles from './page.module.css';

interface PageProps {
  searchParams: Promise<{ saved?: string | string[] }>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const saved = Array.isArray(params.saved) ? params.saved[0] : params.saved;
  const products = await getProducts();

  return (
    <>
      <div className={ui.pageHeader}>
        <div>
          <span className={`${ui.pageLabel} font-label-caps`}>Catalogue</span>
          <h1 className={ui.pageTitle}>Products</h1>
          <p className={ui.pageSubtitle}>
            {products.length} product{products.length === 1 ? '' : 's'} published on the site.
          </p>
        </div>
        <Link href="/admin/products/new" className={ui.btnPrimary}>
          <span className="material-symbols-outlined">add</span>
          New product
        </Link>
      </div>

      {saved && <Notice kind="success">Saved “{saved}”.</Notice>}

      {products.length === 0 ? (
        <div className={`${ui.card} ${ui.emptyState}`}>
          <h3>No products yet</h3>
          <p>Add your first product to populate the public catalogue.</p>
          <Link href="/admin/products/new" className={ui.btnPrimary}>
            Create the first product
          </Link>
        </div>
      ) : (
        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead>
              <tr>
                <th className="font-label-caps">Product</th>
                <th className="font-label-caps">Category</th>
                <th className="font-label-caps">SKU</th>
                <th className="font-label-caps">Featured</th>
                <th className="font-label-caps">Badge</th>
                <th className="font-label-caps">Updated</th>
                <th className="font-label-caps">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className={styles.productCell}>
                      <div className={styles.thumb}>
                        {p.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={cld(p.coverImage.url, { width: 96, height: 72, crop: 'fill' })}
                            alt=""
                            width={96}
                            height={72}
                          />
                        ) : (
                          <span className={`material-symbols-outlined ${styles.thumbEmpty}`}>image</span>
                        )}
                      </div>
                      <div className={styles.productText}>
                        <Link href={`/admin/products/${p.id}/edit`} className={styles.productTitle}>
                          {p.title}
                        </Link>
                        <span className={ui.muted}>/products/{p.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td>{p.categoryName || <span className={ui.muted}>—</span>}</td>
                  <td>{p.sku || <span className={ui.muted}>—</span>}</td>
                  <td>
                    <span className={p.isFeatured ? ui.pillOn : ui.pillOff}>{p.isFeatured ? 'Yes' : 'No'}</span>
                  </td>
                  <td>{p.badge ? <span className={ui.pillNeutral}>{p.badge}</span> : <span className={ui.muted}>—</span>}</td>
                  <td className={ui.muted}>{formatDate(p.updatedAt)}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/products/${p.id}/edit`} className={`${ui.btnSecondary} ${ui.btnSmall}`}>
                        <span className="material-symbols-outlined">edit</span>
                        Edit
                      </Link>
                      <DeleteProductButton id={p.id} title={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
