import {mount} from './form-renderer.js';
const apiBase=location.hostname==='127.0.0.1'?'http://127.0.0.1:5178':'https://tall-grass-ep-shirt.franzlazarus.chatgpt.site';
const root=document.querySelector('#form');
let config;
async function show(){const mode=location.hash==='#optredens'?'gigs':'merch';document.title=(mode==='gigs'?'Optredens':'EP & shirt')+' - Tall Grass';try{if(mode==='merch'&&!config){const r=await fetch(apiBase+'/api/config');if(!r.ok)throw Error();config=await r.json();}mount(root,config,{apiBase,mode});}catch{root.replaceChildren();const p=document.createElement('p');p.textContent='Het formulier kan nu niet laden. Probeer het later opnieuw of mail ';const a=document.createElement('a');a.href='mailto:tallgrassbandband@gmail.com';a.textContent='tallgrassbandband@gmail.com';p.append(a);root.append(p);}}
addEventListener('hashchange',show);show();
