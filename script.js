/* ============================================
   SLEKX PORTFOLIO — SCRIPTS (BRUTALIST EDITION)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // LOADER
  // ========================
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      animateHero();
    }, 2200);
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
  // COUNTER ANIMATION
  // ========================
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }

  // ========================
  // FAQ ACCORDION
  // ========================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ========================
  // PROCESS ACCORDION
  // ========================
  const processSteps = document.querySelectorAll('.process-step');
  if (processSteps.length) processSteps[0].classList.add('active');

  processSteps.forEach(step => {
    const header = step.querySelector('.step-header');
    header.addEventListener('click', () => {
      const isActive = step.classList.contains('active');
      processSteps.forEach(s => s.classList.remove('active'));
      if (!isActive) {
        step.classList.add('active');
      }
    });
  });

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
      img.style.transform = `scale(1.04) translate(${x * -15}px, ${y * -15}px)`;
    });
    pj.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1) translate(0, 0)';
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
