import { render } from '@testing-library/react';

import Home from '../app/page';

import '@testing-library/jest-dom';

describe('Home', () => {
  it('should not trigger a warning', () => {
    const warn = jest.spyOn(globalThis.console, 'warn');

    // Render the page
    render(<Home />);

    // Check that warn was not called (fail on warning)
    expect(warn).not.toHaveBeenCalled();

    // Cleanup
    warn.mockReset();
    warn.mockRestore();
  });

  it('should not trigger an error', () => {
    const error = jest.spyOn(globalThis.console, 'error');

    // Render the page
    render(<Home />);

    // Check that error was not called (fail on error)
    expect(error).not.toHaveBeenCalled();

    // Cleanup
    error.mockReset();
    error.mockRestore();
  });

  it('should not log any messages', () => {
    const log = jest.spyOn(globalThis.console, 'log');

    // Render the page
    render(<Home />);

    // Check that log was not called (fail on log)
    expect(log).not.toHaveBeenCalled();

    // Cleanup
    log.mockReset();
    log.mockRestore();
  });
});
