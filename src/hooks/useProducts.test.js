import { it, expect, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import useProducts from './useProducts.js';

afterEach(() => vi.restoreAllMocks());

function stubFetch({
  ok = true,
  status = 200,
  statusText = '',
  products = [],
}) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok,
      status,
      statusText,
      json: () => Promise.resolve(products),
    }),
  );
}

it('loads products successfully', async () => {
  const products = [
    { id: 1, title: 'Product 1' },
    { id: 2, title: 'Product 2' },
  ];
  stubFetch({ products });

  const { result } = renderHook(() => useProducts());

  expect(result.current.loading).toBe(true);
  expect(result.current.error).toBe(null);
  expect(result.current.products).toEqual([]);

  await waitFor(() => {
    expect(result.current.products).toEqual(products);
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBe(null);
});

it('handles HTTP errors', async () => {
  stubFetch({ ok: false, status: 500, statusText: 'Internal Server Error' });

  const { result } = renderHook(() => useProducts());

  expect(result.current.loading).toBe(true);
  expect(result.current.error).toBe(null);
  expect(result.current.products).toEqual([]);

  await waitFor(() => {
    expect(result.current.error).toEqual(
      new Error('HTTP 500: Internal Server Error'),
    );
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.products).toEqual([]);
});

it('handles empty product lists', async () => {
  const products = [];
  stubFetch({ products });

  const { result } = renderHook(() => useProducts());

  expect(result.current.loading).toBe(true);
  expect(result.current.error).toBe(null);
  expect(result.current.products).toEqual([]);

  await waitFor(() => {
    expect(result.current.error).toEqual(new Error('No products available'));
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.products).toEqual([]);
});
