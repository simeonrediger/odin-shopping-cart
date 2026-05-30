import { render } from '@testing-library/react';
import { createRoutesStub } from 'react-router';

import App from '/src/App/App.jsx';
import Home from '/src/routes/Home/Home.jsx';
import Shop from '/src/routes/Shop/Shop.jsx';
import Cart from '/src/routes/Cart/Cart.jsx';

export default function renderAppStub(path) {
  const Stub = createRoutesStub([
    {
      path: '/',
      Component: App,
      children: [
        { index: true, Component: Home },
        { path: 'shop', Component: Shop },
        { path: 'cart', Component: Cart },
      ],
    },
  ]);

  return render(<Stub initialEntries={[path]} />);
}
