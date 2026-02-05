import { expect, test } from '@playwright/test';

test.describe('Login', () => {
	test('should display login page', async ({ page }) => {
		await page.goto('/login');

		await expect(page.getByRole('heading', { name: '로그인', level: 1 })).toBeVisible();
		await expect(page.getByLabel('이메일')).toBeVisible();
		await expect(page.getByLabel('비밀번호')).toBeVisible();
		await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
	});

	test('should disable login button when fields are empty', async ({ page }) => {
		await page.goto('/login');

		await expect(page.getByRole('button', { name: '로그인' })).toBeDisabled();
	});

	test('should enable login button when fields are filled', async ({ page }) => {
		await page.goto('/login');

		await page.getByLabel('이메일').fill('test@test.com');
		await page.getByLabel('비밀번호').fill('password');

		await expect(page.getByRole('button', { name: '로그인' })).toBeEnabled();
	});

	test('should show error for invalid email format', async ({ page }) => {
		await page.goto('/login');

		await page.getByLabel('이메일').fill('invalid-email');
		await page.getByLabel('비밀번호').fill('password');
		await page.getByRole('button', { name: '로그인' }).click();

		await expect(page.getByText('올바른 이메일 형식이 아닙니다.')).toBeVisible();
	});

	test('should show error for invalid credentials', async ({ page }) => {
		await page.goto('/login');

		await page.getByLabel('이메일').fill('wrong@test.com');
		await page.getByLabel('비밀번호').fill('wrongpassword');
		await page.getByRole('button', { name: '로그인' }).click();

		await expect(page.getByText('이메일 또는 비밀번호가 올바르지 않습니다.')).toBeVisible();
	});

	test('should redirect to dashboard on successful login', async ({ page }) => {
		await page.goto('/login');

		await page.getByLabel('이메일').fill('admin@matpan.com');
		await page.getByLabel('비밀번호').fill('admin123');
		await page.getByRole('button', { name: '로그인' }).click();

		await expect(page).toHaveURL('/');
		await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
	});

	test('should display user name in header after login', async ({ page }) => {
		await page.goto('/login');

		await page.getByLabel('이메일').fill('admin@matpan.com');
		await page.getByLabel('비밀번호').fill('admin123');
		await page.getByRole('button', { name: '로그인' }).click();

		await expect(page).toHaveURL('/');
		await expect(page.getByText('관리자')).toBeVisible();
		await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
	});
});
