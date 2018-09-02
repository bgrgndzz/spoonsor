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

const validateCurrentForm = () => {
  const {isEmpty, isEmail} = validator;

  let errors = [];

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  if (!email || isEmpty(email)) {
    errors.push({
      param: 'email',
      error: 'Lütfen e-mailinizi girin.'
    });
  } else if (!isEmail(email)) {
    errors.push({
      param: 'email',
      error: 'Girdiğiniz e-mail geçerli değil.'
    });
  }
  if (!password || isEmpty(password)) {
    errors.push({
      param: 'password',
      error: 'Lütfen şifrenizi girin.'
    });
  }

  if (errors.length > 0) {
    displayErrors(errors);
    return false;
  }

  return true;
}

window.onload = () => {
  if (errors.length > 0) displayErrors(errors);
  const modalWrapper = document.querySelector('.error-modal-wrapper');
  const closeModalButtons = document.querySelectorAll('.close-error-modal');
  const submitButton = document.querySelector('.button--submit');

  closeModalButtons.forEach(closeModalButton => {
    closeModalButton.onclick = () => toggleDisplay(modalWrapper, false);
  });

  submitButton.onclick = (event) => {
    if (!validateCurrentForm()) {
      event.preventDefault();
    }
  };
};