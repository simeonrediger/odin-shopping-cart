import { useEffect } from 'react';

import { buildDocumentTitle } from '/src/utils.js';

import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = buildDocumentTitle('Page Not Found');
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
