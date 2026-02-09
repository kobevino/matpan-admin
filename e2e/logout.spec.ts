import { expect, test } from '@playwright/test';

test.describe('Logout', () => {
	test.beforeEach(async ({ page }) => {
		// API 모킹 설정
		await page.route('**/admins/login', async (route) => {
			const request = route.request();
			const body = request.postDataJSON();

			if (body.admin_id === 'testadmin' && body.password === 'testpass') {
				await route.fulfill({
					status: 200,
					contentType: 'application/json',
					body: JSON.stringify({ accessToken: 'mock-token' }),
				});
			} else {
				await route.fulfill({
					status: 401,
					contentType: 'application/json',
					body: JSON.stringify({ message: 'Invalid credentials' }),
				});
			}
		});

		// Login first
		await page.goto('/login');
		await page.getByLabel('아이디').fill('testadmin');
		await page.getByLabel('비밀번호').fill('testpass');
		await page.getByRole('button', { name: '로그인' }).click();
		await expect(page).toHaveURL('/');
	});

	test('should display logout button when logged in', async ({ page }) => {
		await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
	});

	test('should clear user info when logout button clicked', async ({ page }) => {
		await page.getByRole('button', { name: '로그아웃' }).click();

		await expect(page.getByRole('button', { name: '로그아웃' })).not.toBeVisible();
		await expect(page.getByText('testadmin')).not.toBeVisible();
	});

	test('should hide logout button on login page', async ({ page }) => {
		await page.goto('/login');

		await expect(page.getByRole('button', { name: '로그아웃' })).not.toBeVisible();
	});
});
