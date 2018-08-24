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
const resetMessages = () => {
  const messagesWrapper = document.querySelector('.messages-wrapper');
  messagesWrapper.innerHTML = '';

  const messagesBackgroundNotice = document.createElement('span');
  messagesBackgroundNotice.classList.add('messages-background-notice');
  messagesBackgroundNotice.innerHTML = 'Mesajları görüntülemek için sol taraftan bir görüşme seçin';

  messagesWrapper.appendChild(messagesBackgroundNotice);
};
const loadMessages = (user, data) => {
  const content = document.querySelector('.content');
  
  const messagesWrapper = document.querySelector('.messages-wrapper');
  messagesWrapper.innerHTML = '';

  // messages header
  const messagesHeader = document.createElement('div');
  messagesHeader.classList.add('messages-header');
  
  const closeMessages = document.createElement('i');
  closeMessages.classList.add('fas', 'fa-chevron-left', 'close-messages');
  closeMessages.onclick = () => {
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (vw <= 700) {
      content.style.marginLeft = '0';
      document.querySelector('.user__active').classList.remove('user__active');
      setTimeout(resetMessages, 500);
    }
  }

  const messagesUser = document.createElement('h2');
  messagesUser.classList.add('messages-user', 'open-modal');
  messagesUser.innerHTML = 'Sponsor';

  messagesHeader.appendChild(closeMessages);
  messagesHeader.appendChild(messagesUser);

  // messages
  const messages = document.createElement('div');
  messages.classList.add('messages');

  // message form
  const messageForm = document.createElement('form');
  messageForm.classList.add('message-form');

  const messageField = document.createElement('textarea');
  messageField.classList.add('field', 'message-field');
  messageField.name = 'message';
  messageField.placeholder = 'Bir mesaj yazın';

  const messageButton = document.createElement('input');
  messageButton.classList.add('button', 'message-button');
  messageButton.type = 'submit';
  messageButton.value = '';

  messageForm.appendChild(messageField);
  messageForm.appendChild(messageButton);

  // append everything to the wrapper
  messagesWrapper.appendChild(messagesHeader);
  messagesWrapper.appendChild(messages);
  messagesWrapper.appendChild(messageForm);
};

window.onload = () => {
  const hamburger = document.querySelector('.hamburger');
  const hamburgerIcon = document.querySelector('.hamburger-icon');

  const modalWrapper = document.querySelector('.modal-wrapper');
  const openModalButtons = document.querySelectorAll('.open-modal');
  const closeModalButtons = document.querySelectorAll('.close-modal');

  const users = document.querySelectorAll('.users-wrapper .user');
  const content = document.querySelector('.content');
  
  const socket = io();
  socket.emit('join room', '5b7d95c978e50a718d3c5a0b'); // test emit

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
      toggleDisplay(modalWrapper, true);
    };
  });
  closeModalButtons.forEach(closeModalButton => {
    closeModalButton.onclick = () => toggleDisplay(modalWrapper, false);
  });
  users.forEach(user => {
    user.onclick = () => {
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

      if (document.querySelector('.user__active')) {
        document.querySelector('.user__active').classList.remove('user__active');
      }
      setTimeout(() => user.classList.add('user__active'), vw <= 700 ? 500 : 0);
      loadMessages();
      if (vw <= 700) {
        content.style.marginLeft = '-100vw';
      }
    };
  });

  window.onresize = () => {
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (vw > 700) {
      content.style.marginLeft = '0';
    }
  };
};