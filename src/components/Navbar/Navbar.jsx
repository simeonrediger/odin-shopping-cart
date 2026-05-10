import { NavLink } from 'react-router';
import styles from './Navbar.module.css';

function getNavLinkClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink className={getNavLinkClass} to="/">
            Home
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink className={getNavLinkClass} to="shop">
            Shop
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink className={getNavLinkClass} to="cart">
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
