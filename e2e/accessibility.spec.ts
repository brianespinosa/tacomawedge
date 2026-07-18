import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { waitForContentToSettle } from './settled';

const expectNoViolations = async (
  page: Parameters<typeof waitForContentToSettle>[0],
) => {
  await waitForContentToSettle(page);

  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => n.html),
    })),
  ).toEqual([]);
};

test.describe('resources page accessibility', () => {
  test('passes axe accessibility scan', async ({ page }) => {
    await page.goto('/resources');
    await expectNoViolations(page);
  });
});

test.describe('404 page accessibility', () => {
  test('passes axe accessibility scan', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expectNoViolations(page);
  });
});
