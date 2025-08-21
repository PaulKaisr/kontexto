console.log("Testing basic Node.js and file system access...");

// Test if we can access the frontend directory
const fs = require('fs');
const path = require('path');

const frontendPath = path.join(__dirname, 'code', 'frontend');
try {
  const files = fs.readdirSync(frontendPath);
  console.log("Frontend directory contents:");
  console.log(files.slice(0, 10).join(', '));
} catch (err) {
  console.error("Error reading frontend directory:", err.message);
}

// Test if package.json exists
try {
  const packageJson = fs.readFileSync(path.join(frontendPath, 'package.json'), 'utf8');
  const pkg = JSON.parse(packageJson);
  console.log(`Package name: ${pkg.name}`);
  console.log(`Test script: ${pkg.scripts?.test || 'Not found'}`);
} catch (err) {
  console.error("Error reading package.json:", err.message);
}

console.log("Basic setup test completed.");