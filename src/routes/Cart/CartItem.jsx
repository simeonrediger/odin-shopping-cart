import { Link } from 'react-router';

import styles from './CartItem.module.css';

export default function CartItem({ id, title, price, image, quantity }) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="" />
      <Link to={`../shop/${String(id)}`}>
        <h2 title={title}>{title}</h2>
      </Link>
      <p>{price}</p>
      <p>{quantity}</p>
      <p>{price * quantity}</p>
    </div>
  );
}
