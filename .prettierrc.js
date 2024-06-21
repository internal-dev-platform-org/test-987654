module.exports = {
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: "all",
    bracketSpacing: false,
    jsxSingleQuote: false,
    arrowParens: "avoid",
    parser: "typescript",
    overrides: [
        {
          files: "*.css",
          options: {
            parser: "css",
          }
        },
    ]
};
