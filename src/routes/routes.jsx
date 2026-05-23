import App from '../App/App.jsx';
import NotFoundPage from '../App/NotFoundPage/NotFoundPage.jsx';
import Home from './Home/Home.jsx';
import Shop from './Shop/Shop.jsx';
import Cart from './Cart/Cart.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
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

export default routes;
