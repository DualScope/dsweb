document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  const slowScrollElements = document.querySelectorAll('.slow-scroll');

  menuBtn.addEventListener('click', function() {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    document.documentElement.style.setProperty('--scroll', scrollPosition + 'px');
    
    slowScrollElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < window.innerHeight * 0.8) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  });
});
