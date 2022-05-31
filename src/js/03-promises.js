import Notiflix from 'notiflix';

const formElement = document.querySelector(".form");

const formData = {};

//----------------------------------

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  })
  
}

const formSubmit = event => {
  event.preventDefault();

  let delayTime = Number(formData.delay);
  for (let i = 0; i < formData.amount; i += 1) {
    setTimeout(() => {
      createPromise(i + 1, delayTime + i * Number(formData.step))
      .then(message => Notiflix.Notify.success(message))
      .catch(error => Notiflix.Notify.failure(error));
    }, delayTime + i * Number(formData.step));
  }
}

function formInput(event) {
  formData[event.target.name] = event.target.value;
}

//----------------------------------

formElement.addEventListener('submit', formSubmit);
formElement.addEventListener('input', formInput);