import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { courseLessons } from '../dist/learn/js/csharp/course-outline-and-lessons.mjs';
import { searchTopics } from '../scripts/studylab-search-topics.mjs';
const root = new URL('../dist/', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const paths = [
  'studylab/',
  ...searchTopics.map((t) => 'learn/' + t.slug + '/'),
  ...courseLessons.map(
    (l) => `learn/${l.unit.startsWith('docker-') ? 'docker' : 'csharp'}/lessons/${l.id}/`,
  ),
];
test('StudyLab permits indexing and public guides are crawlable without JavaScript', () => {
  assert.match(read('learn/index.html'), /name="robots" content="index,follow"/);
  assert.ok(!read('robots.txt').includes('Disallow: /learn'));
  assert.match(read('learn/index.html'), /href="\/studylab\/"/);
  const titles = new Set();
  for (const path of paths) {
    const html = read(path + 'index.html');
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), title);
    titles.add(title);
    assert.ok(!html.includes('noindex'));
    assert.ok(!html.includes('{{dynamic_'));
    assert.match(html, /<h1>/);
    assert.match(html, /name="description"/);
    assert.ok(html.includes(`rel="canonical" href="https://lefamalatji.co.za/${path}"`));
    assert.ok(html.includes('href="/learn/'));
    const schema = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1];
    assert.equal(JSON.parse(schema).url, 'https://lefamalatji.co.za/' + path);
    assert.ok(
      html.includes('sha256-' + createHash('sha256').update(schema).digest('base64')),
    );
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const target = match[1];
      assert.ok(
        existsSync(
          new URL(target.slice(1) + (target.endsWith('/') ? 'index.html' : ''), root),
        ),
        path + ' -> ' + target,
      );
    }
  }
});
test('sitemap lists all public pages using canonical paths rather than fragment routes', () => {
  const sitemap = read('sitemap.xml');
  assert.ok(!sitemap.includes('#'));
  for (const path of paths)
    assert.ok(
      sitemap.includes('<loc>https://lefamalatji.co.za/' + path + '</loc>'),
      path,
    );
  assert.ok(sitemap.includes('<loc>https://lefamalatji.co.za/</loc>'));
  assert.ok(sitemap.includes('<loc>https://lefamalatji.co.za/services/</loc>'));
});
