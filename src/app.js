const projects = [
  { title: 'Dynamic E-Commerce Price & Inventory Engine', category: 'automation', label: 'Automation & Scraping', description: 'A resilient watcher that tracks price and stock changes across dynamic storefronts and surfaces actionable updates.', stack: ['Playwright', 'FastAPI', 'SQLite'], number: '01', demo: 'https://github.com/', repo: 'https://github.com/' },
  { title: 'Multi-Page Real Estate Scraping Pipeline', category: 'automation', label: 'Automation & Scraping', description: 'A structured extraction pipeline for listings, with clean transforms and export-ready datasets for analysis.', stack: ['Scrapy', 'Pandas', 'CSV / JSON'], number: '02', demo: 'https://github.com/', repo: 'https://github.com/' },
  { title: 'Automated Lead Generation Bot', category: 'app', label: 'App Development', description: 'A focused web dashboard that turns fragmented prospect research into a repeatable, reviewable workflow.', stack: ['Python', 'Flask', 'Dashboard'], number: '03', demo: 'https://github.com/', repo: 'https://github.com/' },
  { title: 'Edge-ready API Starter Kit', category: 'cloud', label: 'Cloud & Backend', description: 'A cache-first API foundation with typed boundaries, container delivery, and room for a growing product surface.', stack: ['FastAPI', 'Redis', 'Docker'], number: '04', demo: 'https://github.com/', repo: 'https://github.com/' }
];

const projectGrid = document.querySelector('#project-grid');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#project-search');
const filterButtons = document.querySelector('.filter-bar');
let activeFilter = 'all';

const icon = (name) => `<svg aria-hidden="true"><use href="#icon-${name}" /></svg>`;
const renderProjects = () => {
  const query = searchInput.value.trim().toLowerCase();
  const visible = projects.filter((project) => (activeFilter === 'all' || project.category === activeFilter) && (!query || `${project.title} ${project.label} ${project.description} ${project.stack.join(' ')}`.toLowerCase().includes(query)));
  projectGrid.innerHTML = visible.map((project, index) => `<article class="project-card scroll-reveal" style="--reveal-delay:${index * 70}ms"><div class="project-card-top"><span class="project-number">${project.number}</span><span class="project-category">${project.label}</span></div><h3>${project.title}</h3><p>${project.description}</p><div class="tags">${project.stack.map((tag) => `<span>${tag}</span>`).join('')}</div><div class="project-links"><a href="${project.demo}" target="_blank" rel="noreferrer">Live demo ${icon('arrow-up-right')}</a><a href="${project.repo}" target="_blank" rel="noreferrer">GitHub ${icon('external')}</a></div></article>`).join('');
  emptyState.hidden = visible.length > 0;
};

const debounce = (callback, delay = 300) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => callback(...args), delay); }; };
const refreshProjects = debounce(renderProjects);
filterButtons.addEventListener('click', (event) => { const button = event.target.closest('[data-filter]'); if (!button) return; activeFilter = button.dataset.filter; filterButtons.querySelector('.is-active').classList.remove('is-active'); button.classList.add('is-active'); renderProjects(); });
searchInput.addEventListener('input', refreshProjects);

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') === 'true'; menuToggle.setAttribute('aria-expanded', String(!open)); menuToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation'); siteNav.classList.toggle('is-open', !open); });
siteNav.addEventListener('click', (event) => { if (event.target.closest('a')) { menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation'); siteNav.classList.remove('is-open'); } });

const legalContent = { privacy: ['Privacy Policy', '<p>Your privacy matters. This portfolio only receives information you choose to send through email or phone. No personal data is sold, rented, or added to marketing lists without consent.</p><p>Third-party links, such as freelance platforms and GitHub, follow their own privacy policies. Reach out directly if you need your correspondence removed.</p>'], terms: ['Terms & Conditions', '<p>Portfolio examples describe work and technical direction; they are not a guarantee of a specific result or delivery timeline.</p><p>Project scope, access, ownership, payment, and support are agreed in writing before work begins. Contact Danish Meraj to discuss a clear proposal.</p>'] };
const modal = document.querySelector('#legal-modal');
const modalTitle = document.querySelector('#modal-title');
const modalContent = document.querySelector('#modal-content');
document.querySelector('.footer-links').addEventListener('click', (event) => { const link = event.target.closest('[data-legal]'); if (!link) return; event.preventDefault(); const [title, content] = legalContent[link.dataset.legal]; modalTitle.textContent = title; modalContent.innerHTML = content; modal.hidden = false; document.body.classList.add('modal-open'); modal.querySelector('.modal-close').focus(); });
modal.addEventListener('click', (event) => { if (event.target.closest('[data-close-modal]')) { modal.hidden = true; document.body.classList.remove('modal-open'); } });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) { modal.hidden = true; document.body.classList.remove('modal-open'); } });

const observeReveals = () => {
  document.querySelectorAll('.section:not(.hero), .capability-card, .service-list article, .architecture-map, .contact-card').forEach((item, index) => {
    item.classList.add('scroll-reveal');
    item.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
  });
  const revealItems = document.querySelectorAll('.scroll-reveal');
  if (!('IntersectionObserver' in window)) { revealItems.forEach((item) => item.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => { if (!entry.isIntersecting) return; entry.target.classList.add('is-visible'); currentObserver.unobserve(entry.target); });
  }, { threshold: 0.14, rootMargin: '0px 0px -42px' });
  revealItems.forEach((item) => observer.observe(item));
};

projectGrid.innerHTML = '<div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div>';
window.setTimeout(() => { renderProjects(); observeReveals(); }, 180);
