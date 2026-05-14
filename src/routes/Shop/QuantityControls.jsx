import { useId } from 'react';

import '/src/styles/utilities.css';
import styles from './QuantityControls.module.css';

export default function QuantityControls({
  className = '',
  quantity,
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
      <div className="visually-hidden" aria-live="polite">
        Quantity {quantity}
      </div>
      <button
        className={styles.incrementButton}
        onClick={() => onChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}
