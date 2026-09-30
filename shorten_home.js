const fs = require('fs');
const file = 'e:/MindAxis/Reliable_Website/index.html';
let html = fs.readFileSync(file, 'utf8');

// We want to delete:
// 1. From "<!-- =========================================================================\n       INFRASTRUCTURE PROJECTS INTERACTIVE TABS" 
//    to "<!-- =========================================================================\n       EQUIPMENT & MANPOWER STATISTICS COUNTERS SECTION (ACCURATE & VERIFIED)"
// 2. From "<!-- =========================================================================\n       METHODOLOGY & QA/QC SECTION"
//    to "<!-- =========================================================================\n       PROJECT EXPERIENCE SECTION (FACTUAL & TENDER COMPLIANT)"
// 3. From "<!-- =========================================================================\n       FAQ SECTION (ACCORDION)"
//    to "<!-- =========================================================================\n       CONTACT & ENQUIRY SECTION (WITH VALIDATION & LOCAL STORAGE)"

const d1Start = html.indexOf('  <!-- =========================================================================\r\n       INFRASTRUCTURE PROJECTS INTERACTIVE TABS');
if (d1Start === -1) console.log('d1Start not found (CRLF). Trying LF.');
const d1StartLF = html.indexOf('  <!-- =========================================================================\n       INFRASTRUCTURE PROJECTS INTERACTIVE TABS');
const p1Start = d1Start !== -1 ? d1Start : d1StartLF;

const d1End = html.indexOf('  <!-- =========================================================================\r\n       EQUIPMENT & MANPOWER STATISTICS COUNTERS SECTION (ACCURATE & VERIFIED)');
const d1EndLF = html.indexOf('  <!-- =========================================================================\n       EQUIPMENT & MANPOWER STATISTICS COUNTERS SECTION (ACCURATE & VERIFIED)');
const p1End = d1End !== -1 ? d1End : d1EndLF;


const d2Start = html.indexOf('  <!-- =========================================================================\r\n       METHODOLOGY & QA/QC SECTION');
const d2StartLF = html.indexOf('  <!-- =========================================================================\n       METHODOLOGY & QA/QC SECTION');
const p2Start = d2Start !== -1 ? d2Start : d2StartLF;

const d2End = html.indexOf('  <!-- =========================================================================\r\n       PROJECT EXPERIENCE SECTION (FACTUAL & TENDER COMPLIANT)');
const d2EndLF = html.indexOf('  <!-- =========================================================================\n       PROJECT EXPERIENCE SECTION (FACTUAL & TENDER COMPLIANT)');
const p2End = d2End !== -1 ? d2End : d2EndLF;


const d3Start = html.indexOf('  <!-- =========================================================================\r\n       FAQ SECTION (ACCORDION)');
const d3StartLF = html.indexOf('  <!-- =========================================================================\n       FAQ SECTION (ACCORDION)');
const p3Start = d3Start !== -1 ? d3Start : d3StartLF;

const d3End = html.indexOf('  <!-- =========================================================================\r\n       CONTACT & ENQUIRY SECTION (WITH VALIDATION & LOCAL STORAGE)');
const d3EndLF = html.indexOf('  <!-- =========================================================================\n       CONTACT & ENQUIRY SECTION (WITH VALIDATION & LOCAL STORAGE)');
const p3End = d3End !== -1 ? d3End : d3EndLF;

if (p1Start !== -1 && p1End !== -1 && p2Start !== -1 && p2End !== -1 && p3Start !== -1 && p3End !== -1) {
  const part1 = html.substring(0, p1Start);
  const part2 = html.substring(p1End, p2Start);
  const part3 = html.substring(p2End, p3Start);
  const part4 = html.substring(p3End);
  
  html = part1 + part2 + part3 + part4;
  fs.writeFileSync(file, html);
  console.log('Homepage successfully shortened!');
} else {
  console.log('Could not find all markers.');
  console.log('p1', p1Start, p1End);
  console.log('p2', p2Start, p2End);
  console.log('p3', p3Start, p3End);
}
