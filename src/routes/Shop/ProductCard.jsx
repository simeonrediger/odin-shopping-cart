import styles from './ProductCard.module.css';

export default function ProductCard({ title, price, rating, image }) {
  return (
    <article className={styles.card}>
      <img src={image} alt={title} />
      <h2 className={styles.name}>{title}</h2>
      <p>${price}</p>
      <p>
        {rating.rate} ({rating.count})
      </p>
    </article>
  );
}
