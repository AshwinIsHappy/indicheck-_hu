// NAVBAR mobile toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  anime({
    targets: navLinks,
    opacity: navLinks.classList.contains('open') ? 1 : 0,
    duration: 400,
    easing: 'easeInOutQuad'
  });
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
AOS.init({ once: false, duration: 1300, easing: 'ease-in-out' });

// Particles.js config (chessboard-like colors)
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 80, "density": { "enable": true, "value_area": 1200 } },
    "color": { "value": ["#9cd67c", "#fffbe6", "#23281f", "#1a1e1a"] },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.5, "random": true },
    "size": { "value": 6, "random": true },
    "move": {
      "enable": true, "speed": 2.1, "direction": "none",
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
      "grab": { "distance": 180, "line_linked": { "opacity": 0.65 } },
      "push": { "particles_nb": 5 }
    }
  },
  "retina_detect": true
});

// Morphing blob animation (existing)
const blobMorphs = [
  "M421,323Q367,396,272,406Q177,416,111,345Q45,274,80,177Q115,80,238,59Q361,38,413,139Q465,240,421,323Z",
  "M400,350Q320,420,210,390Q100,360,90,250Q80,140,200,90Q320,40,390,150Q460,260,400,350Z",
  "M390,320Q340,390,230,400Q120,410,90,270Q60,130,190,80Q320,30,380,140Q440,250,390,320Z"
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

// --- Extra: Animate all cards on scroll in, plus hover bounce ---
document.querySelectorAll('.card').forEach((card, i) => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('animate__animated', 'animate__pulse');
  });
  card.addEventListener('animationend', () => {
    card.classList.remove('animate__animated', 'animate__pulse');
  });
});

// --- Extra: Animate counters with pop and color effect ---
function animateCount(el, end) {
  let start = 0, duration = 1500, startTime = null;
  function update(ts) {
    if (!startTime) startTime = ts;
    let progress = Math.min((ts - startTime) / duration, 1);
    el.textContent = Math.floor(progress * (end - start) + start);
    el.style.transform = `scale(${1 + 0.15 * Math.sin(progress * Math.PI)})`;
    el.style.color = progress > 0.5 ? "#a3e635" : "#9cd67c";
    if (progress < 1) requestAnimationFrame(update);
    else {
      el.textContent = end;
      el.style.transform = "scale(1)";
      el.style.color = "#a3e635";
    }
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

// Carousel animation on testimonial change
const testimonials = document.querySelectorAll('.testimonial');
let tIdx = 0;
function showTestimonial(idx) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
    if (i === idx) {
      t.classList.add('animate__animated', 'animate__fadeInUp');
      t.addEventListener('animationend', () => {
        t.classList.remove('animate__animated', 'animate__fadeInUp');
      }, { once: true });
    }
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

// --- Extra: Animate hero button on hover ---
const heroBtn = document.querySelector('.hero-btn');
if (heroBtn) {
  heroBtn.addEventListener('mouseenter', () => {
    heroBtn.classList.add('animate__animated', 'animate__rubberBand');
  });
  heroBtn.addEventListener('animationend', () => {
    heroBtn.classList.remove('animate__animated', 'animate__rubberBand');
  });
}

// --- Extra: Animate nav logo with bounce on page load ---
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.classList.add('animate__animated', 'animate__bounceInDown');
  navLogo.addEventListener('animationend', () => {
    navLogo.classList.remove('animate__animated', 'animate__bounceInDown');
  });
}

// --- Extra: Animate each section in with Animate.css ---
document.querySelectorAll('section').forEach((section, idx) => {
  section.classList.add('animate__animated', idx % 2 === 0 ? 'animate__fadeInUp' : 'animate__fadeInLeft');
  section.style.setProperty('--animate-duration', '1.2s');
});

// --- Extra: Add more animated chess pieces to hero background ---
document.addEventListener('DOMContentLoaded', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    for (let i = 0; i < 2; i++) {
      const piece = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      piece.setAttribute("class", "chess-piece extra-piece");
      piece.setAttribute("width", "120");
      piece.setAttribute("height", "120");
      piece.setAttribute("viewBox", "0 0 60 60");
      piece.innerHTML =
        `<g>
          <ellipse cx="30" cy="55" rx="18" ry="4" fill="#333"/>
          <rect x="24" y="30" width="12" height="18" rx="2" fill="#fffbe6" stroke="#333" stroke-width="2"/>
          <circle cx="30" cy="21" r="9" fill="#fffbe6" stroke="#333" stroke-width="2"/>
          <ellipse cx="30" cy="17" rx="4" ry="2" fill="#333"/>
        </g>`;
      piece.style.left = `${40 + i * 15}%`;
      piece.style.top = `${70 + i * 10}%`;
      piece.style.opacity = 0.5 + i * 0.2;
      piece.style.animation = `floatY ${2 + i}s ease-in-out infinite, swing ${2.2 + i * 0.7}s infinite alternate`;
      piece.style.position = "absolute";
      piece.style.transform = `translate(-50%, -50%) scale(${0.7 + i * 0.3})`;
      heroBg.appendChild(piece);
    }
  }
});
