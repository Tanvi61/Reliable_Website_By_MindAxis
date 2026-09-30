const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Use regex or splitting to extract sections
const extractSection = (className, endStr = '</section>') => {
  const startIdx = html.indexOf('<section class="' + className);
  if (startIdx === -1) return '';
  const endIdx = html.indexOf(endStr, startIdx) + endStr.length;
  const sectionStr = html.substring(startIdx, endIdx);
  // find preceding comments
  let preIdx = html.lastIndexOf('<!-- =', startIdx);
  if (preIdx !== -1 && startIdx - preIdx < 200) {
    return html.substring(preIdx, endIdx);
  }
  return sectionStr;
};

// Extract sections
const hero = extractSection('hero-editorial');
const about = extractSection('about-section');
const stats = extractSection('stats-section');
const tech = extractSection('tech-orbit-section');
const services = extractSection('services-section');
const projects = extractSection('projects-section');

// Get Header (everything before hero)
const headerEnd = html.indexOf('<!-- =', html.indexOf('<section class="hero-editorial')) !== -1 
  ? html.indexOf('<!-- =', html.indexOf('<section class="hero-editorial') - 200) 
  : html.indexOf('<section class="hero-editorial');
// Let's just find the start of hero properly:
const heroStartRaw = html.indexOf('<section class="hero-editorial');
const heroCommentStart = html.lastIndexOf('<!-- =', heroStartRaw);
const finalHeaderEnd = (heroCommentStart !== -1 && heroStartRaw - heroCommentStart < 200) ? heroCommentStart : heroStartRaw;
const header = html.substring(0, finalHeaderEnd);

// Get Footer (everything after projects)
const projEndRaw = html.indexOf('</section>', html.indexOf('<section class="projects-section')) + 10;
// find next <!-- == which indicates footer
const footerStart = html.indexOf('<!-- ==', projEndRaw);
const footer = html.substring(footerStart !== -1 ? footerStart : projEndRaw);

// Create Client Reviews section
const clientReviews = `
  <!-- =========================================================================
       CLIENT REVIEWS SECTION
       ========================================================================= -->
  <section class="reviews-section" id="reviews" style="padding: 6rem 0; background: #ffffff;">
    <div class="container">
      <div class="section-header text-center">
        <span class="section-tag">TESTIMONIALS</span>
        <h2 class="section-title">What Our Clients Say</h2>
        <p class="section-desc mx-auto">Trusted by top infrastructure developers and government authorities.</p>
      </div>
      <div class="reviews-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
        
        <div class="review-card" style="padding: 2.5rem; background: var(--bg-light); border-radius: var(--radius-lg); border: 1px solid var(--border-light); transition: transform 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <div style="color: #f59e0b; font-size: 1.25rem; margin-bottom: 1rem;">★★★★★</div>
          <p style="font-size: 1.05rem; color: var(--text-dark-secondary); margin-bottom: 1.5rem; font-style: italic; line-height: 1.6;">"Reliable Land Survey provided exceptionally precise LiDAR data for our highway expansion project. Their team's professionalism and technical expertise are unmatched."</p>
          <div style="font-weight: 700; color: var(--text-dark); font-size: 1.1rem;">Project Director</div>
          <div style="font-size: 0.9rem; color: var(--primary-blue); font-weight: 600;">National Highways Authority</div>
        </div>

        <div class="review-card" style="padding: 2.5rem; background: var(--bg-light); border-radius: var(--radius-lg); border: 1px solid var(--border-light); transition: transform 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <div style="color: #f59e0b; font-size: 1.25rem; margin-bottom: 1rem;">★★★★★</div>
          <p style="font-size: 1.05rem; color: var(--text-dark-secondary); margin-bottom: 1.5rem; font-style: italic; line-height: 1.6;">"The drone photogrammetry and topographical maps delivered for our metro rail corridor were highly detailed and delivered well ahead of schedule."</p>
          <div style="font-weight: 700; color: var(--text-dark); font-size: 1.1rem;">Chief Engineer</div>
          <div style="font-size: 0.9rem; color: var(--primary-blue); font-weight: 600;">Metro Rail Corporation</div>
        </div>

        <div class="review-card" style="padding: 2.5rem; background: var(--bg-light); border-radius: var(--radius-lg); border: 1px solid var(--border-light); transition: transform 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <div style="color: #f59e0b; font-size: 1.25rem; margin-bottom: 1rem;">★★★★★</div>
          <p style="font-size: 1.05rem; color: var(--text-dark-secondary); margin-bottom: 1.5rem; font-style: italic; line-height: 1.6;">"Their field personnel and operational capacity allowed us to cover massive industrial layouts in record time. Truly a reliable partner for geospatial solutions."</p>
          <div style="font-weight: 700; color: var(--text-dark); font-size: 1.1rem;">Infrastructure Head</div>
          <div style="font-size: 0.9rem; color: var(--primary-blue); font-weight: 600;">Private Real Estate Developer</div>
        </div>

      </div>
    </div>
  </section>
`;

// New Order:
// Header -> Hero -> About -> Services -> Engineering Toolkit -> Client Reviews -> Stats(Fleet) -> Projects -> Footer
const newHtml = header + 
                hero + '\n\n' + 
                about + '\n\n' + 
                services + '\n\n' + 
                tech + '\n\n' + 
                clientReviews + '\n\n' + 
                stats + '\n\n' + 
                projects + '\n\n' + 
                footer;

fs.writeFileSync('index.html', newHtml);
console.log('Reordered successfully!');
