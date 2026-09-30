const fs = require('fs');
const path = require('path');

const BASE = 'e:/MindAxis/Reliable_Website';

// "Explore More" col HTML
const EXPLORE_COL = `
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

const innerPages = ['about', 'services', 'contact', 'projects', 'equipment', 'methodology', 'deliverables'];

innerPages.forEach(p => {
  const f = path.join(BASE, p + '.html');
  let html = fs.readFileSync(f, 'utf8');

  // 1. Remove moved links from Navigation column
  html = html.replace(/<li><a href="projects\.html" class="footer-nav-link">Infrastructure Projects<\/a><\/li>\s*/g, '');
  html = html.replace(/<li><a href="equipment\.html" class="footer-nav-link">Technology &amp; Equipment<\/a><\/li>\s*/g, '');
  html = html.replace(/<li><a href="methodology\.html" class="footer-nav-link">Methodology &amp; QA\/QC<\/a><\/li>\s*/g, '');
  html = html.replace(/<li><a href="deliverables\.html" class="footer-nav-link">Deliverables<\/a><\/li>\s*/g, '');

  // 2. Inject Explore More col after Navigation col closing div
  if (!html.includes('Explore More')) {
    html = html.replace(
      /(<\/ul>\s*<\/div>\s*)([\s\S]*?<!-- Col 3)/,
      (match, p1, p2) => p1 + EXPLORE_COL + '\n        ' + p2.replace(/^\s*/, '')
    );
  }

  fs.writeFileSync(f, html);
  console.log('Footer updated:', p + '.html');
});

console.log('\nAll footers updated!');
