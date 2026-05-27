import { describe, it, expect } from 'vitest';

import { formatRate, getStarsString } from './product-utils.js';

describe('formatRate()', () => {
  it('returns number as a string', () => {
    expect(formatRate(4.5)).toBe('4.5');
  });

  it("prepends bare decimal with '0'", () => {
    expect(formatRate(0.5)).toBe('0.5');
  });

  it("appends '0' to integer", () => {
    expect(formatRate(3)).toBe('3.0');
  });
});

describe('getStarsString()', () => {
  it('returns 5 hollow stars for 0 stars', () => {
    expect(getStarsString(0)).toBe('☆☆☆☆☆');
  });

  it('returns 5 solid stars for 5 stars', () => {
    expect(getStarsString(5)).toBe('★★★★★');
  });

  it('returns 3 solid stars and 2 hollow stars for 3 stars', () => {
    expect(getStarsString(3)).toBe('★★★☆☆');
  });

  describe('rounds to nearest whole star', () => {
    it('3.5 stars becomes 4 stars', () => {
      expect(getStarsString(3.5)).toBe('★★★★☆');
    });

    it('3.4 stars becomes 3 stars', () => {
      expect(getStarsString(3.4)).toBe('★★★☆☆');
    });
  });
});
