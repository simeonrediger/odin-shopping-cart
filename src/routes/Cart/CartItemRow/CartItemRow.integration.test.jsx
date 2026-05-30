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

describe('Quantity input', () => {
  it('starts with cart item quantity as value', () => {
    const cart = new Map();
    cart.set(product.id, 5);

    renderApp(['/cart'], cart);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });

    expect(numberInput).toHaveDisplayValue(5);
  });

  it('has a value of 1 if cleared', async () => {
    const user = userEvent.setup();
    const cart = new Map();
    cart.set(product.id, 5);

    renderApp(['/cart'], cart);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });

    await user.clear(numberInput);

    expect(numberInput).toHaveDisplayValue(1);
  });

  it('has a value of 1 if an even lower value is provided', async () => {
    const user = userEvent.setup();
    const modKey = navigator.platform.includes('Mac') ? 'Meta' : 'Control';
    const cart = new Map();
    cart.set(product.id, 5);

    renderApp(['/cart'], cart);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });

    await user.click(numberInput);
    await user.keyboard(`{${modKey}>}a{/${modKey}}`);
    await user.paste('-3');

    expect(numberInput).toHaveDisplayValue(1);
  });

  it('has maximum value if an even greater value is provided', async () => {
    const user = userEvent.setup();
    const modKey = navigator.platform.includes('Mac') ? 'Meta' : 'Control';
    const cart = new Map();
    cart.set(product.id, 5);

    renderApp(['/cart'], cart);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });

    await user.click(numberInput);
    await user.keyboard(`{${modKey}>}a{/${modKey}}`);
    await user.paste(String(MAX_QUANTITY_PER_ITEM + 1));

    expect(numberInput).toHaveDisplayValue(MAX_QUANTITY_PER_ITEM);
  });
});

describe('Decrement button', () => {
  it("doesn't decrease value below 1", async () => {
    const user = userEvent.setup();
    const cart = new Map();
    cart.set(product.id, 1);

    renderApp(['/cart'], cart);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });
    const decrementButton = screen.getByRole('button', { name: '\u2212' });

    await user.click(decrementButton);

    expect(numberInput).toHaveDisplayValue(1);
  });
});
