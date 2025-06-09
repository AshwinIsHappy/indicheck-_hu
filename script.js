// NAVBAR mobile toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Smooth scroll and active nav highlighting
const navLinkEls = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY || document.documentElement.scrollTop;
  navLinkEls.forEach(link => {
    let section = document.querySelector(link.getAttribute('href'));
    if (section) {
      let secTop = section.offsetTop - 60;
      let secBot = secTop + section.offsetHeight;
      if (scrollPos >= secTop && scrollPos < secBot) {
        navLinkEls.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// Animate On Scroll
AOS.init({ once: false, duration: 1100 });

// Particles.js config (chessboard-like colors)
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 60, "density": { "enable": true, "value_area": 900 } },
    "color": { "value": ["#9cd67c", "#fffbe6", "#23281f", "#1a1e1a"] },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.45, "random": true },
    "size": { "value": 5, "random": true },
    "move": {
      "enable": true, "speed": 1.6, "direction": "none",
      "random": false, "straight": false, "out_mode": "bounce"
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "grab" },
      "onclick": { "enable": true, "mode": "push" }
    },
    "modes": {
      "grab": { "distance": 120, "line_linked": { "opacity": 0.5 } },
      "push": { "particles_nb": 3 }
    }
  },
  "retina_detect": true
});

// Morphing SVG Blob (anime.js)
const blobMorphs = [
  "M421,323Q367,396,272,406Q177,416,111,345Q45,274,80,177Q115,80,238,59Q361,38,413,139Q465,240,421,323Z",
  "M400,340Q363,440,248,422Q133,404,100,307Q67,210,146,142Q225,74,323,106Q421,138,411,239Q401,340,400,340Z",
  "M378,318Q368,396,266,414Q164,432,109,345Q54,258,82,175Q110,92,211,82Q312,72,370,156Q428,240,378,318Z"
];
let morphIdx = 0;
setInterval(() => {
  morphIdx = (morphIdx + 1) % blobMorphs.length;
  anime({
    targets: '#blobPath',
    d: [{ value: blobMorphs[morphIdx] }],
    duration: 2200,
    easing: 'easeInOutQuad'
  });
}, 2700);

// Stats counter animation
function animateCount(el, end) {
  let start = 0, duration = 1500, startTime = null;
  function update(ts) {
    if (!startTime) startTime = ts;
    let progress = Math.min((ts - startTime) / duration, 1);
    el.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = end;
  }
  requestAnimationFrame(update);
}
let countersRun = false;
window.addEventListener('scroll', () => {
  const statsSection = document.getElementById('stats');
  if (!countersRun && window.scrollY + window.innerHeight > statsSection.offsetTop + 100) {
    document.querySelectorAll('.counter').forEach(counter => {
      const numEl = counter.querySelector('.count-num');
      const end = +counter.dataset.count;
      animateCount(numEl, end);
    });
    countersRun = true;
  }
});

// Carousel
const testimonials = document.querySelectorAll('.testimonial');
let tIdx = 0;
function showTestimonial(idx) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}
document.getElementById('nextBtn').onclick = () => {
  tIdx = (tIdx + 1) % testimonials.length;
  showTestimonial(tIdx);
};
document.getElementById('prevBtn').onclick = () => {
  tIdx = (tIdx - 1 + testimonials.length) % testimonials.length;
  showTestimonial(tIdx);
};
showTestimonial(0);
