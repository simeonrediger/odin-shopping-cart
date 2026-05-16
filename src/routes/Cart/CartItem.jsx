import { Link, useOutletContext } from 'react-router';

import styles from './CartItem.module.css';
import Price from '/src/components/Price.jsx';
import QuantityInput from '/src/components/QuantityInput/QuantityInput.jsx';

export default function CartItem({ id, title, price, image }) {
  const { cart, getMinItemQuantity, getMaxItemQuantity, onEditCart } =
    useOutletContext();
  const quantity = cart.get(id);

  return (
    <div className={styles.cartItem}>
      <img className={styles.image} src={image} alt="" />
      <div>
        <Link to={`../shop/${String(id)}`} className={styles.link}>
          <h2 className={styles.name} title={title}>
            {title}
          </h2>
        </Link>
        <Price price={price} />
        <QuantityInput
          quantity={quantity}
          min={getMinItemQuantity()}
          max={getMaxItemQuantity()}
          onChange={quantity => onEditCart(id, quantity)}
        />
      </div>
      <Price price={price * quantity} />
    </div>
  );
}
