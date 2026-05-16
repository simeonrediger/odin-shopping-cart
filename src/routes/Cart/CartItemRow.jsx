import { Link, useOutletContext } from 'react-router';

import styles from './CartItemRow.module.css';
import Price from '/src/components/Price.jsx';
import QuantityInput from '/src/components/QuantityInput/QuantityInput.jsx';

export default function CartItem({ id, title, price, image }) {
  const {
    getMinItemQuantity,
    getMaxItemQuantity,
    getCurrentItemQuantity,
    onEditCart,
  } = useOutletContext();

  const quantity = getCurrentItemQuantity(id);

  return (
    <tr>
      <td>
        <img className={styles.image} src={image} alt={title} />
      </td>
      <td>
        <Link to={`../shop/${String(id)}`} className={styles.link}>
          <h2 className={styles.name} title={title}>
            {title}
          </h2>
        </Link>
        <p>
          <Price price={price} /> ea.
        </p>
        <QuantityInput
          quantity={quantity}
          min={getMinItemQuantity()}
          max={getMaxItemQuantity()}
          onChange={quantity => onEditCart(id, quantity)}
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
