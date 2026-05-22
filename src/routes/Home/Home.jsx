import styles from './Home.module.css';

export default function Home({ currentDate = new Date() }) {
  return (
    <div className={styles.container}>
      <section className={styles.sectionContainer}>
        <h2>About</h2>
        <p>We sell things, stuff, and more!</p>
      </section>
      <section className={styles.sectionContainer}>
        <h2>{getMonthNameFromDate(currentDate)} Deals</h2>
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
