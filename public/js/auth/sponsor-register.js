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
const hideForm = (forms, currentForm, type = 'front') => {
  forms[currentForm].classList.remove('fadeInRight');
  forms[currentForm].classList.remove('fadeInLeft');
  forms[currentForm].classList.add('fadeOut' + (type === 'front' ? 'Left' : 'Right'));
  ((currentForm) => {
    setTimeout(() => forms[currentForm].style.display = 'none', 1000);
  })(currentForm);
};
const showForm = (forms, currentForm, type = 'front') => {
  forms[currentForm].style.display = 'block';
  forms[currentForm].classList.remove('fadeOutLeft');
  forms[currentForm].classList.remove('fadeOutRight');
  forms[currentForm].classList.add('fadeIn' + (type === 'front' ? 'Right' : 'Left'));
  scrollTo(document.querySelector('html'), 0, 500);
};
const validateCurrentForm = (currentForm) => {
  const {isEmpty, isEmail, isIn, equals, matches} = validator;

  const phoneRegex = /^(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

  let errors = [];

  if (currentForm === 0) {
    const name = document.querySelector('input[name="name"]').value;
    const surname = document.querySelector('input[name="surname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    if (!name || isEmpty(name)) {
      errors.push({
        param: 'name',
        error: 'Lütfen adınızı yazın.'
      });
    }
    if (!surname || isEmpty(surname)) {
      errors.push({
        param: 'surname',
        error: 'Lütfen soyadınızı yazın.'
      });
    }
    if (!email || isEmpty(email)) {
      errors.push({
        param: 'email',
        error: 'Lütfen e-mailinizi yazın.'
      });
    } else if (!isEmail(email)) {
      errors.push({
        param: 'email',
        error: 'Girdiğiniz e-mail geçerli değil.'
      });
    }
  } else if (currentForm === 1) {
    const sponsorname = document.querySelector('input[name="sponsorname"]').value;
    if (!sponsorname || isEmpty(sponsorname)) {
      errors.push({
        param: 'sponsorname',
        error: 'Lütfen şirketinizin adını yazın.'
      });
    }
  } else if (currentForm === 2) {
    const sponsordescription = document.querySelector('textarea[name="sponsordescription"]').value;
    if (!sponsordescription || isEmpty(sponsordescription)) {
      errors.push({
        param: 'sponsordescription',
        error: 'Lütfen şirketinizi birkaç cümleyle açıklayın.'
      });
    }
  } else if (currentForm === 3) {
    const sponsorshiptypeRadio = document.querySelectorAll('input[name="sponsorshiptype"]:checked');
    const sponsorshiptype = sponsorshiptypeRadio ? Array.prototype.slice.call(sponsorshiptypeRadio).map(el => el.value) : [];

    if (!sponsorshiptype || sponsorshiptype.length === 0) {
      errors.push({
        param: 'sponsorshiptype',
        error: 'Lütfen sağlayabileceğiniz sponsorluk tipini seçin.'
      });
    } else if (
      !sponsorshiptype.every(
        value => isIn(
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
  } else if (currentForm === 4) {
    const phone = document.querySelector('input[name="phone"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const password2 = document.querySelector('input[name="password2"]').value;
    if (!phone || isEmpty(phone)) {
      errors.push({
        param: 'phone',
        error: 'Lütfen telefon numaranızı yazın.'
      });
    } else if (!matches(phone, phoneRegex)) {
      errors.push({
        param: 'phone',
        error: 'Girdiğiniz telefon numarası geçerli değil.'
      });
    }
    if (!password || isEmpty(password)) {
      errors.push({
        param: 'password',
        error: 'Lütfen bir şifre girin.'
      });
    }
    if (!password2 || isEmpty(password2)) {
      errors.push({
        param: 'password2',
        error: 'Lütfen şifrenizi tekrar yazarak doğrulayın.'
      });
    } else if (!equals(password2, password)) {
      errors.push({
        param: 'password2',
        error: 'Şifre doğrulanamadı, lütfen iki kutucuğa da aynı şifreyi yazdığınızdan emin olun.'
      });
    }
  }

  if (errors.length > 0) {
    displayErrors(errors);
    return false;
  }

  return true;
};
const nextForm = (forms, currentForm, formsBack, type = 'front') => {
  if (type === 'back' || validateCurrentForm(currentForm)) {
    hideForm(forms, currentForm, type);
    currentForm = type === 'front' ? currentForm + 1 : currentForm - 1;
    toggleDisplay(formsBack, currentForm > 0);
    showForm(forms, currentForm, type);
  }
  return currentForm;
};

window.onload = () => {
  if (errors.length > 0) displayErrors(errors);
  let currentForm = 0;
  const formsBack = document.querySelector('.forms-back');
  const forms = document.querySelectorAll('.form-wrapper');
  const nextButtons = document.querySelectorAll('.button--next');
  const modalWrapper = document.querySelector('.error-modal-wrapper');
  const closeModalButtons = document.querySelectorAll('.close-error-modal');
  const submitButton = document.querySelector('.button--submit');

  closeModalButtons.forEach(closeModalButton => {
    closeModalButton.onclick = () => toggleDisplay(modalWrapper, false);
  });
  formsBack.onclick = () => {currentForm = nextForm(forms, currentForm, formsBack, 'back')};
  document.addEventListener('click', (event) => {
    if (event.target && event.target.closest('.button--next')) {
      event.preventDefault();
      currentForm = nextForm(forms, currentForm, formsBack);
    }
  });
  submitButton.onclick = (event) => {
    if (
      Array.from({length: 10}, (_, i) => i)
        .some((formCursor) => !validateCurrentForm(formCursor))
    ) {
      event.preventDefault();
    }
  };
};