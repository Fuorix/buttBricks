// src/app/products/[slug]/page.tsx
import React from 'react';
import { ProductHero } from '@/components/ProductHero/ProductHero';
import { ProductOverview } from '@/components/ProductOverview/ProductOverview';
import { TechnicalSpecs } from '@/components/TechnicalSpecs/TechnicalSpecs';
import { RelatedProducts } from '@/components/RelatedProducts/RelatedProducts';
import { FloatingCTA } from '@/components/FloatingCTA/FloatingCTA';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetail({ params }: ProductPageProps) {
  // The slug is available here for future data fetching: params.slug
  
  return (
    <>
      <ProductHero />
      <ProductOverview />
      <TechnicalSpecs />
      <RelatedProducts />
      <FloatingCTA />
    </>
  );
}