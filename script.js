/* ============================================
   SLEKX PORTFOLIO — SCRIPTS (BRUTALIST EDITION)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // LOADER
  // ========================
  const loader = document.getElementById('loader');
  const loaderFlash = document.getElementById('loaderFlash');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loaderFlash.classList.add('active');
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        animateHero();
      }, 450);
    }, 2400);
  });
  document.body.style.overflow = 'hidden';

  // ========================
  // CUSTOM CURSOR
  // ========================
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-card, .blog-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });

  // ========================
  // FLOATING CONTACT BUBBLE
  // ========================
  const contactBubble = document.getElementById('contactBubble');
  const contactBubbleBtn = document.getElementById('contactBubbleBtn');
  contactBubbleBtn.addEventListener('click', () => {
    contactBubble.classList.toggle('is-open');
  });
  document.addEventListener('click', (e) => {
    if (!contactBubble.contains(e.target)) {
      contactBubble.classList.remove('is-open');
    }
  });

  // ========================
  // AMBIENT GLOW (cursor)
  // ========================
  const glow = document.createElement('div');
  glow.className = 'ambient-glow';
  document.body.appendChild(glow);
  let glowX = window.innerWidth / 2, glowY = window.innerHeight / 2;
  let glowTX = glowX, glowTY = glowY;
  document.addEventListener('mousemove', (e) => { glowTX = e.clientX; glowTY = e.clientY; });
  function animateGlow() {
    glowX += (glowTX - glowX) * 0.06;
    glowY += (glowTY - glowY) * 0.06;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ========================
  // NAVBAR SCROLL
  // ========================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ========================
  // HAMBURGER MENU
  // ========================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ========================
  // HERO ANIMATIONS
  // ========================
  function animateHero() {
    const reveals = document.querySelectorAll('.hero .reveal-text');
    reveals.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, i * 250);
    });
  }

  // ========================
  // PARALLAX HERO (title scale + fade on scroll)
  // ========================
  const heroDisplay = document.querySelector('.hero-display');
  const heroCenter = document.querySelector('.hero-center');
  const heroSection = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    if (heroSection && window.scrollY < window.innerHeight) {
      const progress = window.scrollY / window.innerHeight;
      if (heroDisplay) {
        heroDisplay.style.opacity = 1 - progress * 2;
        heroDisplay.style.transform = `scale(${1 - progress * 0.15}) translateY(${window.scrollY * 0.3}px)`;
      }
      if (heroCenter) {
        heroCenter.style.opacity = 1 - progress * 1.8;
        heroCenter.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    }
  });

  // ========================
  // SCROLL ANIMATIONS (IntersectionObserver)
  // ========================
  const animElements = document.querySelectorAll('.anim-up, .anim-left, .anim-right, .anim-scale');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  animElements.forEach(el => observer.observe(el));


  // ========================
  // MAGNETIC BUTTONS
  // ========================
  const magneticEls = document.querySelectorAll('.magnetic');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });

  // ========================
  // LETTER BOUNCE ON CTA HOVER
  // ========================
  const startProject = document.querySelector('.start-project');
  if (startProject) {
    startProject.addEventListener('mouseenter', () => {
      const spans = startProject.querySelectorAll('span');
      spans.forEach((span, i) => {
        span.style.animation = 'none';
        span.offsetHeight;
        span.style.animation = `letterBounce 0.4s ease ${i * 0.03}s forwards`;
      });
    });
  }

  // ========================
  // ABOUT — TEXT LINE REVEAL
  // ========================
  const aboutLines = document.querySelectorAll('[data-about-line]');
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reveal all lines in the parent
        const parent = entry.target.closest('.about-display');
        if (parent) {
          parent.querySelectorAll('[data-about-line]').forEach(line => {
            line.classList.add('is-visible');
          });
        }
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  aboutLines.forEach(line => aboutObserver.observe(line));


  // ========================
  // PROJECT SCROLL REVEAL (clip-path + scale)
  // ========================
  const projectBlocks = document.querySelectorAll('[data-pj]');
  const pjObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        pjObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  });
  projectBlocks.forEach(pj => pjObserver.observe(pj));

  // ========================
  // PROJECT IMAGE PARALLAX ON MOUSE
  // ========================
  projectBlocks.forEach(pj => {
    const imgContainer = pj.querySelector('[data-pj-img]');
    if (!imgContainer) return;
    const img = imgContainer.querySelector('img');

    pj.addEventListener('mousemove', (e) => {
      const rect = pj.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      img.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
    });
    pj.addEventListener('mouseleave', () => {
      img.style.transform = 'translate(0, 0)';
    });
  });

  // ========================
  // PROJECT NUMBER PARALLAX ON SCROLL
  // ========================
  function updateProjectNumbers() {
    projectBlocks.forEach(pj => {
      const num = pj.querySelector('.pj-num');
      if (!num) return;
      const rect = pj.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.top < viewH && rect.bottom > 0) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const offset = (progress - 0.5) * 80;
        num.style.transform = `translateY(${offset}px)`;
      }
    });
    requestAnimationFrame(updateProjectNumbers);
  }
  updateProjectNumbers();

  // ========================
  // SMOOTH SECTION DIVIDERS
  // ========================
  const sections = document.querySelectorAll('.section');
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  sections.forEach(s => lineObserver.observe(s));

});
