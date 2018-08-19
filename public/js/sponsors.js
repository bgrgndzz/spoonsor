window.onload = () => {
  const hamburger = document.querySelector('.hamburger');
  const hamburgerIcon = document.querySelector('.hamburger-icon');

  const modalWrapper = document.querySelector('.modal-wrapper');
  const openModalButtons = document.querySelectorAll('.open-modal');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  
  hamburgerIcon.onclick = () => {
    if (hamburger.classList.contains('hamburger-open')) {
      hamburger.classList.remove('hamburger-open');
      document.body.style.overflow = 'auto';
    } else {
      hamburger.classList.add('hamburger-open');
      document.body.style.overflow = 'hidden';
    }
  };
  openModalButtons.forEach(openModalButton => {
    openModalButton.onclick = () => toggleDisplay(modalWrapper, true);
  });
  closeModalButtons.forEach(closeModalButton => {
    closeModalButton.onclick = () => toggleDisplay(modalWrapper, false);
  });
};