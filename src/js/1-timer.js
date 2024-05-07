import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
let intervalId = null;
let isActive = false;

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysOnClockFace: document.querySelector('[data-days'),
  hoursOnClockFace: document.querySelector('[data-hours'),
  minutesOnClockFace: document.querySelector('[data-minutes]'),
  secondsOnClockFace: document.querySelector('[data-seconds]'),
};
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      iziToast.error({
        // title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
      // window.alert('Please choose a date in the future');
      // selectedDates[0] = new Date();
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

function pad(value) {
  return String(value).padStart(2, '0');
}

// Малюємо інтерфейс

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.daysOnClockFace.textContent = `${days}`;
  refs.hoursOnClockFace.textContent = `${hours}`;
  refs.minutesOnClockFace.textContent = `${minutes}`;
  refs.secondsOnClockFace.textContent = `${seconds}`;
}

// let isActive = false;
// let counter = 0;
const timer = {
  start() {
    if (isActive) return;

    isActive = true;
    refs.input.disabled = true;
    refs.startBtn.disabled = true;
    // const initialTime = Date.now();
    // // console.log(initialtime);
    intervalId = setInterval(() => {
      const currentTime = Date.now();
      // console.log(currentTime);
      const deltaTime = userSelectedDate - currentTime;
      console.log(deltaTime);

      if (deltaTime < 0) {
        clearInterval(intervalId);
        isActive = false;
        updateClockFace({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
        refs.input.disabled = false;
        return;
      }
      const time = convertMs(deltaTime);
      console.log(time);
      updateClockFace(time);
      // refs.daysOnClockFace.innerHTML = `${time.days}`;
      // refs.hoursOnClockFace.innerHTML = `${time.hours}`;
      // refs.minutesOnClockFace.innerHTML = `${time.minutes}`;
      // refs.secondsOnClockFace.innerHTML = `${time.seconds}`;
    }, 1000);
    // counter += 1;
    // console.log(counter);
  },
};

// timer.start();
refs.startBtn.addEventListener('click', () => {
  timer.start();
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// Малюємо інтерфейс
