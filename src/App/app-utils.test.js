import { describe, it, expect } from 'vitest';

import { MAX_QUANTITY_PER_ITEM, getMaxItemQuantity } from './app-utils.js';

describe('getMaxItemQuantity()', () => {
  it('returns MAX_QUANTITY_PER_ITEM', () => {
    expect(getMaxItemQuantity()).toBe(MAX_QUANTITY_PER_ITEM);
  });
});
