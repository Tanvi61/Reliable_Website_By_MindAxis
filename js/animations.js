/**
 * Reliable Land Survey Consultancy - Animations & Interactive HUD
 * Geospatial Canvas Radar, Topo Contours, Stats Counters, and Scroll Reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initTelemetryHUD();
  initStatsCounters();
  initScrollReveals();
  initHeroParallax();
  });

/**
 * 1. HERO TOPOGRAPHIC / LIDAR CANVAS SIMULATOR
 * Renders animated contour lines, coordinate grid nodes, and a gentle laser scanning beam
 */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-radar-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let mouse = { x: null, y: null, targetX: null, targetY: null };
  let scanProgress = 0;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    if (mouse.x === null) {
      mouse.x = width * 0.7;
      mouse.y = height * 0.45;
      mouse.targetX = mouse.x;
      mouse.targetY = mouse.y;
    }
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    }
  });

  // Topographic Contours math simulator
  const numContours = 7;
  let tick = 0;

  // Fixed benchmark points
  const benchmarks = [
    { xRatio: 0.22, yRatio: 0.35, label: 'BM-01', elev: '562.4m' },
    { xRatio: 0.48, yRatio: 0.65, label: 'CP-04', elev: '568.1m' },
    { xRatio: 0.75, yRatio: 0.25, label: 'DGPS-P1', elev: '571.9m' },
    { xRatio: 0.82, yRatio: 0.78, label: 'RTK-09', elev: '559.2m' },
    { xRatio: 0.35, yRatio: 0.82, label: 'TS-EGL', elev: '564.0m' }
  ];

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse follow
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    tick += 0.008;
    scanProgress = (scanProgress + 0.003) % 1;

    // 1. Draw subtle coordinate grid
    const gridSize = 70;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.035)';
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. Draw animated elevation contour lines
    ctx.lineWidth = 1.2;
    for (let i = 1; i <= numContours; i++) {
      ctx.beginPath();
      const baseRadius = i * 65;
      const alpha = 0.04 + (i % 2 === 0 ? 0.04 : 0.02);
      ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;

      const points = 60;
      for (let p = 0; p <= points; p++) {
        const angle = (p / points) * Math.PI * 2;
        // Harmonic noise simulation
        const noise =
          Math.sin(angle * 3 + tick + i) * 18 +
          Math.cos(angle * 5 - tick * 1.5) * 10 +
          Math.sin(angle * 2 + (mouse.x / width) * 2) * 12;

        const r = baseRadius + noise;
        const px = mouse.x + Math.cos(angle) * r;
        const py = mouse.y + Math.sin(angle) * (r * 0.65); // elliptical terrain slope

        if (p === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 3. Moving LiDAR scanning line
    const scanY = scanProgress * height;
    const scanGradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 10);
    scanGradient.addColorStop(0, 'rgba(0, 229, 255, 0)');
    scanGradient.addColorStop(0.85, 'rgba(0, 229, 255, 0.12)');
    scanGradient.addColorStop(1, 'rgba(0, 229, 255, 0.4)');

    ctx.fillStyle = scanGradient;
    ctx.fillRect(0, scanY - 30, width, 40);

    ctx.strokeStyle = 'rgba(0, 229, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(width, scanY);
    ctx.stroke();

    // 4. Survey Benchmarks & Geodetic control points
    benchmarks.forEach((bm) => {
      const bx = bm.xRatio * width;
      const by = bm.yRatio * height;

      // Pulse circle
      ctx.beginPath();
      ctx.arc(bx, by, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#00e5ff';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(bx, by, 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
      ctx.stroke();

      // Mini crosshair
      ctx.beginPath();
      ctx.moveTo(bx - 6, by);
      ctx.lineTo(bx + 6, by);
      ctx.moveTo(bx, by - 6);
      ctx.lineTo(bx, by + 6);
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.7)';
      ctx.stroke();

      // Datum label text
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(203, 213, 225, 0.65)';
      ctx.fillText(`${bm.label} [${bm.elev}]`, bx + 10, by + 3);
    });

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}

/**
 * 2. REAL-TIME GEODETIC TELEMETRY TICKER
 * Simulates active GNSS / RTK satellite precision coordinates for Pune datum
 */
function initTelemetryHUD() {
  const latEl = document.getElementById('hud-lat');
  const lonEl = document.getElementById('hud-lon');
  const satEl = document.getElementById('hud-sats');

  if (!latEl || !lonEl) return;

  // Pune coordinates base: 18° 31' 13.4" N, 73° 51' 24.1" E
  let baseLatSec = 13.421;
  let baseLonSec = 24.185;

  setInterval(() => {
    // Subtle realistic RTK micro-centimeter fluctuations
    const latJitter = (Math.random() * 0.006 - 0.003).toFixed(3);
    const lonJitter = (Math.random() * 0.006 - 0.003).toFixed(3);
    const curLat = (baseLatSec + parseFloat(latJitter)).toFixed(3);
    const curLon = (baseLonSec + parseFloat(lonJitter)).toFixed(3);

    latEl.textContent = `18°31'${curLat}"N`;
    lonEl.textContent = `73°51'${curLon}"E`;

    if (satEl && Math.random() > 0.8) {
      const sats = Math.floor(Math.random() * 4) + 26; // 26-29 satellites in view
      satEl.textContent = `${sats} SATS (RTK FIXED)`;
    }
  }, 1200);
}

/**
 * 3. INTERSECTIONOBSERVER ANIMATED COUNTERS & MANPOWER BARS
 * Counts strictly accurate verified equipment (22 total / 15 working) and manpower (24 total / 22 working)
 */
function initStatsCounters() {
  const statsSection = document.getElementById('statistics-section');
  if (!statsSection) return;

  const countElements = statsSection.querySelectorAll('[data-counter]');
  const progressBars = statsSection.querySelectorAll('[data-progress]');
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateCounters(countElements);
          animateProgressBars(progressBars);
          observer.unobserve(statsSection);
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(statsSection);
}

function animateCounters(elements) {
  elements.forEach((el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const duration = 1600; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(ease * target);

      el.textContent = currentVal;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

function animateProgressBars(bars) {
  bars.forEach((bar) => {
    const percent = bar.getAttribute('data-progress');
    setTimeout(() => {
      bar.style.width = `${percent}%`;
    }, 200);
  });
}

/**
 * 4. SCROLL REVEALS
 */
function initScrollReveals() {
  // Automatically add reveal class to important elements
  const autoRevealSelectors = [
    '.section-header', 
    '.about-content-col',
    '.about-visual-col',
    '.service-card',
    '.manpower-container',
    '.project-notice-box'
  ];
  
  autoRevealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      // Avoid overriding cards inside the marquee if they cause visual glitches
      if (!el.closest('.services-marquee-track') || el.classList.contains('service-card')) {
        el.classList.add('gsap-reveal');
      }
    });
  });

  const revealElements = document.querySelectorAll('.gsap-reveal, .reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Small delay for smooth effect
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * 5. HERO MOUSE PARALLAX
 */
function initHeroParallax() {
  const heroVisual = document.querySelector('.hero-editorial-visual');
  const parallaxImg = document.querySelector('.parallax-img');
  
  if (!heroVisual || !parallaxImg) return;
  
  heroVisual.addEventListener('mousemove', (e) => {
    // Only apply on desktop
    if (window.innerWidth < 992) return;
    
    const rect = heroVisual.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;
    
    const maxMove = 10;
    
    parallaxImg.style.transform = `translate(${xPct * maxMove * -1}px, ${yPct * maxMove * -1}px) scale(1.02)`;
  });
  
  heroVisual.addEventListener('mouseleave', () => {
    if (window.innerWidth < 992) return;
    parallaxImg.style.transform = `translate(0px, 0px) scale(1)`;
  });
}

