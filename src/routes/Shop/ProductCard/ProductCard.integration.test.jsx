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
  it('starts with a value of 1', () => {
    renderApp(['/shop']);
    const input = screen.getByRole('spinbutton', { name: 'Quantity' });

    expect(input).toHaveDisplayValue(1);
  });

  it('starts with a value of 0 if maximum is in cart', () => {
    const cart = new Map();
    cart.set(product.id, MAX_QUANTITY_PER_ITEM);

    renderApp(['/shop'], cart);
    const input = screen.getByRole('spinbutton', { name: 'Quantity' });

    expect(input).toHaveDisplayValue(0);
  });

  it('has a value of 1 after adding to cart', async () => {
    const user = userEvent.setup();

    renderApp(['/shop']);
    const input = screen.getByRole('spinbutton', { name: 'Quantity' });
    const incrementButton = screen.getByRole('button', { name: '+' });
    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });

    await user.click(incrementButton);
    await user.click(addToCartButton);

    expect(input).toHaveDisplayValue(1);
  });

  it('has a value of 0 after adding to cart if maximum reached', async () => {
    const user = userEvent.setup();
    const cart = new Map();
    cart.set(product.id, MAX_QUANTITY_PER_ITEM - 1);

    renderApp(['/shop'], cart);
    const input = screen.getByRole('spinbutton', { name: 'Quantity' });
    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });

    await user.click(addToCartButton);

    expect(input).toHaveDisplayValue(0);
  });

  it('has a value of 0 if cleared', async () => {
    const user = userEvent.setup();

    renderApp(['/shop']);
    const input = screen.getByRole('spinbutton', { name: 'Quantity' });

    await user.clear(input);

    expect(input).toHaveDisplayValue(0);
  });

  it('has a value of 0 if an even lower value is provided', async () => {
    const user = userEvent.setup();
    const modKey = navigator.platform.includes('Mac') ? 'Meta' : 'Control';

    renderApp(['/shop']);
    const input = screen.getByRole('spinbutton', { name: 'Quantity' });

    await user.click(input);
    await user.keyboard(`{${modKey}>}a{/${modKey}}`);
    await user.paste('-3');

    expect(input).toHaveDisplayValue(0);
  });

  it('has maximum value if an even greater value is provided', async () => {
    const user = userEvent.setup();
    const modKey = navigator.platform.includes('Mac') ? 'Meta' : 'Control';

    renderApp(['/shop']);
    const input = screen.getByRole('spinbutton', { name: 'Quantity' });

    await user.click(input);
    await user.keyboard(`{${modKey}>}a{/${modKey}}`);
    await user.paste(String(MAX_QUANTITY_PER_ITEM + 1));

    expect(input).toHaveDisplayValue(MAX_QUANTITY_PER_ITEM);
  });
});

describe('Increment button', () => {
  it("doesn't increase value beyond maximum addable to cart", async () => {
    const user = userEvent.setup();
    const cart = new Map();
    cart.set(product.id, MAX_QUANTITY_PER_ITEM - 1);

    renderApp(['/shop'], cart);
    const quantityInput = screen.getByRole('spinbutton', { name: 'Quantity' });
    const incrementButton = screen.getByRole('button', { name: '+' });

    await user.click(incrementButton);

    expect(quantityInput).toHaveDisplayValue(1);
  });
});

describe('Decrement button', () => {
  it("doesn't decrease value below 0", async () => {
    const user = userEvent.setup();
    const cart = new Map();
    cart.set(product.id, MAX_QUANTITY_PER_ITEM);

    renderApp(['/shop'], cart);
    const quantityInput = screen.getByRole('spinbutton', { name: 'Quantity' });
    const decrementButton = screen.getByRole('button', { name: '\u2212' });

    expect(quantityInput).toHaveDisplayValue(0);

    await user.click(decrementButton);

    expect(quantityInput).toHaveDisplayValue(0);
  });
});

describe("'Add to cart' button", () => {
  it('adds specified quantity of item to the cart', async () => {
    const user = userEvent.setup();
    const modKey = navigator.platform.includes('Mac') ? 'Meta' : 'Control';

    renderApp(['/shop']);
    const quantityToAddInput = screen.getByRole('spinbutton', {
      name: 'Quantity',
    });
    const addToCartButton = screen.getByRole('button', { name: 'Add to cart' });
    const cartLink = screen.getByRole('link', { name: 'Cart' });

    await user.click(quantityToAddInput);
    await user.keyboard(`{${modKey}>}a{/${modKey}}`);
    await user.paste('5');
    await user.click(addToCartButton);
    await user.click(cartLink);

    const productName = screen.getByText(product.title);
    const quantityInput = screen.getByRole('spinbutton', { name: 'Quantity' });

    expect(productName).toBeInTheDocument();
    expect(quantityInput).toHaveDisplayValue(5);
  });
});
