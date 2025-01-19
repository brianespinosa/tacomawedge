import './layout.scss';

import { ReactElement } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

import wedgehistmap from '@/img/wedgehistmap.jpg';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: {
    default: 'Not Found',
    template: '%s | Tacoma Wedge Historic District',
  },
  metadataBase: new URL('https://tacomawedge.org/'),
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactElement;
}) {
  return (
    <html lang='en-US'>
      <body>
        <header>
          <h1>Tacoma Wedge Historic District</h1>
          <Image
            src={wedgehistmap}
            alt='Wedge Historic District Map'
            placeholder='blur'
          />
        </header>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
