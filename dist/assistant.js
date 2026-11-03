(() => {
 'use strict';
 const launch=document.querySelector('#assistant-launch');
 const panel=document.querySelector('#assistant-panel');
 if(!launch||!panel)return;
 let loaded=false;
 launch.addEventListener('click',()=>{
  if(!loaded){initialise();loaded=true;}
  panel.showModal();
  panel.querySelector('textarea').focus();
 });
 function initialise(){
  const form=panel.querySelector('form');const input=form.querySelector('textarea');const send=form.querySelector('button');const log=panel.querySelector('#assistant-messages');const status=panel.querySelector('#assistant-status');
  panel.querySelector('[data-close]').addEventListener('click',()=>panel.close());
  panel.addEventListener('close',()=>launch.focus());
  const endpoint=window.LEFA_ASSISTANT_ENDPOINT;
  status.textContent=endpoint?'AI answers use portfolio information. Questions are sent to an AI provider. Please avoid personal or confidential information.':'Preview: AI connection pending. The suggested questions show saved portfolio facts.';
  function message(who,text,sources=[]){
   const article=document.createElement('article');article.className='assistant-message';
   const label=document.createElement('strong');label.textContent=who;article.append(label);
   const p=document.createElement('p');p.textContent=text;article.append(p);
   for(const source of sources){
    let url;try{url=new URL(source.url,location.href);}catch{continue;}
    if(!['https:'].includes(url.protocol)||!['lefamalatji.co.za','github.com'].includes(url.hostname))continue;
    const a=document.createElement('a');a.href=url.href;a.textContent=source.title;a.target='_blank';a.rel='noopener noreferrer';article.append(a);
   }
   log.append(article);article.scrollIntoView({block:'nearest'});
  }
  const facts={experience:['Lefa is a lecturer at Rosebank College, completed a one-year software developer internship at Simplifon, and has three years of academic tutoring experience at the University of Limpopo.','Profile and experience','https://lefamalatji.co.za/#about'],projects:['Store Hub combines PHP, PostgreSQL and AI features. HelpDeskHub is an in-progress ASP.NET Core ticket API project. Other work includes pre-school and airport management systems.','Selected projects','https://lefamalatji.co.za/#work'],research:['Lefa’s MSc research investigates data scarcity in Sepedi–English code-switched text generation using FNet, LSTM and mBERT.','Research and education','https://lefamalatji.co.za/#about']};
  panel.querySelectorAll('[data-topic]').forEach(button=>button.addEventListener('click',()=>{
   if(endpoint){input.value=button.textContent;form.requestSubmit();}
   else {const [text,title,url]=facts[button.dataset.topic];message('Saved portfolio fact',text,[{title,url}]);}
  }));
  form.addEventListener('submit',async event=>{
   event.preventDefault();const question=input.value.trim();if(!question)return;
   if(!endpoint){message('Portfolio guide','Real AI answers are not connected in this preview. Try the suggested questions or contact Lefa using the links below.');return;}
   if(send.disabled)return;send.disabled=true;input.disabled=true;status.textContent='Finding information in Lefa’s portfolio…';log.setAttribute('aria-busy','true');message('You',question);input.value='';
   try {
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question}),signal:AbortSignal.timeout(22000)});
    const data=await response.json();if(!response.ok)throw Error(data.error||'Assistant unavailable. Please contact Lefa directly.');
    if(typeof data.answer!=='string'||!Array.isArray(data.sources))throw Error('Assistant unavailable. Please contact Lefa directly.');
    message('Portfolio AI',data.answer,data.sources);
   }catch(error){message('Portfolio guide',error.name==='TimeoutError'?'The assistant took too long. Please try again or contact Lefa directly.':error.message);}
   finally{send.disabled=false;input.disabled=false;log.setAttribute('aria-busy','false');status.textContent='AI can make mistakes. Check the linked sources. Questions are sent to an AI provider.';input.focus();}
  });
 }
})();
