window.onscroll = () => {
  const headerLogo = document.querySelector('.header .logo-wrapper');
  if (window.pageYOffset > 100) {
    headerLogo.style.opacity = 1;
  } else {
    headerLogo.style.opacity = 0;
  }
};
window.onload = () => {
  const anchor = document.querySelector('a[href^="#nasil"]');
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#nasil').scrollIntoView({
      behavior: 'smooth'
    });
  });
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonial = 0;
  setInterval(() => {
    testimonials[currentTestimonial].classList.remove('fadeInRight');
    testimonials[currentTestimonial].classList.add('fadeOutLeft');
    currentTestimonial = currentTestimonial === 2 ? 0 : currentTestimonial + 1;
    setTimeout(() => {
      testimonials[currentTestimonial].classList.remove('testimonial__hidden');
      testimonials[currentTestimonial].classList.remove('fadeOutLeft');
      testimonials[currentTestimonial].classList.add('fadeInRight');
    }, 250);
  }, 7500);
};