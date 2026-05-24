import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Price from './Price.jsx';

it.each([
  [0.01, '$0.01'],
  [0.5, '$0.50'],
  [0.74, '$0.74'],
  [1, '$1.00'],
  [4.333333, '$4.33'],
  [4.666666, '$4.67'],
  [999.99, '$999.99'],
  [1000, '$1,000.00'],
  [92132524.52178, '$92,132,524.52'],
])('formats %d as %s', (price, formattedPrice) => {
  render(<Price price={price} />);

  expect(screen.getByText(formattedPrice)).toBeInTheDocument();
});
