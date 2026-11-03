export const topics = {
 experience: { title: 'Work experience', answer: 'Lefa is a lecturer at Rosebank College, teaching programming, software development and database concepts. He completed a one-year Software Developer internship at Simplifon, developing web applications and PostgreSQL databases. He also has three years of academic tutoring experience at the University of Limpopo.', links: [['Education and experience', '#about']] },
 skills: { title: 'Technical skills', answer: 'Lefa works with C#, ASP.NET Core Web API, MVC, PHP, JavaScript, HTML5, CSS3 and Bootstrap 5. His database skills include PostgreSQL, SQL Server, MySQL, data modelling, normalisation and migrations. He also uses Git, GitHub and Docker.', links: [['Technical focus', '#expertise']] },
 databases: { title: 'Database experience', answer: 'During his Simplifon internship, Lefa developed and managed PostgreSQL databases for web applications. Store Hub also uses PostgreSQL. His skills include SQL Server, MySQL, relational data modelling, normalisation and Entity Framework migrations.', links: [['Database skills', '#expertise'], ['Store Hub source', 'https://github.com/LEFA-2329/Advanced-E-Commerce-Marketplace-Platform']] },
 projects: { title: 'Selected projects', answer: 'Store Hub is a PHP/PostgreSQL e-commerce project with AI personalisation, intelligent search, BI reports and a support chatbot. HelpDeskHub is an in-progress ASP.NET Core ticket API project. Other projects include pre-school and airport management systems, plus Burzarsnet, built in a team of four.', links: [['Browse projects', '#work']] },
 research: { title: 'NLP research', answer: 'Lefa’s MSc research investigates how data scarcity affects Sepedi–English code-switched text generation using FNet, LSTM and mBERT. He co-authored published research with Thipe I. Modipa on Sepedi–English generation using FNet.', links: [['Research and publication', '#about']] },
 education: { title: 'Education', answer: 'University of Limpopo: MSc in Computer Science, 2026–present; BSc Honours in Computer Science, 2025; BSc in Mathematical Sciences, 2021–2024, with majors in Computer Science and Statistics.', links: [['Education details', '#about']] },
 contact: { title: 'Contact Lefa', answer: 'Lefa is based in Johannesburg, South Africa, and is exploring opportunities in AI, software and data. Email lazylefa@gmail.com or WhatsApp +27 69 729 4309. For salary expectations, notice period or interview availability, please ask him directly.', links: [['Contact details', '#contact']] }
};
const routes = [
 ['contact', /\b(contact|email|whatsapp|phone|salary|notice|availability|available|interview|reach|hire|location)\b/i],
 ['databases', /\b(postgres(?:ql)?|database(?:s)?|sql|mysql|normalisation|normalization)\b/i],
 ['research', /\b(research|nlp|sepedi|fnet|lstm|mbert|publication|paper)\b/i],
 ['education', /\b(education|degree|qualification(?:s)?|university|studied|honours|masters|msc|bsc)\b/i],
 ['experience', /\b(experience|lecturer|teaching|rosebank|intern(?:ship)?|simplifon|tutor|background)\b/i],
 ['projects', /\b(project(?:s)?|store|helpdesk(?:hub)?|airport|school|burzarsnet|commerce|chatbot)\b/i],
 ['skills', /\b(skill(?:s)?|technology|technologies|stack|programming|csharp|php|javascript|docker|python|api|mvc)\b|c#|asp\.net/i]
];
export function findTopics(question) {
 if(typeof question !== 'string' || question.length > 1000) return [];
 return routes.filter(([,pattern])=>pattern.test(question)).map(([key])=>key).slice(0,2);
}
