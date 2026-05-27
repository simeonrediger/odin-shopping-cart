import { describe, it, expect } from 'vitest';

import { formatRate } from './product-utils.js';

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
