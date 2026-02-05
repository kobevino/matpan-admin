import { expect, test } from '@playwright/test';

test.describe('Logout', () => {
	test.beforeEach(async ({ page }) => {
		// Login first
		await page.goto('/login');
		await page.getByLabel('이메일').fill('admin@matpan.com');
		await page.getByLabel('비밀번호').fill('admin123');
		await page.getByRole('button', { name: '로그인' }).click();
		await expect(page).toHaveURL('/');
	});

	test('should display logout button when logged in', async ({ page }) => {
		await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
	});

	test('should clear user info when logout button clicked', async ({ page }) => {
		await page.getByRole('button', { name: '로그아웃' }).click();

		await expect(page.getByRole('button', { name: '로그아웃' })).not.toBeVisible();
		await expect(page.getByText('관리자')).not.toBeVisible();
	});

	test('should hide logout button on login page', async ({ page }) => {
		await page.goto('/login');

		await expect(page.getByRole('button', { name: '로그아웃' })).not.toBeVisible();
	});
});
