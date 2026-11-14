import test from 'node:test';
import assert from 'node:assert/strict';
import { findTopics, topics } from '../dist/portfolio/content/recruiter-answers.mjs';
test('routes common recruiter questions', () => {
  for (const [q, key] of [
    ['What PostgreSQL experience do you have?', 'databases'],
    ['What is your salary?', 'contact'],
    ['Show me your projects', 'projects'],
    ['Tell me about Sepedi research', 'research'],
    ['Which degree do you have?', 'education'],
    ['Do you teach at Rosebank?', 'experience'],
    ['Do you know C#?', 'skills'],
  ])
    assert.ok(findTopics(q).includes(key));
});
test('unknown and invalid queries do not fabricate an answer', () => {
  assert.deepEqual(findTopics('weather tomorrow'), []);
  assert.deepEqual(findTopics(null), []);
  assert.deepEqual(findTopics('x'.repeat(1001)), []);
});
test('all routes have prepared evidence and safe links', () => {
  for (const q of [
    'contact',
    'PostgreSQL',
    'research',
    'degree',
    'experience',
    'projects',
    'skills',
  ])
    for (const key of findTopics(q)) {
      assert.ok(topics[key].answer);
      for (const [, href] of topics[key].links)
        assert.ok(
          href.startsWith('#') || href.startsWith('https://github.com/LEFA-2329/'),
        );
    }
});
import { answerTopics } from '../dist/portfolio/content/recruiter-answers.mjs';
test('matches varied wording and common typos', () => {
  for (const [q, key] of [
    ['What has he built?', 'projects'],
    ['Tell me about his employmnt', 'experience'],
    ['What databse tools does he know?', 'databases'],
    ['Is he studying anything?', 'education'],
    ['What about artificial intelligence?', 'research'],
    ['Does he code in C sharp?', 'skills'],
    ['Where is he based?', 'contact'],
  ])
    assert.ok(answerTopics(q).includes(key), q);
});
test('supports follow-ups and honest unknown answers', () => {
  assert.deepEqual(answerTopics('Tell me more', ['research']), ['research']);
  assert.deepEqual(answerTopics('How much salary does he want?'), ['unknown']);
  assert.deepEqual(answerTopics('Is he married?'), ['unknown']);
  assert.deepEqual(answerTopics('What is the weather?'), []);
  assert.deepEqual(answerTopics('hello'), ['greeting']);
});
import { getResponse } from '../dist/portfolio/content/recruiter-answers.mjs';
test('specific technology question identifies the documented project', () => {
  const r = getResponse('What did Lefa build with PHP?');
  assert.equal(r.context.project, 'store');
  assert.match(r.cards[0].answer, /PHP and PostgreSQL/);
});
test('project follow-ups retain context and explicit switches win', () => {
  let r = getResponse('Tell me about Store Hub');
  r = getResponse('Which database does it use?', r.context);
  assert.match(r.cards[0].answer, /Store Hub uses PostgreSQL/);
  r = getResponse('What about HelpDeskHub?', r.context);
  assert.equal(r.context.project, 'helpdesk');
  r = getResponse('Is it completed?', r.context);
  assert.match(r.cards[0].answer, /planned/);
});
test('does not invent undocumented project stacks or metrics', () => {
  assert.match(
    getResponse('Which database does the airport system use?').cards[0].answer,
    /not specified/,
  );
  assert.match(
    getResponse('How many users does Store Hub have?').cards[0].answer,
    /not provided/,
  );
});
test('clear topic changes and unknown answers preserve factual boundaries', () => {
  const r = getResponse('Tell me about Store Hub');
  assert.match(getResponse('What does he teach?', r.context).cards[0].title, /Lecturing/);
  assert.match(getResponse('Is he Azure certified?').cards[0].answer, /not documented/);
  assert.ok(getResponse('What is the weather?').suggestions.length);
  assert.match(getResponse('How do I contact him?').cards[0].answer, /lazylefa/);
});
