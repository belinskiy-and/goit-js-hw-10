import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as p,i as f}from"./assets/vendor-BbbuE1sJ.js";const o=document.querySelector("#datetime-picker"),t=document.querySelector("[data-start]"),h=document.querySelector(".timer");let n=null,l=null;const v={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){b(e[0])}};t.disabled=!0;t.addEventListener("click",y);p(o,v);function b(e){n=e.getTime(),n<=Date.now()?(t.disabled=!0,f.error({message:"Please choose a date in the future",maxWidth:"300px",position:"topRight"})):t.disabled=!1}function y(){l=setInterval(()=>{const e=Date.now();if(!(n>e)){clearInterval(l),o.disabled=!1;return}const a=M(n-e);h.innerHTML=D(a)},1e3),t.disabled=!0,o.disabled=!0}function M(e){const d=Math.floor(e/864e5),c=Math.floor(e%864e5/36e5),u=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:d,hours:c,minutes:u,seconds:m}}function D({days:e,hours:a,minutes:r,seconds:i}){return`
    <div class="field">
      <span class="value" data-days>${s(e)}</span>
      <span class="label">Days</span>
    </div>
    <div class="field">
      <span class="value" data-hours>${s(a)}</span>
      <span class="label">Hours</span>
    </div>
    <div class="field">
      <span class="value" data-minutes>${s(r)}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="field">
      <span class="value" data-seconds>${s(i)}</span>
      <span class="label">Seconds</span>
    </div>
  `}function s(e){return String(e).padStart(2,0)}
//# sourceMappingURL=1-timer.js.map
