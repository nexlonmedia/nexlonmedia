// Nexlon Media — portfolio interactions (dependency-free)

// Sticky nav shrink on scroll
var nav = document.querySelector('.nav');
function onScroll() {
  if (window.scrollY > 12) { nav.classList.add('scrolled'); }
  else { nav.classList.remove('scrolled'); }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', function () {
  var open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navLinks.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () { navLinks.classList.remove('open'); });
});

// Scroll reveal
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});

// Hero kinetic word rotation
var words = ['Branding', 'Social', 'Video', 'Motion'];
var wordEl = document.getElementById('rotatorWord');
var wordIndex = 0;
setInterval(function () {
  wordIndex = (wordIndex + 1) % words.length;
  wordEl.style.opacity = 0;
  setTimeout(function () {
    wordEl.textContent = words[wordIndex];
    wordEl.style.opacity = 1;
  }, 250);
}, 2200);
wordEl.style.transition = 'opacity .25s ease';

// Gallery filter
var filterBtns = document.querySelectorAll('.filter-btn');
var workItems = document.querySelectorAll('.work-item');
filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var filter = btn.getAttribute('data-filter');
    workItems.forEach(function (item) {
      var show = filter === 'all' || item.getAttribute('data-category') === filter;
      item.classList.toggle('hidden', !show);
    });
  });
});

// Lightbox
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
var lightboxCaption = document.getElementById('lightboxCaption');
var lightboxClose = document.getElementById('lightboxClose');
workItems.forEach(function (item) {
  item.addEventListener('click', function () {
    var img = item.querySelector('img');
    var caption = item.querySelector('figcaption strong');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent + ' — Design sample' : '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) { closeLightbox(); }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') { closeLightbox(); }
});
