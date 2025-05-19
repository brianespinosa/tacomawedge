import { render } from '@testing-library/react';

import Section from './Section';

import '@testing-library/jest-dom';

describe('Section component', () => {
  it('renders children correctly', () => {
    const testContent = <div>Test content</div>;
    const { getByText } = render(<Section>{testContent}</Section>);

    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('renders with correct structure', () => {
    const { container } = render(<Section>Content</Section>);

    // Check if motion.section exists
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toBeInTheDocument();

    // Check if Card wrapper exists (radix-ui class)
    const cardElement = container.firstChild;
    expect(cardElement).toHaveStyle({
      backgroundImage: expect.stringContaining('data:image/svg+xml'),
    });
  });
});
