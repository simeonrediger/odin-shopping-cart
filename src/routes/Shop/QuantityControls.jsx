import { useId } from 'react';

import styles from './QuantityControls.module.css';

export default function QuantityControls({ className = '' }) {
  const id = useId();

  return (
    <div className={`${styles.container} ${className}`.trim()}>
      <label htmlFor={id} className={styles.label}>
        Quantity
      </label>
      <button className={styles.decrementButton}>&minus;</button>
      <input type="number" id={id} className={styles.quantityInput} />
      <button className={styles.incrementButton}>+</button>
    </div>
  );
}
