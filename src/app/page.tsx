import { Metadata } from 'next';
import Image from 'next/image';

import ExternalLink from '@/components/ExternalLink';
import { facebook, instagram } from '@/components/icons';
import wedgehistmap from '@/img/wedgehistmap.jpg';
import {
  Card,
  Flex,
  Heading,
  IconButton,
  Inset,
  Section,
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
      <Section asChild>
        <Card>
          <VisuallyHidden>
            <Heading as='h2'>Map</Heading>
          </VisuallyHidden>
          <Inset clip='padding-box'>
            <Image
              src={wedgehistmap}
              alt='Wedge Historic District Map'
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
        </Card>
      </Section>
      {/* <Section py='3'>
        <Heading as='h2'>Upcoming Events</Heading>

        <figure>
          <Image
            src={blockParty}
            alt='2024 Tacoma Wedge Block Party'
            placeholder='blur'
          />
          <figcaption>August 24, 2024 - Tacoma Wedge Block Party</figcaption>
        </figure>
      </Section> */}

      <Section asChild>
        <Card my='6'>
          <Heading as='h2'>Related Links</Heading>
          <ul>
            <li>
              <ExternalLink href='https://www.nps.gov/nr/feature/places/16000856.htm'>
                National Register of Historic Places Program - NPS
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href='https://www.cityoftacoma.org/government/city_departments/planning_and_development_services/historic_preservation/tacomas_historic_districts'>
                Tacoma&apos;s Historic Districts - City of Tacoma
              </ExternalLink>
            </li>
          </ul>
        </Card>
      </Section>

      <Section asChild>
        <Card my='6'>
          <Heading as='h2'>Social</Heading>
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
        </Card>
      </Section>

      {/* <Section py='3'>
          <Heading as='h2'>Documents</Heading>
          <ul>
            // Looks like this link is dead on the NPS web site. Will have to contact them to get it restored.
            <ExternalLink href='http://www.nps.gov/nr/feature/places/pdfs/16000856>
              Historic District Register Inventory - NPS
            </ExternalLink>
          </ul>
        </Section> */}
    </>
  );
}
