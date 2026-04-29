import React from 'react';
import styles from './Products.module.css';

interface Product {
  title: string;
  description: string;
  image: string;
  alt: string;
  tag: string | null;
}

const productData: Product[] = [
  {
    title: 'Fare Face Gutka',
    description: 'Refined thin-profile bricks for elegant facade cladding and minimalist architectural details.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1OS_V5oaUJigcG8L0wOnmvixta2fAGesDcCpYktu9jFsqC_gkgiQ5HfZOyJ3OCZrhrIT9WjdmJr9t-aN1dYlUE_nWXHSx_T44buFLXLjt4Zv6SZYjf0gazRdTHrmKenfWEXxRA1ebZ0eZ_4ew9V-lIfSbO7mHxysu6PjKOnZXWcigchiydtKpbgY5vTqWfn8yIj5Y5voRGqdNpZ4HOmBcr2L-ecENbtpqkQPDQGqJcohXOGyHWpD-rgcg2MqJapHK1ExhziwnsqQQ',
    alt: 'High quality fare face gutka bricks arranged in a rhythmic pattern with natural clay textures',
    tag: 'PREMIUM'
  },
  {
    title: 'Special Face Bricks',
    description: 'Classic structural face bricks with superior durability and timeless aesthetic appeal.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhiTuHDZnWP50UT-XvZo2mGG8oF4LD5ZyxpnWb9KYgJHj9sfaa2zhZNQb6uxDbLW0alyf2lZ9YmgW52ZlQ7MazefZTJ24YwGrxAF5xEkUC-pRHm6LscB1zSRVKC95YDGWBE2nbbnhNE_VAG9kHgHyKS7d3jmmnt6LGlwz3iqh9ZcOd5ZDsONJCUEEP6GOBXeUWaFOhjq8eTjqTSczdU6pdQDPeuPq4sR9LMqs1ho-hcgCu6n4uar2FgE1TPzI95-Ab3-6p-g377jBw',
    alt: 'Rustic red special face bricks showing natural kiln-fired variations and rugged edges',
    tag: null
  },
  {
    title: 'Special Tiles',
    description: 'Custom fired tiles designed for interior feature walls and luxury exterior finishes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKAOkGURW_Zue0tTqPytPge3_w6enrIUz5CLst_Pjj_O1sYovbwB9_ndMVj7AJAIh5vtge-XD52aXV69uAPnGjqpPH8zC2qQGmgrgwkWuw4En5Qv0rvSbJFwkca_WVjNunWoydevsVKkwm6HSlaSycd3DOsaS5019MAzLrfPD3pwg93_h9FWSmszPPGDU3P3a4F0zOuMoyrDRm8075TJxzTKTK4-ECmUOAxIRFgP6o8T12bA_R4NsHgEHP7lxo0KGx3lZ3u9G0173C',
    alt: 'Large format terracotta wall tiles with smooth surface and architectural precision',
    tag: null
  },
  {
    title: 'Face Design',
    description: 'Bespoke geometric arrangements and textures for unique building character.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANJ99dIgxnZC0iE2ithmZwwL3sUPtRb0G13jnROV5OVxj3ait7eW6M3pycY_zwPnnsmmmRt2fLNoTK113jBrUsUYVgyl_tZJsL_axFlNkdDuWGs1i3zPcbna3klzu-tJNVBA9h2kbWQjXWgSd3jpYrLQi4_wDhtRyshyhPuI3QLVQ2ACs1lEJ2PGZ1X6CKnX0DGKLWGezUPV4YzsQ1mVgMu8wuUCvGdCLE2P-gaI8p2zxcfKWkKxcS8O95if0UGn0BnKAGFUDxJzZ1',
    alt: 'Intricate brick patterns showing decorative masonry work with varying depths and shadows',
    tag: null
  },
  {
    title: 'Floor Design',
    description: 'Heavy-duty terracotta flooring solutions for courtyards, pathways, and commercial spaces.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPD6hLT0i4TiuL56wMCq08tP-0jxrtComLapFgn1Xpg8x1vEoz7uHQOAABCdT67dGY1fDWh6V_HUCg5MUX2VDFXqFOlDzxAyyr33hgSvD4PvX_A8QcFOrhVLg41Z5mCNkuabe7xS4U1ahNoKdjS-_1jNz_SWvci1Cx6lxZ8dd_bU9grtGBUgeFBFLsK9CHFPb_8aOtJnwM_sWXNiM_g1wlv1IhP6aSVIrgYAc9i_tzqV7FFzpVxbJDJ3YqtCj9xln1_v1svsB6Sv_H',
    alt: 'Terracotta floor pavers arranged in a herringbone pattern with warm industrial aesthetic',
    tag: null
  },
  {
    title: 'Khaprail Design',
    description: 'Traditional roofing tiles that provide natural insulation and heritage styling.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC__CCX-6-sTTAtpUrb17DBOIHu_j0fhd_IowuTad7eks9qhbM72P-hnISHtWmsUVjv4Kq0LFPxwcmmgEyM3SKlcW1hOlFlUR87TqdIqLfFwzgINmTyKf-qHyK8c3V_OxN_u3WaQV8tllSm_K-A8GJ5NIqw0XViyiFBUOIzFdQRm3daukxX8xDUoD6d8MmyL7rwUaAswlS2u2Xmu15luGkB3ND5Ax6n55R_1kbWSfJoNaBXvs7N-TSRSKHtQpQ8fVDBlFQg_BEoOxJJ',
    alt: 'Traditional Pakistani khaprail roof tiles with weathered texture and deep red earthen tones',
    tag: null
  }
];

export const Products: React.FC = () => {
  return (
    <section className={styles.productsSection} id="products">
      <div className={`brick-grid-pattern ${styles.patternOverlay}`} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={`${styles.tagline} font-label-caps`}>Collections</span>
          <h2 className={`${styles.title} font-headline-lg`}>Architectural Masonry</h2>
        </div>
        
        <div className={styles.grid}>
          {productData.map((product, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img 
                  className={styles.image} 
                  src={product.image} 
                  alt={product.alt} 
                  loading="lazy"
                />
                {product.tag && (
                  <div className={styles.cardBadge}>{product.tag}</div>
                )}
              </div>
              <h3 className={`${styles.cardTitle} font-headline-md`}>{product.title}</h3>
              <p className={`${styles.cardDescription} font-body-md`}>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};