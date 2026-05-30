import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';

import renderWithAppContext from '/tests/test-utils/render-with-app-context.jsx';
import { buildDocumentTitle } from '/src/utils.js';

import NotFoundPage from './NotFoundPage.jsx';

it('sets document title', () => {
  document.title = 'Initial Title';

  renderWithAppContext('/wrong-path', NotFoundPage);

  expect(document.title).toMatch(buildDocumentTitle('Page Not Found'));
});

it('focuses page title heading', () => {
  renderWithAppContext('/wrong-path', NotFoundPage);

  expect(screen.getByRole('heading', { name: 'Page not found' })).toHaveFocus();
});
