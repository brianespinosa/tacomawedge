import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('resources page accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resources');
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
