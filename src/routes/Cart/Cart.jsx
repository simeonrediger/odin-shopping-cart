import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

import styles from './Cart.module.css';
import CartItemRow from './CartItemRow.jsx';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const { cart } = useOutletContext();

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
      <tbody>
        {products
          .filter(product => cart.has(product.id))
          .map(product => (
            <CartItemRow key={product.id} {...product} />
          ))}
      </tbody>
    </table>
  );
}
