// title validation
function validateTitle(value) {
  if (value.trim().length < 1 || value.trim().length > 100) {
    return { valid: false, message: 'Title must be 1-100 characters long.' };
  }
  return { valid: true, message: '' };
}

// author validation
function validateAuthor(value) {
  if (value.trim().length < 1 || value.trim().length > 50) {
    return { valid: false, message: 'Author must be 1-50 characters long.' };
  }
  return { valid: true, message: '' };
}

// year validation
function validateYear(value) {
  const year = Number(value);
  if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
    return {
      valid: false,
      message: 'Year must be a number between 1000 and the current year.',
    };
  }
  return { valid: true, message: '' };
}

// length validation
function validateLength(value) {
  const length = Number(value);
  if (isNaN(length) || !Number.isInteger(length) || length < 1) {
    return { valid: false, message: 'Length must be a positive integer.' };
  }
  return { valid: true, message: '' };
}

// ISBN validation (simple check for 10 or 13 digits)
function validateISBN(value) {
  const isbn = value.replace(/[-\s]/g, ''); // remove dashes and spaces
  if (!/^\d{10}(\d{3})?$/.test(isbn)) {
    return {
      valid: false,
      message: 'ISBN must be a 10 or 13 digit number (dashes/spaces allowed).',
    };
  }
  return { valid: true, message: '' };
}

// DOM elements for validation messages
function showValidationMessage(input, result) {
  const existing = input.parentNode.querySelector('.error-message');
  if (!existing && !result.valid) {
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = result.message;
    errorMessage.style.color = 'red';
    input.parentNode.appendChild(errorMessage);
  } else if (existing && !result.valid) {
    existing.textContent = result.message;
  } else if (existing && result.valid) {
    input.parentNode.removeChild(existing);
  }
}

// add eventlisteners (blue and input) to form inputs for real-time validation

function initFieldValidation(input, validator) {
  input.addEventListener('blur', () => {
    const result = validator(input.value);
    showValidationMessage(input, result);
  });

  input.addEventListener('input', () => {
    const result = validator(input.value);
    showValidationMessage(input, result);
  });
}
