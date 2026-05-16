import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

import styles from './Cart.module.css';
import CartItemRow from './CartItemRow.jsx';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const { cartHasItem } = useOutletContext();

  useEffect(() => {
    function loadData() {
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
          setProducts(data);
        });
    }

    loadData();
  }, []);

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
    </table>
  );
}
