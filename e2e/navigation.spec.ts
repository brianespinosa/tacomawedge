import { expect, test } from '@playwright/test';

test.describe('navigation', () => {
  test('Resources link navigates to the resources page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Resources' }).click();
    await expect(page).toHaveURL('/resources');
    await expect(
      page.getByRole('heading', { name: 'Wedge Resources' }),
    ).toBeVisible();
  });

  test('site heading link navigates back to home', async ({ page }) => {
    await page.goto('/resources');
    await page
      .getByRole('heading', { name: 'Tacoma Wedge Historic District' })
      .getByRole('link')
      .click();
    await expect(page).toHaveURL('/');
  });
});
