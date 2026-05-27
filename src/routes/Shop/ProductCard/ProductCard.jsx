import { useState } from 'react';

import {
  formatRate,
  getStarsString,
} from '/src/domains/product/product-utils.js';

import styles from './ProductCard.module.css';
import Price from '/src/components/Price/Price.jsx';
import QuantityInput from '/src/components/QuantityInput/QuantityInput.jsx';

export default function ProductCard({
  id,
  title,
  price,
  rating,
  image,
  getMaxItemQuantity,
  getCurrentItemQuantity,
  regulateQuantityToAdd,
  onAddToCart,
}) {
  const maxQuantityReached = getCurrentItemQuantity(id) < getMaxItemQuantity();
  const [quantityToAdd, setQuantityToAdd] = useState(
    maxQuantityReached ? 1 : 0,
  );

  const formattedRate = formatRate(rating.rate);
  const stars = getStarsString(rating.rate);

  function handleQuantityToAddChange(newQuantityToAdd) {
    newQuantityToAdd = regulateQuantityToAdd(id, newQuantityToAdd);
    setQuantityToAdd(newQuantityToAdd);
  }

  function handleAddToCart() {
    const maxQuantityReached = onAddToCart(id, quantityToAdd);
    setQuantityToAdd(maxQuantityReached ? 0 : 1);
  }

  return (
    <article className={styles.card}>
      <a href="#" className={styles.link} title={title}>
        <img className={styles.image} src={image} alt="" />
        <h3 className={styles.name}>{title}</h3>
      </a>
      <p className={styles.ratings}>
        {formattedRate}{' '}
        <span className={styles.stars} role="img" aria-label="stars">
          {stars}
        </span>{' '}
        ({rating.count})
      </p>
      <Price className={styles.price} price={price} />
      <QuantityInput
        className={styles.quantityInput}
        quantity={quantityToAdd}
        min={0}
        max={getMaxItemQuantity() - getCurrentItemQuantity(id)}
        onChange={handleQuantityToAddChange}
      />
      <button
        className={styles.addToCartButton}
        disabled={quantityToAdd <= 0}
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </article>
  );
}
