import test from 'node:test';
import assert from 'node:assert/strict';
import { colourCode } from '../dist/learn/js/csharp/code-syntax-colours.mjs';
test('code colours separate comments, strings and keywords without changing source', () => {
  const source =
    '// Short explanation\nvar address = "https://example.com";\nint age = 20;';
  const html = colourCode(source, 'Program.cs');
  assert.match(html, /class="code-comment">\/\/ Short explanation/);
  assert.match(html, /class="code-string">&quot;https:\/\/example.com&quot;/);
  assert.match(html, /class="code-keyword">var/);
  assert.equal(html.replace(/<[^>]*>/g, '').replaceAll('&quot;', '"'), source);
});
test('source HTML is escaped, including in comments and strings', () => {
  const html = colourCode('// <img src=x onerror=alert(1)>\n"<script>"', 'Program.cs');
  assert.ok(!html.includes('<img'));
  assert.ok(!html.includes('<script>'));
  assert.match(html, /&lt;img/);
});
test('Docker, SQL and XML comments use the comment colour', () => {
  for (const [name, source] of [
    ['Dockerfile', '# Build the image'],
    ['setup.sql', '-- Create a table'],
    ['MainWindow.xaml', '<!-- A label -->'],
  ]) {
    assert.match(colourCode(source, name), /class="code-comment"/);
  }
});
