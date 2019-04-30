// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        'indent': ['error', 4],
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'no-debugger': 0,
        'no-sequences': 0,
        'arrow-parens': 0,
        'no-unused-expressions': 0,
        'generator-star-spacing': 0
    }
}
