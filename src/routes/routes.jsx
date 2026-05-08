import RootLayout from '../app/RootLayout.jsx';
import Home from './Home/Home.jsx';
import Shop from './Shop/Shop.jsx';
import Cart from './Cart/Cart.jsx';

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
];

export default routes;
