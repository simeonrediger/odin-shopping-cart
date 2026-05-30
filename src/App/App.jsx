import { useState } from 'react';
import { Outlet } from 'react-router';

import { SITE_TITLE } from '/src/constants.js';
import {
  getMaxItemQuantity,
  getCurrentItemQuantity,
  cartHasItem,
  cartIsEmpty,
  getCartItemTotal,
  getCartPriceTotal,
  regulateQuantityToAdd,
  onAddToCart,
  onEditCart,
} from '/src/domains/cart/cart-utils.js';

import Navbar from './Navbar/Navbar.jsx';
import styles from './App.module.css';

export default function App({ initialCart = new Map() }) {
  const [cart, setCart] = useState(initialCart);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1>{SITE_TITLE}</h1>
        <Navbar cartItemCount={getCartItemTotal(cart)} />
      </header>
      <main>
        <Outlet
          context={{
            getMaxItemQuantity,
            getCurrentItemQuantity: productId =>
              getCurrentItemQuantity(cart, productId),
            cartHasItem: productId => cartHasItem(cart, productId),
            cartIsEmpty: () => cartIsEmpty(cart),
            getCartItemTotal: () => getCartItemTotal(cart),
            getCartPriceTotal: products => getCartPriceTotal(cart, products),
            regulateQuantityToAdd: (productId, quantityToAdd) =>
              regulateQuantityToAdd(cart, productId, quantityToAdd),
            onAddToCart: (productId, quantityToAdd) =>
              onAddToCart(cart, setCart, productId, quantityToAdd),
            onEditCart: (productId, quantity) =>
              onEditCart(cart, setCart, productId, quantity),
          }}
        />
      </main>
    </div>
  );
}
