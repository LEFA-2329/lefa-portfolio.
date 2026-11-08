export const topics = {
  experience: {
    title: 'Work experience',
    answer:
      'Lefa is a lecturer at Rosebank College, teaching programming, software development and database concepts. He completed a one-year Software Developer internship at Simplifon, developing web applications and PostgreSQL databases. He also has three years of academic tutoring experience at the University of Limpopo.',
    links: [['Education and experience', '#about']],
  },
  skills: {
    title: 'Technical skills',
    answer:
      'Lefa works with C#, ASP.NET Core Web API, MVC, PHP, JavaScript, HTML5, CSS3 and Bootstrap 5. His database skills include PostgreSQL, SQL Server, MySQL, data modelling, normalisation and migrations. He also uses Git, GitHub and Docker.',
    links: [['Technical focus', '#expertise']],
  },
  databases: {
    title: 'Database experience',
    answer:
      'During his Simplifon internship, Lefa developed and managed PostgreSQL databases for web applications. Store Hub also uses PostgreSQL. His skills include SQL Server, MySQL, relational data modelling, normalisation and Entity Framework migrations.',
    links: [
      ['Database skills', '#expertise'],
      [
        'Store Hub source',
        'https://github.com/LEFA-2329/Advanced-E-Commerce-Marketplace-Platform',
      ],
    ],
  },
  projects: {
    title: 'Selected projects',
    answer:
      'Store Hub is a PHP/PostgreSQL e-commerce project with AI personalisation, intelligent search, BI reports and a support chatbot. HelpDeskHub is an in-progress ASP.NET Core ticket API project. Other projects include pre-school and airport management systems, plus Burzarsnet, built in a team of four.',
    links: [['Browse projects', '#work']],
  },
  research: {
    title: 'NLP research',
    answer:
      'Lefa’s MSc research investigates how data scarcity affects Sepedi-English code-switched text generation using FNet, LSTM and mBERT. He co-authored published research with Thipe I. Modipa on Sepedi-English generation using FNet.',
    links: [['Research and publication', '#about']],
  },
  education: {
    title: 'Education',
    answer:
      'University of Limpopo: MSc in Computer Science, 2026-present; BSc Honours in Computer Science, 2025; BSc in Mathematical Sciences, 2021-2024, with majors in Computer Science and Statistics.',
    links: [['Education details', '#about']],
  },
  contact: {
    title: 'Contact Lefa',
    answer:
      'Lefa is based in Johannesburg, South Africa, and is exploring opportunities in AI, software and data. Email lazylefa@gmail.com or WhatsApp +27 69 729 4309. For salary expectations, notice period or interview availability, please ask him directly.',
    links: [['Contact details', '#contact']],
  },
};
const routes = [
  [
    'contact',
    /\b(contact|email|whatsapp|phone|salary|notice|availability|available|interview|reach|hire|location)\b/i,
  ],
  [
    'databases',
    /\b(postgres(?:ql)?|database(?:s)?|sql|mysql|normalisation|normalization)\b/i,
  ],
  ['research', /\b(research|nlp|sepedi|fnet|lstm|mbert|publication|paper)\b/i],
  [
    'education',
    /\b(education|degree|qualification(?:s)?|university|studied|honours|masters|msc|bsc)\b/i,
  ],
  [
    'experience',
    /\b(experience|lecturer|teaching|rosebank|intern(?:ship)?|simplifon|tutor|background)\b/i,
  ],
  [
    'projects',
    /\b(project(?:s)?|store|helpdesk(?:hub)?|airport|school|burzarsnet|commerce|chatbot)\b/i,
  ],
  [
    'skills',
    /\b(skill(?:s)?|technology|technologies|stack|programming|csharp|php|javascript|docker|python|api|mvc)\b|c#|asp\.net/i,
  ],
];
export function findTopics(question) {
  if (typeof question !== 'string' || question.length > 1000) return [];
  return routes
    .filter(([, pattern]) => pattern.test(question))
    .map(([key]) => key)
    .slice(0, 2);
}

// Flexible local matching; no model, network requests or generated claims.
const aliases = {
  experience: [
    'employment',
    'career',
    'jobs',
    'job',
    'worked',
    'working',
    'professional background',
    'teach',
    'teacher',
    'lecturing',
    'tutoring',
    'simplifon',
    'rosebank',
    'yourself',
    'himself',
    'about him',
    'about you',
    'who are you',
    'who is he',
  ],
  skills: [
    'languages',
    'code',
    'coding',
    'develop',
    'developer',
    'development',
    'program',
    'programmer',
    'framework',
    'frameworks',
    'tools',
    'tool',
    'technology',
    'technologies',
    'c sharp',
    'csharp',
    'c#',
    'dotnet',
    'dot net',
    'aspnet',
    'asp.net',
    'html',
    'css',
    'bootstrap',
    'git',
    'github',
    'docker',
    'javascript',
    'php',
    'python',
    'abilities',
    'capable',
  ],
  databases: [
    'database',
    'databases',
    'data modelling',
    'data modeling',
    'data model',
    'schema',
    'schemas',
    'relational',
    'entity framework',
    'migration',
    'migrations',
    'postgresql',
    'postgres',
    'mysql',
    'sql server',
    'sqlserver',
    'database administration',
    'dba',
    'data storage',
  ],
  projects: [
    'built',
    'build',
    'created',
    'create',
    'portfolio',
    'applications',
    'application',
    'websites',
    'website',
    'systems',
    'system',
    'storehub',
    'store hub',
    'helpdesk',
    'helpdeskhub',
    'ecommerce',
    'e commerce',
    'preschool',
    'pre school',
    'airport',
    'burzarsnet',
    'bursaries',
    'internships',
    'examples',
    'showcase',
  ],
  research: [
    'artificial intelligence',
    'machine learning',
    'language model',
    'language models',
    'generative',
    'code switching',
    'code switched',
    'low resource',
    'data scarcity',
    'published',
    'publication',
    'journal',
    'paper',
    'papers',
    'researcher',
    'sepedienglish',
    'sepedi english',
    'nlp',
    'fnet',
    'lstm',
    'mbert',
  ],
  education: [
    'study',
    'studies',
    'studying',
    'graduate',
    'graduated',
    'graduation',
    'academic',
    'qualifications',
    'qualification',
    'university',
    'limpopo',
    'bachelor',
    'bachelors',
    'honors',
    'honours',
    'honor',
    'master',
    'masters',
    'msc',
    'bsc',
    'statistics',
    'mathematical',
  ],
  contact: [
    'reach out',
    'get in touch',
    'get hold',
    'speak',
    'talk',
    'message',
    'email',
    'mail',
    'whatsapp',
    'phone',
    'number',
    'telephone',
    'contact',
    'hire',
    'hiring',
    'recruit',
    'recruiter',
    'opportunity',
    'opportunities',
    'salary',
    'pay',
    'notice period',
    'availability',
    'available',
    'interview',
    'based',
    'live',
    'located',
    'location',
    'johannesburg',
  ],
};
const stop = new Set(
  'a an the and or to of for in on at is are was were be been i me my you your yours he his him she it this that these those does do did can could would should will what which how why when where tell please about more with have has had know want like lefa malatji'.split(
    ' ',
  ),
);
const normalise = (text) =>
  text
    .toLowerCase()
    .replace(/c\s*#/g, 'csharp')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const words = (text) =>
  normalise(text)
    .split(/\s+/)
    .filter((x) => x.length > 2 && !stop.has(x));
const distance = (a, b) => {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const old = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      prev = old;
    }
  }
  return row[b.length];
};
export function answerTopics(question, previous = []) {
  if (typeof question !== 'string' || !question.trim() || question.length > 1000)
    return [];
  const q = normalise(question),
    tokens = words(question);
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)$/.test(q))
    return ['greeting'];
  if (/^(thanks|thank you|thank you very much|bye|goodbye)$/.test(q)) return ['thanks'];
  if (
    /^(tell me more|more|what else|go on|continue|explain more|and that|can you expand|more details|tell me more about that)$/.test(
      q,
    )
  )
    return previous.filter((k) => topics[k]).slice(0, 1);
  // Contact questions and unavailable personal details receive explicit factual limits.
  if (
    /\b(salary|pay|notice|available|availability|interview|age|birthday|married|wife|husband|children|religion|address|id number)\b/.test(
      q,
    )
  )
    return ['unknown'];
  const scored = Object.entries(topics)
    .map(([key, topic]) => {
      const terms = aliases[key] || [];
      let score = 0;
      for (const term of terms) {
        const phrase = normalise(term);
        if ((' ' + q + ' ').includes(' ' + phrase + ' '))
          score += phrase.includes(' ') ? 5 : 3;
      }
      for (const token of tokens)
        if (
          token.length >= 5 &&
          terms.some(
            (term) =>
              !term.includes(' ') &&
              Math.abs(normalise(term).length - token.length) <= 1 &&
              distance(normalise(term), token) <= 1,
          )
        )
          score += 4;
      const vocabulary = new Set([
        ...words(topic.title + ' ' + topic.answer),
        ...terms.flatMap(words),
      ]);
      for (const token of tokens) {
        if (vocabulary.has(token)) score += 1;
        else if (
          token.length >= 5 &&
          [...vocabulary].some(
            (v) =>
              v.length >= 5 &&
              Math.abs(v.length - token.length) <= 1 &&
              distance(v, token) <= 1,
          )
        )
          score += 3;
      }
      return { key, score };
    })
    .sort((a, b) => b.score - a.score);
  if (!scored.length || scored[0].score < 3) return [];
  return scored
    .filter((x) => x.score >= 3)
    .slice(0, 2)
    .map((x) => x.key);
}
export const notices = {
  greeting:
    'Hello! I can help you explore Lefa’s work experience, technical skills, projects, research and education. What would you like to know?',
  thanks:
    'You’re welcome. If you’d like to discuss an opportunity, use the email or WhatsApp links below.',
  unknown:
    'That detail is not provided in Lefa’s portfolio. For salary expectations, availability or other personal details, please contact Lefa directly using email or WhatsApp.',
};

const projects = {
  store: {
    name: 'Store Hub',
    match: /\b(store\s*hub|storehub|store|e\s*commerce|ecommerce|marketplace)\b/,
    overview:
      'Lefa built Store Hub, a multi-role e-commerce platform using PHP and PostgreSQL. It includes AI-driven personalisation, intelligent product search, business intelligence reports and a session-aware support chatbot.',
    stack:
      'Store Hub uses PHP and PostgreSQL. Other implementation details are not documented in this portfolio.',
    database:
      'Store Hub uses PostgreSQL to support the multi-role e-commerce application.',
    features:
      'Documented features include multi-role e-commerce, AI-driven personalisation, intelligent product search, business intelligence reports and a session-aware customer-support chatbot.',
    links: [
      [
        'Store Hub source code',
        'https://github.com/LEFA-2329/Advanced-E-Commerce-Marketplace-Platform',
      ],
    ],
  },
  helpdesk: {
    name: 'HelpDeskHub',
    match: /\b(help\s*desk\s*hub|helpdesk(?:hub)?|ticket(?:s|ing)?)\b/,
    overview:
      'HelpDeskHub is Lefa’s in-progress ASP.NET Core help desk project. Its documented work covers ticket APIs, user identity and a PostgreSQL data layer. It is still in development.',
    stack:
      'HelpDeskHub uses C#, ASP.NET Core, PostgreSQL and Entity Framework. It includes REST APIs and user identity.',
    database:
      'HelpDeskHub uses PostgreSQL with Entity Framework for its relational data layer.',
    features:
      'Documented work includes ticket APIs, user identity and PostgreSQL integration. Workload-based staff assignment, notifications and additional workflow features are planned; they are not presented as completed.',
    links: [['HelpDeskHub overview', '#work']],
  },
  preschool: {
    name: 'Pre-School Management System',
    match: /\b(pre\s*school|preschool|learners|borrowing)\b/,
    overview:
      'Lefa developed an administration dashboard with key statistics, secure login and management of learners, teachers, books and borrowing records.',
    stack:
      'The portfolio does not specify the Pre-School Management System’s programming language or database engine. Please check the source code or ask Lefa for those details.',
    database:
      'The project manages learners, teachers, books and borrowing records. Its database engine is not specified in the portfolio.',
    features:
      'The documented features are key statistics, secure admin login, learner and teacher management, and book and borrowing-record management.',
    links: [
      [
        'Pre-School Management System source',
        'https://github.com/LEFA-2329/Pre-school-management-system',
      ],
    ],
  },
  airport: {
    name: 'Airport Sky Base System',
    match: /\b(airport|air\s*sky|sky\s*base)\b/,
    overview:
      'Lefa developed and tested an airport management application with an interface for accessing and managing airport information.',
    stack:
      'The portfolio does not specify the Airport Sky Base System’s programming language or database engine. The repository is available for more detail.',
    database:
      'The system manages airport information, but its database engine and schema are not specified in the portfolio.',
    features:
      'The documented scope is airport management operations and a user-friendly interface for accessing and managing airport information. Lefa also developed and tested the system.',
    links: [
      [
        'Airport Sky Base System source',
        'https://github.com/LEFA-2329/Airport-Sky-Base-System',
      ],
    ],
  },
  burzarsnet: {
    name: 'Burzarsnet',
    match: /\b(burzarsnet|bursar(?:y|ies)|bursar(?:y|ies)\s*website)\b/,
    overview:
      'Lefa collaborated in a team of four to develop Burzarsnet, a South African bursary and internship website with administration management.',
    stack:
      'The portfolio does not specify Burzarsnet’s programming language or database engine. Lefa contributed as part of a four-person team.',
    database:
      'Burzarsnet includes administration management, but the portfolio does not specify its database engine.',
    features:
      'Burzarsnet provides bursary and internship information for South Africa, with administration management. Lefa worked in a team of four; his individual feature ownership is not specified.',
    links: [['Burzarsnet project information', '#work']],
  },
};
Object.assign(topics, {
  teaching: {
    title: 'Lecturing at Rosebank College',
    answer:
      'Lefa teaches programming logic and design, software development and database concepts at Rosebank College. He guides students in C#, object-oriented programming, HTML/CSS, ASP.NET MVC and SQL, and assesses assignments and projects against rubrics with feedback.',
    links: [['Teaching experience', '#about']],
  },
  internship: {
    title: 'Simplifon internship',
    answer:
      'During his one-year Software Developer internship at Simplifon, Lefa developed and maintained web-based applications and developed and managed PostgreSQL databases supporting those applications. Exact employment dates and performance metrics are not provided.',
    links: [['Professional experience', '#about']],
  },
  teamwork: {
    title: 'Teamwork and communication',
    answer:
      'Lefa collaborated in a team of four on Burzarsnet, a South African bursary and internship platform. His lecturer and tutoring roles also involve explaining technical concepts and guiding students. The portfolio does not identify his individual Burzarsnet feature ownership.',
    links: [
      ['Projects', '#work'],
      ['Experience', '#about'],
    ],
  },
});
export const defaultSuggestions = [
  'What did Lefa build with PHP?',
  'Tell me about HelpDeskHub',
  'What does he teach?',
];
const card = (key) =>
  topics[key]
    ? { title: topics[key].title, answer: topics[key].answer, links: topics[key].links }
    : {
        title: 'Portfolio guide',
        answer: notices[key] || notices.unknown,
        links: [['Contact Lefa', '#contact']],
      };
export function getResponse(question, context = {}) {
  if (typeof question !== 'string' || !question.trim() || question.length > 1000)
    return { cards: [], context, suggestions: defaultSuggestions };
  const q = normalise(question);
  const explicit = Object.entries(projects).find(([, project]) => project.match.test(q));
  const neutral = /^(hi|hello|hey|thanks|thank you|bye|goodbye)$/.test(q);
  if (neutral) {
    const key = /thanks|thank you|bye/.test(q) ? 'thanks' : 'greeting';
    return { cards: [card(key)], context, suggestions: defaultSuggestions };
  }
  if (
    /\b(salary|pay|notice|availability|available|interview|age|birthday|married|wife|husband|children|religion|address|id number)\b/.test(
      q,
    )
  )
    return {
      cards: [card('unknown')],
      context,
      suggestions: ['How can I contact Lefa?', 'What experience does he have?'],
    };
  const followup =
    projects[context.project] &&
    /\b(it|its|this|that|database|stack|technologies|language|features|completed|finished|status|demo|source|repository|built|developed)\b|^(tell me more|more|what else|continue|explain more|more details)$/.test(
      q,
    );
  let projectKey = explicit?.[0] || (followup ? context.project : null);
  // Technology-specific project questions use only verified project stacks.
  if (
    !projectKey &&
    /\b(project|projects|built|build|made|developed|application|applications)\b/.test(q)
  ) {
    if (/\bphp\b/.test(q)) projectKey = 'store';
    else if (/\b(csharp|asp net|dotnet|dot net)\b/.test(q)) projectKey = 'helpdesk';
  }
  if (projectKey) {
    const project = projects[projectKey];
    let answer = project.overview;
    if (/\b(users|revenue|performance|benchmarks|metrics|customers|accuracy)\b/.test(q))
      answer =
        'Verified user counts, revenue and performance metrics for ' +
        project.name +
        ' are not provided in the portfolio. Please ask Lefa for evidence or further details.';
    else if (/\b(demo|live|deployed|deployment)\b/.test(q))
      answer =
        'A verified live demo URL for ' +
        project.name +
        ' is not provided here. You can review the linked project information or contact Lefa to request a demonstration.';
    else if (/\b(database|postgres|postgresql|mysql|sql|schema)\b/.test(q))
      answer = project.database;
    else if (
      /\b(stack|technologies|technology|language|framework|tools|php|csharp)\b/.test(q)
    )
      answer = project.stack;
    else if (
      /\b(features|feature|more|functionality|does|planned|completed|finished|status)\b/.test(
        q,
      )
    )
      answer = project.features;
    return {
      cards: [{ title: project.name, answer, links: project.links }],
      context: { project: projectKey, topic: 'projects' },
      suggestions: [
        'Which database does it use?',
        'What features does it have?',
        'How can I contact Lefa?',
      ],
    };
  }
  if (/\b(teaches|teach|teaching|lecturer|lecturing|rosebank)\b/.test(q))
    return {
      cards: [card('teaching')],
      context: { topic: 'teaching' },
      suggestions: ['What did he do at Simplifon?', 'Tell me about his projects'],
    };
  if (/\b(simplifon|internship|intern)\b/.test(q))
    return {
      cards: [card('internship')],
      context: { topic: 'internship' },
      suggestions: ['What database experience does he have?', 'What does he teach?'],
    };
  if (/\b(team|teamwork|collaboration|collaborate|communication)\b/.test(q))
    return {
      cards: [card('teamwork')],
      context: { topic: 'teamwork' },
      suggestions: ['Tell me about Burzarsnet', 'What does he teach?'],
    };
  if (/\b(azure|aws|certification|certified|java|react|kubernetes|rag|agents)\b/.test(q))
    return {
      cards: [
        {
          title: 'Information not documented',
          answer:
            'That specific skill, certification or experience is not documented in Lefa’s portfolio. Ask him directly to confirm; you can also review his listed technical skills.',
          links: [
            ['Technical skills', '#expertise'],
            ['Contact Lefa', '#contact'],
          ],
        },
      ],
      context,
      suggestions: ['What are his technical skills?', 'What did he build with PHP?'],
    };
  const keys = answerTopics(question, context.topic ? [context.topic] : []);
  return {
    cards: keys.length
      ? keys.map(card)
      : [
          {
            title: 'Try a related question',
            answer:
              'I couldn’t match that question confidently to Lefa’s information. Try a specific project name, a skill or one of the suggestions below. You can also contact Lefa directly.',
            links: [['Contact Lefa', '#contact']],
          },
        ],
    context: keys.length ? { topic: keys[0] } : context,
    suggestions: defaultSuggestions,
  };
}
