import React from 'react';

import { Link, LinkProps } from '@radix-ui/themes';

const ExternalLink = ({ children, href, ...rest }: LinkProps) => {
  return (
    <Link {...rest} href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </Link>
  );
};

export default ExternalLink;
