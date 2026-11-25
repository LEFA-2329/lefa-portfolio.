// Build readable, indexable HTML from the same lessons used in the application.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { format } from 'prettier';
import { createHash } from 'node:crypto';
import {
  courseLessons,
  projectBriefs,
  lessonFocus,
} from '../dist/learn/js/csharp/course-outline-and-lessons.mjs';
import { lessonGuides } from '../dist/learn/js/csharp/learning-path-and-guides.mjs';
import {
  wedeUnits,
  wedeLessons,
} from '../dist/learn/js/web-development/content/course.mjs';
import { searchTopics } from './studylab-search-topics.mjs';
import { prldLearningPage } from './build-prld-learning-page.mjs';
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
const pageWrites = [];
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
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="referrer" content="strict-origin-when-cross-origin"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' 'sha256-${hash}'; style-src 'self'; img-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'"><title>${escape(title)} | StudyLab</title><meta name="description" content="${escape(description)}"><meta name="robots" content="index,follow"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="StudyLab"><meta property="og:title" content="${escape(title)} | StudyLab"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/images/studylab-dashboard.jpg"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/learn/images/studylab-sl-icon.svg" type="image/svg+xml"><link rel="stylesheet" href="/learn/css/search-learning-guides.css?v=1">${path === '/learn/study-packs/' ? '<link rel="stylesheet" href="/learn/css/study-pack-library.css?v=2">' : ''}<script src="/learn/js/shared/restore-theme-before-paint.js?v=40"></script><script type="application/ld+json">${schema}</script>${path === '/learn/prld5121/' ? '<link rel="stylesheet" href="/learn/css/prld-study-route.css?v=1">' : ''}</head><body><a class="skip" href="#content">Skip to content</a><header><a class="brand" href="/studylab/"><span class="portrait"><img src="/images/lefa-blue-suit.jpg" alt="" width="42" height="42"></span>Study<span>Lab</span></a><nav aria-label="StudyLab links"><a href="/learn/study-packs/">Study Packs</a> . <a href="/learn/">Open learning app</a></nav></header><main id="content"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/studylab/">StudyLab</a> / <a href="${lesson ? (path.includes('/docker/') ? '/learn/docker/' : '/learn/csharp/') : '/studylab/'}">${lesson ? (path.includes('/docker/') ? 'Docker lessons' : 'C# lessons') : 'Learning guides'}</a></nav><h1>${escape(title)}</h1>${body}<section class="panel"><h2>Explore StudyLab subjects</h2><nav class="subject-links" aria-label="Related learning subjects">${subjectLinks}</nav></section></main><footer><p>StudyLab. Original learning materials by Lefa Malatji. Practice code in the environment stated in each lesson.</p><a href="/learn/#about">About and privacy</a> . <a href="/">Meet the creator</a></footer></body></html>`;
  const folder = new URL('../dist' + path, import.meta.url);
  mkdirSync(folder, { recursive: true });
  const output = new URL('index.html', folder);
  pageWrites.push(
    format(html, {
      parser: 'html',
      printWidth: 90,
      embeddedLanguageFormatting: 'off',
    }).then((formatted) => {
      const script = formatted.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      );
      if (!script) throw new Error('Missing structured data in ' + path);
      const formattedHash = createHash('sha256').update(script[1]).digest('base64');
      writeFileSync(
        output,
        formatted.replace('sha256-' + hash, 'sha256-' + formattedHash),
      );
    }),
  );
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
  `<p class="lede">Learn computing one step at a time. Read a simple explanation, follow a worked example, test your prediction and practise independently.</p>${app('', 'Open StudyLab')}<section class="panel"><h2>Choose what you want to learn</h2><div class="cards"><article><h3><a href="/learn/wede5020/">Web Development (Introduction) . WEDE5020</a></h3><p>Practise HTML, CSS, JavaScript and publishing through a seven-unit website project.</p></article>${searchTopics.map((t) => `<article><h3><a href="/learn/${t.slug}/">${escape(t.title)}</a></h3><p>${escape(t.description)}</p></article>`).join('')}</div></section><section class="panel"><h2>How StudyLab helps you study</h2><ol><li>Start with a topic you need for class and read the beginner explanation.</li><li>Predict a result, then compare it with a worked example.</li><li>Use the pseudocode tracer, diagram activities or SQL practice tools in the application.</li><li>For C# and Docker, download the supplied project and follow the local setup instructions.</li><li>Complete a practice task and use the explanation to identify what to revise.</li></ol><p>StudyLab supports Programming Logic PRLD5121, Database DATA6211, Database Intermediate DATA6222 and C# PROG6212 and Web Development WEDE5020. Advanced Database and Docker provide additional learning modules. You can reach these guides directly without visiting the creator's portfolio.</p></section>`,
);
const downloadSize = (bytes) =>
  bytes >= 1048576
    ? (bytes / 1048576).toFixed(1) + ' MB'
    : Math.max(1, Math.round(bytes / 1024)) + ' KB';
const modulePacks = JSON.parse(
  readFileSync(new URL('./module-study-packs.json', import.meta.url), 'utf8'),
);
page(
  '/learn/study-packs/',
  'Study packs for every module',
  'Free StudyLab revision packs for PRLD5121, DATA6211, DATA6222, Advanced Database, C# PROG6212 and Docker. Download questions and worked answers.',
  `<div class="pack-intro"><p class="pack-eyebrow">STUDYLAB LEARNING RESOURCES</p><p class="lede">Read it. Understand it. Practise it.</p><p>Choose a study guide, question sheet, explained answers or illustrated PowerPoint. Start with the guide, then test what you can do independently.</p><a class="button" href="#module-packs">Browse all modules</a></div><nav class="pack-module-nav" aria-label="Jump to a module">${modulePacks.map((m) => `<a href="#pack-${m.slug}">${escape(m.title)}</a>`).join('')}</nav><section id="module-packs" class="pack-section"><h2>PDF guides and PowerPoint revision</h2><p>PRLD5121 covers all 22 current lessons plus three extensions, with 78 workbook tasks and two mixed papers. WEDE5020 follows seven learning units and includes 18 worked lessons. The remaining modules each include five illustrated revision chapters. Download the files separately, or choose the complete free bundle.</p><div class="pack-grid">${modulePacks.map((m, i) => `<article class="pack-card" id="pack-${m.slug}"><img class="pack-cover" src="/learn/images/study-packs/${m.slug}-preview.png" alt="${escape(m.title)} illustrated revision cover" width="1280" height="720" loading="lazy"><span class="pack-number">0${i + 1} / FREE LEARNING RESOURCES</span><h3>${escape(m.title)}</h3><p>${escape(m.description)}</p><details class="pack-topics"><summary>What you will learn</summary><ol>${m.topics.map((t) => `<li>${escape(t)}</li>`).join('')}</ol></details>${m.slug === 'prld5121' ? '<p><a class="button" href="/learn/prld5121/">Open complete PRLD5121 study route</a></p>' : ''}<div class="pack-files">${m.resources.map((f) => `<a class="pack-file" href="/learn/downloads/modules/${f.file}" download><span class="pack-file-format">${f.format}</span><span><strong>${escape(f.label)}</strong><span class="pack-file-name">${escape(f.file)}</span><small>${escape(f.detail)} . ${downloadSize(f.bytes)}</small></span></a>`).join('')}</div><div class="pack-downloads"><a class="button" href="/learn/downloads/modules/${m.archive}" download>Download all free files <span class="pack-format">ZIP</span></a><small>Includes the ${m.resources.length} files above . ${downloadSize(m.archiveBytes)}</small></div></article>`).join('')}</div></section><section class="panel"><h2>A study routine that checks understanding</h2><ol><li>Read one guide chapter and explain its diagram in your own words.</li><li>Trace the worked example. Change an input and predict the result.</li><li>Answer the chapter check question, then attempt the separate practice sheet.</li><li>Compare with the worked answers and record why your approach differed.</li><li>Use the PowerPoint to revise, then return to the online lessons and practice exams for more work.</li></ol><p>Study in short sessions across several days. These resources support revision alongside your module outline and lecturer guidance. SQL Server, WPF and Docker examples require the stated local environment.</p></section><section class="panel"><h2>More free lessons and practice</h2><div class="actions"><a class="button" href="/learn/#resources">Programming downloads and unit slides</a><a class="button" href="/learn/#db-resources">Database question sheets and slides</a><a class="button" href="/learn/csharp/">C# learning guide</a><a class="button" href="/learn/docker/">Docker learning guide</a></div></section><section class="panel"><h2>Database dependency diagrams and datasets</h2><p>The sample PDF contains SQL exercises and a worked case with dependency arrows through 1NF, 2NF and 3NF.</p><div class="actions"><a class="button" href="/learn/downloads/study-packs/database-revision-free-sample.pdf" download>Database Revision Sample.pdf</a><a href="/learn/downloads/study-packs/revision-practice-sqlite.sql" download>SQLite practice dataset</a><a href="/learn/downloads/study-packs/revision-practice-sqlserver.sql" download>SQL Server practice dataset</a></div><p>Use a separate empty practice database: setup scripts reset their named teaching tables.</p><p>The larger premium question banks, exam papers and private project bundles remain in review. <strong>Not yet for sale.</strong></p></section>`,
);
page(
  '/learn/wede5020/',
  'WEDE5020 Web Development (Introduction)',
  'Learn HTML, CSS, JavaScript, responsive design and publishing through a campus repair café project.',
  `<p class="lede">Build a campus repair café website, from the first project brief to testing a published page.</p>${app('#wede', 'Open the WEDE5020 module')}<section class="panel"><h2>Learning units</h2>${wedeUnits
    .map(
      (unit) =>
        `<h3><a href="/learn/#wede-unit/${unit.id}">Unit ${unit.id}. ${escape(unit.title)}</a></h3><p>${escape(unit.goal)}</p><ul>${wedeLessons
          .filter((lesson) => lesson.unit === unit.id)
          .map(
            (lesson) =>
              `<li><a href="/learn/#wede-lesson/${lesson.id}">${escape(lesson.title)}</a></li>`,
          )
          .join('')}</ul>`,
    )
    .join(
      '',
    )}</section><section class="panel"><h2>Study resources</h2><div class="actions"><a class="button" href="/learn/study-packs/#pack-wede5020">Download the WEDE5020 study pack</a>${app('#wede-tools', 'Try the CSS box model lab')}</div></section>`,
);
prldLearningPage(page, escape);
await Promise.all(pageWrites);
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
