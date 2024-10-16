module.exports = {
  preset: 'ts-jest', // Enable Jest to work with TypeScript
  testEnvironment: 'jsdom', // Simulate a browser environment
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Use babel-jest for TypeScript and JSX transformation
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Recognize these file extensions
  transformIgnorePatterns: ['<rootDir>/node_modules/'], // Avoid transforming node_modules
  setupFiles: ['jest-canvas-mock'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    '^react$': require.resolve('react'),
    '^react-dom$': require.resolve('react-dom'),
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.min.js',

  },
};