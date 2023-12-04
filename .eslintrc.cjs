/* eslint-disable sort-keys-fix/sort-keys-fix */

const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname,
	},
	plugins: ['react-refresh', 'simple-import-sort', 'sort-keys-fix'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'react-refresh/only-export-components': [
			WARN,
			{ allowConstantExport: true },
		],
		'prettier/prettier': ERROR,
		'react/jsx-sort-props': ERROR,
		'react/prop-types': OFF,
		'react/no-unknown-property': [ERROR, { ignore: ['css'] }],
	},
}
