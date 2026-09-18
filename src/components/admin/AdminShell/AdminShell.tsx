import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { logoutAction } from '@/app/actions/admin/auth';
import { AdminNav } from './AdminNav';
import styles from './AdminShell.module.css';

interface AdminShellProps {
  email: string;
  children: React.ReactNode;
}

/** Sidebar + content frame for all dashboard pages. Server component. */
export const AdminShell: React.FC<AdminShellProps> = ({ email, children }) => {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brandRow}>
          <Link href="/admin" className={styles.brand}>
            <Image src="/favicon.png" alt="" width={32} height={32} className={styles.brandLogo} />
            <span className={styles.brandText}>
              <span className={styles.brandName}>BUTT BRICKS</span>
              <span className={styles.brandSub}>Admin</span>
            </span>
          </Link>
        </div>

        <AdminNav />

        <div className={styles.sidebarFooter}>
          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.viewSite}>
            <span className="material-symbols-outlined">open_in_new</span>
            <span>View site</span>
          </a>
          <div className={styles.user}>
            <span className={`material-symbols-outlined ${styles.userIcon}`}>account_circle</span>
            <span className={styles.userEmail} title={email}>
              {email}
            </span>
          </div>
          <form action={logoutAction}>
            <button type="submit" className={styles.logout}>
              <span className="material-symbols-outlined">logout</span>
              <span>Sign out</span>
            </button>
          </form>
        </div>
      </aside>

      <div className={styles.content}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  );
};
