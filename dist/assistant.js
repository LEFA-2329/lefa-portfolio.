(() => {
  'use strict';
  const launch = document.querySelector('#assistant-launch');
  const panel = document.querySelector('#assistant-panel');
  if (!launch || !panel) return;
  let ready;
  launch.addEventListener('click', async () => {
    panel.showModal();
    try {
      ready ||= import('./guide-core.mjs?v=4').then(initialise);
      await ready;
      if (panel.open) panel.querySelector('textarea').focus();
    } catch {
      panel.querySelector('#assistant-status').textContent =
        'The guide could not load. Please use the email or WhatsApp links below.';
      ready = null;
    }
  });
  const closeGuide = () => {
    if (panel.open) panel.close();
  };
  panel.querySelectorAll('[data-close]').forEach((button) =>
    button.addEventListener('click', (event) => {
      event.preventDefault();
      closeGuide();
    }),
  );
  panel.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeGuide();
  });
  let backdropPress = false;
  const outside = (event) => {
    const rect = panel.getBoundingClientRect();
    return (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    );
  };
  panel.addEventListener('pointerdown', (event) => {
    backdropPress = event.target === panel && outside(event);
  });
  panel.addEventListener('click', (event) => {
    if (backdropPress && event.target === panel && outside(event)) closeGuide();
    backdropPress = false;
  });
  panel.addEventListener('close', () => launch.focus());
  function initialise({ topics, getResponse, defaultSuggestions }) {
    const form = panel.querySelector('#assistant-form');
    const input = form.querySelector('textarea');
    const log = panel.querySelector('#assistant-messages');
    panel.querySelector('#assistant-status').textContent =
      'Ask in your own words about Lefa. This free guide finds relevant portfolio information; it does not generate new facts. Questions stay in your browser.';
    function message(who, text, links = []) {
      const article = document.createElement('article');
      article.className = 'assistant-message';
      const label = document.createElement('strong');
      label.textContent = who;
      article.append(label);
      const p = document.createElement('p');
      p.textContent = text;
      article.append(p);
      for (const [title, href] of links) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = title;
        if (href.startsWith('https://')) {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        } else a.addEventListener('click', () => panel.close());
        article.append(a);
      }
      log.append(article);
      while (log.children.length > 20) log.firstElementChild.remove();
      article.scrollIntoView({ block: 'nearest' });
    }
    let context = {};
    const suggestions = document.createElement('div');
    suggestions.className = 'assistant-suggestions';
    suggestions.setAttribute('aria-label', 'Related questions');
    form.before(suggestions);
    function suggest(questions) {
      suggestions.replaceChildren();
      for (const question of questions) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = question;
        button.addEventListener('click', () => ask(question));
        suggestions.append(button);
      }
    }
    function ask(question) {
      message('Your question', question);
      const result = getResponse(question, context);
      context = result.context;
      result.cards.forEach((item) => message(item.title, item.answer, item.links));
      suggest(result.suggestions);
    }
    panel.querySelectorAll('[data-topic]').forEach((button) =>
      button.addEventListener('click', () => {
        const key = button.dataset.topic;
        const topic = topics[key];
        if (topic) {
          context = { topic: key };
          message(topic.title, topic.answer, topic.links);
          suggest(defaultSuggestions);
        }
      }),
    );
    suggest(defaultSuggestions);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) return;
      input.value = '';
      ask(question);
      input.focus();
    });
  }
})();
