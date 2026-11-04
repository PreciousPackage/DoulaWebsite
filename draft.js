const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));const form = document.querySelector('#intro-form');
if (form) {
  const service = form.querySelector('#service');
  const requested = new URLSearchParams(window.location.search).get('service');
  if (Array.from(service.options).some(option => option.value === requested)) {
    service.value = requested;
  }
  form.addEventListener('submit',e=>{e.preventDefault();const service=document.querySelector('#service').value,format=document.querySelector('input[name="format"]:checked').value;const result=document.querySelector('#booking-result');result.hidden=false;result.textContent=`Your preview: a free 20-minute ${format.toLowerCase()} introduction about ${service.toLowerCase()}. The live site will show Evelyn’s available times here. No request has been sent and no call has been booked.`});

}
