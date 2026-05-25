import { useEffect } from 'react';
import { useOutletContext } from 'react-router';

import useProducts from '/src/hooks/useProducts.js';

import styles from './Cart.module.css';
import CartItemRow from './CartItemRow/CartItemRow.jsx';
import PageFetchError from '/src/components/PageFetchError/PageFetchError.jsx';
import PageLoader from '/src/components/PageLoader/PageLoader.jsx';
import Price from '/src/components/Price/Price.jsx';

export default function Cart() {
  const { products, loading, error } = useProducts();

  const {
    cartHasItem,
    cartIsEmpty,
    getCartItemTotal,
    getCartPriceTotal,
    getMaxItemQuantity,
    getCurrentItemQuantity,
    onEditCart,
  } = useOutletContext();

  useEffect(() => {
    document.title = 'Cart - Things & Stuff';
  }, []);

  useEffect(() => {
    if (loading || error) {
      return;
    }

    document.querySelector('[data-route-heading]')?.focus();
  }, [loading, error]);

  const cartItemTotal = getCartItemTotal();
  const cartPriceTotal = getCartPriceTotal(products);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <PageFetchError error={error} />;
  }

  return (
    <div className={styles.cartWrapper}>
      <h2 data-route-heading tabIndex={-1} className="visually-hidden">
        Cart
      </h2>
      <table className={styles.cartItemTable}>
        <colgroup>
          <col className={styles.itemImageColumn} />
          <col className={styles.itemDetailsColumn} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Details</th>
            <th scope="col">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartIsEmpty() ? (
            <tr>
              <td colSpan={3} className={styles.centered}>
                No items in cart
              </td>
            </tr>
          ) : (
            products
              .filter(product => cartHasItem(product.id))
              .map(product => (
                <CartItemRow
                  key={product.id}
                  {...product}
                  getMaxItemQuantity={getMaxItemQuantity}
                  getCurrentItemQuantity={getCurrentItemQuantity}
                  onEditCart={onEditCart}
                />
              ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td>
              {cartItemTotal} {cartItemTotal === 1 ? 'item' : 'items'}
            </td>
            <td>
              <Price price={cartPriceTotal} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
