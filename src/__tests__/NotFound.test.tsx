import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import NotFound from '../app/not-found';

describe('NotFound', () => {
  it('should not trigger a warning', () => {
    const warn = vi.spyOn(console, 'warn');

    // Render the page
    render(<NotFound />);

    // Check that warn was not called (fail on warning)
    expect(warn).not.toHaveBeenCalled();
  });

  it('should not trigger an error', () => {
    const error = vi.spyOn(console, 'error');

    // Render the page
    render(<NotFound />);

    // Check that error was not called (fail on error)
    expect(error).not.toHaveBeenCalled();
  });

  it('should not log any messages', () => {
    const log = vi.spyOn(console, 'log');

    // Render the page
    render(<NotFound />);

    // Check that log was not called (fail on log)
    expect(log).not.toHaveBeenCalled();
  });
});
