import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { createRoutes } from '/src/routes/routes.jsx';

export default function renderApp(initialEntries = ['/'], initialCart) {
  const routes = createRoutes(initialCart);
  const router = createMemoryRouter(routes, { initialEntries });
  render(<RouterProvider router={router} />);
}
