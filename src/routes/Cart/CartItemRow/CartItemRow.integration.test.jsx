import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';

import renderApp from '/tests/test-utils/render-app.jsx';

const product = vi.hoisted(() => ({
  id: 1,
  title: 'Product 1',
  price: 10.99,
  rating: { rate: 4.1, count: 256 },
  image: 'https://example.com/image.png',
}));

vi.mock('/src/hooks/useProducts.js', () => ({
  default: vi.fn().mockReturnValue({
    loading: false,
    error: null,
    products: [product],
  }),
}));

describe('Quantity input', () => {
  it('starts with cart item quantity as value', () => {
    const cart = new Map();
    cart.set(product.id, 5);

    renderApp(['/cart'], cart);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });

    expect(numberInput).toHaveDisplayValue(5);
  });
});
