import { NavLink } from 'react-router';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink className={styles.link}>Home</NavLink>
        </li>
        <li className={styles.item}>
          <NavLink className={styles.link}>Shop</NavLink>
        </li>
        <li className={styles.item}>
          <NavLink className={styles.link}>Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
}
