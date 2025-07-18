import { Metadata } from 'next';

import InsetImage from '@/components/InsetImage';
import Section from '@/components/Section';
import blockParty from '@/img/2025_block_party.png';
import { Heading, VisuallyHidden } from '@radix-ui/themes';

const EVENT = {
  title: '2025 Wedge Block Party',
  description:
    'Join us for the annual Wedge Block Party. Fun and games for all! When: Saturday, August 23, 2025, 3:30PM - 7:00PM. Where: South Sheridan between 5th and 6th.',
};

export const metadata: Metadata = {
  ...EVENT,
  openGraph: {
    ...EVENT,
    images: '/2025_block_party.png',
  },
  other: {
    ['twitter:label1']: 'Date',
    ['twitter:data1']: 'August 23, 2025',
    ['twitter:label2']: 'Time',
    ['twitter:data2']: '3:30 PM - 7:00 PM',
  },
};

export default function Home() {
  return (
    <>
      <Section>
        <VisuallyHidden>
          <Heading as='h2'>August 23, 2025 - Tacoma Wedge Block Party</Heading>
        </VisuallyHidden>
        <InsetImage src={blockParty} alt={EVENT.description} />
      </Section>
    </>
  );
}
