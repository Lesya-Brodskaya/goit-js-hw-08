import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const form = document.querySelector('.feedback-form');

const savedKey = localStorage.getItem(STORAGE_KEY);

populateTextarea();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  try {
    const parseData = JSON.parse(savedKey);
    if (savedKey) {
      const formKeys = Object.keys(formData);
      formKeys.map(element => {
        document.querySelector(`[name='${element}']`).value =
          parseData[element];
      });
    }
  } catch (error) {
    console.log(error.name);
  }
}
