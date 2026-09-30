/**
 * Reliable Land Survey Consultancy - Main Interactive Scripts
 * Sticky Header, Mobile Navigation, Service Modals, Infrastructure Tabs, FAQ, Leaflet Map
 */

// Service Detailed Data Model for Modals
const SERVICES_DATA = {
  'topographical': {
    title: 'Topographical Survey',
    badge: 'CORE SURVEY WORKFLOW',
    tagline: 'Detailed terrain contours, spot levels, existing ground levels & digital terrain modeling.',
    overview: 'High-precision topographical surveys mapping natural and artificial surface features. We establish geodetic benchmarks, measure spot heights, trace breaklines, and deliver micro-contour terrain models essential for engineering design.',
    applications: [
      'Corridor planning for highways, railways, and metro rail',
      'Industrial infrastructure, factories, and utility alignments',
      'Earthwork volume estimation, cut-and-fill analysis, and grade design',
      'Hydrological catchment mapping and flood risk drainage modeling'
    ],
    instruments: ['Total Station (Leica / Sokkia / Pentax)', 'Digital Auto Levels (Leica / Pentax)', 'DGPS / GNSS RTK Base & Rover'],
    deliverables: ['Topographical Plan (DWG / DXF / PDF)', 'Contour & Spot Level Plan', 'DEM / DTM 3D Surface Model', 'Cross-sections & Longitudinal Profiles']
  },
  'dgps-gnss': {
    title: 'DGPS / GNSS Geodetic Survey',
    badge: 'GEODETIC CONTROL',
    tagline: 'Establishment of primary ground control benchmarks, RTK observations & global coordinate references.',
    overview: 'High-order geodetic control networks using dual-frequency GNSS and RTK rovers. We establish permanent benchmark monuments tied to national reference frames (WGS84 / UTM 43N) ensuring millimeter-level baseline consistency across extensive corridors.',
    applications: [
      'Primary ground control point (GCP) network establishment for corridors',
      'RTK real-time kinematic observations for site staking and grid layout',
      'Inter-monument baseline verification and triangulation networks',
      'Geodetic calibration for aerial drone photogrammetry and LiDAR runs'
    ],
    instruments: ['Leica DGPS / GNSS multi-constellation receivers', 'FOIF GNSS Geodetic receivers', 'Tribrachs & Precision Survey Tripods'],
    deliverables: ['DGPS Control & Coordinate List (E, N, Z)', 'Benchmark Monument Description Sheets', 'Geodetic Baseline Post-Processing Report', 'Transformation Parameter Parameters']
  },
  'total-station': {
    title: 'Total Station Survey',
    badge: 'PRECISION CIVIL ENGINEERING',
    tagline: 'Millimeter-accurate electronic angle and distance measurements for alignments and structures.',
    overview: 'Rigorous Total Station observations utilizing electronic prism and reflectorless EDM technologies. Tailored for intricate structure alignments, bridge piers, track centerlines, right-of-way boundaries, and engineering as-built verifications.',
    applications: [
      'Highway and railway corridor alignment stakeout and center-line support',
      'Metro viaduct pier location, station footprint, and depot layout surveys',
      'As-built surveys for bridges, culverts, retaining walls, and civil structures',
      'Subdivision, cadastral boundary demarcations, and legal land verification'
    ],
    instruments: ['Leica Total Stations (1" and 2" accuracy)', 'PENTAX Total Stations', 'SOKKIA Total Stations'],
    deliverables: ['Detailed CAD Drawings (DWG / DXF)', 'Coordinate Point Tables (Easting, Northing, RL)', 'Structure As-Built Comparative Drawings', 'Alignment Chainage & Offset Reports']
  },
  'rtk-drone': {
    title: 'RTK Drone Survey',
    badge: 'SURVEY-GRADE AERIAL MAPPING',
    tagline: 'High-accuracy corridor mapping using RTK-enabled UAVs for rapid ground data acquisition.',
    overview: 'Survey-grade aerial mapping utilizing enterprise multi-rotor drones equipped with onboard Real-Time Kinematic GNSS receivers. Synchronized with ground base stations to capture centimetre-accurate imagery across vast, rugged, or inaccessible terrain.',
    applications: [
      'National highway, expressway, and bypass corridor aerial surveys',
      'Railway expansion and electrified route reconnaissance',
      'Large-scale land development, industrial parks, and smart township surveys',
      'Rapid progress monitoring and volume tracking of earthwork excavations'
    ],
    instruments: ['DJI Matrice 300 RTK Enterprise Platform', 'High-resolution full-frame photogrammetry camera payloads', 'DGPS Ground Control Targets (GCPs)'],
    deliverables: ['High-Resolution Aerial Orthomosaic (GeoTIFF)', 'Digital Surface Model (DSM) & Digital Terrain Model (DTM)', 'Dense 3D Point Cloud (.LAS / .XYZ)', 'Engineering Contour Overlay Plans']
  },
  'lidar-drone': {
    title: 'LiDAR Drone Survey',
    badge: 'ADVANCED ACTIVE LASER SCANNING',
    tagline: 'High-density 3D laser scanning penetrating dense vegetation for accurate bare-earth models.',
    overview: 'Airborne laser scanning utilizing high-frequency LiDAR pulses and integrated IMU/GNSS navigation. Unlike photogrammetry, LiDAR pulses penetrate dense tree canopy and vegetative cover to reveal the true ground elevation (Bare Earth DTM) with multi-target returns.',
    applications: [
      'Dense forest and hilly terrain surveying for road and rail route selection',
      'Transmission line corridor, sag clearance, and power tower asset mapping',
      'Steep slope stability, rockfall risk mapping, and landslide monitoring',
      'High-density 3D infrastructure asset inventory and digital twin base'
    ],
    instruments: ['DJI Matrice 350 RTK Platform', 'Zenmuse L1 Integrated LiDAR & RGB Sensor', 'Precision IMU and Dual-Antenna GNSS System'],
    deliverables: ['Classified 3D Point Cloud (Ground, Low Veg, High Veg, Structures)', 'Bare-Earth DTM & DSM (1m / 0.5m grid)', 'Corridor Cross-Sections & L-Sections', 'LiDAR Sensor Calibration & Trajectory QC Report']
  },
  'photogrammetry': {
    title: 'Drone Photogrammetry',
    badge: 'HIGH RESOLUTION IMAGING',
    tagline: 'Orthomosaics, 3D textured mesh, and progress documentation from calibrated aerial photos.',
    overview: 'High-overlap aerial photography post-processed using Structure-from-Motion (SfM) algorithms. Generates true-to-scale, geo-referenced orthophotos and 3D textured meshes for design visualization, progress reporting, and asset condition reviews.',
    applications: [
      'Pre-construction baseline aerial documentation',
      'Quarry and open-cast mine volumetric calculation',
      'Infrastructure corridor right-of-way (RoW) encroachment inspection',
      'GIS visual base mapping for regional planning authorities'
    ],
    instruments: ['DJI Enterprise Drone Systems', 'Calibrated Optical Sensors', 'Survey Ground Control Point (GCP) Targets'],
    deliverables: ['Seamless GeoTIFF Orthomosaic', '3D Textured Mesh Models (.OBJ / .FBX)', 'Surface Topographic Contours', 'Digital Orthophoto Base Sheets in CAD']
  },
  'road-highway': {
    title: 'Road & Highway Survey',
    badge: 'TRANSPORTATION INFRASTRUCTURE',
    tagline: 'Corridor surveys, longitudinal profiles, cross-sections & Detailed Project Report (DPR) data.',
    overview: 'End-to-end survey support for expressway, national highway, and rural road projects. From reconnaissance and DPR survey to construction staking, carriageway profiling, culvert and drainage structure inventories, and junction redesign surveys.',
    applications: [
      'National Highway (NHAI) & State Highway widening / alignment studies',
      'Detailed Project Report (DPR) baseline surveys and strip plans',
      'Cross-sections at designated chainage intervals (10m / 20m / 50m)',
      'Culvert, bridge, underpass, and drainage invert level surveys'
    ],
    instruments: ['Total Station Fleet (Leica / Sokkia)', 'DGPS / GNSS RTK Rovers', 'Digital Precision Levels for TBM networks'],
    deliverables: ['Longitudinal Profile (L-Section Drawings)', 'Cross-Section Series with Natural Ground Level (NGL)', 'Road Corridor Strip Plan & Utility Inventory', 'Chainage & Alignment Coordinates Table']
  },
  'rail-metro': {
    title: 'Rail & Metro Rail Survey',
    badge: 'RAPID TRANSIT & RAILWAYS',
    tagline: 'Track alignment, station yards, viaduct piers, depot layouts & track centerline support.',
    overview: 'Specialized survey engineering for Indian Railways, dedicated freight corridors (DFC), and urban Metro Rail transit networks. We maintain strict vertical and horizontal tolerances essential for rolling stock clearances and alignment geometry.',
    applications: [
      'Metro viaduct pier center coordinates and foundation layout',
      'Metro station and train maintenance depot topographical mapping',
      'Railway corridor alignment surveys, track doubling, and yard remodeling',
      'Bridge approaches, level crossings, and overhead electrification (OHE) checks'
    ],
    instruments: ['Leica High-Precision Total Stations', 'Dual-Frequency Leica DGPS', 'Leica & Pentax Digital Auto Levels'],
    deliverables: ['Track Alignment & Center-Line Survey Plans', 'Pier / Viaduct Location Coordinate Schedules', 'Station Yard Topographical CAD Plans', 'As-Built Rail Infrastructure Reports']
  },
  'cad-gis': {
    title: 'CAD / GIS & Mapping',
    badge: 'DIGITAL CARTOGRAPHY',
    tagline: 'Engineering-ready drawings, coordinate databases, shapefiles & digital geospatial outputs.',
    overview: 'Transforming raw electronic survey data into polished, CAD-standard engineering drawings and GIS datasets. Compliant with national engineering drafting codes, layered systematically for seamless import into civil design suites.',
    applications: [
      'AutoCAD civil drafting compliant with government department standards',
      'GIS shapefile (.SHP) and Geodatabase generation for spatial analysis',
      'Utility network mapping and right-of-way GIS attribute databases',
      'Digital terrain surface creation (TIN surfaces) for road grading'
    ],
    instruments: ['AutoCAD Civil 3D Processing Workstations', 'QGIS / ArcGIS Spatial Data Suites', 'LiDAR & Point Cloud Classification Software'],
    deliverables: ['Layered CAD Plans (.DWG / .DXF)', 'GIS Shapefiles & Spatial Attribute Tables', 'Digital Elevation Models (DEM / DTM GeoTIFF)', 'Certified Survey Drawings in PDF Format']
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initActiveNavTracking();
  initBackToTop();
  initInfrastructureTabs();
  initServiceModals();
  initFaqAccordion();
  initPuneMap();
});

/**
 * 1. STICKY HEADER & SCROLL BEHAVIOR
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 2. MOBILE HAMBURGER MENU & DRAWER
 */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  let backdrop = document.querySelector('.nav-drawer-backdrop');

  if (!toggleBtn || !navMenu) return;

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-drawer-backdrop';
    document.body.appendChild(backdrop);
  }

  function openMenu() {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  // Close when clicking any nav link
  const navLinks = navMenu.querySelectorAll('.nav-link, .btn');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeMenu();
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * 3. ACTIVE NAVIGATION LINK TRACKING
 */
function initActiveNavTracking() {
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks.length) return;

  // Check current URL pathname first
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // If on homepage with hash anchors, track scroll
  const sections = document.querySelectorAll('section[id]');
  if (sections.length && (currentPath === 'index.html' || currentPath === '')) {
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 140;

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${currentSectionId}` || href === `index.html#${currentSectionId}`) {
            navLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }
    }, { passive: true });
  }
}

/**
 * 4. BACK TO TOP BUTTON
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * 5. INFRASTRUCTURE TABS
 */
function initInfrastructureTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn[data-target]');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (!tabButtons.length || !tabPanes.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabButtons.forEach((b) => b.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/**
 * 6. SERVICE MODALS (Explore Service)
 */
function initServiceModals() {
  const exploreButtons = document.querySelectorAll('[data-service-key]');
  const modalBackdrop = document.getElementById('service-modal-backdrop');
  if (!modalBackdrop) return;

  const modalTitle = document.getElementById('modal-service-title');
  const modalBadge = document.getElementById('modal-service-badge');
  const modalTagline = document.getElementById('modal-service-tagline');
  const modalOverview = document.getElementById('modal-service-overview');
  const modalAppsList = document.getElementById('modal-service-apps');
  const modalInstrumentsList = document.getElementById('modal-service-instruments');
  const modalDeliverablesList = document.getElementById('modal-service-deliverables');
  const modalCtaBtn = document.getElementById('modal-service-cta');
  const closeBtn = document.getElementById('modal-close-btn');

  function openModal(serviceKey) {
    const data = SERVICES_DATA[serviceKey];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBadge) modalBadge.textContent = data.badge;
    if (modalTagline) modalTagline.textContent = data.tagline;
    if (modalOverview) modalOverview.textContent = data.overview;

    if (modalAppsList) {
      modalAppsList.innerHTML = data.applications.map(item => `<li><span class="bullet">▪</span> ${item}</li>`).join('');
    }
    if (modalInstrumentsList) {
      modalInstrumentsList.innerHTML = data.instruments.map(item => `<span class="brand-tag">${item}</span>`).join(' ');
    }
    if (modalDeliverablesList) {
      modalDeliverablesList.innerHTML = data.deliverables.map(item => `<li><span class="check">✓</span> ${item}</li>`).join('');
    }

    if (modalCtaBtn) {
      modalCtaBtn.href = `contact.html?service=${encodeURIComponent(data.title)}`;
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  exploreButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-service-key');
      openModal(key);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * 7. FAQ ACCORDION
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close others
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 8. PUNE MAP INTEGRATION (Leaflet with custom tech skin + offline fallback)
 */
function initPuneMap() {
  const mapElement = document.getElementById('pune-map');
  if (!mapElement) return;

  // Pune coordinates: 18.5204° N, 73.8567° E
  const PUNE_COORDS = [18.5204, 73.8567];

  if (typeof L !== 'undefined') {
    try {
      const map = L.map('pune-map', {
        center: PUNE_COORDS,
        zoom: 12,
        scrollWheelZoom: false,
        attributionControl: false
      });

      // Dark CartoDB Tiles for high-tech aesthetic
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      // Custom High-Tech Survey Marker
      const customSurveyIcon = L.divIcon({
        className: 'survey-map-marker',
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; inset: 0; border: 2px solid #00e5ff; border-radius: 50%; animation: pulseRadar 2s infinite ease-out; opacity: 0.8;"></div>
            <div style="width: 14px; height: 14px; background: #f97316; border: 2px solid #ffffff; border-radius: 50%; box-shadow: 0 0 10px #f97316;"></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker(PUNE_COORDS, { icon: customSurveyIcon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: 'Inter', sans-serif; padding: 6px; color: #0f172a;">
          <strong style="font-size: 13px; color: #0284c7; display: block; margin-bottom: 2px;">Reliable Land Survey Consultancy</strong>
          <span style="font-size: 11px; color: #475569; display: block;">Office: Pune, Maharashtra</span>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #0284c7; display: block; margin-top: 4px;">LAT: 18.5204° N | LON: 73.8567° E</span>
        </div>
      `).openPopup();

      // Remove fallback overlay if Leaflet loads successfully
      const fallback = document.querySelector('.map-fallback-overlay');
      if (fallback) fallback.style.display = 'none';

    } catch (err) {
      console.warn('Leaflet map initialization notice:', err);
    }
  }
}
