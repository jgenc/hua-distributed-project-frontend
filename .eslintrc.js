module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"plugins": ["solid"],
	"extends": ["eslint:recommended", "plugin:solid/recommended"],
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"space"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	},
};
