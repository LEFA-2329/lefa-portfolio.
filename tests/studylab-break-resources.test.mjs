import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resources,
  recommendedTopic,
} from '../dist/learn/js/shared/study-resource-catalog.mjs';
test('every supported resource topic has curated HTTPS links and dialect guidance', () => {
  const allowed = [
    'cs50.harvard.edu',
    'www.youtube.com',
    'www.khanacademy.org',
    'learn.microsoft.com',
    'support.microsoft.com',
    'cvw.cac.cornell.edu',
    'hadoop.apache.org',
  ];
  for (const topic of [
    'programming',
    'algorithms',
    'sql',
    'design',
    'joins',
    'scripting',
    'hadoop',
  ])
    assert(
      resources.some((r) => r.topics.includes(topic)),
      topic,
    );
  for (const r of resources) {
    const u = new URL(r.url);
    assert.equal(u.protocol, 'https:');
    assert(allowed.includes(u.hostname));
    assert(r.title && r.description && r.note);
  }
});
test('resource suggestions follow lesson topic before module fallback', () => {
  assert.equal(recommendedTopic('advanced', 'Hadoop and HDFS'), 'hadoop');
  assert.equal(recommendedTopic('intermediate', 'Normalisation dependencies'), 'design');
  assert.equal(recommendedTopic('database', 'INNER JOIN'), 'joins');
  assert.equal(recommendedTopic('intermediate', 'Stored procedures'), 'scripting');
  assert.equal(recommendedTopic('prld', 'Arrays and searching'), 'algorithms');
  assert.equal(recommendedTopic('prld', 'Boolean expressions'), 'programming');
  assert.equal(recommendedTopic('advanced', ''), 'sql');
});

test('garden always contains six pairs after shuffling', async () => {
  const { shuffledGarden } = await import(
    '../dist/learn/js/shared/study-break-and-resources.mjs'
  );
  for (const random of [() => 0, () => 0.99, Math.random]) {
    const deck = shuffledGarden(random);
    assert.equal(deck.length, 12);
    const counts = new Map();
    for (const symbol of deck) counts.set(symbol, (counts.get(symbol) || 0) + 1);
    assert.equal(counts.size, 6);
    assert([...counts.values()].every((count) => count === 2));
  }
});
