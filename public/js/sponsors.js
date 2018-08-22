const changeModal = (data, modalWrapper) => {
  const modalImage = modalWrapper.querySelector('.modal-image');
  const modalTitle = modalWrapper.querySelector('.modal-title');
  const modalSponsorships = modalWrapper.querySelector('.modal-sponsorships');
  const modalDescription = modalWrapper.querySelector('.modal-description');

  modalImage.style.backgroundImage = `url('/res/uploads/${data.profilepicture}')`;
  modalTitle.innerHTML = data.name;
  modalDescription.innerHTML = data.description || '';
  modalSponsorships.innerHTML = '';
  
  data.sponsorshipType.forEach((sponsorship) => {
    const sponsorshipNode = document.createElement('span');
    sponsorshipNode.classList.add('modal-sponsorship');
    sponsorshipNode.innerHTML = sponsorship;

    modalSponsorships.appendChild(sponsorshipNode);
  });
};

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
    openModalButton.onclick = (event) => {
      const itemId = event.target.closest('.item').querySelector('.item-id').value;
      const item = users.find(user => user.id === itemId);

      changeModal(item, modalWrapper);
      toggleDisplay(modalWrapper, true);
    };
  });
  closeModalButtons.forEach(closeModalButton => {
    closeModalButton.onclick = () => toggleDisplay(modalWrapper, false);
  });
  console.log(users);
};