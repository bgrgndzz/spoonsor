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
  const modalWrapper = document.querySelector('.error-modal-wrapper');
  const closeModalButtons = document.querySelectorAll('.close-error-modal');
  const submitButton = document.querySelector('.button--submit');

  closeModalButtons.forEach(closeModalButton => {
    closeModalButton.onclick = () => toggleDisplay(modalWrapper, false);
  });

  submitButton.onclick = (event) => {
    event.preventDefault();
    if (validateCurrentForm()) {
      const email = document.querySelector('input[name="email"]').value;
      const password = document.querySelector('input[name="password"]').value;

      let formData = {
        email,
        password
      };

      fetch('/auth/login', {
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
          window.location.href = '/app/sponsors';
        } else if (data.errors && data.errors.length > 0) {
          displayErrors(data.errors);
        }
      })
      .catch((err) => displayErrors([{error: 'Bilinmeyen bir hata oluştu.'}]));
    }
  };
};