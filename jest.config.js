module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageReporters: ['html', 'text', 'text-summary', 'lcov'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.(j|t)s?(x)', '**/?(*.)+(spec|test).(j|t)s?(x)'],
    testPathIgnorePatterns: ['(.*)/dist', '(.*)/webpack'],
    transform: {
        '.(ts|tsx)$': require.resolve('ts-jest'),
    },
};
