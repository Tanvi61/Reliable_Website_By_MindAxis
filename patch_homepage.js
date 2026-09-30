const fs = require('fs');
const file = 'e:/MindAxis/Reliable_Website/index.html';
let html = fs.readFileSync(file, 'utf8');

// ─── 1. Switch to white navbar ───────────────────────────────────────────────
html = html.replace(
  '<header class="site-header" id="site-header">',
  '<header class="site-header header-light" id="site-header">'
);
html = html.replace(
  'src="assets/images/logo-light.svg" alt="Reliable Land Survey Consultancy Logo" class="logo-img"',
  'src="assets/images/logo-dark.svg" alt="Reliable Land Survey Consultancy Logo" class="logo-img"'
);

// ─── 2. Replace hero section background (dark-navy → rich blue gradient) ─────
// Change hero-section class to also carry a modifier
html = html.replace(
  '<section class="hero-section" id="hero">',
  '<section class="hero-section hero-blue" id="hero">'
);

// ─── 3. Capabilities section – change from dark overlay to white bg ──────────
html = html.replace(
  '<section class="capabilities-section" id="capabilities">',
  '<section class="capabilities-section capabilities-light" id="capabilities">'
);

// ─── 4. Services section – change from dark to white/light bg ────────────────
// Services section currently is dark (bg-surface). Switch to light variant.
html = html.replace(
  '<section class="services-section" id="services">',
  '<section class="services-section services-light" id="services">'
);
// Also fix heading colors to use dark text on light bg
html = html.replace(
  '<span class="section-tag dark">02 | OUR SURVEY SERVICES</span>',
  '<span class="section-tag">02 | OUR SURVEY SERVICES</span>'
);
html = html.replace(
  '<h2 class="section-title light">Comprehensive Surveying &amp; Geospatial Services</h2>',
  '<h2 class="section-title">Comprehensive Surveying &amp; Geospatial Services</h2>'
);
html = html.replace(
  '<p class="section-desc light">',
  '<p class="section-desc">'
);

// ─── 5. Fix footer logo to use light version (footer is dark) ────────────────
// The footer on homepage uses logo-light.svg which is correct for dark footer – keep
// But fix the inline dot color that was old cyan
html = html.replace(
  'style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #00e5ff;"',
  'style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #0ea5e9;"'
);

// ─── 6. Fix modal inline color ref ──────────────────────────────────────────
html = html.replace(/style="color: #00e5ff;"/g, 'style="color: #0ea5e9;"');
html = html.replace(/color: #00e5ff;/g, 'color: #0ea5e9;');

fs.writeFileSync(file, html);
console.log('Homepage HTML updated!');
