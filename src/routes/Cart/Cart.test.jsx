import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';

import renderWithAppContext from '/tests/test-utils/render-with-app-context.jsx';
import { buildDocumentTitle } from '/src/utils.js';

import Cart from './Cart.jsx';
import useProducts from '/src/hooks/useProducts.js';

vi.mock('/src/hooks/useProducts.js', () => ({
  default: vi.fn(),
}));

vi.mock('/src/routes/Cart/CartItemRow/CartItemRow.jsx', () => ({
  default: ({ id }) => (
    <tr data-testid="cart-item-row">
      <td>Product {id}</td>
    </tr>
  ),
}));

function renderCartWithAppContext(contextOptions) {
  return renderWithAppContext('/cart', Cart, contextOptions);
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

describe('renders the correct number of cart item rows', () => {
  it.each([0, 5])('for %d unique items', uniqueItemCount => {
    const itemIdsInCart = new Set(
      Array.from({ length: uniqueItemCount }, (_, i) => i + 1),
    );
    useProducts.mockReturnValue({
      products: Array.from({ length: 2 * uniqueItemCount }, (_, i) => ({
        id: i + 1,
      })),
      loading: false,
      error: null,
    });

    renderCartWithAppContext({
      cartIsEmpty: vi.fn().mockReturnValue(false),
      cartHasItem: vi
        .fn()
        .mockImplementation(itemId => itemIdsInCart.has(itemId)),
    });

    expect(screen.queryAllByTestId('cart-item-row')).toHaveLength(
      uniqueItemCount,
    );
  });
});

it('sets document title', () => {
  document.title = 'Initial Title';

  renderCartWithAppContext();

  expect(document.title).toMatch(buildDocumentTitle('Cart'));
});

it('focuses page title heading', () => {
  renderCartWithAppContext();

  expect(screen.getByRole('heading', { name: 'Cart' })).toHaveFocus();
});
