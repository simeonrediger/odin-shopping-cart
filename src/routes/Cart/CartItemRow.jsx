import { Link, useOutletContext } from 'react-router';

import styles from './CartItemRow.module.css';
import Price from '/src/components/Price.jsx';
import QuantityInput from '/src/components/QuantityInput/QuantityInput.jsx';

export default function CartItem({ id, title, price, image }) {
  const { cart, getMinItemQuantity, getMaxItemQuantity, onEditCart } =
    useOutletContext();
  const quantity = cart.get(id);

  return (
    <tr>
      <td>
        <img className={styles.image} src={image} alt="" />
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
      </td>
      <td>
        <Price price={price * quantity} />
      </td>
    </tr>
  );
}
