import { test } from '@playwright/test';

test('initialize', async ({ page }) => {
	await page.goto('/');
});
