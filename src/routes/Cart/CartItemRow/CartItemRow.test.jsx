import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import CartItemRow from './CartItemRow.jsx';

function createProduct() {
  return {
    id: 1,
    title: 'Product Name',
    price: 10.99,
    rating: { rate: 4.1, count: 123 },
    image: 'https://example.com/image.png',
  };
}

const context = Object.freeze({
  getMaxItemQuantity: vi.fn().mockReturnValue(100),
  getCurrentItemQuantity: vi.fn().mockReturnValue(0),
  onEditCart: vi.fn(),
});

function renderCartItemRow(product) {
  render(
    <table>
      <tbody>
        <CartItemRow {...product} {...context} />
      </tbody>
    </table>,
  );
}

it('shows product name', () => {
  const product = createProduct();

  renderCartItemRow(product);

  expect(screen.getByText(product.title)).toBeInTheDocument();
});

it('shows product image', () => {
  const product = createProduct();

  renderCartItemRow(product);
  const productImage = screen.getByRole('img', { name: product.title });

  expect(productImage).toBeInTheDocument();
  expect(productImage).toHaveAttribute('src', product.image);
});
