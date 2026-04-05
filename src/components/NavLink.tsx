'use client';

import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenu } from 'radix-ui';
import type { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <NavigationMenu.Item>
      <Button
        asChild
        color='cyan'
        size='3'
        variant={pathname === href ? 'solid' : 'outline'}
      >
        <NavigationMenu.Link asChild>
          <Link href={href}>{children}</Link>
        </NavigationMenu.Link>
      </Button>
    </NavigationMenu.Item>
  );
};

export default NavLink;
