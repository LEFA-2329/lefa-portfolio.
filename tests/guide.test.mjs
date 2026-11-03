import test from 'node:test';
import assert from 'node:assert/strict';
import {findTopics,topics} from '../dist/guide-core.mjs';
test('routes common recruiter questions',()=>{
 for(const [q,key] of [['What PostgreSQL experience do you have?','databases'],['What is your salary?','contact'],['Show me your projects','projects'],['Tell me about Sepedi research','research'],['Which degree do you have?','education'],['Do you teach at Rosebank?','experience'],['Do you know C#?','skills']])assert.ok(findTopics(q).includes(key));
});
test('unknown and invalid queries do not fabricate an answer',()=>{assert.deepEqual(findTopics('weather tomorrow'),[]);assert.deepEqual(findTopics(null),[]);assert.deepEqual(findTopics('x'.repeat(1001)),[]);});
test('all routes have prepared evidence and safe links',()=>{for(const q of ['contact','PostgreSQL','research','degree','experience','projects','skills'])for(const key of findTopics(q)){assert.ok(topics[key].answer);for(const [,href] of topics[key].links)assert.ok(href.startsWith('#')||href.startsWith('https://github.com/LEFA-2329/'));}});
import {answerTopics} from '../dist/guide-core.mjs';
test('matches varied wording and common typos',()=>{
 for(const [q,key] of [['What has he built?','projects'],['Tell me about his employmnt','experience'],['What databse tools does he know?','databases'],['Is he studying anything?','education'],['What about artificial intelligence?','research'],['Does he code in C sharp?','skills'],['Where is he based?','contact']])assert.ok(answerTopics(q).includes(key),q);
});
test('supports follow-ups and honest unknown answers',()=>{
 assert.deepEqual(answerTopics('Tell me more',['research']),['research']);
 assert.deepEqual(answerTopics('How much salary does he want?'),['unknown']);
 assert.deepEqual(answerTopics('Is he married?'),['unknown']);
 assert.deepEqual(answerTopics('What is the weather?'),[]);
 assert.deepEqual(answerTopics('hello'),['greeting']);
});
