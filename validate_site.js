const http = require('http');
const fs = require('fs');
const path = require('path');

const pages = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/projects.html',
  '/equipment.html',
  '/methodology.html',
  '/deliverables.html',
  '/contact.html'
];

async function checkUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url: urlPath, status: res.statusCode, length: data.length });
      });
    }).on('error', (err) => {
      resolve({ url: urlPath, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  console.log('--- VALIDATING ALL PAGES ---');
  let hasError = false;
  for (const page of pages) {
    const res = await checkUrl(page);
    console.log(`[HTTP ${res.status}] ${res.url} (${res.length} bytes)`);
    if (res.status !== 200) hasError = true;
  }

  // Scan all HTML files for referenced assets
  console.log('\n--- VALIDATING ASSET REFERENCES IN HTML FILES ---');
  const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
  const assetRegex = /(?:src|href)=["']([^"']+\.(?:css|js|jpg|png|svg|ico))["']/gi;
  const foundAssets = new Set();

  for (const file of htmlFiles) {
    const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    let match;
    while ((match = assetRegex.exec(content)) !== null) {
      const assetUrl = match[1];
      if (!assetUrl.startsWith('http')) {
        foundAssets.add(assetUrl);
      }
    }
  }

  for (const asset of foundAssets) {
    const cleanAsset = asset.startsWith('/') ? asset : '/' + asset;
    const res = await checkUrl(cleanAsset);
    console.log(`[HTTP ${res.status}] Asset: ${cleanAsset} (${res.length} bytes)`);
    if (res.status !== 200) hasError = true;
  }

  if (hasError) {
    console.error('\nFAIL: Some resources failed validation!');
    process.exit(1);
  } else {
    console.log('\nSUCCESS: All pages and assets verified with HTTP 200!');
  }
}

run();
