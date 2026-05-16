import { useId } from 'react';

import '/src/styles/utilities.css';
import styles from './QuantityControls.module.css';

export default function QuantityControls({
  className = '',
  quantity,
  min,
  max,
  onChange,
}) {
  const id = useId();

  return (
    <div className={`${styles.container} ${className}`.trim()}>
      <label htmlFor={id} className={styles.label}>
        Quantity
      </label>
      <button
        className={styles.decrementButton}
        disabled={quantity <= min}
        onClick={() => onChange(quantity - 1)}
      >
        &minus;
      </button>
      <input
        type="number"
        id={id}
        className={styles.quantityInput}
        value={quantity.toString()}
        onChange={event => onChange(+event.target.value)}
      />
      <p className="visually-hidden" aria-live="polite">
        {`Quantity ${quantity}`}
      </p>
      <button
        className={styles.incrementButton}
        disabled={quantity >= max}
        onClick={() => onChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}
