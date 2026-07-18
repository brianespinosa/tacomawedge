import type { Page } from '@playwright/test';

/**
 * Waits until the entrance animations have finished.
 *
 * Every element in `<main>` starts at `opacity: 0` with a staggered
 * `animation-delay`. Axe skips fully transparent nodes and computes contrast
 * against blended colors on partly-faded ones, so scanning before the page
 * settles is both incomplete and flaky — it silently passes by checking almost
 * nothing. Call this before any `AxeBuilder.analyze()`.
 */
export const waitForContentToSettle = async (page: Page) => {
  await page.waitForFunction(() =>
    [...document.querySelectorAll('main > *')].every(
      (element) => getComputedStyle(element).opacity === '1',
    ),
  );
};
