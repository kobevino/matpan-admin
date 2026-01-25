import { expect, test } from '@playwright/test';

test.describe('App', () => {
  test('should display the sidebar title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Matpan Admin')).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('matpan-admin');
  });

  test('should display Dashboard page by default', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
  });
});
