import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../dist/learn/downloads/csharp/', import.meta.url));
function files(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? ['bin', 'obj', '.git'].includes(e.name)
        ? []
        : files(path.join(folder, e.name))
      : [path.join(folder, e.name)],
  );
}
const projects = {};
for (const entry of readdirSync(root, { withFileTypes: true }).filter((e) =>
  e.isDirectory(),
)) {
  const folder = path.join(root, entry.name);
  projects[entry.name] = files(folder)
    .filter((p) => !p.endsWith('.db') && !p.endsWith('.env'))
    .map((p) => ({
      name: path.relative(folder, p).split(path.sep).join('/'),
      content: readFileSync(p, 'utf8'),
    }));
}
writeFileSync(
  new URL('../dist/learn/js/csharp/complete-example-files.mjs', import.meta.url),
  '// Generated from downloads/csharp. Edit the actual source files, then npm run build.\nexport const exampleFiles = ' +
    JSON.stringify(projects, null, 2) +
    ';\n',
);
console.log('Built complete C# and Docker example source catalogue.');
