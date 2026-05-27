import { describe, it, expect, vi } from 'vitest';

import {
  MAX_QUANTITY_PER_ITEM,
  getMaxItemQuantity,
  getCurrentItemQuantity,
  cartHasItem,
  cartIsEmpty,
  getCartItemTotal,
  getCartPriceTotal,
  regulateQuantity,
  regulateQuantityToAdd,
  onAddToCart,
  onEditCart,
} from './cart-utils.js';

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

describe('getCartItemTotal()', () => {
  describe('returns the correct cart item total', () => {
    it('when cart has items', () => {
      const cart = new Map();
      cart.set(1, 1);
      cart.set(2, 5);
      cart.set(3, 3);

      expect(getCartItemTotal(cart)).toBe(9);
    });

    it('when cart is empty', () => {
      const cart = new Map();

      expect(getCartItemTotal(cart)).toBe(0);
    });
  });
});

describe('getCartPriceTotal()', () => {
  describe('returns the correct cart price total', () => {
    const products = [
      { id: 1, price: 5 },
      { id: 2, price: 32 },
      { id: 3, price: 19 },
    ];

    it('when cart has items', () => {
      const cart = new Map();
      cart.set(1, 2);
      cart.set(2, 1);
      cart.set(3, 3);

      expect(getCartPriceTotal(cart, products)).toBe(99);
    });

    it('when cart is empty', () => {
      const cart = new Map();

      expect(getCartPriceTotal(cart, products)).toBe(0);
    });
  });
});

describe('regulateQuantity()', () => {
  describe('rounds non-integer quantity to nearest integer', () => {
    it('when decimal part is less than 0.5', () => {
      expect(regulateQuantity(43.4)).toBe(43);
    });

    it('when decimal part is at least 0.5', () => {
      expect(regulateQuantity(43.5)).toBe(44);
    });
  });

  it('returns 0 if quantity is negative', () => {
    expect(regulateQuantity(-1)).toBe(0);
  });

  it('returns max quantity per item if quantity exceeds it', () => {
    expect(regulateQuantity(MAX_QUANTITY_PER_ITEM + 1)).toBe(
      MAX_QUANTITY_PER_ITEM,
    );
  });
});

describe('regulateQuantityToAdd()', () => {
  const cart = new Map();
  const productId = 1;
  cart.set(productId, 38);

  describe('rounds non-integer quantity-to-add to nearest integer', () => {
    it('when decimal part is less than 0.5', () => {
      expect(regulateQuantityToAdd(cart, productId, 43.4)).toBe(43);
    });

    it('when decimal part is at least 0.5', () => {
      expect(regulateQuantityToAdd(cart, productId, 43.5)).toBe(44);
    });
  });

  it('returns 0 if quantity to add is negative', () => {
    expect(regulateQuantityToAdd(cart, productId, -1)).toBe(0);
  });

  it('returns 0 if item has reached the maximum quantity', () => {
    const cart = new Map();
    const productId = 1;
    cart.set(productId, MAX_QUANTITY_PER_ITEM);

    expect(regulateQuantityToAdd(cart, productId, 1)).toBe(0);
  });
});

describe('onAddToCart()', () => {
  const productId = 1;
  const quantityToAdd = 1;

  it('does not update the existing cart instance', () => {
    const cart = new Map();
    const setCart = vi.fn();

    onAddToCart(cart, setCart, productId, quantityToAdd);

    expect(setCart).not.toHaveBeenCalledWith([cart]);
  });

  it('updates the cart item quantity with the correct new quantity', () => {
    const cart = new Map();
    cart.set(productId, 5);
    const setCart = vi.fn();

    onAddToCart(cart, setCart, productId, quantityToAdd);

    const newCart = setCart.mock.calls[0][0];
    const newQuantity = newCart.get(productId);
    expect(newQuantity).toBe(6);
  });

  describe('return value', () => {
    it('is true when the cart item has reached the maximum quantity', () => {
      let cart = new Map();
      cart.set(productId, MAX_QUANTITY_PER_ITEM - quantityToAdd);
      const setCart = newCart => (cart = newCart);

      const result = onAddToCart(cart, setCart, productId, quantityToAdd);

      expect(result).toBe(true);
    });

    it('is false when the cart item is less than the maximum quantity', () => {
      let cart = new Map();
      cart.set(productId, MAX_QUANTITY_PER_ITEM - quantityToAdd - 1);
      const setCart = newCart => (cart = newCart);

      const result = onAddToCart(cart, setCart, productId, quantityToAdd);

      expect(result).toBe(false);
    });
  });
});

describe('onEditCart()', () => {
  const productId = 1;
  const quantity = 1;

  it('does not update the existing cart instance', () => {
    const cart = new Map();
    const setCart = vi.fn();

    onEditCart(cart, setCart, productId, quantity);

    expect(setCart).not.toHaveBeenCalledWith([cart]);
  });

  it('updates the cart item quantity with the correct quantity', () => {
    const cart = new Map();
    cart.set(productId, 5);
    const setCart = vi.fn();

    onEditCart(cart, setCart, productId, quantity);

    const newCart = setCart.mock.calls[0][0];
    const newQuantity = newCart.get(productId);
    expect(newQuantity).toBe(quantity);
  });

  it('deletes the item from the cart if quantity is 0', () => {
    let cart = new Map();
    cart.set(productId, 5);
    const setCart = newCart => (cart = newCart);

    onEditCart(cart, setCart, productId, 0);

    expect(cart.has(productId)).toBe(false);
  });
});
