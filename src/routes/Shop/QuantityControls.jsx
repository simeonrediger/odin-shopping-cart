import { useId } from 'react';

import styles from './QuantityControls.module.css';

export default function QuantityControls() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Quantity</label>
      <button>&minus;</button>
      <input type="number" id={id} className={styles.quantityInput} />
      <button>+</button>
    </div>
  );
}
