const { exec } = require('child_process');
const puppeteer = require('puppeteer');

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

const checkErrors = async (mode) => {
  console.log(`Checking for errors in ${mode} mode...`);

  const command = mode === 'development' ? 'npm run dev' : 'npm run build && npm start';
  const serverProcess = exec(command);

  // Wait for the server to start
  await new Promise(resolve => setTimeout(resolve, 5000));

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Collect console logs
  const consoleLogs = [];
  page.on('console', (msg) => consoleLogs.push(`${msg.type()}: ${msg.text()}`));

  // Collect network errors
  const networkErrors = [];
  page.on('requestfailed', (request) => {
    networkErrors.push(`${request.url()} failed: ${request.failure().errorText}`);
  });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    // Check for visible error messages
    const errorMessages = await page.evaluate(() => {
      const errorElements = document.querySelectorAll('.error-message, [class*="error"]');
      return Array.from(errorElements).map(el => el.textContent);
    });

    console.log('Console logs:', consoleLogs);
    console.log('Network errors:', networkErrors);
    console.log('Visible error messages:', errorMessages);

    // Add more checks here as needed

  } catch (error) {
    console.error('Error during check:', error);
  } finally {
    await browser.close();
    serverProcess.kill();
  }
};

(async () => {
  await checkErrors('development');
  await checkErrors('production');
})();

