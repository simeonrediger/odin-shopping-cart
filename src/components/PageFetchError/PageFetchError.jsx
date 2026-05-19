import styles from './PageFetchError.module.css';

export default function PageFetchError({ error }) {
  return (
    <section className={styles.errorContainer}>
      <h2 className={styles.errorHeading}>Error</h2>
      <p>{error.message || 'An unknown error occurred.'}</p>
    </section>
  );
}
