// Build readable, indexable HTML from the same lessons used in the application.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import {
  courseLessons,
  projectBriefs,
  lessonFocus,
} from '../dist/learn/js/csharp/course-outline-and-lessons.mjs';
import { lessonGuides } from '../dist/learn/js/csharp/learning-path-and-guides.mjs';
import { searchTopics } from './studylab-search-topics.mjs';
const origin = 'https://lefamalatji.co.za';
const escape = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
const app = (route, label) =>
  `<a class="button" href="/learn/${escape(route)}">${escape(label)}</a>`;
const subjectLinks = searchTopics
  .map((t) => `<a href="/learn/${t.slug}/">${escape(t.title)}</a>`)
  .join('');
const urls = [];
function page(path, title, description, body, { lesson = false } = {}) {
  const url = origin + path;
  urls.push(url);
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': lesson ? 'LearningResource' : 'WebPage',
    name: title,
    description,
    url,
    inLanguage: 'en',
    ...(lesson
      ? {
          learningResourceType: 'Tutorial',
          author: { '@type': 'Person', name: 'Lefa Malatji' },
        }
      : {}),
  });
  const hash = createHash('sha256').update(schema).digest('base64');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="referrer" content="strict-origin-when-cross-origin"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' 'sha256-${hash}'; style-src 'self'; img-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'"><title>${escape(title)} | StudyLab</title><meta name="description" content="${escape(description)}"><meta name="robots" content="index,follow"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="StudyLab"><meta property="og:title" content="${escape(title)} | StudyLab"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/images/studylab-dashboard.jpg"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/learn/images/studylab-sl-icon.svg" type="image/svg+xml"><link rel="stylesheet" href="/learn/css/search-learning-guides.css?v=1"><script src="/learn/js/shared/restore-theme-before-paint.js?v=40"></script><script type="application/ld+json">${schema}</script></head><body><a class="skip" href="#content">Skip to content</a><header><a class="brand" href="/studylab/"><span class="portrait"><img src="/images/lefa-blue-suit.jpg" alt="" width="42" height="42"></span>Study<span>Lab</span></a><a href="/learn/">Open learning app</a></header><main id="content"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/studylab/">StudyLab</a> / <a href="${lesson ? (path.includes('/docker/') ? '/learn/docker/' : '/learn/csharp/') : '/studylab/'}">${lesson ? (path.includes('/docker/') ? 'Docker lessons' : 'C# lessons') : 'Learning guides'}</a></nav><h1>${escape(title)}</h1>${body}<section class="panel"><h2>Explore StudyLab subjects</h2><nav class="subject-links" aria-label="Related learning subjects">${subjectLinks}</nav></section></main><footer><p>StudyLab. Original learning materials by Lefa Malatji. Practice code in the environment stated in each lesson.</p><a href="/learn/#about">About and privacy</a> . <a href="/">Meet the creator</a></footer></body></html>`;
  const folder = new URL('../dist' + path, import.meta.url);
  mkdirSync(folder, { recursive: true });
  writeFileSync(new URL('index.html', folder), html);
}
for (const topic of searchTopics) {
  const related =
    topic.slug === 'csharp'
      ? courseLessons.filter((l) => l.unit.startsWith('csharp-'))
      : topic.slug === 'asp-net'
        ? courseLessons.filter((l) => l.unit === 'csharp-2')
        : topic.slug === 'docker'
          ? courseLessons.filter((l) => l.unit.startsWith('docker-'))
          : [];
  page(
    '/learn/' + topic.slug + '/',
    topic.title,
    topic.description,
    `<p class="lede">${escape(topic.intro)}</p>${app(topic.route, 'Start interactive learning')}<p>Free learning guides, practice questions and worked explanations for students. Interactive activities run in the StudyLab app; C# and Docker projects run locally using the lesson setup instructions.</p>${topic.sections.map(([title, text]) => `<section class="panel"><h2>${escape(title)}</h2><p>${escape(text)}</p></section>`).join('')}<section class="panel"><h2>Worked example</h2><pre tabindex="0"><code>${escape(topic.code)}</code></pre><p>${escape(topic.result)}</p><h3>Try it yourself</h3><p>${escape(topic.task)}</p><details><summary>Check the explanation</summary><p>${escape(topic.answer)}</p></details></section>${related.length ? `<section class="panel"><h2>Read the lessons</h2><ul>${related.map((l) => `<li><a href="/learn/${l.unit.startsWith('docker-') ? 'docker' : 'csharp'}/lessons/${l.id}/">${escape(l.title)}</a></li>`).join('')}</ul></section>` : ''}<section class="panel"><h2>Practise in the application</h2><div class="actions">${topic.links.map(([route, title]) => app(route, title)).join('')}</div></section>`,
  );
}
for (const lesson of courseLessons) {
  const [name, brief, storage, check] = projectBriefs[lesson.project];
  const theory = readFileSync(
    new URL('../dist/learn/pages/' + lesson.page + '.html', import.meta.url),
    'utf8',
  );
  if (theory.includes('{{dynamic_'))
    throw Error('Unresolved lesson template: ' + lesson.id);
  const guide = lessonGuides[lesson.id];
  const description = `${lesson.title}. ${lessonFocus[lesson.id]}`;
  page(
    `/learn/${lesson.unit.startsWith('docker-') ? 'docker' : 'csharp'}/lessons/${lesson.id}/`,
    lesson.title,
    description,
    `<p class="lede">${escape(lessonFocus[lesson.id])}</p>${app('#cs-lesson/' + lesson.id, 'Open interactive lesson and complete code')}<section class="panel"><h2>What you are building</h2><h3>${escape(name)}</h3><p>${escape(brief)}</p><p>${escape(storage)}</p><h3>Check the result</h3><p>${escape(check)}</p></section>${theory}${guide ? `<section class="panel"><h2>Predict and practise</h2><p>${escape(guide[0])}</p><details><summary>Check your prediction</summary><p>${escape(guide[1])}</p></details><h3>Make one change</h3><p>${escape(guide[2])}</p><details><summary>Worked guidance</summary><p>${escape(guide[3])}</p></details><h3>Try independently</h3><p>${escape(guide[4])}</p></section>` : ''}<section class="panel"><h2>Full code and downloads</h2><p>The interactive lesson contains the numbered code parts, commented complete files, project ZIP, practice tasks and quiz. Keep each project in its own folder in Visual Studio.</p>${app('#cs-lesson/' + lesson.id, 'View code and download the project')}</section>`,
    { lesson: true },
  );
}
page(
  '/studylab/',
  'StudyLab - learn pseudocode, SQL, C# and ASP.NET',
  'Free StudyLab learning guides and practice for pseudocode, flowcharts, SQL databases, C# PROG6212, ASP.NET Core, Docker and Hadoop.',
  `<p class="lede">Learn computing one step at a time. Read a simple explanation, follow a worked example, test your prediction and practise independently.</p>${app('', 'Open StudyLab')}<section class="panel"><h2>Choose what you want to learn</h2><div class="cards">${searchTopics.map((t) => `<article><h3><a href="/learn/${t.slug}/">${escape(t.title)}</a></h3><p>${escape(t.description)}</p></article>`).join('')}</div></section><section class="panel"><h2>How StudyLab helps you study</h2><ol><li>Start with a topic you need for class and read the beginner explanation.</li><li>Predict a result, then compare it with a worked example.</li><li>Use the pseudocode tracer, diagram activities or SQL practice tools in the application.</li><li>For C# and Docker, download the supplied project and follow the local setup instructions.</li><li>Complete a practice task and use the explanation to identify what to revise.</li></ol><p>StudyLab supports Programming Logic PRLD5121, Database DATA6211, Database Intermediate DATA6222 and C# PROG6212. Advanced Database and Docker provide additional learning modules. You can reach these guides directly without visiting the creator's portfolio.</p></section>`,
);
// Preserve existing portfolio entries; include only real page URLs, never hash routes.
const sitemapPath = new URL('../dist/sitemap.xml', import.meta.url);
const prior = readFileSync(sitemapPath, 'utf8');
const preserved = [...prior.matchAll(/<url>[\s\S]*?<\/url>/g)]
  .map((m) => m[0])
  .filter((s) => !s.includes('/learn/') && !s.includes('/studylab/'));
writeFileSync(
  sitemapPath,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${preserved.join('\n')}\n${[origin + '/learn/', ...urls].map((url) => `<url><loc>${escape(url)}</loc></url>`).join('\n')}\n</urlset>\n`,
);
console.log(
  `Built ${urls.length} indexable StudyLab guides and lessons, plus sitemap entries.`,
);
