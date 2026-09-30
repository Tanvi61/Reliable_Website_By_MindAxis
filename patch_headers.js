const fs = require('fs');
const path = require('path');

const pages = ['about', 'services', 'projects', 'equipment', 'methodology', 'deliverables', 'contact'];

pages.forEach(p => {
  const f = path.join('e:/MindAxis/Reliable_Website', p + '.html');
  let c = fs.readFileSync(f, 'utf8');
  if (c.includes('class="site-header"')) {
    c = c.replace('class="site-header"', 'class="site-header header-light"');
    fs.writeFileSync(f, c);
    console.log('Updated:', p + '.html');
  } else {
    console.log('Already done or skip:', p + '.html');
  }
});
