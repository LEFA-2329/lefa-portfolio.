import fs from 'node:fs';
import {
  units,
  lessons,
} from '../dist/learn/js/programming-logic/content/lessons-and-quizzes.mjs';
import { practice } from '../dist/learn/js/programming-logic/content/lesson-practice.mjs';
import { taskBank } from '../dist/learn/js/programming-logic/content/practice-task-bank.mjs';
fs.mkdirSync('build', { recursive: true });
fs.writeFileSync(
  'build/course.json',
  JSON.stringify({ units, lessons, practice, taskBank }),
);
