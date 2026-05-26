import { vi } from 'vitest';
import { createRoutesStub, Outlet } from 'react-router';
import { render } from '@testing-library/react';

export default function renderWithAppContext(
  path,
  ChildComponent,
  contextOptions,
) {
  const context = { ...createOutletContext(contextOptions) };

  const Stub = createRoutesStub([
    {
      path: '/',
      Component: () => <Outlet context={context} />,
      children: [{ path, Component: ChildComponent }],
    },
  ]);

  return render(<Stub initialEntries={[`/${path}`]} />);
}

function createOutletContext(contextOptions = {}) {
  return {
    getMaxItemQuantity: vi.fn(),
    getCurrentItemQuantity: vi.fn(),
    cartHasItem: vi.fn(),
    cartIsEmpty: vi.fn(),
    getCartItemTotal: vi.fn(),
    getCartPriceTotal: vi.fn(),
    regulateQuantityToAdd: vi.fn(),
    onAddToCart: vi.fn(),
    onEditCart: vi.fn(),
    ...contextOptions,
  };
}
