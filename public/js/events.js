const changeModal = (data, modalWrapper) => {
  const modalImage = modalWrapper.querySelector('.modal-image');
  const modalTitle = modalWrapper.querySelector('.modal-title');
  const modalSponsorships = modalWrapper.querySelector('.modal-sponsorships');
  const modalDescription = modalWrapper.querySelector('.modal-description');
  const modalContactButton = modalWrapper.querySelector('.modal-contact-button');

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

  modalContactButton.onclick = () => window.location.href = '/app/messages?to=' + data.id;
};
const displayUsers = (users, filters = []) => {
  const items = document.querySelector('.items');
  items.innerHTML = '';

  const filteredUsers = 
    filters.length === 0 ? 
    users : 
    users.filter(
      user => filters.some(filter => user[filter.param].includes(filter.value))
    );
  filteredUsers.forEach(user => {
    const item = document.createElement('div');
    item.classList.add('item');

    const itemId = document.createElement('input');
    itemId.classList.add('item-id');
    itemId.type = 'hidden';
    itemId.value = user.id;

    const itemName = document.createElement('h2');
    itemName.classList.add('item-name', 'open-modal');
    itemName.innerHTML = user.name;

    const itemImage = document.createElement('div');
    itemImage.classList.add('item-image', 'open-modal');
    itemImage.style.backgroundImage = `url('/res/uploads/${user.profilepicture}')`;
    
    let itemDescription;
    if (user.description) {
      itemDescription = document.createElement('p');
      itemDescription.classList.add('item-description');
      itemDescription.innerHTML = user.shortenedDescription;
      if (user.shortenedDescription !== user.description) {
        itemDescription.innerHTML += '...';
      }
      
      const openModal = document.createElement('a');
      openModal.classList.add('open-modal');
      openModal.innerHTML = ' Daha fazla gör';
      
      itemDescription.appendChild(openModal);
    }
    const itemSponsorships = document.createElement('div');
    itemSponsorships.classList.add('item-sponsorships');

    user.sponsorshipType.forEach(sponsorship => {
      const itemSponsorship = document.createElement('span');
      itemSponsorship.classList.add('item-sponsorship');
      itemSponsorship.innerHTML = sponsorship;

      itemSponsorships.appendChild(itemSponsorship);
    });

    item.appendChild(itemId);
    item.appendChild(itemName);
    item.appendChild(itemImage);
    if (user.description) item.appendChild(itemDescription);
    item.appendChild(itemSponsorships);
    
    items.appendChild(item);
  });
};

window.onload = () => {
  const hamburger = document.querySelector('.hamburger');
  const hamburgerIcon = document.querySelector('.hamburger-icon');

  const filterModalWrapper = document.querySelector('.filter-modal-wrapper');
  const openFilterModalButtons = document.querySelectorAll('.open-filter-modal');
  const closeFilterModalButtons = document.querySelectorAll('.close-filter-modal');
  const filterSubmitButton = document.querySelector('.filter-submit-button');
  const filterReveals = document.querySelectorAll('.modal-filter-reveal');
  
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
    if (event.target) {
      const modalWrapper = document.querySelector('.modal-wrapper');
      if (event.target.classList.contains('open-modal')) {
        const itemId = event.target.closest('.item').querySelector('.item-id').value;
        const item = users.find(user => user.id === itemId);

        changeModal(item, modalWrapper);
        toggleDisplay(modalWrapper, true);
      } else if (event.target.classList.contains('close-modal')) {
        toggleDisplay(modalWrapper, false);
      }
    }
  });
  openFilterModalButtons.forEach(openFilterModalButton => {
    openFilterModalButton.onclick = () => toggleDisplay(filterModalWrapper, true);
  });
  closeFilterModalButtons.forEach(closeFilterModalButton => {
    closeFilterModalButton.onclick = () => toggleDisplay(filterModalWrapper, false);
  });
  filterReveals.forEach(filterReveal => {
    filterReveal.onclick = () => {
      if (filterReveal.classList.contains('fa-chevron-down')) {
        filterReveal.classList.remove('fa-chevron-down');
        filterReveal.classList.add('fa-chevron-left');
        toggleDisplay(filterReveal.parentNode.parentNode.querySelector('.modal-filter-content'), true);
      } else {
        filterReveal.classList.remove('fa-chevron-left');
        filterReveal.classList.add('fa-chevron-down');
        toggleDisplay(filterReveal.parentNode.parentNode.querySelector('.modal-filter-content'), false);
      }
    };
  });
  filterSubmitButton.onclick = () => {
    const filters = document.querySelector('.filters');
    filters.innerHTML = '';

    let filterList = [];

    const createFilterNode = (param, value, inputName) => {
      const radios = document.querySelectorAll(`.radios--${inputName} .radio-wrapper`);

      const newFilter = document.createElement('span');
      newFilter.classList.add('filter');

      const filterContent = document.createTextNode(value);

      const deleteFilterButton = document.createElement('i');
      deleteFilterButton.classList.add('fas', 'fa-times', 'button--delete-filter');
      deleteFilterButton.onclick = () => {
        [...radios]
          .find(radio => radio.querySelector('.radio-label').innerHTML.replace(/&amp;/g, '&') === value)
          .querySelector(`input[name="${inputName}"]`)
          .checked = false;
        newFilter.parentNode.removeChild(newFilter);

        filterList = filterList.filter(filter => !(filter.param === param && filter.value === value));
        displayUsers(users, filterList);
      };
      
      newFilter.appendChild(deleteFilterButton);
      newFilter.appendChild(filterContent);

      filters.appendChild(newFilter);
      filterList.push({param, value});
    };


    const sponsorshiptypes = Array.prototype.slice.call(
      document.querySelectorAll('.radios--sponsorshiptype input[name="sponsorshiptype"]:checked')
    ).map(el => el.value);
    const types = Array.prototype.slice.call(
      document.querySelectorAll('.radios--type input[name="type"]:checked')
    ).map(el => el.value);
    const subjects = Array.prototype.slice.call(
      document.querySelectorAll('.radios--subject input[name="subject"]:checked')
    ).map(el => el.value);

    sponsorshiptypes
      .forEach(sponsorshiptype => createFilterNode('sponsorshipType', sponsorshiptype, 'sponsorshiptype'));
    types
      .forEach(type => createFilterNode('etkinlikType', type, 'type'));
    subjects
      .forEach(subject => createFilterNode('subject', subject, 'subject'));

    toggleDisplay(filterModalWrapper, false);
    displayUsers(users, filterList);
  };
};