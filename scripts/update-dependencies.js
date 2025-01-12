const { execSync } = require('child_process');
const fs = require('fs');

// Function to run shell command and return output
function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return '';
  }
}

// Get outdated packages
console.log('Checking for outdated packages...');
const outdated = runCommand('npm outdated --json');
const outdatedPackages = JSON.parse(outdated || '{}');

// Update packages
if (Object.keys(outdatedPackages).length > 0) {
  console.log('Updating packages...');
  Object.keys(outdatedPackages).forEach(package => {
    const latestVersion = outdatedPackages[package].latest;
    console.log(`Updating ${package} to ${latestVersion}`);
    runCommand(`npm install ${package}@${latestVersion}`);
  });
} else {
  console.log('All packages are up to date.');
}

// Run security audit
console.log('Running security audit...');
const auditResult = runCommand('npm audit --json');
const auditData = JSON.parse(auditResult || '{}');

if (auditData.vulnerabilities && Object.keys(auditData.vulnerabilities).length > 0) {
  console.log('Vulnerabilities found. Attempting to fix...');
  runCommand('npm audit fix');
} else {
  console.log('No vulnerabilities found.');
}

console.log('Dependency update and security check complete.');

