import { Link, useOutletContext } from 'react-router';

import styles from './CartItem.module.css';
import QuantityControls from '../Shop/QuantityControls';

export default function CartItem({ id, title, price, image }) {
  const { cart, onEditCart } = useOutletContext();
  const quantity = cart.get(id);

  function handleQuantityChange(newQuantity) {
    const min = 0;
    const max = 999;
    onEditCart(id, Math.min(Math.max(min, newQuantity), max));
  }

  return (
    <div className={styles.cartItem}>
      <img className={styles.image} src={image} alt="" />
      <div>
        <Link to={`../shop/${String(id)}`} className={styles.link}>
          <h2 className={styles.name} title={title}>
            {title}
          </h2>
        </Link>
        <p>{price}</p>
        <QuantityControls quantity={quantity} onChange={handleQuantityChange} />
      </div>
      <p>{price * quantity}</p>
    </div>
  );
}
