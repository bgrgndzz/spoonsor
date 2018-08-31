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
const validateCurrentForm = (currentForm, userType) => {
  const {isEmpty, isEmail, isIn, equals, matches} = validator;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
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
    const etkinlikname = document.querySelector('input[name="etkinlikname"]').value;
    if (!etkinlikname || isEmpty(etkinlikname)) {
      errors.push({
        param: 'etkinlikname',
        error: 'Lütfen etkinliğinizin ismini girin.'
      });
    }
  } else if (currentForm === 2) {
    const start = document.querySelector('input[name="start"]').value;
    const end = document.querySelector('input[name="end"]').value;
    const location = document.querySelector('input[name="location"]').value;
    if (!start || isEmpty(start)) {
      errors.push({
        param: 'start',
        error: 'Lütfen etkinliğinizin başlangıç tarihini girin.'
      });
    } else if (!matches(start, dateRegex)) {
      errors.push({
        param: 'start',
        error: 'Girdiğiniz etkinlik başlangıç tarihi geçerli değil.'
      });
    }
    if (!end || isEmpty(end)) {
      errors.push({
        param: 'end',
        error: 'Lütfen etkinliğinizin bitiş tarihini girin.'
      });
    } else if (!matches(end, dateRegex)) {
      errors.push({
        param: 'end',
        error: 'Girdiğiniz etkinlik bitiş tarihi geçerli değil.'
      });
    }
    if (!location || isEmpty(location)) {
      errors.push({
        param: 'location',
        error: 'Lütfen etkinliğinizin olacağı yeri girin.'
      });
    }
  } else if (currentForm === 3) {
    const typeRadio = document.querySelector('input[name="type"]:checked');
    let type = typeRadio ? typeRadio.value : '';

    const othertype = document.querySelector('.radios--type .field--other').value;
    type = type === 'Diğer' ? othertype : type;

    if (!type || isEmpty(type)) {
      errors.push({
        param: 'type',
        error: 'Lütfen etkinliğinizin türünü girin.'
      });
    }
  } else if (currentForm === 4) {
    const subjectRadio = document.querySelector('input[name="subject"]:checked');
    let subject = subjectRadio ? subjectRadio.value : '';

    const othersubject = document.querySelector('.radios--subject .field--other').value;
    subject = subject === 'Diğer' ? othersubject : subject;

    if (!subject || isEmpty(subject)) {
      errors.push({
        param: 'subject',
        error: 'Lütfen etkinliğinizin konusunu girin.'
      });
    }
  } else if (currentForm === 5) {
    const sponsorshiptypeRadio = document.querySelectorAll('input[name="sponsorshiptype"]:checked');
    const sponsorshiptype = sponsorshiptypeRadio ? Array.prototype.slice.call(sponsorshiptypeRadio).map(el => el.value) : [];

    if (!sponsorshiptype || sponsorshiptype.length === 0) {
      errors.push({
        param: 'sponsorshiptype',
        error: 'Lütfen istediğiniz sponsorluk tipini seçin.'
      });
    } else if (
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
  } else if (currentForm === 6) {
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
const nextForm = (forms, currentForm, formsBack, userType, type = 'front') => {
  if (type === 'back' || validateCurrentForm(currentForm, userType)) {
    hideForm(forms, currentForm, type);
    currentForm = type === 'front' ? currentForm + 1 : currentForm - 1;
    toggleDisplay(formsBack, currentForm > 0);
    showForm(forms, currentForm, type);
  }
  return currentForm;
};

window.onload = () => {
  let userType = '';
  let currentForm = 0;
  const formsBack = document.querySelector('.forms-back');
  const forms = document.querySelectorAll('.form-wrapper');
  const nextButtons = document.querySelectorAll('.button--next');
  const typeRadios = document.querySelectorAll('.radios--type .radio');
  const typeOtherRadio = document.querySelector('.radios--type .radio--other');
  const typeOtherField = document.querySelector('.radios--type .field--other');
  const subjectRadios = document.querySelectorAll('.radios--subject .radio');
  const subjectOtherRadio = document.querySelector('.radios--subject .radio--other');
  const subjectOtherField = document.querySelector('.radios--subject .field--other');
  const modalWrapper = document.querySelector('.error-modal-wrapper');
  const closeModalButtons = document.querySelectorAll('.close-error-modal');
  const submitButton = document.querySelector('.button--submit');

  closeModalButtons.forEach(closeModalButton => {
    closeModalButton.onclick = () => toggleDisplay(modalWrapper, false);
  });
  formsBack.onclick = () => {currentForm = nextForm(forms, currentForm, formsBack, userType, 'back')};
  nextButtons.forEach(nextButton => {
    nextButton.onclick = () => {currentForm = nextForm(forms, currentForm, formsBack, userType)};
  });
  typeRadios.forEach(typeRadio => {
    typeRadio.onchange = () => toggleDisplay(typeOtherField, typeOtherRadio.checked, .5);
  });
  subjectRadios.forEach(subjectRadio => {
    subjectRadio.onchange = () => toggleDisplay(subjectOtherField, subjectOtherRadio.checked, .5);
  });

  submitButton.onclick = () => {
    if (
      Array.from({length: 10}, (_, i) => i)
        .every((formCursor) => validateCurrentForm(formCursor, userType))
    ) {
      const name = document.querySelector('input[name="name"]').value;
      const surname = document.querySelector('input[name="surname"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const etkinlikname = document.querySelector('input[name="etkinlikname"]').value;
      const start = document.querySelector('input[name="start"]').value;
      const end = document.querySelector('input[name="end"]').value;
      const location = document.querySelector('input[name="location"]').value;
      const phone = document.querySelector('input[name="phone"]').value;
      const password = document.querySelector('input[name="password"]').value;
      const password2 = document.querySelector('input[name="password2"]').value;

      const sponsorshiptype = Array.prototype.slice.call(
        document.querySelectorAll('input[name="sponsorshiptype"]:checked')
      ).map(el => el.value);

      let type = document.querySelector('input[name="type"]:checked').value;
      const othertype = document.querySelector('.radios--type .field--other').value;
      type = type === 'Diğer' ? othertype : type;

      let subject = document.querySelector('input[name="subject"]:checked').value;
      const othersubject = document.querySelector('.radios--subject .field--other').value;
      subject = subject === 'Diğer' ? othersubject : subject;

      let formData = {
        name,
        surname,
        email,
        phone,
        password,
        password2,
        sponsorshiptype,
        etkinlikname,
        start,
        end,
        location,
        type,
        subject
      };

      fetch('/auth/register', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          window.location.href = '/app/';
        } else if (data.errors && data.errors.length > 0) {
          displayErrors(data.errors);
        }
      })
      .catch((err) => displayErrors([{error: 'Bilinmeyen bir hata oluştu.'}]));
    }
  };
};