module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true,
		'jquery': true,
		'amd': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab',
			{"SwitchCase": 1}
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'no-unused-vars': [
			'error',
			{
				'vars': 'local',
				'args' : 'none'
			}
		]
	}
};
