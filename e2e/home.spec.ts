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
