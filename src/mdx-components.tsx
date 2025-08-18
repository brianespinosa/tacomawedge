import Image, { ImageProps } from 'next/image';
import type { MDXComponents } from 'mdx/types';

import MdxFade from './components/MdxFade';
import MdxHeading from './components/MdxHeading';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const components = {
  // Allows customizing built-in components, e.g. to add styling.
  h1: ({ children }) => <MdxHeading heading='h1'>{children}</MdxHeading>,
  h2: ({ children }) => <MdxHeading heading='h2'>{children}</MdxHeading>,
  h3: ({ children }) => <MdxHeading heading='h3'>{children}</MdxHeading>,
  h4: ({ children }) => <MdxHeading heading='h4'>{children}</MdxHeading>,
  h5: ({ children }) => <MdxHeading heading='h5'>{children}</MdxHeading>,
  h6: ({ children }) => <MdxHeading heading='h6'>{children}</MdxHeading>,
  p: ({ children }) => <MdxFade as='p'>{children}</MdxFade>,
  ul: ({ children }) => <MdxFade as='ul'>{children}</MdxFade>,
  ol: ({ children }) => <MdxFade as='ol'>{children}</MdxFade>,
  img: (props) => (
    <Image
      {...(props as ImageProps)}
      alt='markdown image'
      sizes='100vw'
      style={{ width: '100%', height: 'auto' }}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
