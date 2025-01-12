const { execSync } = require('child_process');

// Configuration
const REPO_URL = 'https://github.com/rossboag/Vision-Studio.git';

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return false;
  }
}

console.log('Starting GitHub push process...');

// Initialize Git repository (if not already initialized)
if (!runCommand('git init')) {
  console.log('Git repository already initialized or error occurred.');
}

// Add all files to Git
if (!runCommand('git add .')) {
  console.error('Failed to add files to Git. Exiting.');
  process.exit(1);
}

// Commit changes
if (!runCommand('git commit -m "Push VisionStudio project to GitHub"')) {
  console.error('Failed to commit changes. Exiting.');
  process.exit(1);
}

// Add remote repository
if (!runCommand(`git remote add origin ${REPO_URL}`)) {
  console.log('Remote origin already exists or error occurred. Trying to set the URL...');
  if (!runCommand(`git remote set-url origin ${REPO_URL}`)) {
    console.error('Failed to set remote URL. Exiting.');
    process.exit(1);
  }
}

// Push to GitHub
if (!runCommand('git push -u origin main')) {
  console.error('Failed to push to GitHub. Please check your credentials and try again.');
  process.exit(1);
}

console.log('Successfully pushed VisionStudio project to GitHub!');

