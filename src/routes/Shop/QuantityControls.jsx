import { useId } from 'react';

export default function QuantityControls() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Quantity</label>
      <button>&minus;</button>
      <input id={id} inputMode="numeric" />
      <button>+</button>
    </div>
  );
}
