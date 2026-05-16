import { useState } from 'react';
import { Outlet } from 'react-router';

import Navbar from './Navbar/Navbar.jsx';
import styles from './App.module.css';

const minQuantityPerItem = 0;
const maxQuantityPerItem = 999;

export default function App() {
  const [cart, setCart] = useState(new Map());

  const cartItemCount = Array.from(cart.values()).reduce(
    (count, quantity) => count + quantity,
    0,
  );

  function regulateQuantityToAdd(productId, quantityToAdd) {
    const currentQuantity = cart.get(productId) ?? 0;
    const maxQuantityAddable = maxQuantityPerItem - currentQuantity;
    quantityToAdd = Math.max(minQuantityPerItem, quantityToAdd);
    quantityToAdd = Math.min(quantityToAdd, maxQuantityAddable);
    return quantityToAdd;
  }

  function onAddToCart(productId, quantity) {
    quantity += cart.get(productId) ?? 0;
    const newCart = new Map([...cart]);
    newCart.set(productId, quantity);
    setCart(newCart);
  }

  function onEditCart(productId, quantity) {
    const minQuantity = 0;
    const maxQuantity = 999;
    quantity = Math.min(Math.max(minQuantity, quantity), maxQuantity);

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
        <Outlet
          context={{ cart, regulateQuantityToAdd, onAddToCart, onEditCart }}
        />
      </main>
    </div>
  );
}
