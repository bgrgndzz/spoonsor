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
    const modalWrapper = document.querySelector('.modal-wrapper');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
  
    const settingReveals = document.querySelectorAll('.setting-reveal');
    const settingSubmit = document.querySelector('.submit-button');
    const ppField = document.querySelector('input[name="profilepicture"]');
    const ppDisplay = document.querySelector('.profile-picture-display');
    

    const errorModalWrapper = document.querySelector('.error-modal-wrapper');
    const closeErrorModalButtons = document.querySelectorAll('.close-error-modal');

    closeErrorModalButtons.forEach(closeModalButton => {
      closeModalButton.onclick = () => toggleDisplay(errorModalWrapper, false);
    });
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
      }

      const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&/=]*$/;

      let errors = [];

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
      }
      
      if (errors.length > 0) {
        displayErrors(errors);
      } else {
        let formData = {
          description,
          sponsorshiptype,
          website,
          instagram
        };
        if (userType === 'etkinlik') {
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

        fetch('/app/profile/edit', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(formData)
        })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            location.reload();
          } else if (data.errors && data.errors.length > 0) {
            displayErrors(data.errors);
          }
        })
        .catch((err) => {
          displayErrors([{error: 'Bilinmeyen bir hata oluştu.'}]);
        });
      }
    };
  }
};
