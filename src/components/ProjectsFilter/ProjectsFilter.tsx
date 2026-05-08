"use client";

import React, { useState } from 'react';
import styles from './ProjectsFilter.module.css';

const projectCategories = [
  "All Projects",
  "Educational",
  "Infrastructure",
  "Healthcare"
];

export const ProjectsFilter = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("Newest First");

  const handleSort = (val: string) => {
    setSortValue(val);
    setSortOpen(false);
  };

  return (
    <section className={styles.filterSection}>
      <div className={styles.container}>
        <div className={styles.buttonGroup}>
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterButton} ${activeCategory === cat ? styles.active : ''} font-label-caps`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.sortWrapper}>
          <div 
            className={styles.sortContainer} 
            onClick={() => setSortOpen(!sortOpen)}
          >
            <span className={`${styles.sortLabel} font-label-caps`}>Sort By:</span>
            <span className={`${styles.sortValue} font-label-caps`}>{sortValue}</span>
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
          </div>

          {sortOpen && (
            <div className={styles.sortDropdown}>
              <button onClick={() => handleSort("Newest First")} className="font-label-caps">Newest First</button>
              <button onClick={() => handleSort("Oldest First")} className="font-label-caps">Oldest First</button>
              <button onClick={() => handleSort("Project Type")} className="font-label-caps">Project Type</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};