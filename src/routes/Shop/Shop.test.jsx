import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';

import renderWithAppContext from '/tests/test-utils/render-with-app-context.jsx';
import { buildDocumentTitle } from '/src/utils.js';

import Shop from './Shop.jsx';
import useProducts from '/src/hooks/useProducts.js';

vi.mock('/src/hooks/useProducts.js', () => ({
  default: vi.fn(),
}));

vi.mock('/src/routes/Shop/ProductCard/ProductCard.jsx', () => ({
  default: () => <div>Mock Product Card</div>,
}));

function renderShopWithAppContext(contextOptions) {
  return renderWithAppContext('/shop', Shop, contextOptions);
}

it('shows loading state while loading', () => {
  useProducts.mockReturnValue({ products: [], loading: true, error: null });

  renderShopWithAppContext();

  expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();
});

it('shows error state on error', () => {
  useProducts.mockReturnValue({
    products: [],
    loading: false,
    error: new Error(),
  });

  renderShopWithAppContext();

  expect(screen.getByRole('heading', { name: /error/i })).toBeInTheDocument();
});

describe('renders the correct number of product cards', () => {
  it.each([3, 8])('for %d products', productCount => {
    useProducts.mockReturnValue({
      products: Array.from({ length: productCount }, (_, i) => ({ id: i + 1 })),
      loading: false,
      error: null,
    });

    renderShopWithAppContext();

    expect(screen.queryAllByRole('listitem')).toHaveLength(productCount);
  });
});

it('sets document title', () => {
  document.title = 'Initial Title';

  renderShopWithAppContext();

  expect(document.title).toMatch(buildDocumentTitle('Shop'));
});

it('focuses page title heading', () => {
  renderShopWithAppContext();

  expect(screen.getByRole('heading', { name: 'Shop' })).toHaveFocus();
});
