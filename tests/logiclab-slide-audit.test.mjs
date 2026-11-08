import assert from 'node:assert/strict';
import fs from 'node:fs';
import {auditDeclarations,explainProgram} from '../scripts/slide-audit.mjs';
const examples=JSON.parse(fs.readFileSync(new URL('../scripts/slide-lessons.json',import.meta.url)));
const foundations=JSON.parse(fs.readFileSync(new URL('../scripts/slide-foundations.json',import.meta.url)));
let lines=0,declarations=0;
for(const [id,l]of Object.entries(examples)){
 assert(foundations.lessons[id.split('-')[1]].length>=2);
 for(const key of ['code','solution']){
  const code=l[key];declarations+=auditDeclarations(code).length;
  const descriptions=explainProgram(code);assert.equal(descriptions.length,code.split('\n').length);for(const d of descriptions){assert(d.explanation.length>30);assert(d.explanation.length<330);}lines+=descriptions.length;
 }
}
assert.throws(()=>auditDeclarations('BEGIN\nOUTPUT missing\nEND'),/missing.*without a declaration/);
assert.throws(()=>auditDeclarations('BEGIN\nDECLARE x AS INTEGER\nSET y = x\nEND'),/y.*without a declaration/);
assert.throws(()=>auditDeclarations('METHOD A(x AS INTEGER)\nOUTPUT x\nENDMETHOD\nBEGIN\nOUTPUT x\nEND'),/x.*without a declaration/);
assert.equal(auditDeclarations('METHOD A(x AS INTEGER)\nOUTPUT x\nENDMETHOD\nBEGIN\nCALL A(2)\nEND').filter(d=>d.kind==='parameter').length,1);
assert(examples['lesson-21'].code.includes('PUBLIC VIRTUAL METHOD'));
assert(examples['lesson-20'].solution.includes('CONSTRUCTOR NumberPrinter()'));
assert(examples['lesson-22'].code.includes('SET course = enrolledCourse'));
const access=foundations.units['5'].find(x=>x.title.startsWith('Access modifiers'));
for(const keyword of ['PUBLIC','PRIVATE','PROTECTED'])assert(access.items.some(x=>x.includes(keyword)));
for(let u=1;u<=5;u++)assert(foundations.units[u].length>=3);
assert(foundations.lessons['3'].some(x=>x.includes('FOR')));
assert(foundations.lessons['10'].some(x=>x.includes('allocates two rows')));
console.log(`Passed: 44 scoped programs, ${declarations} declarations, ${lines} line explanations and all-unit concept introductions.`);
