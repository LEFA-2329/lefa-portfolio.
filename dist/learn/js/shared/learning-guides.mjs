const guides = {
  pseudocode: ['Pseudocode guide', 'prld'],
  prld5121: ['PRLD5121 companion', 'prld'],
  databases: ['Databases and SQL guide', 'database'],
  normalisation: ['Normalisation guide', 'database'],
  hadoop: ['Hadoop guide', 'advanced'],
  csharp: ['C# guide', 'csharp'],
  'asp-net': ['ASP.NET Core guide', 'csharp'],
  docker: ['Docker guide', 'docker'],
  wede5020: ['Web Development guide', 'wede'],
  'study-packs': ['Study Packs'],
};

export const courseGuides = {
  prld: ['pseudocode', 'prld5121'],
  database: ['databases', 'normalisation'],
  intermediate: ['databases', 'normalisation'],
  advanced: ['databases', 'normalisation', 'hadoop'],
  csharp: ['csharp', 'asp-net'],
  docker: ['docker'],
  wede: ['wede5020'],
};

function guideSource(id = '') {
  const [topic, lesson, extra] = id.split('~');
  if (extra !== undefined || !Object.hasOwn(guides, topic)) return null;
  if (lesson !== undefined &&
      !((topic === 'csharp' && /^cs-[a-z0-9-]+$/.test(lesson)) ||
        (topic === 'docker' && /^docker-[a-z0-9-]+$/.test(lesson)))) return null;
  return { topic, path: '/learn/' + topic + '/' + (lesson ? 'lessons/' + lesson + '/' : '') };
}

export function guideCourse(id) {
  const source = guideSource(id);
  return source ? guides[source.topic][1] : undefined;
}

export function learningGuideLink(url, currentGuide) {
  if (url.origin !== location.origin) return '';
  const pieces = url.pathname.replace(/\/$/, '').split('/');
  if (pieces[1] !== 'learn' || !(pieces.length === 3 || (pieces.length === 5 && pieces[3] === 'lessons'))) return '';
  const id = pieces[2] + (pieces[4] ? '~' + pieces[4] : '');
  if (!guideSource(id)) return '';
  const section = url.hash.slice(1);
  return '#learning-guide/' + (currentGuide === id ? currentGuide : id) + (section ? '/' + section : '');
}

export function appendCourseGuides(container, course, selectedId) {
  const group = document.createElement('details');
  group.className = 'topic-group';
  group.open = !!selectedId;
  const summary = document.createElement('summary');
  summary.textContent = 'Guides and study packs';
  group.append(summary);
  for (const id of [...(courseGuides[course] || []), 'study-packs']) {
    const link = document.createElement('a');
    link.className = 'topic-link';
    link.href = '#learning-guide/' + id;
    link.textContent = guides[id][0];
    if (id === selectedId?.split('~')[0]) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
    group.append(link);
  }
  container.append(group);
}

export function renderLearningGuide(view, id, section) {
  const source = guideSource(id);
  if (!source) {
    view.innerHTML = '<h1>Guide unavailable</h1><p><a href="#learning-guide/study-packs">Browse Study Packs</a></p>';
    return () => {};
  }
  const controller = new AbortController();
  const title = guides[source.topic][0];
  view.innerHTML = `<h1>${title}</h1><p role="status">Loading guide…</p>`;
  fetch(source.path, { signal: controller.signal })
    .then(async (response) => {
      if (!response.ok) throw new Error('Guide unavailable');
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
      const main = doc.querySelector('main');
      const heading = main?.querySelector('h1');
      if (!heading) throw new Error('Guide is missing its heading');
      if (controller.signal.aborted) return;
      main.querySelector('.breadcrumb')?.remove();
      for (const link of main.querySelectorAll('a[href]')) {
        const href = link.getAttribute('href');
        const target = new URL(href, location.origin + source.path);
        if (href.startsWith('#')) link.href = '#learning-guide/' + id + '/' + href.slice(1);
        else if (target.origin === location.origin && target.pathname === '/learn/' && target.hash) link.href = target.hash;
        else link.href = learningGuideLink(target, id) || target.href;
      }
      for (const table of main.querySelectorAll('table')) {
        const wrapper = document.createElement('div');
        wrapper.style.overflowX = 'auto';
        table.before(wrapper);
        wrapper.append(table);
      }
      view.replaceChildren(...main.childNodes);
      document.title = heading.textContent + ' | StudyLab';
      const target = section && [...view.querySelectorAll('[id]')].find((item) => item.id === section);
      if (target) {
        target.tabIndex = -1;
        target.focus();
        target.scrollIntoView();
      }
    })
    .catch(() => {
      if (controller.signal.aborted) return;
      view.innerHTML = `<h1>${title}</h1><p>The guide could not load here. <a href="${source.path}?standalone">Open the public guide</a>.</p>`;
    });
  return () => controller.abort();
}
