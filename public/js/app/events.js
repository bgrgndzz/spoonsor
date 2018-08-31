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
    itemName.classList.add('item-name', 'open-profile');
    itemName.innerHTML = user.name;

    const itemImage = document.createElement('div');
    itemImage.classList.add('item-image', 'open-profile');
    itemImage.style.backgroundImage = `url('/res/uploads/${user.profilepicture}')`;
    
    let itemDescription;
    if (user.description) {
      itemDescription = document.createElement('p');
      itemDescription.classList.add('item-description');
      itemDescription.innerHTML = user.shortenedDescription;
      if (user.shortenedDescription !== user.description) {
        itemDescription.innerHTML += '...';

        const openProfile = document.createElement('a');
        openProfile.classList.add('open-profile');
        openProfile.innerHTML = ' Daha fazla gör';
        
        itemDescription.appendChild(openProfile);
      }
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
      if (event.target.classList.contains('open-profile')) {
        const itemId = event.target.closest('.item').querySelector('.item-id').value;
        location.href = '/app/profile/' + itemId;
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