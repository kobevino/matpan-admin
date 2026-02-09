import { expect, test } from '@playwright/test';

test.describe('Login', () => {
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
	});

	test('should display login page', async ({ page }) => {
		await page.goto('/login');

		await expect(page.getByRole('heading', { name: '로그인', level: 1 })).toBeVisible();
		await expect(page.getByLabel('아이디')).toBeVisible();
		await expect(page.getByLabel('비밀번호')).toBeVisible();
		await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
	});

	test('should disable login button when fields are empty', async ({ page }) => {
		await page.goto('/login');

		await expect(page.getByRole('button', { name: '로그인' })).toBeDisabled();
	});

	test('should enable login button when fields are filled', async ({ page }) => {
		await page.goto('/login');

		await page.getByLabel('아이디').fill('testadmin');
		await page.getByLabel('비밀번호').fill('password');

		await expect(page.getByRole('button', { name: '로그인' })).toBeEnabled();
	});

	test('should show error for invalid credentials', async ({ page }) => {
		await page.goto('/login');

		await page.getByLabel('아이디').fill('wrongadmin');
		await page.getByLabel('비밀번호').fill('wrongpassword');
		await page.getByRole('button', { name: '로그인' }).click();

		await expect(page.getByText('아이디 또는 비밀번호가 올바르지 않습니다.')).toBeVisible();
	});

	test('should redirect to dashboard on successful login', async ({ page }) => {
		await page.goto('/login');

		await page.getByLabel('아이디').fill('testadmin');
		await page.getByLabel('비밀번호').fill('testpass');
		await page.getByRole('button', { name: '로그인' }).click();

		await expect(page).toHaveURL('/');
		await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
	});

	test('should display admin id in header after login', async ({ page }) => {
		await page.goto('/login');

		await page.getByLabel('아이디').fill('testadmin');
		await page.getByLabel('비밀번호').fill('testpass');
		await page.getByRole('button', { name: '로그인' }).click();

		await expect(page).toHaveURL('/');
		await expect(page.getByText('testadmin')).toBeVisible();
		await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
	});
});
