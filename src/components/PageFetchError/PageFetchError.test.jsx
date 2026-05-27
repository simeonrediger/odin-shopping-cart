import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import PageFetchError from './PageFetchError.jsx';

describe('Error message', () => {
  it('shows error.message if available', () => {
    const errorMessage = 'Example error message';

    render(<PageFetchError error={new Error(errorMessage)} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows "unknown error" when no error.message', () => {
    render(<PageFetchError error={new Error('')} />);

    expect(screen.getByText(/unknown error/)).toBeInTheDocument();
  });
});
