import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';

let intervalId;
let initTime;
const refs = {
  startBtn: document.querySelector('[data-start]'),
  dateTimePicker: document.querySelector('#datetime-picker'),
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
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: '❌',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
    } else {
      initTime = selectedDate;
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.dateTimePicker, options);

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.dateTimePicker.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = initTime - currentTime;
    if (diff <= 0) {
      clearInterval(intervalId);
      iziToast.info({
        title: 'Timer',
        message: 'Time is up!',
      });
      refs.dateTimePicker.disabled = false;
      return;
    }
    const time = convertMs(diff);
    refs.dataDays.textContent = time.d.toString().padStart(2, '0');
    refs.dataHours.textContent = time.h.toString().padStart(2, '0');
    refs.dataMinutes.textContent = time.m.toString().padStart(2, '0');
    refs.dataSeconds.textContent = time.s.toString().padStart(2, '0');
  }, 1000);
});

function convertMs(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);

  return {
    d: d % 24,
    h: h % 24,
    m: m % 60,
    s: s % 60,
  };
}
