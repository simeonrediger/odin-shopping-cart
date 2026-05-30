import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderApp from '/tests/test-utils/render-app.jsx';
import { MAX_QUANTITY_PER_ITEM } from '/src/domains/cart/cart-constants.js';

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

describe('Increment button', () => {
  it('increases quantity by 1', async () => {
    const user = userEvent.setup();

    renderApp(['/shop']);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });
    const initialQuantity = +numberInput.value;
    const incrementButton = screen.getByRole('button', { name: '+' });

    await user.click(incrementButton);

    expect(numberInput).toHaveDisplayValue(initialQuantity + 1);
  });

  it("doesn't increase quantity beyond maximum", async () => {
    const user = userEvent.setup();
    const cart = new Map();
    cart.set(product.id, MAX_QUANTITY_PER_ITEM);

    renderApp(['/shop'], cart);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });
    const initialQuantity = +numberInput.value;
    const incrementButton = screen.getByRole('button', { name: '+' });

    await user.click(incrementButton);

    expect(numberInput).toHaveDisplayValue(initialQuantity);
  });
});
