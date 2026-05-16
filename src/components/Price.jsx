export default function Price({ className, price }) {
  return <span className={className}>{formatPrice(price)}</span>;
}

function formatPrice(price) {
  const price10xRounded = String(Math.round(price * 100));
  let integerPart = price10xRounded.slice(0, -2);
  const decimalPart = price10xRounded.slice(-2);

  for (let i = integerPart.length - 3; i > 0; i -= 3) {
    integerPart = integerPart.slice(0, i) + ',' + integerPart.slice(i);
  }

  return `$${integerPart}.${decimalPart}`;
}
