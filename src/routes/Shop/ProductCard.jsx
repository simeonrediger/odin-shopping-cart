export default function ProductCard({ title, price, rating, image }) {
  return (
    <article>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>${price}</p>
      <p>
        {rating.rate} ({rating.count})
      </p>
    </article>
  );
}
