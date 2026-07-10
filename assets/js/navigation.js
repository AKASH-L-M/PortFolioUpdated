window.Portfolio = window.Portfolio || {};

const HEADER_OFFSET = 55;

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;

  const top = section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

function initNavigation(sectionIds) {
  const navigationItems = [...document.querySelectorAll('[data-nav]')];
  const observedSections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-nav]');
    if (!trigger) return;
    event.preventDefault();
    scrollToSection(trigger.dataset.nav);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      navigationItems.forEach((item) => {
        const active = item.dataset.nav === visible.target.id;
        item.classList.toggle('active', active);
        if (active) item.setAttribute('aria-current', 'page');
        else item.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-15% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
  );

  observedSections.forEach((section) => observer.observe(section));
}

window.Portfolio.initNavigation = initNavigation;
window.Portfolio.scrollToSection = scrollToSection;

