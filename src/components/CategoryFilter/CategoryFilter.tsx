"use client";

import React, { useState } from 'react';
import styles from './CategoryFilter.module.css';

// We moved the list inside or imported it, but we manage the "active" state locally
const categories = [
  'All Collections',
  'Premium Bricks',
  'Architectural Tiles',
  'Custom Designs',
  'Geometric Patterns',
  'Heritage Restorations',
];

export const CategoryFilter: React.FC = () => {
  // Track the name of the active category
  const [activeCategory, setActiveCategory] = useState('All Collections');

  return (
    <section className={styles.filterSection}>
      <div className={styles.container}>
        <div className={styles.scrollContainer}>
          {categories.map((category) => (
            <button 
              key={category} 
              type="button"
              className={`${styles.filterButton} ${
                activeCategory === category ? styles.active : ''
              } font-label-caps`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};