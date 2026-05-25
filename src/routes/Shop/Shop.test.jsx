import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';

import renderWithAppContext from '/tests/test-utils/render-with-app-context.jsx';

import Shop from './Shop.jsx';
import useProducts from '/src/hooks/useProducts.js';

vi.mock('/src/hooks/useProducts.js', () => ({
  default: vi.fn(),
}));

vi.mock('/src/routes/Shop/ProductCard/ProductCard.jsx', () => ({
  default: () => <div>Mock Product Card</div>,
}));

function renderShopWithAppContext() {
  return renderWithAppContext('shop', Shop);
}

it('shows loading state while loading', () => {
  useProducts.mockReturnValue({ loading: true });

  renderShopWithAppContext();

  expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();
});

it('shows error state on error', () => {
  useProducts.mockReturnValue({ error: new Error() });

  renderShopWithAppContext();

  expect(screen.getByRole('heading', { name: /error/i })).toBeInTheDocument();
});

describe('renders n product cards for n products', () => {
  it.each([3, 8])('n = %d', n => {
    useProducts.mockReturnValue({
      products: Array.from({ length: n }, (_, i) => ({ id: i + 1 })),
    });

    renderShopWithAppContext();

    expect(screen.queryAllByRole('listitem')).toHaveLength(n);
  });
});
