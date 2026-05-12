import styles from './ProductCard.module.css';

export default function ProductCard({ title, price, rating, image }) {
  const formattedPrice = formatPrice(price);
  const stars = getStarsString(rating.rate);

  return (
    <article className={styles.card}>
      <img src={image} alt={title} />
      <h2 className={styles.name}>{title}</h2>
      <p>{formattedPrice}</p>
      <p>
        {rating.rate} {stars} ({rating.count})
      </p>
    </article>
  );
}

function formatPrice(price) {
  const [integerPart = '0', decimalPart = '0'] = String(price).split('.');
  return `$${integerPart}.${decimalPart?.padEnd(2, 0)}`;
}

function getStarsString(starAmount) {
  const roundedStarAmount = Math.round(starAmount);
  const hollowStarAmount = 5 - roundedStarAmount;
  return '★'.repeat(roundedStarAmount) + '☆'.repeat(hollowStarAmount);
}
