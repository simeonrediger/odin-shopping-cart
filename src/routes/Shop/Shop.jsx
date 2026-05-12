import { useEffect, useState } from 'react';

import styles from './Shop.module.css';
import ProductCard from './ProductCard.jsx';

export default function Shop() {
  const [products, setProducts] = useState([]);

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
    <ul className={styles.products}>
      {products.map(product => (
        <li key={product.id}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
}
