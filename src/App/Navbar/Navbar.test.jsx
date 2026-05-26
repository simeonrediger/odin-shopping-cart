import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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

describe("has cart item count as 'Cart' link's accessible description", () => {
  it.each([0, 7])('when cart item count is %d', cartItemCount => {
    renderNavbar({ cartItemCount });

    expect(
      screen.getByRole('link', { name: 'Cart' }),
    ).toHaveAccessibleDescription(`Cart item count ${cartItemCount}`);
  });
});
