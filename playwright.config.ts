import { devices, type PlaywrightTestConfig } from '@playwright/test'

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
	// Timeout per test
	timeout: 30 * 1000,
	// Test directory
	testDir: 'src',
	// Test file pattern to match
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	// If a test fails, retry it additional 2 times
	retries: 2,
	// Artifacts folder where screenshots, videos, and traces are stored.
	outputDir: 'test-results/',
	// Run your local dev server before starting the tests:
	// https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
	webServer: {
		command: 'npm run dev',
		url: baseURL,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
	},
	use: {
		// Use baseURL so to make navigations relative.
		// More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
		baseURL,
		// Retry a test if its failing with enabled tracing. This allows you to analyze the DOM, console logs, network traffic etc.
		// More information: https://playwright.dev/docs/trace-viewer
		trace: 'retry-with-trace',
	},
	projects: [
		{
			name: 'Desktop Chrome',
			use: {
				...devices['Desktop Chrome'],
			},
		},
		{
			name: 'Mobile Chrome',
			use: {
				...devices['Pixel 5'],
			},
		},
		{
			name: 'Mobile Safari',
			use: devices['iPhone 12'],
		},
	],
}

export default config
