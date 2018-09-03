const displayErrors = (errors) => {
  const errorDescription = document.querySelector('.error-description');
  errorDescription.innerHTML = '';

  errors.forEach(error => {
    const errorElement = document.createElement('li');
    errorElement.classList.add('error');
    errorElement.innerHTML = error.error;
    
    errorDescription.appendChild(errorElement);
  });
  const modalWrapper = document.querySelector('.error-modal-wrapper');
  toggleDisplay(modalWrapper, true);
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
  if (edit) {
    const settingSubmit = document.querySelector('.submit-button');
    const ppField = document.querySelector('input[name="profilepicture"]');
    const ppDisplay = document.querySelector('.profile-picture-display');

    document.addEventListener('click', (event) => {
      if (event.target) {
        if (event.target.closest('.close-error-modal')) {
          const errorModalWrapper = document.querySelector('.error-modal-wrapper');
          toggleDisplay(errorModalWrapper, false);
        } else if (event.target.closest('.open-modal')) {
          const modalWrapper = document.querySelector('.modal-wrapper');
          toggleDisplay(modalWrapper, true);
        } else if (event.target.closest('.close-modal')) {
          const modalWrapper = document.querySelector('.modal-wrapper');
          toggleDisplay(modalWrapper, false);
        } else if (event.target.closest('.setting-reveal')) {
          if (event.target.classList.contains('fa-chevron-down')) {
            event.target.classList.remove('fa-chevron-down');
            event.target.classList.add('fa-chevron-left');
            toggleDisplay(event.target.parentNode.parentNode.querySelector('.setting-content'), true);
          } else {
            event.target.classList.remove('fa-chevron-left');
            event.target.classList.add('fa-chevron-down');
            toggleDisplay(event.target.parentNode.parentNode.querySelector('.setting-content'), false);
          }
        }
      }
    });
    ppField.onchange = () => {
      const formData = new FormData();
      formData.append('profilepicture', ppField.files[0], ppField.files[0].name);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/app/profile/profilepicture', true);
      xhr.onload = () => {
        const data = JSON.parse(xhr.response);
        if (data.success) {
          const fileurl = window.URL.createObjectURL(ppField.files[0]);
          const userImage = document.querySelector('.user-image');
          ppDisplay.style.backgroundImage = `url('${fileurl}')`;
          userImage.style.backgroundImage = `url('${fileurl}')`;
        } else if (data.errors && data.errors.length > 0) {
          displayErrors(data.errors);
        }
      };
      xhr.send(formData);
    };

    settingSubmit.onclick = () => {
      const description = document.querySelector('textarea[name="description"]').value;
      const website = document.querySelector('input[name="website"]').value;
      const instagram = document.querySelector('input[name="instagram"]').value;
      const sponsorshiptype = Array.prototype.slice.call(
        document.querySelectorAll('input[name="sponsorshiptype"]:checked')
      ).map(el => el.value);

      const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&/=]*$/;

      let errors = [];
      let formData = {
        description,
        website,
        instagram,
        sponsorshiptype
      };

      if (
        sponsorshiptype &&
        !sponsorshiptype.every(
          value => validator.isIn(
            value, 
            [
              'İçerik/Konuşmacı', 
              'İndirim/Hediye Kuponu', 
              'Mekan', 
              'Nakit', 
              'Stand', 
              'Tanıtım', 
              'Ürün'
            ])
        )
      ) {
        errors.push({
          param: 'sponsorshiptype',
          error: 'Seçtiğiniz sponsorluk tipi geçerli değil.'
        });
      }
      if (website && !validator.matches(website, urlRegex)) {
        errors.push({
          param: 'website',
          error: 'Girdiğiniz internet sitesi geçerli değil.'
        });
      }

      if (userType === 'etkinlik') {
        const target = document.querySelector('input[name="target"]').value;
        const expectedAttendance = document.querySelector('input[name="expectedAttendance"]').value;
        const age = document.querySelector('select[name="age"]').value;
        const male = document.querySelector('input[name="male"]').value;
        const female = document.querySelector('input[name="female"]').value;
        let sponsors = document.querySelector('input[name="sponsors"]').value.split(',');
        if (!sponsors[0]) {
          sponsors = [];
        }
        const attendance = document.querySelector('input[name="attendance"]').value;
        const audience = document.querySelector('input[name="audience"]').value;
        const promotion = document.querySelector('input[name="promotion"]').value;
        let oldsponsors = document.querySelector('input[name="oldsponsors"]').value.split(',');
        if (!oldsponsors[0]) {
          oldsponsors = [];
        }

        if (
          age &&
          !validator.isIn(
            age, 
            [
              '0-6',
              '7-14',
              '15-17',
              '18-24',
              '25-34',
              '35-44',
              '45-65',
              '65+'
            ]
          )
        ) {
          errors.push({
            param: 'age',
            error: 'Seçtiğiniz yaş grubu geçerli değil.'
          });
        }

        formData = {
          ...formData, 
          target,
          expectedAttendance,
          age,
          male,
          female,
          sponsors,
          attendance,
          audience,
          promotion,
          oldsponsors
        };
      }
      
      if (errors.length > 0) {
        displayErrors(errors);
      } else {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/app/profile/edit', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onload = () => {
          const data = JSON.parse(xhr.response);
          if (data.success) {
            location.reload();
          } else if (data.errors && data.errors.length > 0) {
            displayErrors(data.errors);
          }
        };
        xhr.send(JSON.stringify(formData));
      }
    };
  }
};
