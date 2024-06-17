import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


let intervalId;
let initTime;
const refs = {
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    console.log(selectedDate);
    if (selectedDate <= new Date()) {
      showAlert("Please choose a date in the future");
      refs.startBtn.disabled = true;
    } else {
      initTime = selectedDate;
      refs.startBtn.disabled = false;
    }
  },
};

// Функція для відображення спливаючого повідомлення
function showAlert(message) {
  let alertDiv = document.createElement('div');
  alertDiv.classList.add('alert', 'show');
  alertDiv.textContent = message;
  document.body.prepend(alertDiv);

  // Видаляємо повідомлення через 5 секунди
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}
flatpickr('.js-input', options); 

refs.startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = initTime - currentTime;
    const time = convertMs(diff);
    refs.dataDays.textContent = time.d.toString().padStart(2, '0');
    refs.dataHours.textContent = time.h.toString().padStart(2, '0');
    refs.dataMinutes.textContent = time.m.toString().padStart(2, '0');
    refs.dataSeconds.textContent = time.s.toString().padStart(2, '0');


    console.log(time);
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
  }, initTime - Date.now());

  refs.startBtn.disabled = true;
});



function convertMs(ms) {
  let d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return { d: d, h: h, m: m, s: s };
    };



