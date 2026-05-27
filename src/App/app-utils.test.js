import { describe, it, expect } from 'vitest';

import {
  MAX_QUANTITY_PER_ITEM,
  getMaxItemQuantity,
  getCurrentItemQuantity,
} from './app-utils.js';

describe('getMaxItemQuantity()', () => {
  it('returns MAX_QUANTITY_PER_ITEM', () => {
    expect(getMaxItemQuantity()).toBe(MAX_QUANTITY_PER_ITEM);
  });
});

describe('getCurrentItemQuantity()', () => {
  it('returns the quantity of the specified item', () => {
    const cart = new Map();
    cart.set(1, 3);
    cart.set(2, 2);
    const productId = 1;

    expect(getCurrentItemQuantity(cart, productId)).toBe(3);
  });

  it('returns 0 if cart does not have the item', () => {
    const cart = new Map();
    cart.set(1, 3);
    cart.set(2, 2);
    const productId = 3;

    expect(getCurrentItemQuantity(cart, productId)).toBe(0);
  });
});
