import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import styles from './ProductCard.module.css';
import QuantityControls from './QuantityControls.jsx';

export default function ProductCard({ id, title, price, rating, image }) {
  const { onAddToCart } = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  const formattedPrice = formatPrice(price);
  const formattedRate = formatRate(rating.rate);
  const stars = getStarsString(rating.rate);

  function handleQuantityChange(newQuantity) {
    const min = 0;
    const max = 999;
    setQuantity(Math.min(Math.max(min, newQuantity), max));
  }

  function handleAddToCart() {
    onAddToCart(id, quantity);
  }

  return (
    <article className={styles.card}>
      <Link to={String(id)} className={styles.link}>
        <img className={styles.image} src={image} />
        <h2 className={styles.name} title={title}>
          {title}
        </h2>
      </Link>
      <p className={styles.ratings}>
        {formattedRate}{' '}
        <span className={styles.stars} role="img" aria-label="stars">
          {stars}
        </span>{' '}
        ({rating.count})
      </p>
      <p className={styles.price}>{formattedPrice}</p>
      <QuantityControls
        className={styles.quantityControls}
        quantity={quantity}
        onChange={handleQuantityChange}
      />
      <button className={styles.addToCartButton} onClick={handleAddToCart}>
        Add to cart
      </button>
    </article>
  );
}

function formatPrice(price) {
  const [integerPart = '0', decimalPart = '0'] = String(price).split('.');
  return `$${integerPart}.${decimalPart?.padEnd(2, 0)}`;
}

function formatRate(rate) {
  const [integerPart = '0', decimalPart = '0'] = String(rate).split('.');
  return `${integerPart}.${decimalPart}`;
}

function getStarsString(starAmount) {
  const roundedStarAmount = Math.round(starAmount);
  const hollowStarAmount = 5 - roundedStarAmount;
  return '★'.repeat(roundedStarAmount) + '☆'.repeat(hollowStarAmount);
}
