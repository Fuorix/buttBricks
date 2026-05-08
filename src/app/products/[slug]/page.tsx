"use client";

import React, { use, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { productListData } from '@/data/productListData';
import { ProductHero } from '@/components/ProductHero/ProductHero';
import { ProductOverview } from '@/components/ProductOverview/ProductOverview';
import { TechnicalSpecs } from '@/components/TechnicalSpecs/TechnicalSpecs';
import { RelatedProducts } from '@/components/RelatedProducts/RelatedProducts';
import { FloatingCTA } from '@/components/FloatingCTA/FloatingCTA';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetail({ params }: PageProps) {
  const { slug } = use(params);
  
  const product = productListData.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' 
    });
  }, [slug]); 

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductHero product={product} />
      <ProductOverview product={product} />
      <TechnicalSpecs specs={product.specs} />
      <RelatedProducts relatedSlugs={product.relatedSlugs} />
      <FloatingCTA productTitle={product.title} />
    </>
  );
}