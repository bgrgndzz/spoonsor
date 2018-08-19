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
const validateCurrentForm = (forms, currentForm, userType) => {
  const formUsers = {
    'etkinlik': 'proje',
    'proje': 'etkinlik'
  };
  return !userType || !forms[currentForm].classList.contains('form-wrapper--' + formUsers[userType]);
}
const nextForm = (forms, currentForm, formsBack, userType, type = 'front') => {
  hideForm(forms, currentForm, type);
  currentForm = type === 'front' ? currentForm + 1 : currentForm - 1;
  if (!validateCurrentForm(forms, currentForm, userType)) {
    return nextForm(forms, currentForm, formsBack, userType, type);
  }
  toggleDisplay(formsBack, currentForm > 0);
  showForm(forms, currentForm, type);
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
};