module.exports = {
	ci: {
		collect: {
			url: ['http://localhost:8080'],
			numberOfRuns: 2,
		},
		assert: {
			assertions: {
				'categories:performance': ['warn', { minScore: 0.65 }],
				'categories:accessibility': ['error', { minScore: 0.75 }],
				'categories:best-practices': ['error', { minScore: 0.8 }],
				'errors-in-console': ['error', { maxLength: 0 }],
				'uses-https': 'off',
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
