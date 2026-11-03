const sections=[...document.querySelectorAll('main section')];
const panel=document.querySelector('#review-panel'),toggle=document.querySelector('#review-toggle'),select=document.querySelector('#review-section'),note=document.querySelector('#review-note'),status=document.querySelector('#save-status');
let notes={};try{notes=JSON.parse(localStorage.getItem('evelyn-preview-notes')||'{}')}catch{}
sections.forEach(s=>{const o=document.createElement('option');o.value=s.id;o.textContent=s.dataset.name;select.append(o)});
function load(){note.value=notes[select.value]||'';status.textContent=''}load();
function openReview(open){panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('reviewing',open);if(open)select.focus()}
toggle.onclick=()=>openReview(panel.hidden);document.querySelector('#close-review').onclick=()=>openReview(false);
select.onchange=()=>{load();document.getElementById(select.value).scrollIntoView({behavior:'smooth',block:'start'})};
note.oninput=()=>{notes[select.value]=note.value;try{localStorage.setItem('evelyn-preview-notes',JSON.stringify(notes));status.textContent='Saved in this browser.'}catch{status.textContent='Browser storage unavailable. Export your notes to keep them.'}};
sections.forEach(s=>s.addEventListener('click',e=>{if(!panel.hidden&&!e.target.closest('a,button,summary,details')){select.value=s.id;load()}}));
function feedback(){return 'Evelyn website preview feedback\n\n'+sections.map(s=>s.dataset.name+'\n'+(notes[s.id]||'(No notes yet)')).join('\n\n')}
document.querySelector('#copy-notes').onclick=async()=>{try{await navigator.clipboard.writeText(feedback());status.textContent='All notes copied.'}catch{status.textContent='Copy unavailable here. Use Export notes.'}};
document.querySelector('#export-notes').onclick=()=>{const url=URL.createObjectURL(new Blob([feedback()],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download='evelyn-website-feedback.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Notes exported.'};
document.querySelector('#contact-button').onclick=()=>{const s=document.querySelector('#contact-status');s.classList.add('active');s.textContent='This is where your conversation with Evelyn will begin. Her contact or booking link hasn’t been added to this preview yet.'};
document.addEventListener('keydown',e=>{if(e.key==='Escape')openReview(false)});
