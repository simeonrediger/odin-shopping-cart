import { NavLink } from 'react-router';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink className={styles.link} to="/">
            Home
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink className={styles.link} to="shop">
            Shop
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink className={styles.link} to="cart">
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
