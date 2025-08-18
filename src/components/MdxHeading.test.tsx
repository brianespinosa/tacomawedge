import { render } from '@testing-library/react';

import MdxHeading from './MdxHeading';

// Mock @radix-ui/themes
jest.mock('@radix-ui/themes', () => ({
  Heading: ({ children, as, size, my, color, ...props }: any) => (
    <div
      data-testid='radix-heading'
      data-as={as}
      data-size={size}
      data-my={my}
      data-color={color}
      {...props}
    >
      {children}
    </div>
  ),
}));

// Mock CharacterFade
jest.mock('./CharacterFade', () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <span data-testid='character-fade'>{children}</span>
  ),
}));

describe('MdxHeading', () => {
  it('converts h1 to h2 with correct styling', () => {
    const { getByTestId } = render(
      <MdxHeading heading='h1'>Test Heading</MdxHeading>,
    );
    const heading = getByTestId('radix-heading');

    expect(heading).toHaveAttribute('data-as', 'h2');
    expect(heading).toHaveAttribute('data-size', '6');
    expect(heading).toHaveAttribute('data-my', '4');
    expect(heading).not.toHaveAttribute('data-color');
  });

  it('converts h2 to h3 with special cyan styling', () => {
    const { getByTestId } = render(
      <MdxHeading heading='h2'>Cyan Heading</MdxHeading>,
    );
    const heading = getByTestId('radix-heading');

    expect(heading).toHaveAttribute('data-as', 'h3');
    expect(heading).toHaveAttribute('data-size', '6');
    expect(heading).toHaveAttribute('data-my', '6');
    expect(heading).toHaveAttribute('data-color', 'cyan');
  });

  it('keeps h6 as h6 with correct styling', () => {
    const { getByTestId } = render(
      <MdxHeading heading='h6'>Small Heading</MdxHeading>,
    );
    const heading = getByTestId('radix-heading');

    expect(heading).toHaveAttribute('data-as', 'h6');
    expect(heading).toHaveAttribute('data-size', '2');
    expect(heading).toHaveAttribute('data-my', '4');
    expect(heading).not.toHaveAttribute('data-color');
  });

  it('wraps content in CharacterFade', () => {
    const testContent = 'Fade Test';
    const { getByTestId } = render(
      <MdxHeading heading='h1'>{testContent}</MdxHeading>,
    );
    const fade = getByTestId('character-fade');

    expect(fade).toHaveTextContent(testContent);
  });
});
