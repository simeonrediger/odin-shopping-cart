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
        setProducts(data);
      })
      .catch(error => {
        console.error(error);
        setError?.(error);
      })
      .finally(() => {
        setLoading?.(false);
      });
  }, []);

  return { products, loading, error };
}
