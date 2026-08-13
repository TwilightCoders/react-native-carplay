// Simple test runner that uses the parent project's Jest setup
const { execSync } = require('child_process');
const path = require('path');

// Run tests using the parent project's Jest configuration
const parentProjectPath = path.resolve(__dirname, '../../../..');
const testCommand = `cd "${parentProjectPath}" && npm test -- --testPathPattern="vendor/react-native-carplay/packages/react-native-carplay/__tests__"`;

try {
  execSync(testCommand, { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}