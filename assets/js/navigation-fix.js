/* Navigation Fix */
document.addEventListener('DOMContentLoaded', function() {
  // Fix navigation issues
  initializeNavigationFix();
});

function initializeNavigationFix() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!navToggle || !navMenu) {
    console.warn('Navigation elements not found');
    return;
  }
  
  // Mobile menu toggle
  navToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });
  
  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Close mobile menu
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
      
      // Smooth scroll to section
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Update active nav on scroll
  window.addEventListener('scroll', function() {
    updateActiveNav();
  });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    
    if (scrollPos >= top && scrollPos <= bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}