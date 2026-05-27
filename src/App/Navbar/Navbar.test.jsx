import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import renderAppAtPath from '/tests/test-utils/render-app-at-path';

import Navbar from './Navbar.jsx';
import styles from './Navbar.module.css';

function renderNavbar(props) {
  return render(
    <MemoryRouter>
      <Navbar {...props} />
    </MemoryRouter>,
  );
}

describe('gives the .active class', () => {
  it.each([
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Cart', path: '/cart' },
  ])('to $name link at path $path', ({ path, name }) => {
    renderAppAtPath(path);

    expect(screen.getByRole('link', { name })).toHaveClass(styles.active);
  });
});

describe("doesn't give the .active class", () => {
  it.each([
    { name: 'Home', path: '/shop' },
    { name: 'Shop', path: '/' },
  ])('to $name link at path $path', ({ path, name }) => {
    renderAppAtPath(path);

    expect(screen.getByRole('link', { name })).not.toHaveClass(styles.active);
  });
});

describe("Cart item count in 'Cart' link", () => {
  it('is hidden when cart item count is 0', () => {
    renderNavbar({ cartItemCount: 0 });

    const cartLink = screen.getByRole('link', { name: 'Cart' });

    expect(within(cartLink).queryByTitle('0 items')).not.toBeInTheDocument();
  });

  describe('is shown when cart item count is at least 1 and no more than 99', () => {
    it.each([1, 99])('cart item count = %d', cartItemCount => {
      renderNavbar({ cartItemCount });

      const cartLink = screen.getByRole('link', { name: 'Cart' });

      expect(
        within(cartLink).getByTitle(new RegExp(`^${cartItemCount} items?$`)),
      ).toHaveTextContent(cartItemCount);
    });
  });

  describe("is '99+' when when cart item count is at least 100", () => {
    it.each([100, 256])('cart item count = %d', cartItemCount => {
      renderNavbar({ cartItemCount });

      const cartLink = screen.getByRole('link', { name: 'Cart' });

      expect(
        within(cartLink).getByTitle(`${cartItemCount} items`),
      ).toHaveTextContent('99+');
    });
  });

  it('is included in the accessible description', () => {
    renderNavbar({ cartItemCount: 5 });

    expect(
      screen.getByRole('link', { name: 'Cart' }),
    ).toHaveAccessibleDescription('Cart item count 5');
  });
});
