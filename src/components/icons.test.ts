import { render } from '@testing-library/react';

import { facebook, instagram, twitter } from './icons';

// These can just be snapshot tests as there is no logic in the icons

describe('Icons', () => {
  it('renders the Twitter icon', () => {
    const { container } = render(twitter);
    expect(container).toMatchSnapshot();
  });

  it('renders the Facebook icon', () => {
    const { container } = render(facebook);
    expect(container).toMatchSnapshot();
  });

  it('renders the Instagram icon', () => {
    const { container } = render(instagram);
    expect(container).toMatchSnapshot();
  });
});
