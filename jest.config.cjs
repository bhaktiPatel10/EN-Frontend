module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)?$": "babel-jest"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // Ensure this is correctly set
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
