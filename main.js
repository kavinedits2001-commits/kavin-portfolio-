const body = document.body;

// Pause / play every animation on the page
const motionToggle = document.getElementById('motionToggle');
motionToggle.addEventListener('click', () => {
  const paused = body.classList.toggle('motion-off');
  motionToggle.textContent = paused ? 'Play motion' : 'Pause motion';
  motionToggle.setAttribute('aria-pressed', String(paused));
});

// Mobile menu
const nav = document.querySelector('.site-nav');
const menuToggle = document.getElementById('menuToggle');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('#navLinks a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Scroll reveal: blocks rise in once; grids cascade card by card (--i)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('.reveal, .stagger').forEach((el) => revealObserver.observe(el));

// YouTube: thumbnail first, real player only on click
document.querySelectorAll('.youtube-player img').forEach((image) => {
  image.addEventListener('error', () => {
    if (image.dataset.fallback && image.src !== image.dataset.fallback) image.src = image.dataset.fallback;
  }, { once: true });
});
document.querySelectorAll('.youtube-player').forEach((player) => {
  player.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${player.dataset.videoId}?autoplay=1&rel=0&playsinline=1`;
    iframe.title = player.dataset.title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    player.replaceWith(iframe);
  });
});
