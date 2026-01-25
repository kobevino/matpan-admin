import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to Users page when clicking Users link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Users' }).click();

    await expect(page).toHaveURL('/users');
    await expect(page.getByRole('heading', { name: 'Users', level: 1 })).toBeVisible();
  });

  test('should navigate back to Dashboard when clicking Dashboard link', async ({ page }) => {
    await page.goto('/users');
    await page.getByRole('link', { name: 'Dashboard' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
  });

  test('should highlight active navigation item', async ({ page }) => {
    await page.goto('/');

    const dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    await expect(dashboardLink).toHaveClass(/bg-gray-700/);

    await page.getByRole('link', { name: 'Users' }).click();
    await expect(page).toHaveURL('/users');

    const usersLink = page.getByRole('link', { name: 'Users' });
    await expect(usersLink).toHaveClass(/bg-gray-700/);
  });

  test('should display sidebar on all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation')).toBeVisible();

    await page.goto('/users');
    await expect(page.getByRole('navigation')).toBeVisible();
  });
});
