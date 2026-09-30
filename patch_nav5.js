const fs = require('fs');
const path = require('path');
const BASE = 'e:/MindAxis/Reliable_Website';

// Updated nav definitions for each page (5 links: Home, About, Services, Projects, Contact)
const makeNav = (activePage) => {
  const links = [
    { href: 'index.html',    label: 'Home',     key: 'home' },
    { href: 'about.html',    label: 'About',    key: 'about' },
    { href: 'services.html', label: 'Services', key: 'services' },
    { href: 'projects.html', label: 'Projects', key: 'projects' },
    { href: 'contact.html',  label: 'Contact',  key: 'contact' },
  ];
  const linkHtml = links.map(l => {
    const active = l.key === activePage ? ' active' : '';
    // Add small badge on Services
    const badge = l.key === 'services'
      ? ' <span class="nav-badge">9</span>'
      : '';
    return `        <a href="${l.href}" class="nav-link${active}">${l.label}${badge}</a>`;
  }).join('\n');

  return `
      <nav class="nav-menu" id="primary-navigation" aria-label="Main Navigation">
${linkHtml}
        <a href="contact.html" class="btn btn-accent mobile-cta-btn">Request a Survey</a>
      </nav>
`;
};

const pages = {
  'index.html':        makeNav('home'),
  'about.html':        makeNav('about'),
  'services.html':     makeNav('services'),
  'projects.html':     makeNav('projects'),
  'equipment.html':    makeNav(null),
  'methodology.html':  makeNav(null),
  'deliverables.html': makeNav(null),
  'contact.html':      makeNav('contact'),
};

const NAV_REGEX = /(\s*<nav class="nav-menu"[^>]*>)[\s\S]*?(<\/nav>)/;

Object.entries(pages).forEach(([filename, navHtml]) => {
  const f = path.join(BASE, filename);
  let html = fs.readFileSync(f, 'utf8');
  html = html.replace(NAV_REGEX, () => navHtml.trimEnd() + '\n');
  fs.writeFileSync(f, html);
  console.log('Updated:', filename);
});

console.log('\nAll navbars updated with Projects link!');
