import React from 'react';
import pt from 'prop-types';

const propTypes = {
  children: pt.oneOfType([pt.arrayOf(pt.node), pt.node]),
  href: pt.string.isRequired,
};

const ExternalLink = ({ children, href, ...rest }) => {
  return (
    <a {...rest} href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  );
};

ExternalLink.propTypes = propTypes;

export default ExternalLink;
