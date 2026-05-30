import App from '../App/App.jsx';
import Home from './Home/Home.jsx';
import Shop from './Shop/Shop.jsx';
import Cart from './Cart/Cart.jsx';
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx';

export function createRoutes(initialCart) {
  return [
    {
      path: '/',
      element: <App initialCart={initialCart} />,
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
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ];
}

const routes = createRoutes();

export default routes;
