// Shared sidebar component — injected into every page with id="sidebar-mount"
(function () {
  const current = location.pathname.split('/').pop();
  const links = [
    { href: 'dashboard.html',     icon: '🏠', label: 'Dashboard',          section: 'Main' },
    { href: 'employees.html',     icon: '👥', label: 'Employees',          count: '248' },
    { href: 'recruitment.html',   icon: '📋', label: 'Recruitment',        count: '34' },
    { href: 'payroll.html',       icon: '💰', label: 'Payroll',            section: 'HR Tools' },
    { href: 'leave.html',         icon: '📅', label: 'Leave Management' },
    { href: 'performance.html',   icon: '🎯', label: 'Performance' },
    { href: 'training.html',      icon: '🎓', label: 'Training' },
    { href: 'analytics.html',     icon: '📊', label: 'Analytics',          section: 'Reports' },
    { href: 'notifications.html', icon: '🔔', label: 'Notifications',      count: '5', countRed: true },
    { href: 'settings.html',      icon: '⚙️', label: 'Settings',           section: 'Admin' },
    { href: 'roles.html',         icon: '🔒', label: 'Roles & Permissions' },
  ];

  let html = `
    <a href="index.html" class="sidebar-logo">
      <div class="logo-icon">👥</div>PeopleCore
    </a>
    <div class="sidebar-divider"></div>
    <nav class="sidebar-nav">`;

  let lastSection = '';
  links.forEach(l => {
    if (l.section && l.section !== lastSection) {
      html += `<div class="sidebar-section">${l.section}</div>`;
      lastSection = l.section;
    }
    const active = (current === l.href) ? ' active' : '';
    const countHtml = l.count
      ? `<span class="count"${l.countRed ? ' style="background:#dc2626;"' : ''}>${l.count}</span>`
      : '';
    html += `<a href="${l.href}" class="sidebar-link${active}">
      <span class="icon">${l.icon}</span> ${l.label}${countHtml}
    </a>`;
  });

  html += `</nav>
    <div class="sidebar-footer">
      <div class="user-chip">
        <div class="avatar">A</div>
        <div><strong>Admin User</strong><span>HR Administrator</span></div>
      </div>
    </div>`;

  const mount = document.getElementById('sidebar-mount');
  if (mount) mount.innerHTML = html;
})();
