import js from '@eslint/js';
import globals from 'globals';

export default [
	js.configs.recommended,

	{
		files: [
			'assets/scripts/**/*.js',
			'engine/**/*.js',
			'service-worker.js',
		],
		ignores: ['engine/epic/epic.js'],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'script',
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'no-console': 'off',
			'no-empty': ['error', { allowEmptyCatch: true }],
			'no-useless-escape': 'error',
			'no-useless-assignment': 'error',
		},
	},

	{
		files: ['engine/epic/epic.js'],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'no-console': 'off',
			'no-empty': ['error', { allowEmptyCatch: true }],
		},
	},

	{
		files: ['functions/**/*.js'],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			globals: {
				...globals.browser,
				URL: 'readonly',
				Response: 'readonly',
				Request: 'readonly',
				fetch: 'readonly',
			},
		},
		rules: {
			'no-undef': 'error',
			'no-unused-vars': 'warn',
			'no-console': 'off',
			'no-empty': ['error', { allowEmptyCatch: true }],
		},
	},

	{
		files: ['lighthouserc.js', '*.config.js', '*.config.mjs'],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'commonjs',
			globals: {
				...globals.node,
			},
		},
		rules: {
			'no-undef': 'error',
		},
	},
];
