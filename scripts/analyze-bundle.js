const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the build with bundle analyzer
execSync('npm run bundle-analyze', { stdio: 'inherit' });

// Read the generated stats file
const stats = JSON.parse(fs.readFileSync('.next/stats.json', 'utf8'));

// Analyze the bundle size
const totalSize = stats.totalSize;
const chunks = stats.chunks.sort((a, b) => b.size - a.size);

console.log(`Total bundle size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log('\nLargest chunks:');
chunks.slice(0, 5).forEach(chunk => {
  console.log(`${chunk.names.join(', ')}: ${(chunk.size / 1024).toFixed(2)} KB`);
});

// Suggest optimizations
console.log('\nOptimization suggestions:');
chunks.forEach(chunk => {
  if (chunk.size > 100 * 1024) { // If chunk is larger than 100KB
    console.log(`Consider splitting or lazy loading: ${chunk.names.join(', ')}`);
  }
});

// Check for duplicate packages
const packageLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const dependencies = packageLock.dependencies;
const duplicates = {};

Object.keys(dependencies).forEach(dep => {
  if (dependencies[dep].requires) {
    Object.keys(dependencies[dep].requires).forEach(subDep => {
      if (dependencies[subDep] && dependencies[subDep].version !== dependencies[dep].requires[subDep]) {
        if (!duplicates[subDep]) duplicates[subDep] = [];
        duplicates[subDep].push(`${dep} (${dependencies[dep].requires[subDep]})`);
      }
    });
  }
});

if (Object.keys(duplicates).length > 0) {
  console.log('\nPotential duplicate packages:');
  Object.keys(duplicates).forEach(dep => {
    console.log(`${dep}: ${duplicates[dep].join(', ')}`);
  });
}

