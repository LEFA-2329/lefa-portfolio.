import { mountRefreshGame } from './refresh-games.mjs?v=39';
// Page layouts: pages/study-break.html and pages/helpful-resources.html.
import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=39';
import { escapeHTML as escape } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=39';
import { resources, recommendedTopic } from './study-resource-catalog.mjs?v=39';
export function shuffledGarden(random = Math.random) {
  const cards = ['🌻', '🌿', '🌸', '🍀', '🌵', '🍄'].flatMap((symbol) => [
    symbol,
    symbol,
  ]);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
export function studyBreakPage({ view, returnTo = '#home' }) {
  view.innerHTML = renderHtmlPage('studylab/study-break', {
    dynamic_1: escape(returnTo),
  });
  const board = view.querySelector('#garden-board'),
    status = view.querySelector('#break-status'),
    hide = view.querySelector('#break-hide');
  let cards, selected, matched, moves;
  const names = {
    '🌻': 'Sunflower',
    '🌿': 'Herb',
    '🌸': 'Blossom',
    '🍀': 'Clover',
    '🌵': 'Cactus',
    '🍄': 'Mushroom',
  };
  function paint() {
    for (const [index, button] of [...board.children].entries()) {
      const revealed = selected.includes(index) || matched.has(index);
      button.textContent = revealed ? cards[index] : '✦';
      button.setAttribute(
        'aria-label',
        `Card ${index + 1}: ${revealed ? names[cards[index]] : 'face down'}${matched.has(index) ? ', matched' : ''}`,
      );
      button.setAttribute('aria-disabled', String(matched.has(index)));
      button.classList.toggle('matched', matched.has(index));
    }
  }
  function reset() {
    cards = shuffledGarden();
    selected = [];
    matched = new Set();
    moves = 0;
    hide.hidden = true;
    board.replaceChildren(
      ...cards.map((_, i) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'garden-card';
        button.addEventListener('click', () => flip(i));
        return button;
      }),
    );
    paint();
    status.textContent = 'A fresh garden. Choose your first card.';
  }
  function flip(i) {
    if (matched.has(i) || selected.includes(i)) return;
    if (selected.length === 2) {
      selected = [];
      hide.hidden = true;
    }
    selected.push(i);
    if (selected.length === 2) {
      moves++;
      if (cards[selected[0]] === cards[selected[1]]) {
        selected.forEach((x) => matched.add(x));
        selected = [];
        status.textContent =
          matched.size === 12
            ? `Garden complete in ${moves} turns. Take a breath, then return when ready.`
            : `A pair found! ${matched.size / 2} of 6 pairs. Choose another card.`;
      } else {
        status.textContent =
          'Different plants. Look at them, then choose another card or turn them over.';
        hide.hidden = false;
      }
    } else status.textContent = `${names[cards[i]]}. Find its partner.`;
    paint();
  }
  hide.addEventListener('click', () => {
    selected = [];
    hide.hidden = true;
    paint();
    status.textContent = 'Choose a card.';
    board.children[0].focus();
  });
  view.querySelector('#break-restart').addEventListener('click', reset);
  reset();
  let cleanupGame = () => {};
  for (const button of view.querySelectorAll('[data-break-game]')) {
    button.addEventListener('click', () => {
      cleanupGame();
      cleanupGame = () => {};
      const game = button.dataset.breakGame;
      const host = view.querySelector('#refresh-game-host');
      view.querySelector('.break-game').hidden = game !== 'garden';
      host.hidden = game === 'garden';
      for (const choice of view.querySelectorAll('[data-break-game]'))
        choice.setAttribute('aria-pressed', String(choice === button));
      if (game !== 'garden') cleanupGame = mountRefreshGame(host, game);
    });
  }
  return () => cleanupGame();
}
export function helpfulResourcesPage({ view, course, title = '', returnTo = '#home' }) {
  view.innerHTML = renderHtmlPage('studylab/helpful-resources', {
    dynamic_1: escape(
      title
        ? `Suggested for your recent study: ${title}`
        : 'Choose a topic, or browse suggestions for your current module.',
    ),
    dynamic_2: escape(returnTo),
  });
  const select = view.querySelector('#resource-topic');
  select.value = recommendedTopic(course, title);
  function render() {
    view.querySelector('#resource-cards').innerHTML = resources
      .filter((r) => r.topics.includes(select.value))
      .map(
        (r) =>
          `<article class="panel"><p class="eyebrow">${escape(r.kind)} · ${escape(r.provider)}</p><h2><a href="${escape(r.url)}" target="_blank" rel="noopener noreferrer">${escape(r.title)} <span class="settings-sr-only">(opens in a new tab)</span></a></h2><p>${escape(r.description)}</p><p class="resource-note">${escape(r.note)}</p></article>`,
      )
      .join('');
  }
  select.addEventListener('change', render);
  render();
}
