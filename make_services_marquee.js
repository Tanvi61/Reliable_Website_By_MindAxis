const fs = require('fs');
const file = 'e:/MindAxis/Reliable_Website/index.html';
let html = fs.readFileSync(file, 'utf8');

// Find the <div class="services-grid"> block
const startMatch = '<div class="services-grid">';
const startIndex = html.indexOf(startMatch);

if (startIndex === -1) {
    console.log("Could not find .services-grid");
    process.exit(1);
}

// Find where it ends
let currentIndex = startIndex;
let divCount = 0;
let endIndex = -1;
while(currentIndex < html.length) {
    if (html.substring(currentIndex, currentIndex + 4) === '<div') {
        divCount++;
    } else if (html.substring(currentIndex, currentIndex + 5) === '</div') {
        divCount--;
        if (divCount === 0) {
            endIndex = currentIndex + 6;
            break;
        }
    }
    currentIndex++;
}

if (endIndex === -1) {
    console.log("Could not find end of .services-grid");
    process.exit(1);
}

// Extract the content INSIDE the <div class="services-grid">
const innerHtmlMatch = html.substring(startIndex + startMatch.length, endIndex - 6);

// Build the new marquee HTML
const newHtmlBlock = `
      <div class="services-marquee-container">
        <div class="services-marquee-track">
          <!-- Original set -->
          ${innerHtmlMatch}
          <!-- Duplicate set for seamless scrolling -->
          ${innerHtmlMatch}
        </div>
      </div>
`;

const beforeHtml = html.substring(0, startIndex);
const afterHtml = html.substring(endIndex);

fs.writeFileSync(file, beforeHtml + newHtmlBlock.trim() + afterHtml);
console.log("index.html updated successfully with services marquee.");
