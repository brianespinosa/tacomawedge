/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { JSX } from 'react';

import { render, screen } from '@testing-library/react';

import { useMDXComponents } from './mdx-components';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicElements['img']) => <img {...props} />,
  ImageProps: {},
}));

// Mock MdxFade and MdxHeading
jest.mock('./components/MdxFade', () => ({
  __esModule: true,
  default: ({
    as = 'div',
    children,
    ...props
  }: JSX.IntrinsicElements['div'] & { as?: string }) =>
    React.createElement(as, props, children),
}));
jest.mock('./components/MdxHeading', () => ({
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
    const { container } = render(
      React.createElement(components.h2, null, 'Heading 2'),
    );
    expect(container.querySelector('h2')).toHaveTextContent('Heading 2');
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
