import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>This is not the page you&apos;re looking for...</p>
      <p>
        Go back <Link href='/'>home</Link>.
      </p>
    </div>
  );
}
