import { useState } from 'react';
import { Outlet } from 'react-router';

import Navbar from './Navbar/Navbar.jsx';
import styles from './App.module.css';

export default function App() {
  const [cart, setCart] = useState(new Map());

  function onAddToCart(itemId, quantity) {
    quantity += cart.get(itemId) ?? 0;
    const newCart = new Map([...cart]);
    newCart.set(itemId, quantity);
    setCart(newCart);
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1>Shop</h1>
        <Navbar />
      </header>
      <main>
        <Outlet context={{ onAddToCart }} />
      </main>
    </div>
  );
}
