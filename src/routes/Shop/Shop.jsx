import { useEffect, useState } from 'react';

import styles from './Shop.module.css';
import PageFetchError from '/src/components/PageFetchError/PageFetchError.jsx';
import PageLoader from '/src/components/PageLoader/PageLoader.jsx';
import ProductCard from './ProductCard.jsx';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    function loadData() {
      fetch('https://fakestoreapi.com/products')
        .then(response => {
          if (!response.ok) {
            let errorMessage = `HTTP ${response.status}`;

            if (response.statusText) {
              errorMessage += `: ${response.statusText}`;
            }

            throw new Error(errorMessage);
          }

          return response.json();
        })
        .then(data => {
          setProducts(data);
        })
        .catch(error => {
          console.error(error);
          setError(error);
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

  if (error) {
    return <PageFetchError error={error} />;
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
