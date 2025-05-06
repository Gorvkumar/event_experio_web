// Add mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create mobile menu toggle button
  const navbar = document.querySelector('.navbar');
  const leftSection = document.querySelector('.left-section');
  const navLinks = document.querySelector('.nav-links');
  const navButton = document.querySelector('.nav-button');

  const mobileMenuToggle = document.createElement('button');
  mobileMenuToggle.classList.add('mobile-menu-toggle');
  mobileMenuToggle.innerHTML = '☰';
  mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');

  // Insert toggle button after logo
  const logo = document.querySelector('.logo');
  leftSection.insertBefore(mobileMenuToggle, logo.nextSibling);

  // Create mobile nav button (Join Waitlist) only for mobile view
  if (window.innerWidth <= 768) {
    // Check if mobile button doesn't already exist
    if (!document.querySelector('.mobile-nav-button')) {
      const mobileNavButton = document.createElement('div');
      mobileNavButton.classList.add('mobile-nav-button');

      // Clone the original button
      const originalButton = navButton.querySelector('button');
      const buttonClone = originalButton.cloneNode(true);

      mobileNavButton.appendChild(buttonClone);
      navLinks.appendChild(mobileNavButton);
    }
  }

  // Toggle menu on click
  mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    mobileMenuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';

    // Add mobile button if it doesn't exist when menu is opened
    if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
      if (!document.querySelector('.mobile-nav-button')) {
        const mobileNavButton = document.createElement('div');
        mobileNavButton.classList.add('mobile-nav-button');

        // Clone the original button
        const originalButton = navButton.querySelector('button');
        const buttonClone = originalButton.cloneNode(true);

        mobileNavButton.appendChild(buttonClone);
        navLinks.appendChild(mobileNavButton);
      }
    }
  });

  // Close menu when clicking on links or the mobile nav button
  const links = navLinks.querySelectorAll('a, .mobile-nav-button button');
  links.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        mobileMenuToggle.innerHTML = '☰';
      }
    });
  });

  // Handle window resize with debounce for better performance
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      if (window.innerWidth > 768) {
        // Remove mobile button when resizing to desktop
        const mobileNavButton = document.querySelector('.mobile-nav-button');
        if (mobileNavButton) {
          mobileNavButton.remove();
        }
        navLinks.classList.remove('active');
        mobileMenuToggle.innerHTML = '☰';
      } else {
        // Add mobile button when resizing to mobile if it doesn't exist
        if (!document.querySelector('.mobile-nav-button') && navLinks.classList.contains('active')) {
          const mobileNavButton = document.createElement('div');
          mobileNavButton.classList.add('mobile-nav-button');

          // Clone the original button
          const originalButton = navButton.querySelector('button');
          const buttonClone = originalButton.cloneNode(true);

          mobileNavButton.appendChild(buttonClone);
          navLinks.appendChild(mobileNavButton);
        }
      }
    }, 100); // 100ms debounce time
  });
});

function scrollToSection(id) {
  const section = document.getElementById(id);
  const yOffset = -80; // navbar height
  const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
  }
