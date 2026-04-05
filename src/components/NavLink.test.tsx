import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import NavLink from './NavLink';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/test',
}));

// Mock next/link
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: never) => (
    <a href={href} data-testid='next-link'>
      {children}
    </a>
  ),
}));

// Mock radix-ui NavigationMenu
vi.mock('radix-ui', () => ({
  NavigationMenu: {
    Item: ({ children }: never) => <div data-testid='nav-item'>{children}</div>,
    Link: ({ children }: never) => <div data-testid='nav-link'>{children}</div>,
  },
}));

// Mock @radix-ui/themes Button
vi.mock('@radix-ui/themes', () => ({
  Button: ({ children, variant, size, asChild }: never) => (
    <button
      type='button'
      data-variant={variant}
      data-size={size}
      data-as-child={asChild}
    >
      {children}
    </button>
  ),
}));

describe('NavLink', () => {
  it('renders children content', () => {
    render(<NavLink href='/test'>Test Link</NavLink>);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('uses soft variant when pathname matches href', () => {
    render(<NavLink href='/test'>Active Link</NavLink>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'soft');
  });

  it('uses outline variant when pathname does not match href', () => {
    render(<NavLink href='/other'>Inactive Link</NavLink>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'outline');
  });

  it('renders with correct size', () => {
    render(<NavLink href='/test'>Sized Link</NavLink>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-size', '3');
  });
});
