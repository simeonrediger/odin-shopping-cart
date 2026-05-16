export default function Price({ className, price }) {
  return <span className={className}>{formatPrice(price)}</span>;
}

function formatPrice(price) {
  const [integerPart = '0', decimalPart = '0'] = String(price).split('.');
  return `$${integerPart}.${decimalPart?.padEnd(2, 0)}`;
}
