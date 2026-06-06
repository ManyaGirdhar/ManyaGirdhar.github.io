// =============================================
// Wait for the HTML to fully load before
// running any JS. Always wrap your code in this.
// =============================================
document.addEventListener('DOMContentLoaded', function () {


    // -------------------------------------------
    // 1. NAVBAR — shrink on scroll
    // -------------------------------------------
    // Grab the nav element once, store it in a variable
    const navbar = document.getElementById('navbar');
  
    // 'scroll' event fires every time the user scrolls
    window.addEventListener('scroll', function () {
  
      // window.scrollY = how many pixels user has scrolled from top
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');    // adds the CSS class
      } else {
        navbar.classList.remove('scrolled'); // removes it
      }
  
    });
  
  
    // -------------------------------------------
    // 2. HAMBURGER MENU — toggle on mobile
    // -------------------------------------------
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
  
    hamburger.addEventListener('click', function () {
  
      // toggle() adds the class if missing, removes if present
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
  
    });
  
    // Close mobile menu when any link inside it is clicked
    const mobileLinks = document.querySelectorAll('.mobile-link');
  
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  
  
    // -------------------------------------------
    // 3. ACTIVE NAV LINK — highlight as you scroll
    // -------------------------------------------
    const sections  = document.querySelectorAll('section');
    const navLinks  = document.querySelectorAll('.nav-links a');
  
    window.addEventListener('scroll', function () {
  
      let current = '';
  
      // Loop through every section
      sections.forEach(function (section) {
  
        const sectionTop    = section.offsetTop;     // distance from page top
        const sectionHeight = section.offsetHeight;  // how tall the section is
  
        // If we've scrolled past the top of this section
        if (window.scrollY >= sectionTop - 120) {
          current = section.getAttribute('id'); // e.g. "about", "skills"
        }
  
      });
  
      // Update nav links — add 'active' to the matching one
      navLinks.forEach(function (link) {
        link.classList.remove('active');
  
        // link.getAttribute('href') returns e.g. "#about"
        // we add '#' to current to match
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
  
    });
  
  
// -------------------------------------------
// 4. CONTACT FORM — async Formspree submission
// -------------------------------------------
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validation
  if (!name || !email || !message) {
    formNote.textContent = 'Please fill in all fields.';
    formNote.style.color = '#e05c5c';
    return;
  }

  // Disable button to prevent double-submit
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/xnjryeyq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      formNote.textContent = `Thanks ${name}! I'll get back to you soon. ✓`;
      formNote.style.color = 'var(--accent)';
      form.reset();
      submitBtn.textContent = 'Message Sent ✓';
    } else {
      throw new Error('Failed');
    }

  } catch {
    formNote.textContent = 'Something went wrong. Email me at girdharmanya0404@gmail.com';
    formNote.style.color = '#e05c5c';
    submitBtn.textContent = 'Send Message →';
    submitBtn.disabled = false;
  }

});
  
  
    // -------------------------------------------
    // 5. SCROLL REVEAL — fade in sections as
    //    they enter the viewport
    // -------------------------------------------
  
    // IntersectionObserver watches elements and fires
    // a callback when they enter/leave the screen
    const revealObserver = new IntersectionObserver(
  
      function (entries) {
        entries.forEach(function (entry) {
  
          if (entry.isIntersecting) {
            // Element is visible — add the reveal class
            entry.target.classList.add('revealed');
  
            // Stop watching it once revealed (no need to re-trigger)
            revealObserver.unobserve(entry.target);
          }
  
        });
      },
  
      { threshold: 0.1 } // trigger when 10% of element is visible
  
    );
  
    // Watch every card and section
    document.querySelectorAll(
      '.skill-card, .project-card, .achievement-card, .cert-card, .timeline-item, .research-card'
    ).forEach(function (el) {
      el.classList.add('reveal'); // mark it for animation
      revealObserver.observe(el); // start watching
    });
  
  
    // -------------------------------------------
    // 6. PROJECT FILTERING — dynamic card filtering
    // -------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards  = document.querySelectorAll('.projects-grid .project-card');
  
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Remove active class from all buttons
        filterButtons.forEach(function (btn) {
          btn.classList.remove('active');
        });
        // Add active class to clicked button
        button.classList.add('active');
  
        const filterValue = button.getAttribute('data-filter');
  
        projectCards.forEach(function (card) {
          const cardCategory = card.getAttribute('data-category');
  
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.classList.remove('hide');
          } else {
            card.classList.add('hide');
          }
        });
      });
    });
  
  });