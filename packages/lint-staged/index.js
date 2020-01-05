module.exports = {
    "*.{ts, js, tsx}": ["prettier --write", "git add"],
    '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit'
};
