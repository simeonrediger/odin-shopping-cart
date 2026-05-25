import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import useProducts from '/src/hooks/useProducts.js';

import styles from './Shop.module.css';
import PageFetchError from '/src/components/PageFetchError/PageFetchError.jsx';
import PageLoader from '/src/components/PageLoader/PageLoader.jsx';
import ProductCard from './ProductCard/ProductCard.jsx';

export default function Shop() {
  const { products, loading, error } = useProducts();

  const {
    getMaxItemQuantity,
    getCurrentItemQuantity,
    regulateQuantityToAdd,
    onAddToCart,
  } = useOutletContext();

  useEffect(() => {
    document.title = 'Shop - Things & Stuff';
  }, []);

  useEffect(() => {
    if (loading || error) {
      return;
    }

    document.querySelector('[data-route-heading]')?.focus();
  }, [loading, error]);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <PageFetchError error={error} />;
  }

  return (
    <>
      <h2 data-route-heading tabIndex={-1} className="visually-hidden">
        Shop
      </h2>
      <ul className={styles.products}>
        {products.map(product => (
          <li key={product.id}>
            <ProductCard
              {...product}
              getMaxItemQuantity={getMaxItemQuantity}
              getCurrentItemQuantity={getCurrentItemQuantity}
              regulateQuantityToAdd={regulateQuantityToAdd}
              onAddToCart={onAddToCart}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
