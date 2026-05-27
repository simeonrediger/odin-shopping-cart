import { it, expect } from 'vitest';

import renderWithAppContext from '/tests/test-utils/render-with-app-context.jsx';
import { buildDocumentTitle } from '/src/utils.js';

import NotFoundPage from './NotFoundPage.jsx';

it('sets document title', () => {
  document.title = 'Initial Title';

  renderWithAppContext('/wrong-path', NotFoundPage);

  expect(document.title).toMatch(buildDocumentTitle('Page Not Found'));
});
