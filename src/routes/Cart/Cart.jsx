import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const { cart } = useOutletContext();

  useEffect(() => {
    function loadData() {
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
          setProducts(data);
        });
    }

    loadData();
  }, []);

  return (
    <ul>
      {products
        .filter(product => cart.has(product.id))
        .map(product => (
          <li key={product.id}>
            {product.id} ({cart.get(product.id)})
          </li>
        ))}
    </ul>
  );
}
