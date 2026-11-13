import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {normalisationExamples,dependencyDiagram,stageHTML,normalisationWalkthrough} from '../dist/learn/normalisation.mjs';
const project=(data,attributes)=>[...new Map(data.map(row=>{const item=Object.fromEntries(attributes.map(a=>[a,row[a]]));return [JSON.stringify(item),item];})).values()];
const naturalJoin=(left,right)=>left.flatMap(a=>right.filter(b=>Object.keys(a).filter(k=>k in b).every(k=>a[k]===b[k])).map(b=>({...a,...b})));
for(const[id,example]of Object.entries(normalisationExamples)){
 for(const[n,stage]of Object.entries(example.stages)){
  const tables=stage.tables;assert(tables.length);
  for(const t of tables){assert(t.key.length&&t.key.every(a=>t.attributes.includes(a)));const rows=project(example.data,t.attributes);assert.equal(new Set(rows.map(r=>JSON.stringify(t.key.map(a=>r[a])))).size,rows.length,'Keys must identify projected rows');
   for(const d of t.dependencies){assert(d.from.every(a=>t.attributes.includes(a)));assert(d.to.every(a=>t.attributes.includes(a)));const seen=new Map();for(const r of rows){const key=JSON.stringify(d.from.map(a=>r[a])),value=JSON.stringify(d.to.map(a=>r[a]));if(seen.has(key))assert.equal(seen.get(key),value);seen.set(key,value);}if(Number(n)>=2)assert.notEqual(d.kind,'partial');if(Number(n)===3)assert.notEqual(d.kind,'transitive');}
   for(const [attribute,target]of Object.entries(t.foreign)){assert(t.attributes.includes(attribute));const[parent,key]=target.split('.');const referenced=tables.find(x=>x.name===parent);assert(referenced?.key.includes(key));for(const r of rows)assert(project(example.data,referenced.attributes).some(p=>p[key]===r[attribute]));}
   const svg=dependencyDiagram(t,`test-${id}-${n}-${t.name}`);assert(svg.includes('role="img"'));assert(svg.includes('aria-label='));assert(svg.includes('text-decoration="underline"'));assert(!svg.includes('undefined'));assert(!svg.includes('NaN'));
  }
  const reconstructed=tables.map(t=>project(example.data,t.attributes)).reduce(naturalJoin);const attrs=Object.keys(example.data[0]);assert.deepEqual(project(reconstructed,attrs).map(JSON.stringify).sort(),project(example.data,attrs).map(JSON.stringify).sort(),'Decomposed sample must rejoin without missing or spurious rows');
  const html=stageHTML(id,Number(n));assert(html.includes(n+'NF result'));assert(html.includes('Dependencies in the current'));assert(html.includes('Inspect sample rows'));
 }
}
assert.equal(normalisationExamples.orders.stages[1].tables.length,1);assert.equal(normalisationExamples.orders.stages[2].tables.length,3);assert.equal(normalisationExamples.orders.stages[3].tables.length,4);
assert.equal(normalisationExamples.employees.stages[1].tables.length,normalisationExamples.employees.stages[2].tables.length);
assert(normalisationWalkthrough().includes('id="nf-example"'));
for(const name of ['app.mjs','database-ui.mjs']){const source=readFileSync(new URL('../dist/learn/'+name,import.meta.url),'utf8');assert(!source.includes('<span aria-hidden="true">→</span>'));assert(!source.includes('<span>→</span>'));assert(!source.includes('← Previous lesson'));assert(!source.includes('Next lesson →'));}
console.log('Passed: three scenarios/nine normal-form stages, dependency validity, composite keys, foreign-key preservation, lossless sample reconstruction, SVG labels and decorative-arrow removal.');
