'use client';

import { load, trackPageview } from 'fathom-client';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const FATHOM_ID = 'IJDOGFUG';
const INCLUDED_DOMAINS = ['tacomawedge.org'];
const TRACKING_URL = 'https://who.tacomawedge.org/script.js';

function TrackPageView() {
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  // Load the Fathom script on mount
  useEffect(() => {
    load(FATHOM_ID, {
      url: TRACKING_URL,
      includedDomains: INCLUDED_DOMAINS,
      auto: false,
    });
  }, []);

  // Record a pageview when route changes
  useEffect(() => {
    if (!pathname) return;

    trackPageview({
      url: pathname + searchParameters!.toString(),
      referrer: document.referrer,
    });
  }, [pathname, searchParameters]);

  // eslint-disable-next-line unicorn/no-null
  return null;
}

export default function Fathom() {
  return (
    // eslint-disable-next-line unicorn/no-null
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
