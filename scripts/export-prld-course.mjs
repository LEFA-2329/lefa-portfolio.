// Reuse the live course as the authoritative lesson and task source.
import {
  lessons,
  units,
} from '../dist/learn/js/programming-logic/content/lessons-and-quizzes.mjs';
import { taskBank } from '../dist/learn/js/programming-logic/content/practice-task-bank.mjs';
process.stdout.write(JSON.stringify({ lessons, units, taskBank }));
