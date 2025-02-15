import './layout.scss';

import { ReactElement } from 'react';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import { Container, Heading, Theme } from '@radix-ui/themes';
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
    <html lang='en-US' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class'>
          <Theme accentColor='lime' grayColor='slate' radius='large'>
            <Container asChild>
              <header>
                <Heading as='h1' size='8'>
                  Tacoma Wedge Historic District
                </Heading>
              </header>
            </Container>
            <Container asChild>
              <main>{children}</main>
            </Container>
            <Analytics />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
