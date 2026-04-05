import { render } from '@testing-library/react';
import type { JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';

import Home from './page';

// Mock next/image — Vite returns PNG imports as URL strings, not Next.js image
// objects, so the component would throw "missing required width property" without this.
vi.mock('next/image', () => ({
  __esModule: true,
  // biome-ignore lint/performance/noImgElement: test mock for next/image
  // biome-ignore lint/a11y/useAltText: alt is passed via props spread in this next/image mock
  default: (props: JSX.IntrinsicElements['img']) => <img {...props} />,
}));

describe('Home', () => {
  it('should not trigger a warning', () => {
    const warn = vi.spyOn(console, 'warn');

    // Render the page
    render(<Home />);

    // Check that warn was not called (fail on warning)
    expect(warn).not.toHaveBeenCalled();
  });

  it('should not trigger an error', () => {
    const error = vi.spyOn(console, 'error');

    // Render the page
    render(<Home />);

    // Check that error was not called (fail on error)
    expect(error).not.toHaveBeenCalled();
  });

  it('should not log any messages', () => {
    const log = vi.spyOn(console, 'log');

    // Render the page
    render(<Home />);

    // Check that log was not called (fail on log)
    expect(log).not.toHaveBeenCalled();
  });
});
