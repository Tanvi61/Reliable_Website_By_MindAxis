const fs = require('fs');
const path = require('path');

const BASE = 'e:/MindAxis/Reliable_Website';

// New slim navbar (4 links only)
const NAV_INDEX = `
      <nav class="nav-menu" id="primary-navigation" aria-label="Main Navigation">
        <a href="index.html" class="nav-link active">Home</a>
        <a href="about.html" class="nav-link">About</a>
        <a href="services.html" class="nav-link">Services</a>
        <a href="contact.html" class="nav-link">Contact</a>
        <a href="contact.html" class="btn btn-accent mobile-cta-btn">Request a Survey</a>
      </nav>
`;

// Per-page navbars — same 4 links, active class moved
const NAV_ABOUT = NAV_INDEX.replace('href="index.html" class="nav-link active"', 'href="index.html" class="nav-link"')
  .replace('href="about.html" class="nav-link"', 'href="about.html" class="nav-link active"');

const NAV_SERVICES = NAV_INDEX.replace('href="index.html" class="nav-link active"', 'href="index.html" class="nav-link"')
  .replace('href="services.html" class="nav-link"', 'href="services.html" class="nav-link active"');

const NAV_CONTACT = NAV_INDEX.replace('href="index.html" class="nav-link active"', 'href="index.html" class="nav-link"')
  .replace('href="contact.html" class="nav-link">', 'href="contact.html" class="nav-link active">');

// No active link for inner pages (projects/equipment/methodology/deliverables)
const NAV_INNER = NAV_INDEX.replace('href="index.html" class="nav-link active"', 'href="index.html" class="nav-link"');

const pages = {
  'index.html': NAV_INDEX,
  'about.html': NAV_ABOUT,
  'services.html': NAV_SERVICES,
  'contact.html': NAV_CONTACT,
  'projects.html': NAV_INNER,
  'equipment.html': NAV_INNER,
  'methodology.html': NAV_INNER,
  'deliverables.html': NAV_INNER,
};

// Regex to match the entire <nav class="nav-menu"...>...</nav> block
const NAV_REGEX = /(\s*<nav class="nav-menu"[^>]*>)[\s\S]*?(<\/nav>)/;

// Footer "Explore More" column to add (appended after existing Navigation col)
const FOOTER_EXPLORE_COL = `
        <!-- Col: Explore More Pages -->
        <div>
          <h4 class="footer-col-title">Explore More</h4>
          <ul class="footer-nav-list">
            <li><a href="projects.html" class="footer-nav-link">Infrastructure Projects</a></li>
            <li><a href="equipment.html" class="footer-nav-link">Technology &amp; Equipment</a></li>
            <li><a href="methodology.html" class="footer-nav-link">Methodology &amp; QA/QC</a></li>
            <li><a href="deliverables.html" class="footer-nav-link">Survey Deliverables</a></li>
          </ul>
        </div>
`;

// Remove those 4 links from footer Navigation column on every page
function cleanFooterNav(html) {
  html = html.replace(/<li><a href="projects\.html" class="footer-nav-link">Infrastructure Projects<\/a><\/li>\s*/g, '');
  html = html.replace(/<li><a href="equipment\.html" class="footer-nav-link">Technology &amp; Equipment<\/a><\/li>\s*/g, '');
  html = html.replace(/<li><a href="methodology\.html" class="footer-nav-link">Methodology &amp; QA\/QC<\/a><\/li>\s*/g, '');
  html = html.replace(/<li><a href="deliverables\.html" class="footer-nav-link">Deliverables<\/a><\/li>\s*/g, '');
  return html;
}

// Insert "Explore More" col into footer-grid (after the closing </div> of Navigation col, before Core Capabilities col)
function injectExploreCol(html) {
  // Only inject if not already there
  if (html.includes('Explore More')) return html;
  // Insert after "<!-- Col 2: Quick Links -->" block's closing </div>
  // The navigation col ends with </ul>\n        </div>
  return html.replace(
    /(<\/ul>\s*<\/div>\s*)([\s\S]*?<!-- Col 3)/,
    (match, p1, p2) => p1 + FOOTER_EXPLORE_COL + '\n        ' + p2.replace(/^\s*/, '')
  );
}

Object.entries(pages).forEach(([filename, navHtml]) => {
  const f = path.join(BASE, filename);
  let html = fs.readFileSync(f, 'utf8');

  // 1. Replace nav-menu block
  html = html.replace(NAV_REGEX, (match, open, close) => {
    return navHtml.trimEnd() + '\n';
  });

  // 2. Clean footer nav links
  html = cleanFooterNav(html);

  // 3. Inject Explore More col (only on index.html which has the footer)
  if (filename === 'index.html') {
    html = injectExploreCol(html);
  }

  fs.writeFileSync(f, html);
  console.log('Updated navbar:', filename);
});

console.log('\nDone! All navbars slimmed to 4 links.');
