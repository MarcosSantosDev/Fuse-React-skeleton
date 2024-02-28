module.exports = {
	"root": true,
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"tsconfigRootDir": __dirname,
		"project": ["./tsconfig.json"],
		"sourceType": "module"
	},
	"plugins": [
		"unused-imports",
		"simple-import-sort",
		"@typescript-eslint",
		"prettier",
	],
	"extends": [
		"airbnb",
		"plugin:react-hooks/recommended",
		"plugin:@tanstack/eslint-plugin-query/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:prettier/recommended"
	],
	"settings": {
		"react": {
			// Tells eslint-plugin-react to automatically detect the version of React to use.
			"version": 'detect',
		},
		// Tells eslint how to resolve imports
		'import/resolver': {
			"node": {
				"paths": ['src'],
				"extensions": ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	"ignorePatterns": ["tailwind.config.js"],
	"rules": {
		"prettier/prettier": "warn",
		// Disabling because this rule is extremely slow.
		"import/no-cycle": "off",
		// Disabling because this rule is slow and not a common violation.
		"import/no-named-as-default": "off",
		// Disabling because this rule is slow and not a common violation.
		"import/no-named-as-default-member": "off",
		// This rule is already covered by the TypeScript compiler.
		"import/default": "off",
		// This rule is already covered by the TypeScript compiler.
		"import/no-unresolved": "off",
		"import/first": "error",
		"import/newline-after-import": "error",
		"import/no-duplicates": "error",
		"operator-linebreak": "off",
		"no-param-reassign": "off",
		"implicit-arrow-linebreak": "off",
		"max-len": "off",
		"indent": "off",
		"no-shadow": "off",
		"arrow-parens": "off",
		"no-confusing-arrow": "off",
		"no-use-before-define": "off",
		"object-curly-newline": "off",
		"function-paren-newline": "off",
		"import/prefer-default-export": "off",
		"max-classes-per-file": "off",
		"react/jsx-filename-extension": "off",
		"import/extensions": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
		"unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{ "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
		],
		"@typescript-eslint/ban-ts-ignore": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/no-useless-constructor": "error",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-floating-promises": "off",
		"@typescript-eslint/no-misused-promises": "off",
		"@typescript-eslint/require-await": "off",
		"no-useless-constructor": "off",
		"no-tabs": "off",
		"react/jsx-indent": "off",
		"react/jsx-indent-props": "off",
		"react/react-in-jsx-scope": "off",
		"react/jsx-uses-react": "off",
		"react/jsx-wrap-multilines": "off",
		"react/prop-types": "warn",
		"react/require-default-props": "off",
		"react/no-unescaped-entities": "off",
		"no-underscore-dangle": "off",
		"react/jsx-no-bind": "off",
		"react/jsx-props-no-spreading": "off",
		"react/no-array-index-key": "off",
		"no-restricted-exports": ["off", { "restrictedNamedExports": ["default"] }],
		"import/no-import-module-exports": "off",
		"import/no-extraneous-dependencies": "off",
	},
	"overrides": [
		// override "simple-import-sort" config
		{
			"files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
			"rules": {
				"simple-import-sort/imports": [
					"error",
					{
						"groups": [
							// Packages `react` related packages come first.
							["^react", "^node:?\\w", "^@?\\w"],
							// App alias
							["^@root/@fuse?\\w", "^@root/@history?\\w"],
							["^@root/store?\\w"],
							[
								"^@root/app/configs?\\w",
								"^@root/app/configs/routes?\\w",
								"^@root/app/contexts?\\w",
								"^@root/app/components?\\w",
								"^@root/app/features?\\w",
								"^@root/app/HOC?\\w",
								"^@root/app/libs?\\w",
								"^@root/app/pages?\\w",
								"^@root/app/utils?\\w"
							],
							// Anything not matched in another group.
							["^"],
							// Parent imports. Put `..` last.
							["^\\.\\.(?!/?$)", "^\\.\\./?$"],
							// Other relative imports. Put same-folder imports and `.` last.
							["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
							// Side effect imports.
							["^\\u0000"],
							// TypeScript import assignments.
							["^\\u0001", "^\\u0002"],
							// Style imports.
							["^.+\\.?(css)$"]
						]
					}
				],
			}
		}
	],
}
