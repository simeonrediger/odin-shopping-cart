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

describe('Number input', () => {
  it('starts with a value of 1', () => {
    renderApp(['/shop']);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });

    expect(numberInput).toHaveDisplayValue(1);
  });

  it('starts with a value of 0 if maximum is in cart', () => {
    const cart = new Map();
    cart.set(product.id, MAX_QUANTITY_PER_ITEM);

    renderApp(['/shop'], cart);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });

    expect(numberInput).toHaveDisplayValue(0);
  });

  it('has a value of 1 after adding to cart', async () => {
    const user = userEvent.setup();

    renderApp(['/shop']);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });
    const incrementButton = screen.getByRole('button', { name: '+' });
    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });

    await user.click(incrementButton);
    await user.click(addToCartButton);

    expect(numberInput).toHaveDisplayValue(1);
  });

  it('has a value of 0 after adding to cart if maximum reached', async () => {
    const user = userEvent.setup();
    const cart = new Map();
    cart.set(product.id, MAX_QUANTITY_PER_ITEM - 1);

    renderApp(['/shop'], cart);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });
    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });

    await user.click(addToCartButton);

    expect(numberInput).toHaveDisplayValue(0);
  });

  it('has minimum value if cleared', async () => {
    const user = userEvent.setup();

    renderApp(['/shop']);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });

    await user.clear(numberInput);

    expect(numberInput).toHaveDisplayValue(0);
  });
});

describe('Increment button', () => {
  it('increases value by 1', async () => {
    const user = userEvent.setup();

    renderApp(['/shop']);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });
    const initialQuantity = +numberInput.value;
    const incrementButton = screen.getByRole('button', { name: '+' });

    await user.click(incrementButton);

    expect(numberInput).toHaveDisplayValue(initialQuantity + 1);
  });

  it("doesn't increase value beyond its maximum", async () => {
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

  it('is disabled at maximum value', async () => {
    const cart = new Map();
    cart.set(product.id, MAX_QUANTITY_PER_ITEM);

    renderApp(['/shop'], cart);
    const incrementButton = screen.getByRole('button', { name: '+' });

    expect(incrementButton).toBeDisabled();
  });
});

describe('Decrement button', () => {
  it('decreases value by 1', async () => {
    const user = userEvent.setup();

    renderApp(['/shop']);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });
    const initialQuantity = +numberInput.value;
    const decrementButton = screen.getByRole('button', { name: '\u2212' });

    await user.click(decrementButton);

    expect(numberInput).toHaveDisplayValue(initialQuantity - 1);
  });

  it("doesn't decrease value below 0", async () => {
    const user = userEvent.setup();
    const cart = new Map();
    cart.set(product.id, MAX_QUANTITY_PER_ITEM);

    renderApp(['/shop'], cart);
    const numberInput = screen.getByRole('spinbutton', { name: 'Quantity' });
    const decrementButton = screen.getByRole('button', { name: '\u2212' });

    expect(numberInput).toHaveDisplayValue(0);

    await user.click(decrementButton);

    expect(numberInput).toHaveDisplayValue(0);
  });

  it('is disabled at minimum value', async () => {
    const cart = new Map();
    cart.set(product.id, MAX_QUANTITY_PER_ITEM);

    renderApp(['/shop'], cart);
    const decrementButton = screen.getByRole('button', { name: '\u2212' });

    expect(decrementButton).toBeDisabled();
  });
});
