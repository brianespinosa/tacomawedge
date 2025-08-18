import { Metadata } from 'next';
import NextLink from 'next/link';

import Section from '@/components/Section';
import { Button, Heading } from '@radix-ui/themes';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <Section>
      <Heading as='h2'>Not Found</Heading>
      <p>This is not the page you&apos;re looking for...</p>
      <Button asChild>
        <NextLink href='/'>Go back home</NextLink>
      </Button>
    </Section>
  );
}
