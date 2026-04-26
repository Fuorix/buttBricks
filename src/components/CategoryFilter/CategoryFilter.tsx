import React from 'react';
import styles from './CategoryFilter.module.css';

const categories = [
  { name: 'All Collections', active: true },
  { name: 'Premium Bricks', active: false },
  { name: 'Architectural Tiles', active: false },
  { name: 'Custom Designs', active: false },
  { name: 'Geometric Patterns', active: false },
  { name: 'Heritage Restorations', active: false },
];

export const CategoryFilter = () => {
  return (
    <section className={styles.filterSection}>
      <div className={styles.scrollContainer}>
        {categories.map((category, index) => (
          <button 
            key={index} 
            className={`${styles.filterButton} ${category.active ? styles.active : ''} font-label-caps`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
};
