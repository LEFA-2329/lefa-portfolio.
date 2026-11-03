(() => {
 'use strict';
 const launch=document.querySelector('#assistant-launch');
 const panel=document.querySelector('#assistant-panel');
 if(!launch||!panel)return;
 let ready;
 launch.addEventListener('click',async()=>{
  panel.showModal();
  try {ready ||= import('./guide-core.mjs').then(initialise);await ready;panel.querySelector('textarea').focus();}
  catch {panel.querySelector('#assistant-status').textContent='The guide could not load. Please use the email or WhatsApp links below.';ready=null;}
 });
 panel.querySelector('[data-close]').addEventListener('click',()=>panel.close());
 panel.addEventListener('close',()=>launch.focus());
 function initialise({topics,findTopics}) {
  const form=panel.querySelector('form');const input=form.querySelector('textarea');const log=panel.querySelector('#assistant-messages');
  panel.querySelector('#assistant-status').textContent='Prepared answers from my portfolio. This is a free guide, not generative AI. Your questions stay in this browser.';
  function message(who,text,links=[]){
   const article=document.createElement('article');article.className='assistant-message';
   const label=document.createElement('strong');label.textContent=who;article.append(label);
   const p=document.createElement('p');p.textContent=text;article.append(p);
   for(const [title,href] of links){
    const a=document.createElement('a');a.href=href;a.textContent=title;
    if(href.startsWith('https://')){a.target='_blank';a.rel='noopener noreferrer';}
    else a.addEventListener('click',()=>panel.close());
    article.append(a);
   }
   log.append(article);while(log.children.length>20)log.firstElementChild.remove();
   article.scrollIntoView({block:'nearest'});
  }
  function show(key){const topic=topics[key];if(topic)message(topic.title,topic.answer,topic.links);}
  panel.querySelectorAll('[data-topic]').forEach(button=>button.addEventListener('click',()=>show(button.dataset.topic)));
  form.addEventListener('submit',event=>{
   event.preventDefault();const question=input.value.trim();if(!question)return;
   message('Your question',question);input.value='';
   const matches=findTopics(question);
   if(matches.length)matches.forEach(show);
   else message('Portfolio guide','I don’t have a prepared answer for that. Choose a topic above, browse the projects or contact Lefa directly.',[['Browse projects','#work'],['Contact Lefa','#contact']]);
   input.focus();
  });
 }
})();
