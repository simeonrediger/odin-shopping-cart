import styles from './Home.module.css';

const currentMonth = new Date().toLocaleString('default', { month: 'long' });

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.sectionContainer}>
        <h2>About</h2>
        <p>We sell things, stuff, and more!</p>
      </section>
      <section className={styles.sectionContainer}>
        <h2>{currentMonth} Deals</h2>
        <p>Spend $200 and get free 2-day shipping!</p>
      </section>
    </div>
  );
}
