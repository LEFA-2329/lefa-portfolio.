import fs from 'node:fs';
import { units, lessons } from '../dist/learn/js/prld/content/data.mjs';
import { practice } from '../dist/learn/js/prld/content/practice.mjs';
import { taskBank } from '../dist/learn/js/prld/content/tasks.mjs';
fs.mkdirSync('build', { recursive: true });
fs.writeFileSync(
  'build/course.json',
  JSON.stringify({ units, lessons, practice, taskBank }),
);
