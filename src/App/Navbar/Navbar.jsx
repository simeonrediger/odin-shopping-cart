import { NavLink } from 'react-router';

import '/src/styles/utilities.css';
import styles from './Navbar.module.css';

function getNavLinkClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Navbar({ cartItemCount }) {
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
        <li className={`${styles.item} ${styles.cartLink}`}>
          <NavLink className={getNavLinkClass} to="cart">
            Cart
            {cartItemCount > 0 && (
              <p className={styles.cartItemCount} aria-hidden="true">
                {cartItemCount < 100 ? cartItemCount : '99+'}
              </p>
            )}
            <p className="visually-hidden" aria-live="polite">
              {`Cart item count ${cartItemCount}`}
            </p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
