import { Link } from 'react-router';

import styles from './CartItem.module.css';

export default function CartItem({ id, title, price, image, quantity }) {
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
        <p>{quantity}</p>
      </div>
      <p>{price * quantity}</p>
    </div>
  );
}
