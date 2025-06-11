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

// Animate all cards on hover with Animate.css
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('animate__animated', 'animate__pulse');
    anime({
      targets: card,
      scale: 1.09,
      rotate: '1deg',
      duration: 250,
      easing: 'easeOutElastic(1, .6)'
    });
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('animate__animated', 'animate__pulse');
    anime({
      targets: card,
      scale: 1,
      rotate: '0deg',
      duration: 400,
      easing: 'easeOutExpo'
    });
  });
  // Randomly sparkle cards
  setInterval(() => {
    if (Math.random() < 0.06) {
      card.classList.add('animate__animated', 'animate__flash');
      setTimeout(() => card.classList.remove('animate__animated', 'animate__flash'), 600);
    }
  }, 1200 + Math.random() * 1000);
});

// Animate counters with pop and color effect
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
      setTimeout(() => t.classList.remove('animate__animated', 'animate__fadeInUp'), 900);
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

// Animate hero button on hover
const heroBtn = document.querySelector('.hero-btn');
if (heroBtn) {
  heroBtn.addEventListener('mouseenter', () => {
    heroBtn.classList.add('animate__animated', 'animate__rubberBand');
  });
  heroBtn.addEventListener('animationend', () => {
    heroBtn.classList.remove('animate__animated', 'animate__rubberBand');
  });
}

// Animate nav logo with bounce on page load
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.classList.add('animate__animated', 'animate__bounceInDown');
  navLogo.addEventListener('animationend', () => {
    navLogo.classList.remove('animate__animated', 'animate__bounceInDown');
  });
}

// Animate each section in with Animate.css
document.querySelectorAll('section').forEach((section, idx) => {
  section.classList.add('animate__animated', idx % 2 === 0 ? 'animate__fadeInUp' : 'animate__fadeInLeft');
  section.style.setProperty('--animate-duration', '1.2s');
});

// Add more animated chess pieces to hero background + floating effect
document.addEventListener('DOMContentLoaded', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    for (let i = 0; i < 3; i++) {
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
      piece.style.left = `${35 + i * 15}%`;
      piece.style.top = `${62 + i * 10}%`;
      piece.style.opacity = 0.6 + i * 0.18;
      piece.style.animation = `floatY ${2 + i * 0.7}s ease-in-out infinite, swing ${2.2 + i * 0.7}s infinite alternate`;
      piece.style.position = "absolute";
      piece.style.transform = `translate(-50%, -50%) scale(${0.7 + i * 0.33})`;
      heroBg.appendChild(piece);
    }
  }

  // === Animated Chessboard in Hero Section ===
  // Create chessboard container
  const chessboard = document.createElement('div');
  chessboard.id = 'animated-chessboard';
  chessboard.style.position = 'absolute';
  chessboard.style.left = '50%';
  chessboard.style.top = '55%';
  chessboard.style.transform = 'translate(-50%, -50%)';
  chessboard.style.zIndex = '0';
  chessboard.style.width = '320px';
  chessboard.style.height = '320px';
  chessboard.style.display = 'grid';
  chessboard.style.gridTemplate = 'repeat(8, 1fr) / repeat(8, 1fr)';
  chessboard.style.boxShadow = '0 6px 32px #23281f33';
  chessboard.style.opacity = 0.82;
  chessboard.style.borderRadius = '1.2em';
  chessboard.style.overflow = 'hidden';

  // Add 64 squares
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const square = document.createElement('div');
      square.className = 'chessboard-square';
      square.style.background = (r + c) % 2 === 0 ? '#fffbe6' : '#9cd67c';
      square.style.transition = 'background 0.6s, box-shadow 0.6s';
      chessboard.appendChild(square);
    }
  }

  // Place on the hero (behind content, above particles)
  if (heroBg) heroBg.appendChild(chessboard);

  // Animate chessboard: shimmering & random highlight
  setInterval(() => {
    document.querySelectorAll('.chessboard-square').forEach((sq, i) => {
      if (Math.random() < 0.08) {
        sq.style.boxShadow = '0 0 16px 6px #fffbe6cc';
        sq.style.background = '#a3e635';
        setTimeout(() => {
          sq.style.boxShadow = '';
          sq.style.background = (Math.floor(i / 8) + i % 8) % 2 === 0 ? '#fffbe6' : '#9cd67c';
        }, 270 + Math.random() * 400);
      }
    });
  }, 350);

  // Animate chess piece SVG gliding over squares
  const piece = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  piece.setAttribute('width', '38');
  piece.setAttribute('height', '38');
  piece.style.position = 'absolute';
  piece.style.left = '0';
  piece.style.top = '0';
  piece.style.pointerEvents = 'none';
  piece.innerHTML = `
    <g>
      <ellipse cx="19" cy="34" rx="13" ry="3" fill="#333"/>
      <rect x="12" y="18" width="14" height="14" rx="2" fill="#fffbe6" stroke="#333" stroke-width="2"/>
      <circle cx="19" cy="12" r="7" fill="#fffbe6" stroke="#333" stroke-width="2"/>
      <ellipse cx="19" cy="9" rx="3" ry="1.2" fill="#333"/>
    </g>
  `;
  chessboard.appendChild(piece);

  let pathSquares = [
    0, 9, 18, 27, 36, 45, 54, 63, 62, 53, 44, 35, 26, 17, 8, 1, 10, 19, 28, 37, 46, 55, 56, 47, 38, 29, 20, 11, 2, 3, 12, 21, 30, 39, 48, 57, 58, 49, 40, 31, 22, 13, 4, 5, 14, 23, 32, 41, 50, 59, 60, 51, 42, 33, 24, 15, 6, 7, 16, 25, 34, 43, 52, 61
  ];
  let moveIdx = 0;
  function animatePiece() {
    let idx = pathSquares[moveIdx % pathSquares.length];
    let r = Math.floor(idx / 8), c = idx % 8;
    piece.style.transition = 'left 0.55s cubic-bezier(.48,1.5,.5,1), top 0.55s cubic-bezier(.48,1.5,.5,1)';
    piece.style.left = `${c * 40}px`;
    piece.style.top = `${r * 40}px`;
    moveIdx++;
    setTimeout(animatePiece, 600);
  }
  animatePiece();
});

// CSS for Chessboard (inject into head)
const chessboardCSS = `
#animated-chessboard {
  filter: drop-shadow(0 2px 14px #1a1e1a55);
}
.chessboard-square {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
#animated-chessboard svg {
  z-index: 2;
  filter: drop-shadow(0 1px 6px #23281f88);
}
`;
const chessStyle = document.createElement('style');
chessStyle.textContent = chessboardCSS;
document.head.appendChild(chessStyle);

// Animated Background Gradient for hero-section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
  let deg = 45;
  setInterval(() => {
    deg = (deg + 1) % 360;
    heroSection.style.background = `linear-gradient(${deg}deg, #23281f 0%, #9cd67c 33%, #fffbe6 66%, #23281f 100%)`;
  }, 60);
}

// Sparkle Effect on Buttons
function createSparkle(x, y, btn) {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.style.left = `${x - btn.getBoundingClientRect().left}px`;
  sparkle.style.top = `${y - btn.getBoundingClientRect().top}px`;
  btn.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 700);
}
document.querySelectorAll('a.cta-btn, .hero-btn').forEach(btn => {
  btn.style.position = "relative";
  btn.addEventListener('mouseenter', e => {
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        const angle = Math.random() * 2 * Math.PI;
        const radius = 30 + Math.random() * 30;
        const x = btn.offsetWidth / 2 + Math.cos(angle) * radius;
        const y = btn.offsetHeight / 2 + Math.sin(angle) * radius;
        createSparkle(x, y, btn);
      }, i * 50);
    }
  });
});

// Parallax effect for hero background and floating chess pieces
window.addEventListener('mousemove', e => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  document.querySelectorAll('.hero-bg, .chess-piece').forEach(el => {
    el.style.transform = `translate(-50%, -44%) scale(1.05) translate(${x * 24}px, ${y * 18}px)`;
  });
});

// Ripple Click Effect for Cards
document.querySelectorAll('.card').forEach(card => {
  card.style.overflow = "hidden";
  card.addEventListener('click', function(e) {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    this.appendChild(ripple);
    const rect = this.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    setTimeout(() => ripple.remove(), 600);
  });
});

// More section bounce on scroll
window.addEventListener('scroll', () => {
  document.querySelectorAll('section').forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight + 50) {
      section.classList.add('animate__animated', 'animate__bounceIn');
      setTimeout(() => section.classList.remove('animate__animated', 'animate__bounceIn'), 800);
    }
  });
});

// CSS for Sparkle and Ripple Effects (injects into head)
const extraCSS = `
.sparkle {
  position: absolute;
  width: 10px; height: 10px;
  background: radial-gradient(circle, #fffbe6 60%, #9cd67c 100%);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.8;
  animation: sparkle-fade 0.7s linear forwards;
}
@keyframes sparkle-fade {
  0% { transform: scale(0.5); opacity: 0.8;}
  70% { transform: scale(1.7); opacity: 1;}
  100% { transform: scale(2.2); opacity: 0;}
}
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(156,214,124,0.3);
  width: 30px; height: 30px;
  transform: scale(0);
  animation: ripple-anim 0.6s linear forwards;
  pointer-events: none;
}
@keyframes ripple-anim {
  0% { transform: scale(0); opacity: 0.8;}
  100% { transform: scale(8); opacity: 0;}
}
`;
const style = document.createElement('style');
style.textContent = extraCSS;
document.head.appendChild(style);
