import styles from './loading.module.css';

const THUMBNAILS = 4;
const FEATURES = 3;

export default function ProductDetailLoading() {
  return (
    <main className={styles.page} aria-busy="true" aria-label="Loading product">
      <div className={styles.container}>
        <div className={styles.imageColumn}>
          <div className={`${styles.shimmer} ${styles.mainImage}`} />
          <div className={styles.thumbRow}>
            {Array.from({ length: THUMBNAILS }, (_, index) => (
              <div key={index} className={`${styles.shimmer} ${styles.thumb}`} />
            ))}
          </div>
        </div>

        <div className={styles.contentColumn}>
          <div className={`${styles.shimmer} ${styles.lineLabel}`} />
          <div className={`${styles.shimmer} ${styles.lineTitle}`} />
          <div className={`${styles.shimmer} ${styles.lineBody}`} />
          <div className={`${styles.shimmer} ${styles.lineBody}`} />
          <div className={`${styles.shimmer} ${styles.lineBodyShort}`} />

          {Array.from({ length: FEATURES }, (_, index) => (
            <div key={index} className={styles.featureRow}>
              <div className={`${styles.shimmer} ${styles.featureIcon}`} />
              <div className={`${styles.shimmer} ${styles.featureText}`} />
            </div>
          ))}

          <div className={`${styles.shimmer} ${styles.button}`} />
        </div>
      </div>
    </main>
  );
}
