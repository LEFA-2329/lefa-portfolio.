import { escapeHTML as e } from '../prld/engine.mjs?v=30';
export const quizContext = (q) =>
  `${q.kind ? `<p class="eyebrow">${e(q.kind)}</p>` : ''}${q.context ? `<p class="quiz-context">${e(q.context)}</p>` : ''}${q.code ? `<pre class="quiz-snippet"><code>${e(q.code)}</code></pre>` : ''}`;
