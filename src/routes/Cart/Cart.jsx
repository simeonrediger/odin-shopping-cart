import { useOutletContext } from 'react-router';

import useProducts from '/src/hooks/useProducts.js';

import styles from './Cart.module.css';
import CartItemRow from './CartItemRow/CartItemRow.jsx';
import PageFetchError from '/src/components/PageFetchError/PageFetchError.jsx';
import PageLoader from '/src/components/PageLoader/PageLoader.jsx';
import Price from '/src/components/Price.jsx';

export default function Cart() {
  const { products, loading, error } = useProducts();
  const { cart, cartHasItem } = useOutletContext();

  const cartItemTotal = getCartItemTotal(cart);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <PageFetchError error={error} />;
  }

  return (
    <div className={styles.cartWrapper}>
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
          {cart.size > 0 ? (
            products
              .filter(product => cartHasItem(product.id))
              .map(product => <CartItemRow key={product.id} {...product} />)
          ) : (
            <tr>
              <td colSpan={3} className={styles.centered}>
                No items in cart
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td>
              {cartItemTotal} {cartItemTotal === 1 ? 'item' : 'items'}
            </td>
            <td>
              <Price price={getCartPriceTotal(cart, products)} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function getCartItemTotal(cart) {
  return cart
    .values()
    .reduce((totalQuantity, quantity) => totalQuantity + quantity, 0);
}

function getCartPriceTotal(cart, products) {
  return cart.entries().reduce((totalPrice, [productId, quantity]) => {
    const product = products.find(product => product.id === productId);
    return totalPrice + quantity * (product?.price ?? 0);
  }, 0);
}
