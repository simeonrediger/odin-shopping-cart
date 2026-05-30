import { it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';

import renderApp from '/tests/test-utils/render-app.jsx';

const products = vi.hoisted(() => [
  {
    id: 1,
    title: 'Product 1',
    price: 15.0,
    rating: { rate: 4.1, count: 256 },
    image: 'https://example.com/product-1.png',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 27.99,
    rating: { rate: 3.5, count: 40 },
    image: 'https://example.com/product-2.png',
  },
]);

vi.mock('/src/hooks/useProducts.js', () => ({
  default: vi.fn().mockReturnValue({
    loading: false,
    error: null,
    products,
  }),
}));

it('Cart total item quantity is correct', () => {
  const cart = new Map();
  cart.set(products[0].id, 3);
  cart.set(products[1].id, 2);

  renderApp(['/cart'], cart);

  expect(screen.getByText('5 items')).toBeInTheDocument();
});

it('Cart subtotal is correct', () => {
  const cart = new Map();
  cart.set(products[0].id, 3);
  cart.set(products[1].id, 2);

  renderApp(['/cart'], cart);

  expect(screen.getByText('$100.98')).toBeInTheDocument();
});
