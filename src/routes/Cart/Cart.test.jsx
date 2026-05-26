import { it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';

import renderWithAppContext from '/tests/test-utils/render-with-app-context.jsx';

import Cart from './Cart.jsx';
import useProducts from '/src/hooks/useProducts.js';

vi.mock('/src/hooks/useProducts.js', () => ({
  default: vi.fn(),
}));

function renderCartWithAppContext(contextOptions) {
  return renderWithAppContext('cart', Cart, contextOptions);
}

it('shows loading state while loading', () => {
  useProducts.mockReturnValue({ products: [], loading: true, error: null });

  renderCartWithAppContext();

  expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();
});

it('shows error state on error', () => {
  useProducts.mockReturnValue({
    products: [],
    loading: false,
    error: new Error(),
  });

  renderCartWithAppContext();

  expect(screen.getByRole('heading', { name: /error/i })).toBeInTheDocument();
});
