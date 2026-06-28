import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

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
