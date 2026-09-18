import Image from 'next/image';
import { LoginForm } from '@/components/admin/LoginForm/LoginForm';
import styles from './page.module.css';

interface PageProps {
  searchParams: Promise<{ next?: string | string[] }>;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const next = rawNext && rawNext.startsWith('/admin') ? rawNext : '/admin';

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <Image src="/favicon.png" alt="Butt Bricks" width={40} height={40} priority />
          <div>
            <span className={`${styles.brandLabel} font-label-caps`}>Butt Bricks</span>
            <h1 className={styles.title}>Admin Sign In</h1>
          </div>
        </div>
        <p className={styles.subtitle}>
          Manage products, categories and imagery for the public catalogue.
        </p>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
