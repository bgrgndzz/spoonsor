const resetMessages = () => {
  const messagesWrapper = document.querySelector('.messages-wrapper');
  messagesWrapper.innerHTML = '';
  const userWrapper = document.querySelector('.user-wrapper');
  userWrapper.innerHTML = '';

  const messagesBackgroundNotice = document.createElement('span');
  messagesBackgroundNotice.classList.add('messages-background-notice');
  messagesBackgroundNotice.innerHTML = 'Mesajları görüntülemek için sol taraftan bir görüşme seçin';

  messagesWrapper.appendChild(messagesBackgroundNotice);
};
const loadMessages = (user) => {
  fetch('/app/messages/' + user)
    .then(data => data.json())
    .then(data => {
      // messages wrapper
      (() => {
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
            resetMessages();
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

        data.messages.forEach(message => {
          const messageNode = document.createElement('div');
          messageNode.classList.add('message', 'message__' + message.type);

          const messageImage = document.createElement('div');
          messageImage.classList.add('message-image');
          messageImage.style.backgroundImage = `url('/res/uploads/${message.user.profilepicture}')`;

          const messageContent = document.createElement('div');
          messageContent.classList.add('message-content');

          const messageDetails = document.createElement('div');
          messageDetails.classList.add('message-details');

          const messageSender = document.createElement('span');
          messageSender.classList.add('message-sender');
          messageSender.innerHTML = message.user.name;

          const messageDate = document.createElement('span');
          messageDate.classList.add('message-date');
          messageDate.innerHTML = message.date;

          messageDetails.appendChild(messageSender);
          messageDetails.appendChild(messageDate);

          const messageText = document.createElement('p');
          messageText.classList.add('message-text');
          messageText.innerHTML = message.message;

          messageContent.appendChild(messageDetails);
          messageContent.appendChild(messageText);

          messageNode.appendChild(messageImage);
          messageNode.appendChild(messageContent);
          
          messages.appendChild(messageNode);
        });

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

        messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
      })();

      // user wrapper
      (() => {
        const userWrapper = document.querySelector('.user-wrapper');
        userWrapper.innerHTML = '';
        
        const userContent = document.createElement('div');
        userContent.classList.add('user-content');

        const userImage = document.createElement('div');
        userImage.classList.add('user-image');
        userImage.style.backgroundImage = `url('/res/uploads/${data.user.profilepicture}')`;

        const userName = document.createElement('h2');
        userName.classList.add('user-name');
        userName.innerHTML = data.user.name;

        const userDescription = document.createElement('p');
        userDescription.classList.add('user-description');
        userDescription.innerHTML = data.user.description || '';

        const userSponsorships = document.createElement('div');
        userSponsorships.classList.add('user-sponsorships');

        data.user.sponsorshipType.forEach(userSponsorship => {
          const userSponsorshipNode = document.createElement('span');
          userSponsorshipNode.classList.add('user-sponsorship');
          userSponsorshipNode.innerHTML = userSponsorship;

          userSponsorships.appendChild(userSponsorshipNode);
        });

        userContent.appendChild(userImage);
        userContent.appendChild(userName);
        userContent.appendChild(userDescription);
        userContent.appendChild(userSponsorships);

        userWrapper.appendChild(userContent);
      })();

      // user modal
      (() => {
        const modalImage = document.querySelector('.modal-image');
        modalImage.style.backgroundImage = `url('/res/uploads/${data.user.profilepicture}')`;

        const modalTitle = document.querySelector('.modal-title');
        modalTitle.innerHTML = data.user.name;

        const modalDescription = document.querySelector('.modal-description');
        modalDescription.innerHTML = data.user.description || '';

        const modalSponsorships = document.querySelector('.modal-sponsorships');
        data.user.sponsorshipType.forEach(modalSponsorship => {
          const modalSponsorshipNode = document.createElement('span');
          modalSponsorshipNode.classList.add('user-sponsorship');
          modalSponsorshipNode.innerHTML = modalSponsorship;

          modalSponsorships.appendChild(modalSponsorshipNode);
        });
      })();
    });
};

window.onload = () => {
  let currentUser = '';

  const hamburger = document.querySelector('.hamburger');
  const hamburgerIcon = document.querySelector('.hamburger-icon');

  const users = document.querySelectorAll('.users-wrapper .user');
  const content = document.querySelector('.content');
  
  const socket = io();

  hamburgerIcon.onclick = () => {
    if (hamburger.classList.contains('hamburger-open')) {
      hamburger.classList.remove('hamburger-open');
      document.body.style.overflow = 'auto';
    } else {
      hamburger.classList.add('hamburger-open');
      document.body.style.overflow = 'hidden';
    }
  };

  document.addEventListener('click', (event) => {
    const modalWrapper = document.querySelector('.modal-wrapper');
    if (event.target && event.target.classList.contains('open-modal')) {
      toggleDisplay(modalWrapper, true);
    } else if (event.target && event.target.classList.contains('close-modal')) {
      toggleDisplay(modalWrapper, false);
    }
  });

  users.forEach(user => {
    user.onclick = () => {
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (!user.classList.contains('user__active') || vw <= 700) {
        const userId = user.querySelector('.user-id').value;

        if (document.querySelector('.user__active')) {
          document.querySelector('.user__active').classList.remove('user__active');
        }
        user.classList.add('user__active');
        loadMessages(userId);
        if (currentUser) {
          socket.emit('leave room', currentUser);
        }
        currentUser = userId;
        socket.emit('join room', currentUser);
        if (vw <= 700) {
          content.style.marginLeft = '-100vw';
        }
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