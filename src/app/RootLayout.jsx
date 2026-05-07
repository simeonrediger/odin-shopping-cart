import Navbar from '../components/Navbar/Navbar.jsx';
import styles from './RootLayout.module.css';

export default function RootLayout() {
  return (
    <>
      <header className={styles.header}>
        <h1>Shop</h1>
        <Navbar />
      </header>
    </>
  );
}
