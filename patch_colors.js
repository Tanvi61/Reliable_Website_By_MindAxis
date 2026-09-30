const fs = require('fs');
const file = 'e:/MindAxis/Reliable_Website/css/style.css';
let css = fs.readFileSync(file, 'utf8');

// Replace all remaining old orange/old-cyan literal values
// (The CSS vars themselves already updated; these are hardcoded color refs)

// Old orange literals -> sky-accent blue
css = css.replace(/#f97316/g, '#0ea5e9');
css = css.replace(/#ea580c/g, '#0284c7');
css = css.replace(/#fb923c/g, '#38bdf8');
css = css.replace(/rgba\(249, 115, 22, 0\.([0-9]+)\)/g, 'rgba(14, 165, 233, 0.$1)');
css = css.replace(/rgba\(234, 88, 12, 0\.([0-9]+)\)/g, 'rgba(14, 165, 233, 0.$1)');

// Old cyan #00e5ff -> sky accent #0ea5e9
css = css.replace(/#00e5ff/g, '#0ea5e9');
css = css.replace(/rgba\(0, 229, 255, 0\.([0-9]+)\)/g, 'rgba(14, 165, 233, 0.$1)');
css = css.replace(/rgba\(56, 189, 248, 0\.([0-9]+)\)/g, 'rgba(59, 130, 246, 0.$1)');

// Old primary blue #0284c7, #0369a1 -> royal blue #1d4ed8, #1e40af
// (Only replace inline values, not those already inside var() or just done above)
css = css.replace(/rgba\(2, 132, 199, 0\.([0-9]+)\)/g, 'rgba(29, 78, 216, 0.$1)');
css = css.replace(/rgba\(3, 105, 161, 0\.([0-9]+)\)/g, 'rgba(30, 64, 175, 0.$1)');

// survey-orange alias references (already vars, but some stray text references)
// manpower fill gradient: keep it blue->sky
css = css.replace(
  'background: linear-gradient(90deg, var(--primary-blue), var(--cyan-accent));',
  'background: linear-gradient(90deg, var(--primary-blue), var(--sky-accent));'
);

// timeline line gradient: was blue->orange -> now blue->sky
css = css.replace(
  'background: linear-gradient(to bottom, var(--primary-blue), var(--survey-orange));',
  'background: linear-gradient(to bottom, var(--primary-blue), var(--sky-accent));'
);

// fleet-payload orange color
css = css.replace('color: var(--survey-orange);', 'color: var(--sky-accent);');

// qa-principles-title
css = css.replace('color: var(--cyan-accent);\n  margin-bottom: 1.5rem;', 'color: var(--sky-accent);\n  margin-bottom: 1.5rem;');

// service-tag old cyan
css = css.replace("color: var(--cyan-accent);\n  background: rgba(0, 229, 255, 0.06);\n  border: 1px solid rgba(0, 229, 255, 0.18);", 
  "color: var(--sky-accent);\n  background: rgba(14, 165, 233, 0.06);\n  border: 1px solid rgba(14, 165, 233, 0.18);");

// btn-service-explore color
css = css.replace("color: var(--cyan-accent);\n  transition: gap", "color: var(--sky-accent);\n  transition: gap");

// tab-btn active shadow
css = css.replace('box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);', 'box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);');

// why-num faded blue
css = css.replace('color: rgba(56, 189, 248, 0.15);', 'color: rgba(59, 130, 246, 0.15);');

// deliverable-icon-box bg
css = css.replace('background: rgba(2, 132, 199, 0.08);', 'background: rgba(29, 78, 216, 0.08);');

// instruments-table header
css = css.replace("background: rgba(2, 132, 199, 0.12);\n  color: var(--cyan-accent);", 
  "background: rgba(14, 165, 233, 0.1);\n  color: var(--sky-accent);");

// manpower-summary
css = css.replace(
  "color: var(--cyan-accent);\n  background: rgba(0, 229, 255, 0.08);",
  "color: var(--sky-accent);\n  background: rgba(14, 165, 233, 0.08);"
);

// fleet-badge color
css = css.replace('color: var(--cyan-accent);\n  border: 1px solid var(--border-cyan);', 'color: var(--sky-accent);\n  border: 1px solid var(--border-cyan);');

// stat-box highlight
css = css.replace('color: var(--cyan-accent);\n}', 'color: var(--sky-accent);\n}');

// footer section - will be handled generically through var replacements
// working pill uses tech-green, that's fine
// #07121e old dark -> new dark bg
css = css.replace(/#07121e/g, '#060f1d');
css = css.replace(/#070d14/g, '#0a1628');
css = css.replace(/#0c1523/g, '#0f2044');
css = css.replace(/#111e32/g, '#162b56');
css = css.replace(/#14233a/g, '#1a3365');

fs.writeFileSync(file, css);
console.log('CSS bulk color replacement done!');
