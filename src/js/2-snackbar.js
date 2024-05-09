import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
// console.log(form);

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const element = event.currentTarget.elements;
  // console.log(element);
  const state = element.state.value;
  const delay = Number(element.delay.value);
  // console.log(state, delay);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        position: 'topCenter',
        backgroundColor: 'green',
        messageColor: 'white',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.show({
        position: 'topCenter',
        backgroundColor: 'red',
        messageColor: 'white',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}
