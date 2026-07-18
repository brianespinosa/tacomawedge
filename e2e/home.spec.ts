import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the site heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Tacoma Wedge Historic District',
        level: 1,
      }),
    ).toBeVisible();
  });

  test('renders navigation', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('ships no framework JavaScript', async ({ page }) => {
    // The site is static Astro with no islands, so the only scripts that may
    // load are the ones Vercel injects: analytics, and the preview toolbar
    // (whose `_next` prefix is a legacy name, not a Next.js runtime).
    const ALLOWED = [/\/_vercel\/insights\//, /\/_next-live\//];

    const scripts: string[] = [];
    page.on('request', (request) => {
      if (request.resourceType() === 'script') {
        scripts.push(request.url());
      }
    });

    await page.reload({ waitUntil: 'networkidle' });

    expect(
      scripts.filter((url) => !ALLOWED.some((allowed) => allowed.test(url))),
    ).toEqual([]);
  });

  test('passes axe accessibility scan', async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => n.html),
      })),
    ).toEqual([]);
  });
});
