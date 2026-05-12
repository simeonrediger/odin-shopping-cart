import { Outlet } from 'react-router';

import Navbar from '../components/Navbar/Navbar.jsx';
import styles from './RootLayout.module.css';

export default function RootLayout() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1>Shop</h1>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
