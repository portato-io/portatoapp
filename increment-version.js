const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'service-worker.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

const versionRegexp = /const CACHE_VERSION = 'v(\d+).(\d+).(\d+)';/;
const match = versionRegexp.exec(fileContent);

if (match) {
  const major = parseInt(match[1], 10);
  const minor = parseInt(match[2], 10);
  const patch = parseInt(match[3], 10) + 1;

  const newVersion = `v${major}.${minor}.${patch}`;
  fileContent = fileContent.replace(
    versionRegexp,
    `const CACHE_VERSION = '${newVersion}';`
  );

  fs.writeFileSync(filePath, fileContent);
  console.log(`CACHE_VERSION incremented to ${newVersion}`);
} else {
  console.error('CACHE_VERSION not found in service-worker.ts.');
  process.exit(1);
}
