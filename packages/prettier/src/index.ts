export interface PrettierConfig {
    printWidth: number; 
    singleQuote: boolean; 
    tabWidth: number; 
    bracketSpacing: boolean; 
    parser: string;
    jsxBracketSameLine?: boolean;
}

const BasePrettierConfig : PrettierConfig = {
    printWidth: 80,
    singleQuote: true,
    tabWidth: 4,
    bracketSpacing: false,
    jsxBracketSameLine: true,
    parser: 'typescript'
}

export default BasePrettierConfig;
