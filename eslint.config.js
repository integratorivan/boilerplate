import reatom from '@reatom/eslint-plugin';
import deMorgan from 'eslint-plugin-de-morgan';
import tanstackRouter from '@tanstack/eslint-plugin-router';
import airbnd from 'eslint-config-airbnb-typescript';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';

const eslintConfig = [
    ...tanstackRouter.configs['flat/recommended'],
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': tseslint,
            'unused-imports': unusedImports,
            'simple-import-sort': simpleImportSort,
            'typescript-sort-keys': typescriptSortKeys,
            'sort-keys-fix': sortKeysFixPlugin,
            '@reatom': reatom,
            'de-morgan': deMorgan,
            airbnd,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: '**/tsconfig.json',
            },
        },
        rules: {
            ...reatom.configs.recommended.rules,
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    endOfLine: 'auto',
                },
            ],
            '@typescript-eslint/no-use-before-define': 'off',
            'react/button-has-type': 'off',
            'jsx-a11y/control-has-associated-label': 'off',
            'jsx-a11y/no-static-element-interactions': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',
            'typescript-sort-keys/interface': [
                'error',
                'asc',
                { caseSensitive: true, natural: true, requiredFirst: true },
            ],
            'typescript-sort-keys/string-enum': [
                'error',
                'asc',
                { caseSensitive: true, natural: true },
            ],
            'import/extensions': 'off',
            'max-classes-per-file': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/function-component-definition': 'off',
            'react/destructuring-assignment': 'off',
            'react/require-default-props': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            'react/jsx-props-no-spreading': 'off',
            '@typescript-eslint/comma-dangle': 'off',
            '@typescript-eslint/consistent-type-imports': 'error',
            'no-restricted-syntax': [
                'error',
                'ForInStatement',
                'LabeledStatement',
                'WithStatement',
            ],
            'import/prefer-default-export': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            'unused-imports/no-unused-imports': 'off',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^react', '^@?\\w'],
                        [
                            '^\\$app+',
                            '^\\$pages+',
                            '^\\$widgets+',
                            '^\\$entities+',
                            '^\\$shared+',
                            '^\\$+',
                        ],
                        [
                            '^\\.\\.(?!/?$)',
                            '^\\.\\./?$',
                            '^\\./(?=.*/)(?!/?$)',
                            '^\\.(?!/?$)',
                            '^\\./?$',
                        ],
                        ['^\\$styles.+\\.(c|le|sa|sc|pc)ss$', '^.+\\.(c|le|sa|sc|pc)ss$'],
                    ],
                },
            ],
        },
    },

    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        },
    },
];

export default eslintConfig;
