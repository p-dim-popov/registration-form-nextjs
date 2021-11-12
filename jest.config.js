module.exports = {
    preset: "ts-jest/presets/js-with-ts",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.ts",
        "^@src/(.*)$": "<rootDir>/src/$1",
    },
    coveragePathIgnorePatterns: ["/node_modules/"],
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.jest.json",
            diagnostics: false,
        },
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    testMatch: ["**/*.(test|spec).(js|jsx|ts|tsx)"],
    testEnvironment: "jsdom",
};
