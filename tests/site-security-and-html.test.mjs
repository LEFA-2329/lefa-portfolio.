import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { compileHtmlPages, output } from '../scripts/build-html-pages.mjs';
import { renderHtmlPage } from '../dist/shared/render-html-page.mjs';
import { escapeHTML } from '../dist/learn/js/programming-logic/pseudocode-parser-and-diagrams.mjs';
import { setupScript } from '../dist/learn/js/database/sql/demo-databases-and-examples.mjs';
import { getResponse } from '../dist/portfolio/content/recruiter-answers.mjs';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const read = (name) => readFileSync(path.join(root, name), 'utf8');

test('all editable HTML source pages match the generated publication module', () => {
  assert.equal(readFileSync(output, 'utf8'), compileHtmlPages());
  assert.throws(() => renderHtmlPage('constructor'));
  assert.throws(() => renderHtmlPage('studylab/database-home'));
  assert.match(renderHtmlPage('portfolio/studylab'), /Hadoop/);
});

test('entry policies disallow inline JavaScript and remote executable sources', () => {
  for (const name of [
    'index.html',
    'learn/index.html',
    'services/index.html',
    'projects/diopong/index.html',
  ]) {
    const html = read(name);
    const policy = html.match(
      /http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i,
    )?.[1];
    assert(policy, name);
    const script = policy.match(/script-src ([^;]+)/)?.[1];
    assert(script?.includes("'self'"));
    assert(!script.includes("'unsafe-inline'"));
    assert(!script.includes("'unsafe-eval'"));
    assert(!script.includes('https:'));
    for (const directive of [
      "object-src 'none'",
      "base-uri 'none'",
      "form-action 'none'",
      "frame-src 'none'",
      "connect-src 'self'",
    ])
      assert(policy.includes(directive));
    assert(!/\son[a-z]+\s*=/i.test(html));
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/\bsrc=/.test(match[1])) {
        assert(!/\bsrc="https?:/i.test(match[1]));
        continue;
      }
      assert(
        /application\/ld\+json/.test(match[1]),
        name + ': unexpected executable inline script',
      );
      assert(
        policy.includes(
          "'sha256-" + createHash('sha256').update(match[2]).digest('base64') + "'",
        ),
      );
    }
  }
  assert(read('learn/index.html').includes("'wasm-unsafe-eval'"));
});

test('renamed module and entry assets resolve, including shared HTML renderer', () => {
  const files = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() && e.name !== 'vendor'
        ? files(path.join(dir, e.name))
        : e.isFile()
          ? [path.join(dir, e.name)]
          : [],
    );
  for (const file of files(root).filter(
    (p) => /\.(mjs|js)$/.test(p) && !p.includes('/vendor/'),
  )) {
    const source = readFileSync(file, 'utf8');
    for (const m of source.matchAll(
      /(?:\bfrom\s*|\bimport\s*(?:\(\s*)?|new URL\(\s*)['"](\.[^'"\n]+\.(?:mjs|js)(?:\?[^'"\n]*)?)['"]/g,
    )) {
      assert(
        existsSync(path.resolve(path.dirname(file), m[1].split('?')[0])),
        file + ': ' + m[1],
      );
    }
  }
  for (const entry of ['index.html', 'learn/index.html', 'services/index.html']) {
    for (const m of read(entry).matchAll(
      /(?:src|href)="(\.[^"?#]+\.(?:mjs|js|css))(?:\?[^"#]*)?"/g,
    ))
      assert(
        existsSync(path.resolve(root, path.dirname(entry), m[1])),
        entry + ': ' + m[1],
      );
  }
});

test('untrusted text escaping and preference allowlists handle attack-shaped input', () => {
  const payload = '<img src=x onerror="alert(1)"><script>alert(1)</script>&\'';
  const escaped = escapeHTML(payload);
  assert(!escaped.includes('<'));
  assert(!escaped.includes('"'));
  assert(escaped.includes('&lt;img'));
  for (const key of ['__proto__', 'constructor', 'toString']) {
    assert.throws(() => setupScript(key, 'sqlserver'));
    assert.throws(() => setupScript('college', key));
  }
  const response = getResponse('What is StudyLab?');
  assert.equal(response.cards[0].title, 'StudyLab');
  assert.match(response.cards[0].answer, /Hadoop/);
});
