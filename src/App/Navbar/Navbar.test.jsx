import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';

import renderAppAtPath from '/tests/test-utils/render-app-at-path';

import styles from './Navbar.module.css';

describe('gives the .active class', () => {
  it.each([
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Cart', path: '/cart' },
  ])('to $name link at path $path', ({ path, name }) => {
    renderAppAtPath(path);

    expect(screen.getByRole('link', { name })).toHaveClass(styles.active);
  });
});

describe("doesn't give the .active class", () => {
  it.each([
    { name: 'Home', path: '/shop' },
    { name: 'Shop', path: '/' },
  ])('to $name link at path $path', ({ path, name }) => {
    renderAppAtPath(path);

    expect(screen.getByRole('link', { name })).not.toHaveClass(styles.active);
  });
});
