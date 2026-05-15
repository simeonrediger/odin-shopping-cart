import { useState } from 'react';
import { Outlet } from 'react-router';

import Navbar from './Navbar/Navbar.jsx';
import styles from './App.module.css';

export default function App() {
  const [cart, setCart] = useState(new Map());

  const cartItemCount = Array.from(cart.values()).reduce(
    (count, quantity) => count + quantity,
    0,
  );

  function onAddToCart(productId, quantity) {
    quantity += cart.get(productId) ?? 0;
    const newCart = new Map([...cart]);
    newCart.set(productId, quantity);
    setCart(newCart);
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1>Shop</h1>
        <Navbar cartItemCount={cartItemCount} />
      </header>
      <main>
        <Outlet context={{ cart, onAddToCart }} />
      </main>
    </div>
  );
}
