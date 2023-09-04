import './layout.scss';

import Fathom from '../components/Fathom';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Not Found',
    template: '%s | Tacoma Wedge Historic District',
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en-US'>
      <Fathom />
      <body>
        <header>
          <h1>Tacoma Wedge Historic District</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
