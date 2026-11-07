import fs from 'node:fs';
import {units,lessons} from '../dist/learn/data.mjs';
import {practice} from '../dist/learn/practice.mjs';
import {taskBank} from '../dist/learn/tasks.mjs';
fs.mkdirSync('build',{recursive:true});
fs.writeFileSync('build/course.json',JSON.stringify({units,lessons,practice,taskBank}));
