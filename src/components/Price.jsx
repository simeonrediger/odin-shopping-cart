export default function Price({ className, price }) {
  return <span className={className}>{formatPrice(price)}</span>;
}

function formatPrice(price) {
  let [integerPart = '0', decimalPart = '0'] = String(price).split('.');

  for (let i = integerPart.length - 3; i > 0; i -= 3) {
    integerPart = integerPart.slice(0, i) + ',' + integerPart.slice(i);
  }

  return `$${integerPart}.${decimalPart?.padEnd(2, 0)}`;
}
