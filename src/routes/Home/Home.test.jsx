import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { SITE_TITLE } from '/src/constants.js';

import Home from './Home.jsx';

it.each([
  ['2026-03-15', /march deals/i],
  ['2026-09-15', /september deals/i],
])('shows correct month name in deals heading on %s', (isoDate, heading) => {
  render(<Home currentDate={new Date(isoDate)} />);

  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
});

it('sets document title', () => {
  document.title = 'Initial Title';

  render(<Home />);

  expect(document.title).toMatch(SITE_TITLE);
});
