import { describe, it, expect } from 'vitest';

import {
  MAX_QUANTITY_PER_ITEM,
  getMaxItemQuantity,
  getCurrentItemQuantity,
  cartHasItem,
  cartIsEmpty,
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

describe('cartHasItem()', () => {
  it('returns true when cart has the item', () => {
    const cart = new Map();
    cart.set(1, 1);
    const productId = 1;

    expect(cartHasItem(cart, productId)).toBe(true);
  });

  it('returns false when cart does not have the item', () => {
    const cart = new Map();
    cart.set(1, 3);
    const productId = 2;

    expect(cartHasItem(cart, productId)).toBe(false);
  });

  it('returns false when cart has the item with a quantity of 0', () => {
    const cart = new Map();
    cart.set(1, 0);
    const productId = 1;

    expect(cartHasItem(cart, productId)).toBe(false);
  });
});

describe('cartIsEmpty()', () => {
  it('returns true when the cart has no items', () => {
    const cart = new Map();

    expect(cartIsEmpty(cart)).toBe(true);
  });

  it('returns true when the cart has no items with nonzero quantities', () => {
    const cart = new Map();
    cart.set(1, 0);

    expect(cartIsEmpty(cart)).toBe(true);
  });

  it('returns false when the cart has an item with nonzero quantity', () => {
    const cart = new Map();
    cart.set(1, 1);

    expect(cartIsEmpty(cart)).toBe(false);
  });
});
