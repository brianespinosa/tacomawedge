import { Metadata } from 'next';

import CharacterFade from '@/components/CharacterFade';
import ExternalLink from '@/components/ExternalLink';
import { facebook, instagram } from '@/components/icons';
import InsetImage from '@/components/InsetImage';
import Section from '@/components/Section';
import blockParty from '@/img/2025_block_party.png';
import wedgehistmap from '@/img/wedgehistmap.jpg';
import {
  Flex,
  Heading,
  IconButton,
  Separator,
  VisuallyHidden,
} from '@radix-ui/themes';

const DETAILS = {
  title: 'Tacoma Wedge Historic District',
  description: 'Information About Tacoma’s Wedge Historic District',
};

export const metadata: Metadata = {
  ...DETAILS,
  openGraph: {
    ...DETAILS,
    images: '/wedgehistmap.jpg',
  },
};

export default function Home() {
  return (
    <>
      <Section>
        <VisuallyHidden>
          <Heading as='h2'>Map</Heading>
        </VisuallyHidden>
        <InsetImage src={wedgehistmap} alt='Wedge Historic District Map' />
      </Section>
      <Section>
        <VisuallyHidden>
          <Heading as='h2'>August 23, 2025 - Tacoma Wedge Block Party</Heading>
        </VisuallyHidden>
        <InsetImage
          src={blockParty}
          alt='Join us for the annual Wedge Block Party. Fun and games for all! When: Saturday, August 23, 2025, 3:30PM - 7:00PM. Where: South Sheridan between 5th and 6th.'
        />
      </Section>

      <Section>
        <Heading as='h2'>
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
        <Heading as='h2'>
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
    </>
  );
}
