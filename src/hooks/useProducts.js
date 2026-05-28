import { useEffect, useState } from 'react';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}`;

          if (response.statusText) {
            errorMessage += `: ${response.statusText}`;
          }

          throw new Error(errorMessage);
        }

        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          throw new Error('No products available');
        }

        setProducts(data);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}
