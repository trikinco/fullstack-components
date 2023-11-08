/** @type {import("prettier").Config} */
const config = {
	trailingComma: 'es5',
	tabWidth: 2,
	semi: false,
	singleQuote: true,
	printWidth: 80,
	useTabs: true,
	bracketSpacing: true,
	overrides: [
		{
			files: '*.mdx',
			options: {
				printWidth: 66,
				useTabs: false,
			},
		},
	],
}

module.exports = config
