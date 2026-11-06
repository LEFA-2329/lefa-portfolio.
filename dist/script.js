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
const cases = {
  store: `
<div class="eyebrow green">
 Featured engineering project
</div>
<h2 id="case-title">
 Store Hub
</h2>
<p>
 A PHP and PostgreSQL e-commerce platform supporting multiple user roles.
</p>
<h3>
 AI capabilities
</h3>
<p>
 AI-driven personalisation and intelligent product search support product discovery. A session-aware customer-support chatbot helps shoppers, while AI business intelligence reporting supports business decisions.
</p>
<h3>
 Technical foundation
</h3>
<p>
 The platform combines PHP application logic with a PostgreSQL relational database. Multiple user roles support different platform responsibilities.
</p>
<a class="btn primary" href="https://github.com/LEFA-2329/Advanced-E-Commerce-Marketplace-Platform" rel="noopener noreferrer" target="_blank">
 Explore the repository
</a>
`,
  research: `
<div class="eyebrow green">
 Research overview
</div>
<h2 id="case-title">
 Sepedi-English text generation
</h2>
<p>
 My MSc research investigates data-scarcity effects on the development of a Sepedi-English text generation model.
</p>
<h3>
 The problem
</h3>
<p>
 Code-switched language combines languages within a sentence. Limited training data makes it difficult to model this naturally, particularly for underrepresented languages such as Sepedi.
</p>
<h3>
 The approach
</h3>
<p>
 The work uses code-switched radio-news text and compares FNet and LSTM approaches, with mBERT included in the broader research scope. Preprocessing, consistent dataset splits and BLEU / ROUGE evaluation support model comparison.
</p>
<h3>
 Research focus
</h3>
<p>
 Understanding how corpus size, vocabulary coverage and model choices affect generated language, with attention to the presence of English and unknown tokens.
</p>
<div class="chips">
 <span>
  Low-resource NLP
 </span>
 <span>
  Text generation
 </span>
 <span>
  Experimental evaluation
 </span>
</div>
`,
  helpdesk: `
<div class="eyebrow green">
 Engineering overview · In development
</div>
<h2 id="case-title">
 HelpDeskHub
</h2>
<p>
 A help desk application project built around an ASP.NET Core REST API and PostgreSQL.
</p>
<h3>
 Implemented foundation
</h3>
<p>
 Ticket, department and user API work; Entity Framework migrations; and ASP.NET Identity integration with relationships between tickets, users, comments and history.
</p>
<h3>
 Engineering decisions
</h3>
<p>
 DTOs structure API responses, Swagger supports endpoint testing, and a relational data model connects tickets to their creators and assigned staff.
</p>
<h3>
 Planned development
</h3>
<p>
 An MVC front end, workload-based staff assignment, assignment notifications and role-scoped reporting are part of the roadmap. These are planned capabilities, rather than claims of a completed production deployment.
</p>
<div class="chips">
 <span>
  REST API
 </span>
 <span>
  Relational modelling
 </span>
 <span>
  Identity
 </span>
</div>
`,
};
const dialog = document.querySelector('dialog');
document.querySelectorAll('[data-case]').forEach((b) =>
  b.addEventListener('click', () => {
    document.querySelector('#case-content').innerHTML = cases[b.dataset.case];
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
