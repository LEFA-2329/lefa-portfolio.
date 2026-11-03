import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler, UsageGate } from '../assistant/worker.mjs';
import { retrieve } from '../assistant/knowledge.mjs';
const origin='https://lefamalatji.co.za';
const env={ALLOWED_ORIGINS:origin,OPENAI_API_KEY:'test-only',OPENAI_MODEL:'test-model',GATE:{idFromName:()=>'',get:()=>({fetch:async()=>new Response(null,{status:204})})}};
const req=(question,extra={})=>new Request('https://test/api/ask',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...extra},body:JSON.stringify({question})});
test('blocks an unapproved origin before calling AI',async()=>{let calls=0;const r=await createHandler(()=>{calls++;})(req('skills',{Origin:'https://evil.example'}),env);assert.equal(r.status,403);assert.equal(calls,0);});
test('fails closed without configured secrets or budget',async()=>{assert.equal((await createHandler()(req('skills'),{ALLOWED_ORIGINS:origin})).status,503);});
test('rejects oversized questions and request bodies',async()=>{assert.equal((await createHandler()(req('x'.repeat(1700)),env)).status,400);assert.equal((await createHandler()(req('x'.repeat(9000)),env)).status,413);});
test('enforces global gate before AI',async()=>{const limited={...env,GATE:{idFromName:()=>'',get:()=>({fetch:async()=>new Response(null,{status:429})})}};assert.equal((await createHandler()(req('skills'),limited)).status,429);});
test('returns only trusted source URLs and uses no response storage',async()=>{
 const handler=createHandler(async(url,options)=>{const sent=JSON.parse(options.body);assert.equal(sent.store,false);assert.equal(sent.max_output_tokens,450);assert.ok(sent.instructions.includes('Never invent'));return Response.json({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({answer:'Lefa has PostgreSQL experience.',source_ids:['skills','https://evil.example']})}]}]});});
 const data=await (await handler(req('PostgreSQL skills'),env)).json();assert.equal(data.sources.length,1);assert.equal(data.sources[0].id,'skills');
});
test('rejects unsupported citations and handles upstream failure',async()=>{
 const bad=createHandler(async()=>Response.json({output:[{content:[{type:'output_text',text:'{"answer":"Unsupported","source_ids":["made-up"]}'}]}]}));assert.equal((await bad(req('skills'),env)).status,503);
 assert.equal((await createHandler(async()=>{throw Error('test')})(req('skills'),env)).status,503);
});
test('retrieves evidence but not unrelated queries',()=>{assert.ok(retrieve('PostgreSQL skills').some(s=>s.id==='skills'));assert.equal(retrieve('weather tomorrow').length,0);});
test('durable gate limits per IP to five per minute and global use to fifty',async()=>{
 const data=new Map();const storage={get:async k=>data.get(k),put:async(k,v)=>data.set(k,v),transaction:async fn=>fn(storage),getAlarm:async()=>null,setAlarm:async()=>{},deleteAll:async()=>data.clear()};
 const gate=new UsageGate({storage});const ask=ip=>gate.fetch(new Request('https://gate/check',{method:'POST',body:JSON.stringify({ip})}));
 for(let i=0;i<5;i++)assert.equal((await ask('one')).status,204);assert.equal((await ask('one')).status,429);
 for(let i=0;i<45;i++)assert.equal((await ask('ip'+i)).status,204);assert.equal((await ask('another')).status,429);
});
