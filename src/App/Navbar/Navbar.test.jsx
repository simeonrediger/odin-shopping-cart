import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import renderAppStub from '/tests/test-utils/render-app-stub.jsx';

import Navbar from './Navbar.jsx';
import styles from './Navbar.module.css';

vi.mock('/src/hooks/useProducts.js', () => ({
  default: vi
    .fn()
    .mockReturnValue({ products: [], loading: false, error: null }),
}));

function renderNavbar(props) {
  return render(
    <MemoryRouter>
      <Navbar {...props} />
    </MemoryRouter>,
  );
}

describe('.active class', () => {
  describe('is given to', () => {
    it.each([
      { name: 'Home', path: '/' },
      { name: 'Shop', path: '/shop' },
      { name: 'Cart', path: '/cart' },
    ])('$name link at path $path', ({ path, name }) => {
      renderAppStub(path);

      expect(screen.getByRole('link', { name })).toHaveClass(styles.active);
    });
  });

  describe('is not given to', () => {
    it.each([
      { name: 'Home', path: '/shop' },
      { name: 'Shop', path: '/' },
    ])('$name link at path $path', ({ path, name }) => {
      renderAppStub(path);

      expect(screen.getByRole('link', { name })).not.toHaveClass(styles.active);
    });
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

describe('Links navigate to correct locations', () => {
  it.each([
    { name: 'Home', initialPath: '/shop' },
    { name: 'Shop', initialPath: '/cart' },
    { name: 'Cart', initialPath: '/' },
  ])(
    'Clicking $name navigates to the page with that route heading',
    async ({ name, initialPath }) => {
      const user = userEvent.setup();

      renderAppStub(initialPath);

      const link = screen.getByRole('link', { name });
      await user.click(link);

      const routeHeading = screen.getByRole('heading', { name });
      expect(routeHeading).toBeInTheDocument();
    },
  );
});
