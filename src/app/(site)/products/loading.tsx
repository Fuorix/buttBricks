import styles from './loading.module.css';

/** Placeholder card count: matches the six seeded products closely enough
 *  that the grid height barely changes when real data arrives. */
const PLACEHOLDER_CARDS = 6;

export default function ProductsLoading() {
  return (
    <main className={styles.page} aria-busy="true" aria-label="Loading collections">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={`${styles.shimmer} ${styles.lineLabel}`} />
          <div className={`${styles.shimmer} ${styles.lineTitle}`} />
          <div className={`${styles.shimmer} ${styles.lineBody}`} />
          <div className={`${styles.shimmer} ${styles.lineBodyShort}`} />
        </div>

        <div className={styles.grid}>
          {Array.from({ length: PLACEHOLDER_CARDS }, (_, index) => (
            <div key={index} className={styles.card}>
              <div className={`${styles.shimmer} ${styles.thumb}`} />
              <div className={styles.cardBody}>
                <div className={`${styles.shimmer} ${styles.lineBody}`} />
                <div className={`${styles.shimmer} ${styles.lineBody}`} />
                <div className={`${styles.shimmer} ${styles.lineBodyShort}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
