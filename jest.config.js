module.exports = {
  rootDir: ".",
  moduleNameMapper: {
    "^~/src/(.*)$": "<rootDir>/src/$1",
    "^~/lib/(.*)$": "<rootDir>/src/lib/$1",
  },
  testEnvironment: "node",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};
