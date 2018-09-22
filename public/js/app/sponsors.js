const displayUsers = (users, filters = []) => {
  const items = document.querySelector('.items');
  items.innerHTML = '';

  const filteredUsers = 
    filters.length === 0 ? 
    users : 
    users.filter(
      user => filters.some(filter => user[filter.param] && user[filter.param].includes(filter.value))
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
      if (event.target.closest('.open-profile')) {
        const itemId = event.target.closest('.item').querySelector('.item-id').value;
        location.href = '/app/profile/' + itemId;
      } else if (event.target.closest('.open-filter-modal')) {
        const filterModalWrapper = document.querySelector('.filter-modal-wrapper');
        document.querySelector('.open-filter-modal').classList.add('close-filter-modal');
        document.querySelector('.open-filter-modal').classList.remove('open-filter-modal');
        toggleDisplay(filterModalWrapper, true);
      } else if (event.target.closest('.close-filter-modal')) {
        const filterModalWrapper = document.querySelector('.filter-modal-wrapper');
        document.querySelector('.close-filter-modal').classList.add('open-filter-modal');
        document.querySelector('.close-filter-modal').classList.remove('close-filter-modal');
        toggleDisplay(filterModalWrapper, false);
      } else if (event.target.closest('.filter-submit-button')) {
        const filterModalWrapper = document.querySelector('.filter-modal-wrapper');
        const sponsorshipTypeCheckboxes = document.querySelectorAll('.filter-modal .radio-wrapper');
        const sponsorshiptype = Array.prototype.slice.call(
          document.querySelectorAll('.filter-modal input[name="sponsorshiptype"]:checked')
        ).map(el => el.value);
        const filters = document.querySelector('.filters');
        filters.innerHTML = '';

        let filterList = [];

        sponsorshiptype.forEach(sponsorship => {
          const newFilter = document.createElement('span');
          newFilter.classList.add('filter');

          const filterContent = document.createTextNode(sponsorship);

          const deleteFilterButton = document.createElement('i');
          deleteFilterButton.classList.add('fas', 'fa-times', 'button--delete-filter');
          deleteFilterButton.onclick = () => {
            [...sponsorshipTypeCheckboxes]
              .find(checkbox => checkbox.querySelector('.radio-label').innerHTML === sponsorship)
              .querySelector('input[name="sponsorshiptype"]')
              .checked = false;
            newFilter.parentNode.removeChild(newFilter);

            filterList = filterList.filter(filter => !(filter.param === 'sponsorshipType' && filter.value === sponsorship));
            displayUsers(users, filterList);
          };
          
          newFilter.appendChild(deleteFilterButton);
          newFilter.appendChild(filterContent);

          filters.appendChild(newFilter);
          filterList.push({
            param: 'sponsorshipType',
            value: sponsorship
          });
        });
        
        document.querySelector('.close-filter-modal').classList.add('open-filter-modal');
        document.querySelector('.close-filter-modal').classList.remove('close-filter-modal');
        toggleDisplay(filterModalWrapper, false);
        displayUsers(users, filterList);
      }
    }
  });
};