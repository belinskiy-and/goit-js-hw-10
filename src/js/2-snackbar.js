import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const delay = Number(e.target.elements.delay.value);
  const state = e.target.elements.state.value;

  showNotification(delay, state);

  e.target.reset();
}

function showNotification(delay, state) {
  startTimer(delay, state)
    .then(message => {
      iziToast.show({
        message,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        message: error,
        position: 'topRight',
      });
    });
}

function startTimer(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else if (state === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
