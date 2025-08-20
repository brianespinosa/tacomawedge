import { render, screen } from '@testing-library/react';

import Nav from './Nav';

// Mock radix-ui NavigationMenu
jest.mock('radix-ui', () => ({
  NavigationMenu: {
    Root: ({ children }: never) => <nav>{children}</nav>,
    List: ({ children }: never) => <ul>{children}</ul>,
  },
}));

// Mock NavLink
jest.mock('./NavLink', () => ({
  __esModule: true,
  default: ({ href, children }: never) => <a href={href}>{children}</a>,
}));

describe('Nav', () => {
  it('renders navigation links', () => {
    render(<Nav />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('renders a nav and ul structure', () => {
    render(<Nav />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('links have correct hrefs', () => {
    render(<Nav />);
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Resources').closest('a')).toHaveAttribute(
      'href',
      '/resources',
    );
  });
});
