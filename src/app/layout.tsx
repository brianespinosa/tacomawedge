import './layout.scss';

import { ReactElement } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ThemeProvider } from 'next-themes';
import * as motion from 'motion/react-client';

import CharacterFade from '@/components/CharacterFade';
import ExternalLink from '@/components/ExternalLink';
import { facebook, instagram } from '@/components/icons';
import InsetImage from '@/components/InsetImage';
import Nav from '@/components/Nav';
import Section from '@/components/Section';
import wedgehistmap from '@/img/wedgehistmap.jpg';
import {
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Separator,
  Theme,
  VisuallyHidden,
} from '@radix-ui/themes';
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
  children: React.ReactNode;
}) {
  return (
    <html lang='en-US' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class'>
          <Theme accentColor='cyan' grayColor='slate' radius='medium'>
            <Container asChild pt='6'>
              <header>
                <Grid columns='2fr 1fr' gap='6' align='center'>
                  <Heading
                    as='h1'
                    size={{
                      initial: '5',
                      sm: '8',
                    }}
                  >
                    <Link href='/'>
                      <CharacterFade>
                        Tacoma Wedge Historic District
                      </CharacterFade>
                    </Link>
                  </Heading>
                  <Section>
                    <VisuallyHidden>
                      <Link href='/'>
                        <Heading as='h2'>Map</Heading>
                      </Link>
                    </VisuallyHidden>
                    <Link href='/'>
                      <InsetImage
                        src={wedgehistmap}
                        alt='Wedge Historic District Map'
                      />
                    </Link>
                  </Section>
                </Grid>
              </header>
            </Container>
            <Nav />
            <Container asChild>
              <motion.main
                variants={mainVariants}
                initial='hidden'
                animate='show'
              >
                {children}
              </motion.main>
            </Container>
            <Container asChild>
              <footer>
                <Grid
                  columns={{ initial: '1', sm: '2fr 1fr' }}
                  gap={{ initial: '0', sm: '6' }}
                >
                  <Section>
                    <Heading as='h4' size='4'>
                      <CharacterFade>Related Links</CharacterFade>
                    </Heading>
                    <ul>
                      <li>
                        <ExternalLink href='https://www.nps.gov/nr/feature/places/16000856.htm'>
                          National Register of Historic Places Program - NPS
                        </ExternalLink>
                      </li>
                      <li>
                        <ExternalLink href='https://tacoma.gov/government/departments/planning-and-development-services/historic-preservation/tacomas-historic-districts-landmarks/#wedge-neighborhood-historic-district'>
                          Tacoma&apos;s Historic Districts - City of Tacoma
                        </ExternalLink>
                      </li>
                    </ul>
                  </Section>

                  <Section>
                    <Heading as='h4' size='4'>
                      <CharacterFade>Social</CharacterFade>
                    </Heading>
                    <Flex align='center' gap='4' py='3'>
                      <IconButton asChild variant='ghost'>
                        <ExternalLink href='https://www.instagram.com/tacomawedge/'>
                          {instagram}
                        </ExternalLink>
                      </IconButton>
                      <Separator orientation='vertical' size='2' />
                      <IconButton asChild variant='ghost'>
                        <ExternalLink href='https://www.facebook.com/tacomawedge/'>
                          {facebook}
                        </ExternalLink>
                      </IconButton>
                    </Flex>
                  </Section>
                </Grid>
              </footer>
            </Container>
            <Analytics />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
