import { useState } from 'react';
import { Outlet } from 'react-router';

import { SITE_TITLE } from '/src/constants.js';

import Navbar from './Navbar/Navbar.jsx';
import styles from './App.module.css';

const MAX_QUANTITY_PER_ITEM = 999;

export default function App({ children }) {
  const [cart, setCart] = useState(new Map());

  function getMaxItemQuantity() {
    return MAX_QUANTITY_PER_ITEM;
  }

  function getCurrentItemQuantity(productId) {
    return cart.get(productId) ?? 0;
  }

  function cartHasItem(productId) {
    return cart.has(productId);
  }

  function cartIsEmpty() {
    return cart.size === 0;
  }

  function getCartItemTotal() {
    return cart
      .values()
      .reduce((totalQuantity, quantity) => totalQuantity + quantity, 0);
  }

  function getCartPriceTotal(products) {
    return cart.entries().reduce((totalPrice, [productId, quantity]) => {
      const product = products.find(product => product.id === productId);
      return totalPrice + quantity * (product?.price ?? 0);
    }, 0);
  }

  function regulateQuantity(quantity) {
    quantity = Math.round(quantity);
    quantity = Math.max(0, quantity);
    quantity = Math.min(quantity, MAX_QUANTITY_PER_ITEM);
    return quantity;
  }

  function regulateQuantityToAdd(productId, quantityToAdd) {
    const currentQuantity = getCurrentItemQuantity(productId);
    const maxQuantityAddable = MAX_QUANTITY_PER_ITEM - currentQuantity;
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

    return newCart.get(productId) === MAX_QUANTITY_PER_ITEM;
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
        <h1>{SITE_TITLE}</h1>
        <Navbar cartItemCount={getCartItemTotal()} />
      </header>
      <main>
        {children || (
          <Outlet
            context={{
              getMaxItemQuantity,
              getCurrentItemQuantity,
              cartHasItem,
              cartIsEmpty,
              getCartItemTotal,
              getCartPriceTotal,
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
