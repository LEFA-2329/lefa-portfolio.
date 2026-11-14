import { renderHtmlPage } from '../../shared/render-html-page.mjs?v=32';
const cards = [...document.querySelectorAll('.project')];
document.querySelectorAll('[data-filter]').forEach((btn) =>
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((b) => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    let n = 0;
    cards.forEach((c) => {
      c.hidden =
        btn.dataset.filter !== 'all' &&
        !c.dataset.category.split(' ').includes(btn.dataset.filter);
      if (!c.hidden) n++;
    });
    document.querySelector('#filter-status').textContent =
      `Showing ${n} project${n === 1 ? '' : 's'}`;
  }),
);
const projectStories = {
  school: 'diopong-primary-school',
  store: 'store-hub',
  research: 'sepedi-english-research',
  helpdesk: 'helpdesk-hub',
  preschool: 'preschool-management',
  airport: 'airport-management',
  burzarsnet: 'bursaries-team-project',
  studylab: 'studylab',
};
const dialog = document.querySelector('#case-dialog');
document.querySelectorAll('[data-case]').forEach((b) =>
  b.addEventListener('click', () => {
    if (!Object.hasOwn(projectStories, b.dataset.case)) return;
    document.querySelector('#case-content').innerHTML = renderHtmlPage(
      'portfolio/' + projectStories[b.dataset.case],
    );
    dialog.showModal();
  }),
);
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});

// Native dialog keeps enlarged photos keyboard accessible and returns focus on close.
const photoDialog = document.querySelector('#photo-dialog');
const photoFull = document.querySelector('#photo-full');
document
  .querySelectorAll('.photo-gallery-grid figure, .project-screenshot')
  .forEach((figure, index) => {
    const image = figure.querySelector('img');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'photo-open';
    button.setAttribute(
      'aria-label',
      (figure.classList.contains('project-screenshot')
        ? 'Enlarge project screenshot: '
        : 'Enlarge photo: ') + image.alt,
    );
    image.before(button);
    button.append(image);
    button.addEventListener('click', () => {
      document.querySelector('#photo-title').textContent = figure.classList.contains(
        'project-screenshot',
      )
        ? 'Project screenshot'
        : 'Gallery photo';
      photoFull.src = image.src;
      photoFull.alt = image.alt;
      document.querySelector('#photo-caption').textContent =
        figure.querySelector('figcaption')?.textContent || '';
      photoDialog.showModal();
    });
  });
document
  .querySelector('#photo-close')
  .addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', (e) => {
  if (e.target === photoDialog) {
    const b = photoDialog.getBoundingClientRect();
    if (
      e.clientX < b.left ||
      e.clientX > b.right ||
      e.clientY < b.top ||
      e.clientY > b.bottom
    )
      photoDialog.close();
  }
});
