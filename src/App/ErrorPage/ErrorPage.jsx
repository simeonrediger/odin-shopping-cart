import { useEffect } from 'react';

import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  useEffect(() => {
    document.title = 'Page Not Found - Things & Stuff';
    document.querySelector('[data-route-heading]')?.focus();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.sectionContainer}>
        <h2 data-route-heading tabIndex={-1} className={styles.errorHeading}>
          Page not found
        </h2>
        <p>
          You are trying to access an invalid URL. Try navigating the site using
          the links above.
        </p>
      </section>
    </div>
  );
}
