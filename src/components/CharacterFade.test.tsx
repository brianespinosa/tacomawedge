import { render, screen } from '@testing-library/react';

import CharacterFade from './CharacterFade';

describe('CharacterFade', () => {
  const testText = 'Greetings!';

  beforeEach(() => {
    render(<CharacterFade>{testText}</CharacterFade>);
  });

  it('renders visually hidden text', () => {
    // Check visually hidden text
    const hiddenText = screen.getByText(testText);
    expect(hiddenText).toBeInTheDocument();

    // This style is from the Radix UI VisuallyHidden component
    // so if this part of the test ever fails, it means the Radix UI
    // VisuallyHidden component has changed
    expect(hiddenText).toHaveStyle({
      position: 'absolute',
      border: 0,
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
    });
  });

  it('make sure only the parent span has the presentation role', () => {
    // Find all elements with role 'presentation'
    const presentationContainers = screen.getAllByRole('presentation');

    // Make sure there is only one parent span
    expect(presentationContainers).toHaveLength(1);
  });

  it('splits text into individual character spans', () => {
    // Find the parent span with role 'presentation'.
    // Since the presentation role applies to all children,
    // we do not need to give the children spans a role
    const spans = screen.getByRole('presentation').children;

    // Check that there are the correct number of child spans
    expect(spans).toHaveLength(testText.length);
  });
});
