// flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Notiflix
import Notiflix from 'notiflix';

//-----------------------------------------------------

const dataPicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysElement = document.querySelector('span[data-days]');
const hoursElement = document.querySelector('span[data-hours]');
const minutesElement = document.querySelector('span[data-minutes]');
const secondsElement = document.querySelector('span[data-seconds]');
let intervalId = null;
let selectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        }
        startButton.disabled = false;
        selectedDate = selectedDates[0];
    },  
};

//-----------------------------------------------------

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

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

const startTimer = event => {
    intervalId = setInterval(() => {
        const currentData = new Date();        
        const dateInterval = selectedDate.getTime() - currentData.getTime();

        if (dateInterval < 0) {
            clearInterval(intervalId);
            return;
        }
        
        showTimer(convertMs(dateInterval));
    }, 1000);
}

function showTimer(value) {
    daysElement.textContent = addLeadingZero(value.days);
    hoursElement.textContent = addLeadingZero(value.hours);
    minutesElement.textContent = addLeadingZero(value.minutes);
    secondsElement.textContent = addLeadingZero(value.seconds);
  }

//-----------------------------------------------------

startButton.disabled = true;
startButton.addEventListener('click', startTimer);

const result = flatpickr(dataPicker, options);
