document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-links a');

  function clearActive() {
    navLinks.forEach((l) => l.classList.remove('active'));
  }

  // Smooth scroll and set active on click
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', href);
        }
      }
      clearActive();
      this.classList.add('active');
    });
  });

  // Scroll spy: highlight nav link based on section in viewport
  const linkMap = [];
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (target) linkMap.push({ link, target });
  });

  function onScroll() {
    const offset = window.innerHeight * 0.25;
    const scrollPos = window.scrollY || window.pageYOffset;
    let found = false;
    for (const entry of linkMap) {
      const rect = entry.target.getBoundingClientRect();
      const top = rect.top + scrollPos;
      if (scrollPos + offset >= top && scrollPos + offset < top + entry.target.offsetHeight) {
        clearActive();
        entry.link.classList.add('active');
        found = true;
        break;
      }
    }
    if (!found) {
      // no section matched — optionally clear active
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
