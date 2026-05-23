import { useEffect } from 'react';

import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  useEffect(() => {
    document.title = 'Page Not Found - Things & Stuff';
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.sectionContainer}>
        <h2 className={styles.errorHeading}>404: This page doesn't exist.</h2>
        <p>
          You are trying to access an invalid URL. Try navigating the site using
          the links above.
        </p>
      </section>
    </div>
  );
}
