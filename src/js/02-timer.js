import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const inputRef = document.querySelector('#datetime-picker');
const startTimerBtnRef = document.querySelector('[data-start]');
const secondsValueRef = document.querySelector('[data-seconds]');
const minutesValueRef = document.querySelector('[data-minutes]');
const hoursValueRef = document.querySelector('[data-hours]');
const daysValueRef = document.querySelector('[data-days]');

startTimerBtnRef.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] - new Date() <= 0) {
      // return window.alert('Please choose a date in the future');

      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startTimerBtnRef.removeAttribute('disabled');
    }
  },
};

flatpickr(inputRef, options);

const countdownTimer = {
  intervalId: null,
  isActive: false,

  start(date) {
    if (this.isActive) {
      return;
    }
    this.intervalId = setInterval(() => {
      startTimerBtnRef.setAttribute('disabled', true);
      this.isActive = true;
      const startTime = date;
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const timeConverted = convertMs(deltaTime);

      leftDate(timeConverted);

      if (deltaTime <= 1000) {
        Notiflix.Notify.success('Time is up');
        clearInterval(this.intervalId);
        this.isActive = false;
        return;
      }
    }, 1000);
  },
};

startTimerBtnRef.addEventListener('click', onTimerStart);

function onTimerStart(event) {
  event.preventDefault();
  const date = new Date(inputRef.value);

  countdownTimer.start(date);
}
function leftDate({ days, hours, minutes, seconds }) {
  daysValueRef.textContent = days;
  hoursValueRef.textContent = hours;
  minutesValueRef.textContent = minutes;
  secondsValueRef.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
