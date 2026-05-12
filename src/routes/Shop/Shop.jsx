import { useEffect, useState } from 'react';

import ProductCard from './ProductCard.jsx';

export default function Shop() {
  const [products, setProducts] = useState([]);

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
      {products.map(product => (
        <li key={product.id}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
}
