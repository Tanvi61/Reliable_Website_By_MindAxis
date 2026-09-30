const fs = require('fs');
const file = 'e:/MindAxis/Reliable_Website/css/style.css';
let css = fs.readFileSync(file, 'utf8');

const OLD_NAV = `/* --- HEADER & NAVIGATION --- */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  z-index: 1000;
  transition: background var(--transition-normal), box-shadow var(--transition-normal);
  /* Default: fully opaque white on light pages, transparent on dark hero */
  background: rgba(10, 22, 40, 0.85);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(147, 197, 253, 0.12);
}

.site-header.scrolled {
  background: rgba(10, 22, 40, 0.97);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(29, 78, 216, 0.25);
  box-shadow: 0 4px 24px rgba(10, 22, 40, 0.45);
}

/* White navbar variant for inner (light) pages */
.site-header.header-light {
  background: #ffffff;
  border-bottom: 1px solid #dbeafe;
  box-shadow: 0 2px 12px rgba(15, 50, 120, 0.07);
}

.site-header.header-light.scrolled {
  background: #ffffff;
  border-bottom: 2px solid var(--primary-blue);
  box-shadow: 0 4px 20px rgba(15, 50, 120, 0.12);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-link .logo-img {
  height: 44px;
  width: auto;
  transition: transform var(--transition-fast);
}

.brand-link:hover .logo-img {
  transform: scale(1.03);
}

/* ---- Nav Menu ---- */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.25rem;  /* tighter — let padding do the work */
}

.nav-link {
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 500;
  color: rgba(219, 234, 254, 0.85);
  padding: 0.45rem 0.7rem;
  border-radius: var(--radius-sm);
  position: relative;
  transition: color var(--transition-fast), background var(--transition-fast);
}

.site-header.header-light .nav-link {
  color: #334155;
}

.nav-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.site-header.header-light .nav-link:hover {
  color: var(--primary-blue);
  background: rgba(29, 78, 216, 0.06);
}

.nav-link.active {
  color: #ffffff;
  background: rgba(29, 78, 216, 0.22);
}

.site-header.header-light .nav-link.active {
  color: var(--primary-blue);
  background: rgba(29, 78, 216, 0.08);
}

/* Blue underline indicator */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0.7rem;
  right: 0.7rem;
  height: 2px;
  background: var(--sky-accent);
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform var(--transition-fast);
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

/* ---- Header Actions ---- */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

/* Header CTA is same .btn sizing — no override needed */
.header-cta {
  /* inherit .btn + .btn-accent sizing exactly */
}

/* Mobile CTA inside nav drawer */
.mobile-cta-btn {
  display: none;
}

/* Mobile Hamburger Toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  padding: 7px;
  background: rgba(147, 197, 253, 0.1);
  border: 1.5px solid rgba(147, 197, 253, 0.25);
  border-radius: var(--radius-sm);
  color: #ffffff;
  cursor: pointer;
}

.site-header.header-light .mobile-toggle {
  background: rgba(29, 78, 216, 0.08);
  border-color: #bfdbfe;
  color: var(--primary-blue);
}

.mobile-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: all var(--transition-fast);
}

.mobile-toggle.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.mobile-toggle.active span:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.mobile-toggle.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}`;

const NEW_NAV = `/* --- HEADER & NAVIGATION --- */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  z-index: 1000;
  transition: background var(--transition-normal), box-shadow var(--transition-normal), height var(--transition-normal);
  background: rgba(8, 18, 38, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.14);
}

/* Animated gradient accent stripe at top */
.site-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1d4ed8 0%, #0ea5e9 35%, #3b82f6 65%, #1d4ed8 100%);
  background-size: 200% 100%;
  animation: navStripe 5s linear infinite;
  z-index: 1;
}

@keyframes navStripe {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}

.site-header.scrolled {
  background: rgba(6, 14, 32, 0.98);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border-bottom: 1px solid rgba(29, 78, 216, 0.3);
  box-shadow: 0 4px 30px rgba(5, 12, 30, 0.65);
  height: 64px;
}

/* ---- White navbar for inner (light-bg) pages ---- */
.site-header.header-light {
  background: #ffffff;
  border-bottom: 1px solid #dbeafe;
  box-shadow: 0 2px 16px rgba(15, 50, 120, 0.08);
}

.site-header.header-light.scrolled {
  background: #ffffff;
  border-bottom: 1px solid #bfdbfe;
  box-shadow: 0 4px 24px rgba(15, 50, 120, 0.11);
  height: 64px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

/* ---- Brand / Logo ---- */
.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-link .logo-img {
  height: 42px;
  width: auto;
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.brand-link:hover .logo-img {
  transform: scale(1.04);
  opacity: 0.9;
}

/* ---- Nav pill container ---- */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(147, 197, 253, 0.12);
  border-radius: 10px;
  padding: 0.3rem;
  backdrop-filter: blur(6px);
}

.site-header.header-light .nav-menu {
  background: rgba(29, 78, 216, 0.04);
  border-color: #e0eaff;
}

/* Divider between links and mobile CTA */
.nav-menu .mobile-cta-btn {
  margin-left: 0.25rem;
}

/* ---- Nav links ---- */
.nav-link {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(219, 234, 254, 0.75);
  padding: 0.42rem 0.92rem;
  border-radius: 7px;
  position: relative;
  transition: color var(--transition-fast), background var(--transition-fast), box-shadow var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  letter-spacing: 0.012em;
  white-space: nowrap;
}

.site-header.header-light .nav-link {
  color: #4b5563;
}

/* Hover */
.nav-link:hover {
  color: #e0f2fe;
  background: rgba(59, 130, 246, 0.14);
}

.site-header.header-light .nav-link:hover {
  color: var(--primary-blue);
  background: rgba(29, 78, 216, 0.07);
}

/* Active — solid blue pill */
.nav-link.active {
  color: #ffffff;
  background: var(--primary-blue);
  font-weight: 600;
  box-shadow: 0 2px 14px rgba(29, 78, 216, 0.45), inset 0 1px 0 rgba(255,255,255,0.18);
}

.site-header.header-light .nav-link.active {
  color: #ffffff;
  background: var(--primary-blue);
  box-shadow: 0 2px 12px rgba(29, 78, 216, 0.3);
}

/* Underline slide-in (non-active only) */
.nav-link:not(.active)::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0.9rem;
  right: 0.9rem;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-blue), var(--sky-accent));
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:not(.active):hover::after {
  transform: scaleX(1);
}

/* ---- Services badge (count pill) ---- */
.nav-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  font-size: 0.6rem;
  font-weight: 700;
  font-family: var(--font-mono);
  background: var(--sky-accent);
  color: #ffffff;
  border-radius: 9999px;
  line-height: 1;
  flex-shrink: 0;
  transition: transform var(--transition-fast), background var(--transition-fast);
  letter-spacing: 0;
}

.nav-link:hover .nav-badge { transform: scale(1.2); background: var(--primary-blue); }
.nav-link.active .nav-badge { background: rgba(255,255,255,0.28); transform: scale(1.12); }

/* ---- Header Actions ---- */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

/* CTA shimmer sweep */
.header-cta {
  position: relative;
  overflow: hidden;
}

.header-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: -110%;
  width: 55%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: skewX(-20deg);
  transition: left 0.55s ease;
}

.header-cta:hover::before { left: 160%; }

/* Mobile CTA inside nav drawer */
.mobile-cta-btn {
  display: none;
}

/* ---- Mobile Hamburger Toggle ---- */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  padding: 7px;
  background: rgba(147, 197, 253, 0.1);
  border: 1.5px solid rgba(147, 197, 253, 0.25);
  border-radius: var(--radius-sm);
  color: #ffffff;
  cursor: pointer;
  transition: background var(--transition-fast), border-color var(--transition-fast);
}

.mobile-toggle:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.site-header.header-light .mobile-toggle {
  background: rgba(29, 78, 216, 0.07);
  border-color: #bfdbfe;
  color: var(--primary-blue);
}

.site-header.header-light .mobile-toggle:hover {
  background: rgba(29, 78, 216, 0.14);
  border-color: var(--primary-blue);
}

.mobile-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: all var(--transition-fast);
}

.mobile-toggle.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.mobile-toggle.active span:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.mobile-toggle.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}`;

if (!css.includes(OLD_NAV)) {
  // Try to find key anchor and replace by line range
  const lines = css.split('\n');
  const startIdx = lines.findIndex(l => l.includes('/* --- HEADER & NAVIGATION --- */'));
  const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('/* --- HERO SECTION --- */'));
  if (startIdx > -1 && endIdx > -1) {
    const before = lines.slice(0, startIdx).join('\n');
    const after = lines.slice(endIdx).join('\n');
    css = before + '\n' + NEW_NAV + '\n\n' + after;
    fs.writeFileSync(file, css);
    console.log('Navbar CSS replaced via line-range method');
  } else {
    console.error('Could not find anchor points');
    process.exit(1);
  }
} else {
  css = css.replace(OLD_NAV, NEW_NAV);
  fs.writeFileSync(file, css);
  console.log('Navbar CSS replaced via string match');
}
