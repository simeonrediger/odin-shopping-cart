import { useOutletContext } from 'react-router';

import useProducts from '/src/hooks/useProducts.js';

import styles from './Cart.module.css';
import CartItemRow from './CartItemRow.jsx';
import Price from '/src/components/Price.jsx';

export default function Cart() {
  const { products } = useProducts();
  const { cart, cartHasItem } = useOutletContext();

  return (
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
        {products
          .filter(product => cartHasItem(product.id))
          .map(product => (
            <CartItemRow key={product.id} {...product} />
          ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Total</th>
          <td>{getCartItemTotal(cart)} items</td>
          <td>
            <Price price={getCartPriceTotal(cart, products)} />
          </td>
        </tr>
      </tfoot>
    </table>
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
