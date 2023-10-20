import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('/')
})

test('should navigate to the about page', async ({ page }) => {
	// Find an element with the text 'About Page' and click on it
	await page.getByText('About Page').click()
	// The new url should be "/about" (baseURL is used there)
	await expect(page).toHaveURL('/about')
	// The new page should contain an h1 with "About Page"
	await expect(page.getByRole('heading', { level: 1 })).toContainText(
		'About Page'
	)
})
