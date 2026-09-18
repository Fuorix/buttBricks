"use client";

import React, { useMemo, useState } from 'react';
import { CategoryFilter, ALL_CATEGORIES } from '@/components/CategoryFilter/CategoryFilter';
import { CatalogGrid } from '@/components/CatalogGrid/CatalogGrid';
import type { Category, Product } from '@/lib/types';

interface CatalogProps {
  products: Product[];
  categories: Category[];
}

/**
 * Client wrapper for the catalog page: category filter + grid.
 * Data arrives from the server page; filtering is purely client-side.
 */
export const Catalog: React.FC<CatalogProps> = ({ products, categories }) => {
  const [activeId, setActiveId] = useState(ALL_CATEGORIES);

  // Only offer categories that actually contain products.
  const usedCategories = useMemo(() => {
    const used = new Set(products.map((p) => p.categoryId));
    return categories.filter((c) => used.has(c.id));
  }, [products, categories]);

  const visible = useMemo(
    () => (activeId === ALL_CATEGORIES ? products : products.filter((p) => p.categoryId === activeId)),
    [products, activeId]
  );

  return (
    <>
      {usedCategories.length > 1 && (
        <CategoryFilter categories={usedCategories} activeId={activeId} onChange={setActiveId} />
      )}
      <CatalogGrid products={visible} />
    </>
  );
};
