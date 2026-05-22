import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import Shop from '/src/routes/Shop/Shop.jsx';
import useProducts from '/src/hooks/useProducts.js';

vi.mock('/src/hooks/useProducts.js', () => ({
  default: vi.fn(),
}));

it('shows loading state while loading', () => {
  useProducts.mockReturnValue({ loading: true });

  render(<Shop />);

  expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();
});
