import { useEffect, useState } from 'react';

import styles from './Shop.module.css';
import PageLoader from '/src/components/PageLoader/PageLoader.jsx';
import ProductCard from './ProductCard.jsx';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadData() {
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
          setProducts(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    loadData();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

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
