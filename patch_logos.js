const fs = require('fs');
const path = require('path');

const pages = ['about', 'services', 'projects', 'equipment', 'methodology', 'deliverables', 'contact'];

pages.forEach(p => {
  const f = path.join('e:/MindAxis/Reliable_Website', p + '.html');
  let c = fs.readFileSync(f, 'utf8');
  // Swap logo-light.svg -> logo-dark.svg on inner pages
  if (c.includes('logo-light.svg')) {
    c = c.replace(/logo-light\.svg/g, 'logo-dark.svg');
    fs.writeFileSync(f, c);
    console.log('Logo swapped:', p + '.html');
  } else {
    console.log('No logo-light found:', p + '.html');
  }
});
