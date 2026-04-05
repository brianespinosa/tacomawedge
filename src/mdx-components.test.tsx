import { render, screen } from '@testing-library/react';
import React, { type JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { useMDXComponents } from './mdx-components';

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  // biome-ignore lint/performance/noImgElement: test mock for next/image
  // biome-ignore lint/a11y/useAltText: alt is passed via props spread in this next/image mock
  default: (props: JSX.IntrinsicElements['img']) => <img {...props} />,
  ImageProps: {},
}));

// Mock MdxFade and MdxHeading
vi.mock('./components/MdxFade', () => ({
  __esModule: true,
  default: ({
    as = 'div',
    children,
    ...props
  }: JSX.IntrinsicElements['div'] & { as?: string }) =>
    React.createElement(as, props, children),
}));
vi.mock('./components/MdxHeading', () => ({
  __esModule: true,
  default: ({
    heading = 'h1',
    children,
    ...props
  }: JSX.IntrinsicElements['h1'] & { heading?: string }) =>
    React.createElement(heading, props, children),
}));

describe('mdx-components', () => {
  const components = useMDXComponents();

  it('renders custom heading components', () => {
    for (const level of [1, 2, 3, 4, 5, 6] as const) {
      const tag = `h${level}` as const;
      const { container } = render(
        React.createElement(components[tag], null, `Heading ${level}`),
      );
      expect(container.querySelector(tag)).toHaveTextContent(
        `Heading ${level}`,
      );
    }
  });

  it('renders custom fade paragraph', () => {
    const { container } = render(
      React.createElement(components.p, null, 'Paragraph'),
    );
    expect(container.querySelector('p')).toHaveTextContent('Paragraph');
  });

  it('renders custom fade ul and ol', () => {
    const { container } = render(
      React.createElement(components.ul, null, <li>Item</li>),
    );
    expect(container.querySelector('ul')).toBeInTheDocument();
    const { container: olContainer } = render(
      React.createElement(components.ol, null, <li>Item</li>),
    );
    expect(olContainer.querySelector('ol')).toBeInTheDocument();
  });

  it('renders next/image for img', () => {
    render(
      React.createElement(components.img, {
        src: 'test.png',
        alt: 'test',
        width: 100,
        height: 100,
      }),
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.png');
    expect(img).toHaveAttribute('alt', 'markdown image');
  });
});
