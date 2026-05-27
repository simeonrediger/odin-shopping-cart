export const MAX_QUANTITY_PER_ITEM = 999;

export function getMaxItemQuantity() {
  return MAX_QUANTITY_PER_ITEM;
}

export function getCurrentItemQuantity(cart, productId) {
  return cart.get(productId) ?? 0;
}

export function cartHasItem(cart, productId) {
  return cart.get(productId) > 0;
}

export function cartIsEmpty(cart) {
  return cart.size === 0 || getCartItemTotal(cart) === 0;
}

export function getCartItemTotal(cart) {
  return cart
    .values()
    .reduce((totalQuantity, quantity) => totalQuantity + quantity, 0);
}

export function getCartPriceTotal(cart, products) {
  return cart.entries().reduce((totalPrice, [productId, quantity]) => {
    const product = products.find(product => product.id === productId);
    return totalPrice + quantity * (product?.price ?? 0);
  }, 0);
}

export function regulateQuantity(quantity) {
  quantity = Math.round(quantity);
  quantity = Math.max(0, quantity);
  quantity = Math.min(quantity, MAX_QUANTITY_PER_ITEM);
  return quantity;
}

export function regulateQuantityToAdd(cart, productId, quantityToAdd) {
  const currentQuantity = getCurrentItemQuantity(cart, productId);
  const maxQuantityAddable = MAX_QUANTITY_PER_ITEM - currentQuantity;
  quantityToAdd = Math.round(quantityToAdd);
  quantityToAdd = Math.max(0, quantityToAdd);
  quantityToAdd = Math.min(quantityToAdd, maxQuantityAddable);
  return quantityToAdd;
}

export function onAddToCart(cart, setCart, productId, quantityToAdd) {
  const quantity = getCurrentItemQuantity(cart, productId) + quantityToAdd;
  const newCart = new Map(cart);
  newCart.set(productId, quantity);
  setCart(newCart);

  return newCart.get(productId) === MAX_QUANTITY_PER_ITEM;
}

export function onEditCart(cart, setCart, productId, quantity) {
  quantity = regulateQuantity(quantity);
  const newCart = new Map(cart);

  if (quantity > 0) {
    newCart.set(productId, quantity);
  } else {
    newCart.delete(productId);
  }

  setCart(newCart);
}
