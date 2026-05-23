import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import Shop from './Shop.jsx';
import useProducts from '/src/hooks/useProducts.js';

vi.mock('/src/hooks/useProducts.js', () => ({
  default: vi.fn(),
}));

vi.mock('/src/routes/Shop/ProductCard/ProductCard.jsx', () => ({
  default: () => <div>Mock Product Card</div>,
}));

it('shows loading state while loading', () => {
  useProducts.mockReturnValue({ loading: true });

  render(<Shop />);

  expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();
});

it('shows error state on error', () => {
  useProducts.mockReturnValue({ error: new Error() });

  render(<Shop />);

  expect(screen.getByRole('heading', { name: /error/i })).toBeInTheDocument();
});

it.each([3, 8])(
  'renders %d product cards when there are as many products',
  productCount => {
    useProducts.mockReturnValue({
      products: Array.from({ length: productCount }, (_, i) => ({ id: i + 1 })),
    });

    render(<Shop />);

    expect(screen.queryAllByRole('listitem')).toHaveLength(productCount);
  },
);
