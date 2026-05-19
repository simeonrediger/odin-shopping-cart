import { useState } from 'react';
import { Outlet } from 'react-router';

import Navbar from './Navbar/Navbar.jsx';
import styles from './App.module.css';

const maxQuantityPerItem = 999;

export default function App({ children }) {
  const [cart, setCart] = useState(new Map());

  const cartItemCount = Array.from(cart.values()).reduce(
    (count, quantity) => count + quantity,
    0,
  );

  function getMaxItemQuantity() {
    return maxQuantityPerItem;
  }

  function getCurrentItemQuantity(productId) {
    return cart.get(productId) ?? 0;
  }

  function cartHasItem(productId) {
    return cart.has(productId);
  }

  function regulateQuantity(quantity) {
    quantity = Math.round(quantity);
    quantity = Math.max(0, quantity);
    quantity = Math.min(quantity, maxQuantityPerItem);
    return quantity;
  }

  function regulateQuantityToAdd(productId, quantityToAdd) {
    const currentQuantity = getCurrentItemQuantity(productId);
    const maxQuantityAddable = maxQuantityPerItem - currentQuantity;
    quantityToAdd = Math.round(quantityToAdd);
    quantityToAdd = Math.max(0, quantityToAdd);
    quantityToAdd = Math.min(quantityToAdd, maxQuantityAddable);
    return quantityToAdd;
  }

  function onAddToCart(productId, quantityToAdd) {
    const quantity = getCurrentItemQuantity(productId) + quantityToAdd;
    const newCart = new Map(cart);
    newCart.set(productId, quantity);
    setCart(newCart);

    return newCart.get(productId) === maxQuantityPerItem;
  }

  function onEditCart(productId, quantity) {
    quantity = regulateQuantity(quantity);
    const newCart = new Map(cart);

    if (quantity > 0) {
      newCart.set(productId, quantity);
    } else {
      newCart.delete(productId);
    }

    setCart(newCart);
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1>Shop</h1>
        <Navbar cartItemCount={cartItemCount} />
      </header>
      <main>
        {children || (
          <Outlet
            context={{
              cart,
              getMaxItemQuantity,
              getCurrentItemQuantity,
              cartHasItem,
              regulateQuantityToAdd,
              onAddToCart,
              onEditCart,
            }}
          />
        )}
      </main>
    </div>
  );
}
