/* eslint-disable sort-keys-fix/sort-keys-fix */

const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'simple-import-sort', 'sort-keys-fix'],
	rules: {
		'react-refresh/only-export-components': [
			WARN,
			{ allowConstantExport: true },
		],
		'prettier/prettier': ERROR,
		'react/jsx-sort-props': ERROR,
		'react/react-in-jsx-scope': OFF,
		'react/jsx-uses-react': OFF,
	},
}
