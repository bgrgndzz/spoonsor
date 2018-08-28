window.onload = () => {
  const hamburger = document.querySelector('.hamburger');
  const hamburgerIcon = document.querySelector('.hamburger-icon');

  const modalWrapper = document.querySelector('.modal-wrapper');
  const openModalButtons = document.querySelectorAll('.open-modal');
  const closeModalButtons = document.querySelectorAll('.close-modal');

  const settingReveals = document.querySelectorAll('.setting-reveal');
  
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
    openModalButton.onclick = () => {
      document.body.style.overflow = 'hidden';
      toggleDisplay(modalWrapper, true);
    };
  });
  closeModalButtons.forEach(closeModalButton => {
    closeModalButton.onclick = () => {
      document.body.style.overflow = 'auto';
      toggleDisplay(modalWrapper, false);
    };
  });
  settingReveals.forEach(settingReveal => {
    settingReveal.onclick = () => {
      if (settingReveal.classList.contains('fa-chevron-down')) {
        settingReveal.classList.remove('fa-chevron-down');
        settingReveal.classList.add('fa-chevron-left');
        toggleDisplay(settingReveal.parentNode.parentNode.querySelector('.setting-content'), true);
      } else {
        settingReveal.classList.remove('fa-chevron-left');
        settingReveal.classList.add('fa-chevron-down');
        toggleDisplay(settingReveal.parentNode.parentNode.querySelector('.setting-content'), false);
      }
    };
  });
};