import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as y,i as p}from"./assets/vendor-77e16229.js";let i=null,l=null,s=!1;const e={input:document.querySelector("#datetime-picker"),startBtn:document.querySelector("[data-start]"),daysOnClockFace:document.querySelector("[data-days"),hoursOnClockFace:document.querySelector("[data-hours"),minutesOnClockFace:document.querySelector("[data-minutes]"),secondsOnClockFace:document.querySelector("[data-seconds]")};e.startBtn.disabled=!0;const C={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){console.log(t[0]),t[0]<Date.now()?(p.error({message:"Please choose a date in the future",position:"topCenter"}),e.startBtn.disabled=!0):(e.startBtn.disabled=!1,i=t[0])}};y("#datetime-picker",C);function a(t){return String(t).padStart(2,"0")}function u({days:t,hours:o,minutes:n,seconds:c}){e.daysOnClockFace.textContent=`${t}`,e.hoursOnClockFace.textContent=`${o}`,e.minutesOnClockFace.textContent=`${n}`,e.secondsOnClockFace.textContent=`${c}`}const k={start(){s||(s=!0,e.input.disabled=!0,e.startBtn.disabled=!0,l=setInterval(()=>{const t=Date.now(),o=i-t;if(console.log(o),o<0){clearInterval(l),s=!1,u({days:"00",hours:"00",minutes:"00",seconds:"00"}),e.input.disabled=!1;return}const n=r(o);console.log(n),u(n)},1e3))}};e.startBtn.addEventListener("click",()=>{k.start()});function r(t){const d=a(Math.floor(t/864e5)),m=a(Math.floor(t%864e5/36e5)),f=a(Math.floor(t%864e5%36e5/6e4)),h=a(Math.floor(t%864e5%36e5%6e4/1e3));return{days:d,hours:m,minutes:f,seconds:h}}console.log(r(2e3));console.log(r(14e4));console.log(r(2414e4));
//# sourceMappingURL=commonHelpers.js.map