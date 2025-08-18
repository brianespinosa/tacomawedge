import styles from './Nav.module.scss';

import { NavigationMenu } from 'radix-ui';

import NavLink from './NavLink';

// NOTE: This might be better to control with Ariakit instead. I don't think the keyboard nav is currently following the desired accessible principles

const Nav = () => {
  return (
    <NavigationMenu.Root className={styles.Root}>
      <NavigationMenu.List className={styles.MenuList}>
        <NavLink href='/'>Home</NavLink>
        {/* <NavLink href='/news'>News</NavLink> */}
        <NavLink href='/resources'>Resources</NavLink>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Nav;
