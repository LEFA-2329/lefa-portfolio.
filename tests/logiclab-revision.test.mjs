import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRunner} from '../dist/learn/runner.mjs';
const decks=JSON.parse(fs.readFileSync(new URL('../scripts/revision-content.json',import.meta.url),'utf8'));
assert.equal(decks.length,5);
function execute(code,inputs=[]){const r=createRunner(code);let i=0;for(let n=0;n<2001;n++){let s=r.step();if(s.kind==='input'){assert(i<inputs.length,'Missing fixture');s=r.step(inputs[i++]);}if(s.kind==='done')return s.output;}throw Error('Loop did not complete');}
const fixtures={
 '1-5':[['12.5','3'],['37.5']], '1-9':[[],['21']],
 '2-3':[[],['Pass']], '2-4':[[],['View']], '2-5':[[],['6']],
 '2-6':[['10','20','-1'],['30']], '2-7':[['120','-5','70'],['70']],
 '2-8':[[],['0, 0','0, 1','0, 2','1, 0','1, 1','1, 2']],
 '3-3':[[],['10']], '3-4':[['2','3','4'],['9']], '3-5':[['1','2','3','4','5','6'],[]],
 '3-6':[[],['2']], '3-8':[[],['3, 8']]
};
for(const deck of decks){assert.equal(deck.slides.length,10);assert.equal(deck.slides[0].type,'cover');assert(deck.slides.some(s=>/Common mistakes/.test(s.title)));assert(deck.slides.some(s=>/Practice/.test(s.title)));for(const [i,s] of deck.slides.entries()){assert(s.title);if(deck.unit<=3&&s.code){const fixture=fixtures[`${deck.unit}-${i+1}`];assert(fixture);assert.deepEqual(execute(s.code,fixture[0]),fixture[1]);}}
 const file=new URL(`../dist/learn/downloads/logiclab-unit-${deck.unit}-revision.pptx`,import.meta.url);assert(fs.statSync(file).size>10000);
}
const app=fs.readFileSync(new URL('../dist/learn/app.mjs',import.meta.url),'utf8');assert(app.includes('logiclab-unit-${u.id}-revision.pptx'));assert(app.includes('logiclab-unit-${u.id}.pptx'));assert(app.includes('10-slide revision deck'));
console.log('Passed: five 10-slide revision decks, worked numeric/loop/array examples, package presence and both detailed/revision links.');
