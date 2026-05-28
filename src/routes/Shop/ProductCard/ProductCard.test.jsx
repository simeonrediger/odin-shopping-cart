import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import ProductCard from './ProductCard.jsx';

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
  regulateQuantityToAdd: vi.fn(),
  onAddToCart: vi.fn(),
});

it('shows product name', () => {
  const product = createProduct();

  render(<ProductCard {...product} {...context} />);

  expect(
    screen.getByRole('heading', { name: product.title }),
  ).toBeInTheDocument();
});

it('shows product image', () => {
  const product = createProduct();

  render(<ProductCard {...product} {...context} />);
  const productImage = screen.getByRole('img', { name: product.title });

  expect(productImage).toBeInTheDocument();
  expect(productImage).toHaveAttribute('src', product.image);
});
