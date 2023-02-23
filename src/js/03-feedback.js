import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const form = document.querySelector('.feedback-form');

populateTextarea();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  evt.currentTarget.reset();
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
}

function populateTextarea() {
  let formData = localStorage.getItem(STORAGE_KEY);
  if (formData) {
    try {
      formData = JSON.parse(formData);
      Object.entries(formData).forEach(([name, value]) => {
        form.elements[name].value = value;
      });
    } catch (error) {
      console.error(
        'Error: invalid saved form state in LocalStorage!' + STORAGE_KEY
      );
      console.error(error);
    }
  }
}
