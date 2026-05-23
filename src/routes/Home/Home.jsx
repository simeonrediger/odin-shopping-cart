import { useEffect } from 'react';

import styles from './Home.module.css';

export default function Home({ currentDate = new Date() }) {
  useEffect(() => {
    document.title = 'Things & Stuff';
    document.querySelector('[data-route-heading]')?.focus();
  }, []);

  return (
    <div className={styles.container}>
      <h2 data-route-heading tabIndex={-1} className="visually-hidden">
        Home
      </h2>
      <section className={styles.sectionContainer}>
        <h3>About</h3>
        <p>We sell things, stuff, and more!</p>
      </section>
      <section className={styles.sectionContainer}>
        <h3>{getMonthNameFromDate(currentDate)} deals</h3>
        <p>Spend $200 and get free 2-day shipping!</p>
      </section>
    </div>
  );
}

function getMonthNameFromDate(date) {
  const month = date.getMonth();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthNames[month];
}
