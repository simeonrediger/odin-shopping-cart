import { useOutletContext } from 'react-router';

import styles from './CartItemRow.module.css';
import Price from '/src/components/Price.jsx';
import QuantityInput from '/src/components/QuantityInput/QuantityInput.jsx';

export default function CartItem({ id, title, price, image }) {
  const { getMaxItemQuantity, getCurrentItemQuantity, onEditCart } =
    useOutletContext();

  const quantity = getCurrentItemQuantity(id);

  return (
    <tr>
      <th span="row">
        <img className={styles.image} src={image} alt={title} />
      </th>
      <td>
        <a href="#" className={`${styles.link} ${styles.name}`} title={title}>
          {title}
        </a>
        <p>
          <Price price={price} /> ea.
        </p>
        <QuantityInput
          quantity={quantity}
          min={1}
          max={getMaxItemQuantity()}
          onChange={quantity => onEditCart(id, Math.max(1, quantity))}
        />
        <button
          className={styles.deleteButton}
          onClick={() => onEditCart(id, 0)}
        >
          Delete
        </button>
      </td>
      <td>
        <Price price={price * quantity} />
      </td>
    </tr>
  );
}
