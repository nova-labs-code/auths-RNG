import js from '@eslint/js';
import globals from 'globals';

export default [
	js.configs.recommended,
	{
		files: ['assets/scripts/**/*.js', 'engine/**/*.js', 'service-worker.js'],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'script',
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'no-undef': 'warn',
			'no-unused-vars': 'warn',
			'no-console': 'off',
		},
	},
];
