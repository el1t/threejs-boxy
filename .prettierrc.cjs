module.exports = {
	arrowParens: 'avoid',
	bracketSameLine: true,
	parser: 'typescript',
	printWidth: 80,
	singleQuote: true,
	semi: false,
	trailingComma: 'all',
	useTabs: true,
	overrides: [
		{
			files: '*.json',
			options: {
				parser: 'json',
			},
		},
		{
			files: 'package.json',
			options: {
				printWidth: 0,
				useTabs: false,
			},
		},
	],
}
