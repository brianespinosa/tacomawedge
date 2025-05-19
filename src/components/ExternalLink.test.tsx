import { render, screen } from '@testing-library/react';

import ExternalLink from './ExternalLink';

describe('ExternalLink', () => {
  const testText = 'Test Link';
  const testUrl = 'https://example.com';

  beforeEach(() => {
    render(
      <ExternalLink
        href={testUrl}
        className='custom-class'
        data-testid='test-link'
      >
        {testText}
      </ExternalLink>,
    );
  });

  it('renders with correct attributes', () => {
    const link = screen.getByText(testText);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', testUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('passes through additional props', () => {
    const link = screen.getByText(testText);
    expect(link).toHaveClass('custom-class');
    expect(link).toHaveAttribute('data-testid', 'test-link');
  });
});
