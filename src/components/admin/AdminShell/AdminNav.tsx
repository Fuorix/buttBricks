'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminShell.module.css';

const links = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard', exact: true },
  { href: '/admin/products', label: 'Products', icon: 'inventory_2', exact: false },
  { href: '/admin/categories', label: 'Categories', icon: 'category', exact: false },
];

export const AdminNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Admin">
      {links.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${active ? styles.navActive : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className="material-symbols-outlined">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
