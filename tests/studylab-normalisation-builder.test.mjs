import assert from 'node:assert/strict';
import {normalisationExamples} from '../dist/learn/normalisation.mjs';
import {gradeKeyAndDependencies,gradeDecomposition,losslessJoin,projectedDependencies} from '../dist/learn/normalisation-grading.mjs';
import {cleanBuilder} from '../dist/learn/normalisation-builder.mjs';
const convert=tables=>tables.map((t,i)=>({id:'x'+i,name:'Renamed '+i,attributes:[...t.attributes].reverse(),key:[...t.key].reverse(),foreign:Object.entries(t.foreign).map(([a,parent])=>({attributes:[a],target:'x'+tables.findIndex(p=>p.name===parent.split('.')[0])}))}));
for(const [id,x]of Object.entries(normalisationExamples)){
 const o=x.stages[1].tables[0];assert(gradeKeyAndDependencies(o,o.key,o.dependencies).passed,id);assert(!gradeKeyAndDependencies(o,[],[]).passed);
 for(const stage of [2,3]){const tables=convert(x.stages[stage].tables);const grade=gradeDecomposition(o,tables,stage);assert(grade.passed,id+' '+stage+' '+JSON.stringify(grade.errors));assert(gradeDecomposition(o,cleanBuilder({second:tables,third:tables},o)[stage===2?'second':'third'],stage).passed,'Restored FK IDs must match');}
 assert(gradeDecomposition(o,convert(x.stages[3].tables),2).passed,'3NF is also 2NF');
 const tables=convert(x.stages[3].tables),withBadKey=structuredClone(tables);withBadKey[0].key=[];assert(!gradeDecomposition(o,withBadKey,3).passed);
 const missing=structuredClone(tables);const fact=o.attributes.find(a=>!o.key.includes(a));for(const t of missing){t.attributes=t.attributes.filter(a=>a!==fact);t.key=t.key.filter(a=>a!==fact);}assert(gradeDecomposition(o,missing,3).errors.some(x=>x.startsWith('Missing attributes')));
 const duplicate=[...tables,structuredClone(tables[0])];assert(!gradeDecomposition(o,duplicate,3).passed);
}
const o=normalisationExamples.symbols.stages[1].tables[0];
assert(!gradeKeyAndDependencies(o,o.key,[{from:['C3'],to:['C2'],kind:'partial'}]).passed);
assert(!gradeKeyAndDependencies(o,o.key,o.dependencies.map(d=>({...d,kind:'full'}))).passed);
assert(gradeKeyAndDependencies(o,o.key,[...o.dependencies,{from:['C1','C3'],to:['C5'],kind:'full'}]).passed,'Full dependency may also have a transitive path');
const lossy=[{id:'a',name:'One',attributes:['C1','C2','C4','C5'],key:['C1','C4'],foreign:[]},{id:'b',name:'Two',attributes:['C3','C4'],key:['C3','C4'],foreign:[]}];assert(!losslessJoin(lossy,o.attributes,o.dependencies));assert(gradeDecomposition(o,lossy,3).errors.some(x=>x.includes('lossy')));
const original=[{id:'a',name:'Original',attributes:o.attributes,key:o.key,foreign:[]}];assert(gradeDecomposition(o,original,2).errors.some(x=>x.includes('part of a candidate key')));assert(gradeDecomposition(o,original,3).errors.some(x=>x.includes('non-key determinant')));
const noFK=convert(normalisationExamples.symbols.stages[3].tables);noFK.forEach(t=>t.foreign=[]);assert(gradeDecomposition(o,noFK,3).errors.some(x=>x.includes('foreign-key links')));
const badFK=convert(normalisationExamples.symbols.stages[3].tables);badFK[2].foreign[0].target='missing';assert(!gradeDecomposition(o,badFK,3).passed);
assert(!gradeDecomposition(o,[],3).passed);assert(!gradeDecomposition(o,Array(13).fill(original[0]),3).passed);
assert.deepEqual(cleanBuilder({key:['C1','Unknown','C1'],dependencies:[{from:['X'],to:['C2'],kind:'bad'}]},o).key,['C1']);
assert(projectedDependencies(['C1','C2','C3','C4'],o.dependencies).some(d=>d.from.includes('C1')&&d.from.includes('C3')&&d.to.includes('C4')));
// Dependency preservation is independent of whether sample rows happen to rejoin.
const notPreserved=[{id:'a',name:'A',attributes:['C1','C2','C3'],key:['C1','C3'],foreign:[]},{id:'b',name:'B',attributes:['C2','C3','C4','C5'],key:['C2','C3','C4'],foreign:[]}];assert(gradeDecomposition(o,notPreserved,3).errors.some(x=>x.includes('not preserved')));
console.log('Passed: all nine model decompositions, arbitrary table names/order, candidate keys, partial/transitive errors, missing facts, lossless joins, dependency preservation, FK checks and saved-state restoration.');
