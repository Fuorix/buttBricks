import React from 'react';
import Link from 'next/link';
import styles from './RelatedProducts.module.css';

const relatedData = [
  {
    title: 'Standard Structural Red',
    description: 'The foundation of traditional masonry.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2hVjkIw0zvaregJkE7gXsWX-xOYe20iZ2_UigxKDQdEyVwYqobBkkFFc5o0KvZDWJFqP_u9SO5CsnKF0HfX2-Rjo6dSCqneh0_q8NSbg7LfnhwF4qQUiKSwHdQdvh5oOUWuP6iClsrXQXDVkJVRYs4Bf2doBuh_UvPZ-a_N550ASOxM4K5ulrUMj9bpHXxW25LNzdtRr1ZHE_G9eM2qEqN3ZaoglqI8CFk2S_PGPQAic4g0AQFs-AwfZyWGILlT5bdBaZhjtB4Wur',
    alt: 'A stack of standard red structural bricks showing rustic texture and traditional craftsmanship.',
    tag: 'Heritage Collection',
    slug: 'standard-structural-red'
  },
  {
    title: 'Thin Cladding Tile',
    description: 'Lightweight aesthetic for modern interiors.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgOj8JHgZscB86krfOQmgEGiS0i-_uyHW-KF52SpQ073foM3eKzPxY_QE8y-50_ZMb12gxa6iTTWAZf-udWs7ykyeHsyoXduyhnR_jZoxKStkFLdktCPQnH_C5VKAfUZvhkKNlksTEnFVaHkaavFoXi9qy3_Z8Jkc0pA0HWIS8bmNkaVwKvyZc8UmgPsuGR3qtbBSu65TLsr31E8YQT-nePk3Y3MfsaMAQADNuHmRtCFmuLuZJ_PK-sMdGyNe4llHdsPAD9nPRsMlg',
    alt: 'Modern thin brick veneer tiles used for interior luxury wall cladding in a high-end office.',
    tag: 'Interior Series',
    slug: 'thin-cladding-tile'
  },
  {
    title: 'Refractory Fire Brick',
    description: 'Engineered for extreme thermal resistance.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXqqL7JO042O-h-k0f0Q8ZqCAeuPxrBRNPNhcvuV29bKggCWFMTZRoZUycVPOBBezXJuM-4Z1bHatGgzH95hpwo_nVzD8R9MfzltenMF4FtFTneoIBRhEJhbX33ckx2_5p7zleK6a-9NjUYM0OLI2RQtRDKvcVQ7DFi6zYJ1dyDCSN9U5bqe27hDYNhvMQrdDUbbSIhdzAwAVZ9oMglb5ePu9HX8Ck_lRsEH7CQjoCaF1KI6kionF7CY5Bgaso5el96Db2CiEi0v9f',
    alt: 'Cream-colored high-temperature refractory fire bricks neatly stacked in a geometric arrangement.',
    tag: 'Industrial Grade',
    slug: 'refractory-fire-brick'
  }
];

export const RelatedProducts = () => {
  return (
    <section className={styles.relatedSection}>
      <div className={styles.headerRow}>
        <div>
          <span className={`${styles.tagline} font-label-caps`}>Curation</span>
          <h3 className={`${styles.title} font-headline-md`}>Similar Materials</h3>
        </div>
        <div className={styles.controls}>
          <button className={styles.controlButton}>
            <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
          </button>
          <button className={styles.controlButton}>
            <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
          </button>
        </div>
      </div>
      
      <div className={styles.grid}>
        {relatedData.map((item, index) => (
          <Link href={`/products/${item.slug}`} key={index} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img 
                src={item.image} 
                alt={item.alt} 
                className={styles.image}
                loading="lazy"
              />
            </div>
            <span className={styles.cardTag}>{item.tag}</span>
            <h4 className={`${styles.cardTitle} font-headline-md`}>{item.title}</h4>
            <p className={styles.cardDescription}>{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
