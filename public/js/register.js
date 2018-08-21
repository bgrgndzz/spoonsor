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
  toggleDisplay(modalWrapper, 1);
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
const validateCurrentView = (forms, currentForm, userType) => {
  const formUsers = {
    'etkinlik': 'proje',
    'proje': 'etkinlik'
  };
  return !userType || !forms[currentForm].classList.contains('form-wrapper--' + formUsers[userType]);
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
    const typeRadio = document.querySelector('input[name="type"]:checked');
    const type = typeRadio ? typeRadio.value : '';
    if (!type || isEmpty(type)) {
      errors.push({
        param: 'type',
        error: 'Lütfen bir hesap türü seçin.'
      });
    } else if (!isIn(type, ['etkinlik', 'proje'])) {
      errors.push({
        param: 'type',
        error: 'Seçtiğiniz hesap türü geçerli değil.'
      });
    }
  } else if (currentForm === 2 && userType === 'etkinlik') {
    const etkinlikname = document.querySelector('input[name="etkinlikname"]').value;
    if (!etkinlikname || isEmpty(etkinlikname)) {
      errors.push({
        param: 'etkinlikname',
        error: 'Lütfen etkinliğinizin ismini girin.'
      });
    }
  } else if (currentForm === 3 && userType === 'etkinlik') {
    const etkinlikstart = document.querySelector('input[name="etkinlikstart"]').value;
    const etkinlikend = document.querySelector('input[name="etkinlikend"]').value;
    const etkinlikplace = document.querySelector('input[name="etkinlikplace"]').value;
    if (!etkinlikstart || isEmpty(etkinlikstart)) {
      errors.push({
        param: 'etkinlikstart',
        error: 'Lütfen etkinliğinizin başlangıç tarihini girin.'
      });
    } else if (!matches(etkinlikstart, dateRegex)) {
      errors.push({
        param: 'etkinlikstart',
        error: 'Girdiğiniz etkinlik başlangıç tarihi geçerli değil.'
      });
    }
    if (!etkinlikend || isEmpty(etkinlikend)) {
      errors.push({
        param: 'etkinlikend',
        error: 'Lütfen etkinliğinizin bitiş tarihini girin.'
      });
    } else if (!matches(etkinlikend, dateRegex)) {
      errors.push({
        param: 'etkinlikend',
        error: 'Girdiğiniz etkinlik bitiş tarihi geçerli değil.'
      });
    }
    if (!etkinlikplace || isEmpty(etkinlikplace)) {
      errors.push({
        param: 'etkinlikplace',
        error: 'Lütfen etkinliğinizin olacağı yeri girin.'
      });
    }
  } else if (currentForm === 4 && userType === 'etkinlik') {
    const etkinliktypeRadio = document.querySelector('input[name="etkinliktype"]:checked');
    let etkinliktype = etkinliktypeRadio ? etkinliktypeRadio.value : '';

    const otherEtkinliktype = document.querySelector('.radios--etkinlik-type .field--other').value;
    etkinliktype = etkinliktype === 'Diğer' ? otherEtkinliktype : etkinliktype;

    if (!etkinliktype || isEmpty(etkinliktype)) {
      errors.push({
        param: 'etkinliktype',
        error: 'Lütfen etkinliğinizin türünü girin.'
      });
    }
  } else if (currentForm === 5 && userType === 'etkinlik') {
    const etkinliksubjectRadio = document.querySelector('input[name="etkinliksubject"]:checked');
    let etkinliksubject = etkinliksubjectRadio ? etkinliksubjectRadio.value : '';

    const otherEtkinliksubject = document.querySelector('.radios--etkinlik-subject .field--other').value;
    etkinliksubject = etkinliksubject === 'Diğer' ? otherEtkinliksubject : etkinliksubject;

    if (!etkinliksubject || isEmpty(etkinliksubject)) {
      errors.push({
        param: 'etkinliksubject',
        error: 'Lütfen etkinliğinizin konusunu girin.'
      });
    }
  } else if (currentForm === 6 && userType === 'proje') {
    const projename = document.querySelector('input[name="projename"]').value;
    const projestart = document.querySelector('input[name="projestart"]').value;
    const projeend = document.querySelector('input[name="projeend"]').value;
    if (!projename || isEmpty(projename)) {
      errors.push({
        param: 'projename',
        error: 'Lütfen projenizin ismini girin.'
      });
    }
    if (!projestart || isEmpty(projestart)) {
      errors.push({
        param: 'projestart',
        error: 'Lütfen projenizin başlangıç tarihini girin.'
      });
    } else if (!matches(projestart, dateRegex)) {
      errors.push({
        param: 'projestart',
        error: 'Girdiğiniz proje başlangıç tarihi geçerli değil.'
      });
    }
    if (!projeend || isEmpty(projeend)) {
      errors.push({
        param: 'projeend',
        error: 'Lütfen projenizin bitiş tarihini girin.'
      });
    } else if (!matches(projeend, dateRegex)) {
      errors.push({
        param: 'projeend',
        error: 'Girdiğiniz proje bitiş tarihi geçerli değil.'
      });
    }
  } else if (currentForm === 7 && userType === 'proje') {
    const projesubjectRadio = document.querySelector('input[name="projesubject"]:checked');
    let projesubject = projesubjectRadio ? projesubjectRadio.value : '';

    const otherProjesubject = document.querySelector('.radios--proje-subject .field--other').value;
    projesubject = projesubject === 'Diğer' ? otherProjesubject : projesubject;

    if (!projesubject || isEmpty(projesubject)) {
      errors.push({
        param: 'projesubject',
        error: 'Lütfen projenizin konusunu girin.'
      });
    }
  } else if (currentForm === 8) {
    const sponsorshiptypeRadio = document.querySelectorAll('input[name="sponsorshiptype"]:checked');
    const sponsorshiptype = sponsorshiptypeRadio ? Array.prototype.slice.call(sponsorshiptypeRadio).map(el => el.value) : [];

    if (!sponsorshiptype || sponsorshiptype.length === 0) {
      errors.push({
        param: 'sponsorshiptype',
        error: 'Lütfen istediğiniz sponsorluk tipini seçin.'
      });
    } else if (
      !sponsorshiptype.every(
        value => validator.isIn(value, ['İçerik', 'İndirim/Hediye Kuponu', 'Mekan', 'Stand', 'Ürün'])
      )
    ) {
      errors.push({
        param: 'sponsorshiptype',
        error: 'Seçtiğiniz sponsorluk tipi geçerli değil.'
      });
    }
  } else if (currentForm === 9) {
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
    if (!validateCurrentView(forms, currentForm, userType)) {
      return nextForm(forms, currentForm, formsBack, userType, type);
    }
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
  const typeRadios = document.querySelectorAll('.form-wrapper--2 .radio');
  const etkinlikTypeRadios = document.querySelectorAll('.radios--etkinlik-type .radio');
  const etkinlikTypeOtherRadio = document.querySelector('.radios--etkinlik-type .radio--other');
  const etkinlikTypeOtherField = document.querySelector('.radios--etkinlik-type .field--other');
  const etkinlikSubjectRadios = document.querySelectorAll('.radios--etkinlik-subject .radio');
  const etkinlikSubjectOtherRadio = document.querySelector('.radios--etkinlik-subject .radio--other');
  const etkinlikSubjectOtherField = document.querySelector('.radios--etkinlik-subject .field--other');
  const projeSubjectRadios = document.querySelectorAll('.radios--proje-subject .radio');
  const projeSubjectOtherRadio = document.querySelector('.radios--proje-subject .radio--other');
  const projeSubjectOtherField = document.querySelector('.radios--proje-subject .field--other');
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
    typeRadio.onchange = () => userType = typeRadio.checked ? typeRadio.value : userType;
  });
  etkinlikTypeRadios.forEach(etkinlikTypeRadio => {
    etkinlikTypeRadio.onchange = () => toggleDisplay(etkinlikTypeOtherField, etkinlikTypeOtherRadio.checked, .5);
  });
  etkinlikSubjectRadios.forEach(etkinlikSubjectRadio => {
    etkinlikSubjectRadio.onchange = () => toggleDisplay(etkinlikSubjectOtherField, etkinlikSubjectOtherRadio.checked, .5);
  });
  projeSubjectRadios.forEach(projeSubjectRadio => {
    projeSubjectRadio.onchange = () => toggleDisplay(projeSubjectOtherField, projeSubjectOtherRadio.checked, .5);
  });

  submitButton.onclick = () => {
    if (
      userType && 
      Array.from({length: 10}, (_, i) => i)
        .every((formCursor) => validateCurrentForm(formCursor, userType))
    ) {
      const name = document.querySelector('input[name="name"]').value;
      const surname = document.querySelector('input[name="surname"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const type = document.querySelector('input[name="type"]:checked').value;
      const phone = document.querySelector('input[name="phone"]').value;
      const password = document.querySelector('input[name="password"]').value;
      const password2 = document.querySelector('input[name="password2"]').value;

      const sponsorshiptype = Array.prototype.slice.call(
        document.querySelectorAll('input[name="sponsorshiptype"]:checked')
      ).map(el => el.value);

      let formData = {
        name,
        surname,
        email,
        type,
        phone,
        password,
        password2,
        sponsorshiptype
      };

      if (userType === 'etkinlik') {
        const etkinlikname = document.querySelector('input[name="etkinlikname"]').value;
        const etkinlikstart = document.querySelector('input[name="etkinlikstart"]').value;
        const etkinlikend = document.querySelector('input[name="etkinlikend"]').value;
        const etkinlikplace = document.querySelector('input[name="etkinlikplace"]').value;

        let etkinliktype = document.querySelector('input[name="etkinliktype"]:checked').value;
        const otherEtkinliktype = document.querySelector('.radios--etkinlik-type .field--other').value;
        etkinliktype = etkinliktype === 'Diğer' ? otherEtkinliktype : etkinliktype;

        let etkinliksubject = document.querySelector('input[name="etkinliksubject"]:checked').value;
        const otherEtkinliksubject = document.querySelector('.radios--etkinlik-subject .field--other').value;
        etkinliksubject = etkinliksubject === 'Diğer' ? otherEtkinliksubject : etkinliksubject;

        formData = {
          ...formData,
          etkinlikname,
          etkinlikstart,
          etkinlikend,
          etkinlikplace,
          etkinliktype,
          etkinliksubject
        };
      } else if (userType === 'proje') {
        const projename = document.querySelector('input[name="projename"]').value;
        const projestart = document.querySelector('input[name="projestart"]').value;
        const projeend = document.querySelector('input[name="projeend"]').value;

        let projesubject = document.querySelector('input[name="projesubject"]:checked').value;
        const otherProjesubject = document.querySelector('.radios--proje-subject .field--other').value;
        projesubject = projesubject === 'Diğer' ? otherProjesubject : projesubject;

        formData = {
          ...formData,
          projename,
          projestart,
          projeend,
          projesubject
        };
      }

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