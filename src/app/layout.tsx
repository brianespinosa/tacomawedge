import './layout.scss';

import { ReactElement } from 'react';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import * as motion from 'motion/react-client';

import CharacterFade from '@/components/CharacterFade';
import { Container, Heading, Theme } from '@radix-ui/themes';
import { Analytics } from '@vercel/analytics/react';

const DETAILS = {
  title: 'Tacoma Wedge Historic District',
  description: 'Information About Tacoma’s Wedge Historic District',
};

export const metadata: Metadata = {
  description: DETAILS.description,
  title: {
    default: DETAILS.title,
    template: `%s | ${DETAILS.title}`,
  },
  openGraph: {
    type: 'website',
    ...DETAILS,
    images: '/wedgehistmap.jpg',
  },
  metadataBase: new URL('https://tacomawedge.org/'),
};

const mainVariants = {
  // hidden: { opacity: 0 },
  show: {
    // opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
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
          <Theme accentColor='cyan' grayColor='slate' radius='large'>
            <Container asChild pt='6'>
              <motion.header>
                <Heading
                  as='h1'
                  size={{
                    initial: '5',
                    sm: '6',
                    md: '8',
                  }}
                >
                  <CharacterFade>Tacoma Wedge Historic District</CharacterFade>
                </Heading>
              </motion.header>
            </Container>
            <Container asChild>
              <motion.main
                variants={mainVariants}
                initial='hidden'
                animate='show'
              >
                {children}
              </motion.main>
            </Container>
            <Analytics />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
