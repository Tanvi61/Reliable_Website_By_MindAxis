/**
 * Reliable Land Survey Consultancy - Form Validation & Demo Enquiry Manager
 * Handles client-side validation, URL param prefill, localStorage demo storage, and Toast UI
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  prefillServiceFromUrl();
  initEnquiryHistoryModal();
});

/**
 * 1. PREFILL SERVICE DROPDOWN FROM URL PARAMS
 */
function prefillServiceFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const serviceSelect = document.getElementById('requiredService');

  if (serviceParam && serviceSelect) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].text.toLowerCase().includes(serviceParam.toLowerCase()) ||
          serviceSelect.options[i].value.toLowerCase().includes(serviceParam.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }
}

/**
 * 2. CONTACT FORM VALIDATION & LOCAL STORAGE DEMO
 */
function initContactForm() {
  const form = document.getElementById('survey-enquiry-form');
  if (!form) return;

  const fields = {
    fullName: {
      el: document.getElementById('fullName'),
      feedbackEl: document.getElementById('fullName-feedback'),
      validate: (val) => val.trim().length >= 2,
      errorMsg: 'Please enter your full name (at least 2 characters).'
    },
    companyName: {
      el: document.getElementById('companyName'),
      feedbackEl: document.getElementById('companyName-feedback'),
      validate: (val) => val.trim().length >= 2,
      errorMsg: 'Please enter your organization or company name.'
    },
    email: {
      el: document.getElementById('email'),
      feedbackEl: document.getElementById('email-feedback'),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
      errorMsg: 'Please enter a valid business email address.'
    },
    phone: {
      el: document.getElementById('phone'),
      feedbackEl: document.getElementById('phone-feedback'),
      validate: (val) => /^[+0-9\s-]{10,15}$/.test(val.trim()),
      errorMsg: 'Please enter a valid contact phone number (min 10 digits).'
    },
    projectType: {
      el: document.getElementById('projectType'),
      feedbackEl: document.getElementById('projectType-feedback'),
      validate: (val) => val.trim().length >= 2,
      errorMsg: 'Please specify the project sector (e.g. Metro Rail, Highway).'
    },
    projectLocation: {
      el: document.getElementById('projectLocation'),
      feedbackEl: document.getElementById('projectLocation-feedback'),
      validate: (val) => val.trim().length >= 2,
      errorMsg: 'Please provide the project site or district location.'
    },
    requiredService: {
      el: document.getElementById('requiredService'),
      feedbackEl: document.getElementById('requiredService-feedback'),
      validate: (val) => val !== '' && val !== 'default',
      errorMsg: 'Please select the primary survey service required.'
    },
    message: {
      el: document.getElementById('message'),
      feedbackEl: document.getElementById('message-feedback'),
      validate: (val) => val.trim().length >= 15,
      errorMsg: 'Please provide brief details of your survey requirement (min 15 characters).'
    }
  };

  // Real-time inline feedback on blur / input
  Object.keys(fields).forEach((key) => {
    const item = fields[key];
    if (!item.el) return;

    item.el.addEventListener('blur', () => {
      validateSingleField(item);
    });

    item.el.addEventListener('input', () => {
      if (item.el.classList.contains('is-invalid')) {
        validateSingleField(item);
      }
    });
  });

  function validateSingleField(item) {
    const val = item.el.value;
    const isValid = item.validate(val);

    if (isValid) {
      item.el.classList.remove('is-invalid');
      item.el.classList.add('is-valid');
      if (item.feedbackEl) item.feedbackEl.textContent = '';
      return true;
    } else {
      item.el.classList.remove('is-valid');
      item.el.classList.add('is-invalid');
      if (item.feedbackEl) item.feedbackEl.textContent = item.errorMsg;
      return false;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isAllValid = true;
    Object.keys(fields).forEach((key) => {
      const item = fields[key];
      if (item.el) {
        const valid = validateSingleField(item);
        if (!valid) isAllValid = false;
      }
    });

    if (!isAllValid) {
      showToast('Form Validation Incomplete', 'Please check the highlighted fields and correct errors.', 'error');
      return;
    }

    // Prepare demo payload
    const enquiryData = {
      id: 'RLSC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: new Date().toISOString(),
      fullName: fields.fullName.el.value.trim(),
      companyName: fields.companyName.el.value.trim(),
      email: fields.email.el.value.trim(),
      phone: fields.phone.el.value.trim(),
      projectType: fields.projectType.el.value.trim(),
      projectLocation: fields.projectLocation.el.value.trim(),
      requiredService: fields.requiredService.el.value,
      message: fields.message.el.value.trim(),
      status: 'Logged for Demonstration (LocalStorage)'
    };

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('rlsc_enquiries') || '[]');
      existing.unshift(enquiryData);
      localStorage.setItem('rlsc_enquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    // Success Toast
    showToast(
      'Survey Enquiry Logged Successfully',
      `Reference: ${enquiryData.id}. Details saved locally. Thank you, ${enquiryData.fullName}!`,
      'success'
    );

    // Reset Form
    form.reset();
    Object.keys(fields).forEach((key) => {
      const item = fields[key];
      if (item.el) {
        item.el.classList.remove('is-valid');
        item.el.classList.remove('is-invalid');
      }
    });

    // Update history table if open
    updateHistoryTable();
  });
}

/**
 * 3. TOAST NOTIFICATION COMPONENT
 */
function showToast(title, message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');

  const icon = type === 'success' ? '✓' : '⚠';

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 350);
  }, 5000);
}

/**
 * 4. DEMO ENQUIRY HISTORY DRAWER / MODAL
 * Allows tester/reviewer to verify that the form successfully saves submissions in localStorage
 */
function initEnquiryHistoryModal() {
  const triggerBtn = document.getElementById('view-demo-enquiries-btn');
  const modal = document.getElementById('enquiry-history-modal');
  const closeBtn = document.getElementById('history-modal-close-btn');
  const clearBtn = document.getElementById('history-clear-btn');

  if (triggerBtn && modal) {
    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updateHistoryTable();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('rlsc_enquiries');
      updateHistoryTable();
      showToast('Enquiry Log Cleared', 'All demo submissions have been reset.', 'success');
    });
  }
}

function updateHistoryTable() {
  const tbody = document.getElementById('enquiry-history-tbody');
  const emptyNotice = document.getElementById('enquiry-empty-notice');
  if (!tbody) return;

  const entries = JSON.parse(localStorage.getItem('rlsc_enquiries') || '[]');

  if (entries.length === 0) {
    tbody.innerHTML = '';
    if (emptyNotice) emptyNotice.style.display = 'block';
    return;
  }

  if (emptyNotice) emptyNotice.style.display = 'none';

  tbody.innerHTML = entries.map(item => `
    <tr>
      <td style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: #00e5ff;">${item.id}</td>
      <td style="font-weight: 600; color: #ffffff;">${item.fullName}<br><span style="font-size: 11px; color: #94a3b8;">${item.companyName}</span></td>
      <td>${item.requiredService}<br><span style="font-size: 11px; color: #94a3b8;">${item.projectType} • ${item.projectLocation}</span></td>
      <td style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #cbd5e1;">${new Date(item.timestamp).toLocaleDateString()} ${new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
    </tr>
  `).join('');
}
