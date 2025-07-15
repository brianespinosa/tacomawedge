import React from 'react';
import Image, { type ImageProps } from 'next/image';

import { Inset } from '@radix-ui/themes';

const InsetImage = (imgProps: ImageProps) => {
  return (
    <Inset clip='padding-box'>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...imgProps}
        placeholder='blur'
        style={{
          display: 'block',
          objectFit: 'cover',
          width: '100%',
          height: 'auto',
          backgroundColor: 'var(--gray-5)',
        }}
      />
    </Inset>
  );
};

export default InsetImage;
