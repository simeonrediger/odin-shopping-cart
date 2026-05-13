import { Link } from 'react-router-dom';

import styles from './ProductCard.module.css';
import QuantityControls from './QuantityControls.jsx';

export default function ProductCard({ id, title, price, rating, image }) {
  const formattedPrice = formatPrice(price);
  const formattedRate = formatRate(rating.rate);
  const stars = getStarsString(rating.rate);

  return (
    <article className={styles.card}>
      <Link to={String(id)} className={styles.link}>
        <img className={styles.image} src={image} alt={title} />
        <h2 className={styles.name} title={title}>
          {title}
        </h2>
      </Link>
      <p>
        {formattedRate} <span className={styles.stars}>{stars}</span> (
        {rating.count})
      </p>
      <p>{formattedPrice}</p>
      <QuantityControls className={styles.quantityControls} />
      <button className={styles.addToCartButton}>Add to cart</button>
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
