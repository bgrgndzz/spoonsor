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
  if (errors.length > 0) displayErrors(errors); 
  document.addEventListener('click', (event) => {
    if (event.target && event.target.closest('.close-error-modal')) {
      const errorModalWrapper = document.querySelector('.error-modal-wrapper');
      toggleDisplay(errorModalWrapper, false);
    }
  });
};