import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

populateTextarea();

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const parseData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (parseData) {
    const formKeys = Object.keys(parseData);
    formKeys.map(element => {
      document.querySelector(`[name='${element}']`).value = parseData[element];
    });
  }
}
