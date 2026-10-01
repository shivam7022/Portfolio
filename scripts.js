/**
 * SHIVAM KUMAR — PORTFOLIO
 * Modern interactive scripts: Scroll Reveal, Dynamic Navbar,
 * Mobile Menu, Magnetic Hover Effects, 3D Tilt, Real Form Handling,
 * Project Category Filter, Animated Count-Up Stats, Copy Email & Back-to-Top
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---- 1. TOP SCROLL PROGRESS BAR ----
  const scrollProgressBar = document.getElementById('scroll-progress');
  const updateScrollProgress = () => {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
  };

  // ---- 2. NAVIGATION SCROLL EFFECT ----
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav__link');

  const handleNavScroll = () => {
    updateScrollProgress();
    if (!navbar) return;
    if (window.scrollY > 30) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Run immediately on load

  // ---- 3. ACTIVE NAV LINK TRACKING ----
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('section[id]').forEach(section => {
    navObserver.observe(section);
  });

  // ---- 4. MOBILE MENU TOGGLE ----
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  const toggleMobileMenu = (forceClose = false) => {
    if (!mobileMenu || !hamburgerBtn) return;
    const isOpen = forceClose ? false : !mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(true));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        toggleMobileMenu(true);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileMenu.classList.contains('is-open')) {
        toggleMobileMenu(true);
      }
    });
  }

  // ---- 5. SCROLL REVEAL ANIMATIONS ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- 6. ANIMATED NUMBER COUNT-UP ----
  const countUpElements = document.querySelectorAll('.count-up');
  if (countUpElements.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const duration = 1600;
          const startTime = performance.now();

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = (target * easeOut);
            el.textContent = currentVal.toFixed(decimals);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = target.toFixed(decimals);
            }
          };

          requestAnimationFrame(updateCount);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    countUpElements.forEach(el => countObserver.observe(el));
  }

  // ---- 7. INTERACTIVE PROJECT FILTER TABS ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('is-hidden');
            // Re-trigger reveal animation smoothly
            card.classList.add('is-visible');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // ---- 8. DESKTOP CURSOR AMBIENT GLOW & MAGNETIC BUTTONS ----
  const cursorGlow = document.getElementById('cursor-glow');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isFinePointer) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorGlow) {
        cursorGlow.style.left = `${mouseX}px`;
        cursorGlow.style.top = `${mouseY}px`;
      }
      document.body.classList.add('has-glow');
    });

    // Magnetic buttons
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });

    // 3D Tilt on Project Cards
    projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ---- 9. TOAST NOTIFICATION HELPER ----
  const toastNotice = document.getElementById('toast-notice');
  let toastTimeout = null;

  const showToast = (message) => {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  };

  // ---- 10. COPY EMAIL BUTTON ----
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailAddress = 'kumarshivam8210023851@gmail.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        copyEmailBtn.classList.add('copied');
        const span = copyEmailBtn.querySelector('span');
        if (span) span.textContent = 'Copied!';
        showToast('Email address copied to clipboard! 📋');

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          if (span) span.textContent = 'Copy';
        }, 2500);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = emailAddress;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Email address copied to clipboard! 📋');
      }
    });
  }

  // ---- 11. CONTACT FORM HANDLING (Real AJAX via FormSubmit + Mailto Fallback) ----
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('contact-submit');

  if (contactForm && formStatus && submitBtn) {
    const showStatus = (text, type) => {
      formStatus.textContent = text;
      formStatus.className = `form-status ${type}`;
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      // Basic validation
      if (!name || !email || !message) {
        showStatus('Please fill in all fields before sending.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Sending...</span>
        <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
      `;

      try {
        // Submit asynchronously to FormSubmit endpoint
        const response = await fetch('https://formsubmit.co/ajax/kumarshivam8210023851@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Portfolio Message from ${name}`
          })
        });

        if (response.ok) {
          showStatus('Thank you! Your message has been sent successfully.', 'success');
          showToast('Message sent to Shivam Kumar! ✉️');
          contactForm.reset();
        } else {
          throw new Error('Network response not ok');
        }
      } catch (err) {
        // Fallback: prompt mailto client
        showStatus('Notice: Direct transmission failed. Opening your default mail client...', 'error');
        const mailtoUri = `mailto:${emailAddress}?subject=${encodeURIComponent('Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
        window.location.href = mailtoUri;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;

        setTimeout(() => {
          if (formStatus.classList.contains('success')) {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
          }
        }, 6000);
      }
    });
  }

  // ---- 12. BACK TO TOP BUTTON ----
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ---- 13. CONSOLE WELCOME MESSAGE ----
  console.log(
    '%c Shivam Kumar %c Full-Stack Developer & ML Engineer %c',
    'background:#00b7ff; color:#000; font-weight:bold; font-size:12px; padding:4px 8px; border-radius:4px 0 0 4px;',
    'background:#111318; color:#00b7ff; font-size:12px; padding:4px 8px; border-radius:0 4px 4px 0; border:1px solid #00b7ff;',
    'background:transparent;'
  );
  console.log('Interested in working together? Reach out: kumarshivam8210023851@gmail.com');
});
