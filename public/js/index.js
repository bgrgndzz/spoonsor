window.onscroll = () => {
  const headerLogo = document.querySelector('.header .logo');
  if (window.pageYOffset > 100) {
    headerLogo.style.opacity = 1;
  } else {
    headerLogo.style.opacity = 0;
  }
};