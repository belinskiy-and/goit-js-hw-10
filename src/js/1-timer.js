import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datatimeElem = document.querySelector('#datetime-picker');
const startButtonElem = document.querySelector('[data-start]');
const timerElem = document.querySelector('.timer');

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
  },
};

startButtonElem.disabled = true;
startButtonElem.addEventListener('click', startTimer);

const fp = flatpickr(datatimeElem, options);

function checkDate(value) {
  userSelectedDate = value.getTime();

  if (userSelectedDate <= Date.now()) {
    startButtonElem.disabled = true;

    iziToast.error({
      message: 'Please choose a date in the future',
      maxWidth: '300px',
      position: 'topRight',
    });
  } else {
    startButtonElem.disabled = false;
  }
}

function startTimer() {
  timerId = setInterval(() => {
    const currentTime = Date.now();
    if (!(userSelectedDate > currentTime)) {
      clearInterval(timerId);
      datatimeElem.disabled = false;
      return;
    }

    const timeObject = convertMs(userSelectedDate - currentTime);

    timerElem.innerHTML = getTimerMarkup(timeObject);
  }, 1000);

  startButtonElem.disabled = true;
  datatimeElem.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function getTimerMarkup({ days, hours, minutes, seconds }) {
  return `
    <div class="field">
      <span class="value" data-days>${addLeadingZero(days)}</span>
      <span class="label">Days</span>
    </div>
    <div class="field">
      <span class="value" data-hours>${addLeadingZero(hours)}</span>
      <span class="label">Hours</span>
    </div>
    <div class="field">
      <span class="value" data-minutes>${addLeadingZero(minutes)}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="field">
      <span class="value" data-seconds>${addLeadingZero(seconds)}</span>
      <span class="label">Seconds</span>
    </div>
  `;
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
