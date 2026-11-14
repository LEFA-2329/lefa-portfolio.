# StudyLab search discovery

Public entrance: https://lefamalatji.co.za/studylab/

The application remains at /learn/. Its previous noindex directive is removed. Seven subject guides and the C#/Docker lesson pages provide readable HTML at ordinary URLs, without relying on fragment routing or JavaScript execution. These are public reading pages, linked to the existing interactive app. They do not execute C# or Docker in a browser.

Edit scripts/studylab-search-topics.mjs for topic explanations. C# and Docker reading pages use the same HTML lesson sources, briefs and guided activities as the app. scripts/build-studylab-search-pages.mjs generates these pages and extends sitemap.xml while preserving portfolio entries. Run npm run build after edits. Generated reading pages are excluded from Prettier because the generator owns them.

## Owner follow-up in Google Search Console

1. Open https://search.google.com/search-console and add or select the lefamalatji.co.za property. A domain property requires the DNS TXT verification value that Google generates for your account; a URL-prefix property can use an available Google verification method. Do not invent a verification token.
2. Submit https://lefamalatji.co.za/sitemap.xml under Sitemaps.
3. Inspect https://lefamalatji.co.za/studylab/ and request indexing. Inspect key subject URLs as needed. Monitor Page indexing for exclusions and Performance for actual search queries.

No Search Console account, ownership verification or indexing request has been performed by the code changes. Crawling and ranking remain Google's decisions. Broad searches such as C# or databases are competitive. Clear original content, useful examples and genuine links from teaching resources can help people discover the site over time; do not buy links or repeat keywords unnaturally.
