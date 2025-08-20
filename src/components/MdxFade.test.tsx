import { render } from '@testing-library/react';

import MdxFade from './MdxFade';

// Mock motion/react-client
jest.mock('motion/react-client', () => ({
  p: ({ children, variants }: never) => (
    <p data-testid='motion-p' data-variants={JSON.stringify(variants)}>
      {children}
    </p>
  ),
  ul: ({ children, variants }: never) => (
    <ul data-testid='motion-ul' data-variants={JSON.stringify(variants)}>
      {children}
    </ul>
  ),
  ol: ({ children, variants }: never) => (
    <ol data-testid='motion-ol' data-variants={JSON.stringify(variants)}>
      {children}
    </ol>
  ),
}));

describe('MdxFade', () => {
  const fadeVariant = {
    hidden: { opacity: 0, filter: 'blur(.5em)', y: '1em' },
    show: {
      opacity: 1,
      filter: 'blur(0)',
      y: '0',
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  it('renders as paragraph', () => {
    const { getByTestId } = render(<MdxFade as='p'>Test content</MdxFade>);
    const element = getByTestId('motion-p');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Test content');
    expect(element.dataset.variants).toBe(JSON.stringify(fadeVariant));
  });

  it('renders as unordered list', () => {
    const { getByTestId } = render(<MdxFade as='ul'>List content</MdxFade>);
    const element = getByTestId('motion-ul');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('List content');
    expect(element.dataset.variants).toBe(JSON.stringify(fadeVariant));
  });

  it('renders as ordered list', () => {
    const { getByTestId } = render(<MdxFade as='ol'>List content</MdxFade>);
    const element = getByTestId('motion-ol');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('List content');
    expect(element.dataset.variants).toBe(JSON.stringify(fadeVariant));
  });
});
