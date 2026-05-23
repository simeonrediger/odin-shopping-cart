import { useEffect } from 'react';
import useProducts from '/src/hooks/useProducts.js';

import styles from './Shop.module.css';
import PageFetchError from '/src/components/PageFetchError/PageFetchError.jsx';
import PageLoader from '/src/components/PageLoader/PageLoader.jsx';
import ProductCard from './ProductCard/ProductCard.jsx';

export default function Shop() {
  const { products, loading, error } = useProducts();

  useEffect(() => {
    document.title = 'Shop - Things & Stuff';
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
