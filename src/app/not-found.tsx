import { Metadata } from 'next';
import NextLink from 'next/link';

import { Button, Card, Heading, Section } from '@radix-ui/themes';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <Section asChild>
      <Card>
        <Heading as='h2'>Not Found</Heading>
        <p>This is not the page you&apos;re looking for...</p>
        <Button asChild>
          <NextLink href='/'>Go back home</NextLink>
        </Button>
      </Card>
    </Section>
  );
}
