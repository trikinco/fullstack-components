module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		sourceType: 'module',
		ecmaVersion: 'ES2022',
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'unicorn',
		'eslint-comments',
		'sonarjs',
		'promise',
		'jest',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:unicorn/recommended',
		'plugin:unicorn/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:sonarjs/recommended',
		'prettier',
		'plugin:promise/recommended',
		'plugin:jest/recommended',
	],
	root: true,
	env: {
		es6: true,
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.cjs', 'dist', 'client.d.ts', 'utils.d.ts'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
			},
		],
		'jest/expect-expect': [
			'error',
			{
				assertFunctionNames: [
					'expect',
					'request.**.expect',
					'AuthenticatedRequests.getRequestAuthenticated',
				],
			},
		],
		'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
		'unicorn/prefer-ternary': 'off',
		'unicorn/prefer-node-protocol': 'off',
		'unicorn/filename-case': 'off',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'default',
				format: ['camelCase'],
			},
			{
				selector: 'memberLike',
				modifiers: ['private'],
				format: ['camelCase'],
				leadingUnderscore: 'forbid',
			},
			{
				selector: 'variable',
				format: ['PascalCase', 'UPPER_CASE'],
				types: ['boolean'],
				prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
			},
			{
				selector: 'variableLike',
				format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
			},

			{
				selector: 'parameter',
				format: ['camelCase'],
			},

			{
				selector: 'typeLike',
				format: ['PascalCase'],
			},
			{
				selector: 'property',
				modifiers: ['readonly'],
				format: ['camelCase'],
			},
			{
				selector: 'enumMember',
				format: ['UPPER_CASE'],
			},
		],
		'unicorn/prevent-abbreviations': [
			'error',
			{
				checkFilenames: false,
				allowList: {
					Props: true,
					props: true,
					src: true,
				},
				replacements: {
					e: {},
					e2e: {
						checkFilenames: false,
					},
					res: false,
					req: false,
					ctx: false,
					cmd: {
						command: true,
					},
					errCb: {
						handleError: true,
					},
					// from auth0 inspiration
					assertReqRes: false,
					reqOrOptions: false,
					resOrCtx: false,
					PageRouteHandlerFn: false,
					AppRouteHandlerFn: false,
					resOrOpts: false,
					opts: false,
				},
			},
		],
	},
}
