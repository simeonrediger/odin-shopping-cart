import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

import styles from './Cart.module.css';
import CartItem from './CartItem.jsx';

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
    <ul className={styles.cartItemList}>
      {products
        .filter(product => cart.has(product.id))
        .map(product => (
          <li key={product.id}>
            <CartItem {...product} />
          </li>
        ))}
    </ul>
  );
}
