import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as d,i as s}from"./assets/vendor-77e16229.js";let o,i;const t={startBtn:document.querySelector("[data-start]"),dateTimePicker:document.querySelector("#datetime-picker"),dataDays:document.querySelector("[data-days]"),dataHours:document.querySelector("[data-hours]"),dataMinutes:document.querySelector("[data-minutes]"),dataSeconds:document.querySelector("[data-seconds]")},c={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(r){const e=r[0];e<=new Date?(s.error({title:"❌",message:"Please choose a date in the future",position:"topRight"}),t.startBtn.disabled=!0):(i=e,t.startBtn.disabled=!1)}};d(t.dateTimePicker,c);t.startBtn.addEventListener("click",()=>{t.startBtn.disabled=!0,t.dateTimePicker.disabled=!0,o=setInterval(()=>{const r=Date.now(),e=i-r;if(e<=0){clearInterval(o),s.info({title:"Timer",message:"Time is up!"}),t.dateTimePicker.disabled=!1;return}const a=l(e);t.dataDays.textContent=a.d.toString().padStart(2,"0"),t.dataHours.textContent=a.h.toString().padStart(2,"0"),t.dataMinutes.textContent=a.m.toString().padStart(2,"0"),t.dataSeconds.textContent=a.s.toString().padStart(2,"0")},1e3)});function l(r){const e=Math.floor(r/1e3),a=Math.floor(e/60),n=Math.floor(a/60);return{d:Math.floor(n/24)%24,h:n%24,m:a%60,s:e%60}}
//# sourceMappingURL=commonHelpers.js.map
