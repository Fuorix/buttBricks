"use client";

import React from 'react';
import styles from './CategoryFilter.module.css';
import type { Category } from '@/lib/types';

export const ALL_CATEGORIES = 'all';

interface CategoryFilterProps {
  categories: Category[];
  activeId: string;
  onChange: (categoryId: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeId, onChange }) => {
  const options = [{ id: ALL_CATEGORIES, name: 'All Collections' }, ...categories];

  return (
    <section className={styles.filterSection}>
      <div className={styles.container}>
        <div className={styles.filterGroup} role="tablist" aria-label="Filter by collection">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={activeId === option.id}
              className={`${styles.filterButton} ${activeId === option.id ? styles.active : ''} font-label-caps`}
              onClick={() => onChange(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
