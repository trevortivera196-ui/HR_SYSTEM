/* ===== SHARED UTILITIES ===== */

// Mark active nav link
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === location.href) link.classList.add('active');
});

// Hamburger menu toggle
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '60px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = '#fff';
    navLinks.style.padding = '1rem';
    navLinks.style.boxShadow = '0 4px 12px rgba(0,0,0,.1)';
  });
}

/* ===== TOAST NOTIFICATIONS ===== */
function showToast(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || ''}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

/* ===== MODAL ===== */
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

document.querySelectorAll('[data-modal-open]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.modalOpen));
});
document.querySelectorAll('[data-modal-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.modalClose));
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

/* ===== TABS ===== */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('[data-tabs]');
    if (!group) return;
    group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = group.querySelector(`#tab-${btn.dataset.tab}`);
    if (target) target.classList.add('active');
  });
});

/* ===== EMPLOYEE SEARCH & FILTER ===== */
const empSearch = document.getElementById('empSearch');
const deptFilter = document.getElementById('deptFilter');
const empRows    = document.querySelectorAll('.emp-row');

function filterEmployees() {
  const q    = empSearch?.value.toLowerCase() || '';
  const dept = deptFilter?.value || '';
  empRows.forEach(row => {
    const name  = row.dataset.name  || '';
    const rdept = row.dataset.dept  || '';
    const match = name.includes(q) && (dept === '' || rdept === dept);
    row.style.display = match ? '' : 'none';
  });
}
empSearch?.addEventListener('input', filterEmployees);
deptFilter?.addEventListener('change', filterEmployees);

/* ===== SMOOTH COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  let current  = 0;
  const step   = Math.ceil(target / 60);
  const timer  = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString() + suffix;
    if (current >= target) clearInterval(timer);
  }, 20);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ===== FADE-IN ON SCROLL ===== */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .feature-card, .job-card, .stat-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .4s ease, transform .4s ease';
  fadeObserver.observe(el);
});

// Inject visible class
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

/* ===== EMPLOYEE ADD FORM ===== */
const addEmpForm = document.getElementById('addEmployeeForm');
addEmpForm?.addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(addEmpForm));
  closeModal('addEmployeeModal');
  addEmpForm.reset();
  showToast(`Employee ${data.firstName} ${data.lastName} added successfully!`, 'success');
});

/* ===== APPLICATION FORM ===== */
const appForm = document.getElementById('applicationForm');
appForm?.addEventListener('submit', e => {
  e.preventDefault();
  closeModal('applyModal');
  appForm.reset();
  showToast('Your application has been submitted!', 'success');
});
