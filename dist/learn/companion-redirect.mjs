const appRoutes = {
  '/learn/github/': 'wede-github-guide',
  '/learn/wede-portfolio/': 'wede-portfolio',
  '/learn/wede-debugging/': 'wede-debugging',
};
const path = location.pathname.replace(/index\.html$/, '');
const route = appRoutes[path];
if (route && !new URLSearchParams(location.search).has('standalone')) {
  const section = location.hash.slice(1);
  location.replace('/learn/#' + route + (section ? '/' + section : ''));
}
