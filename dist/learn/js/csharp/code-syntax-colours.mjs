// Escape every source token before adding trusted colour spans.
const escape = (text) =>
  text.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
const keywords = new Set(
  'using namespace public private protected internal static readonly sealed class record interface enum struct void string int bool decimal double float var new return if else while for foreach in out async await Task null true false get set init this base try catch finally throw override virtual const event partial is not and or required lock yield switch case default break continue typeof dynamic object'.split(
    ' ',
  ),
);
// Tokenise once so comment markers inside strings stay inside the string colour.
export function colourCode(source, filename = '') {
  if (/\.md$/i.test(filename)) return escape(source);
  const markup = /\.(?:xaml|csproj|cshtml|html)$/i.test(filename);
  const hashComments = /(?:Dockerfile|\.(?:yaml|yml|http)|\.env(?:\.example)?)$/i.test(
    filename,
  );
  const sql = /\.sql$/i.test(filename);
  const pattern =
    /<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\/\/[^\n]*|"""[\s\S]*?"""|@"(?:[^"]|"")*"|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|#[^\n]*|--[^\n]*|\b\d+(?:\.\d+)?\b|[A-Za-z_@][A-Za-z_0-9]*|[{}()[\];,.=+*/!?:<>-]|[\s\S]/g;
  return Array.from(source.matchAll(pattern), (match) => {
    const token = match[0];
    let kind = '';
    if (
      token.startsWith('<!--') ||
      (!markup && (token.startsWith('//') || token.startsWith('/*'))) ||
      (hashComments && token.startsWith('#')) ||
      (sql && token.startsWith('--'))
    )
      kind = 'comment';
    else if (/^(?:@?"|')/.test(token)) kind = 'string';
    else if (/^\d/.test(token)) kind = 'number';
    else if (
      keywords.has(token) ||
      (sql &&
        /^(SELECT|FROM|WHERE|CREATE|TABLE|DATABASE|USE|GO|PRIMARY|KEY|NOT|NULL|IDENTITY|INSERT|INTO|VALUES)$/i.test(
          token,
        )) ||
      (hashComments &&
        /^(FROM|RUN|COPY|WORKDIR|USER|EXPOSE|ENTRYPOINT|AS|ENV|ARG)$/.test(token))
    )
      kind = 'keyword';
    else if (/^[A-Z][A-Za-z_0-9]*$/.test(token)) kind = 'type';
    else if (/^[{}()[\];,.=+*/!?:<>-]$/.test(token)) kind = 'punctuation';
    return kind ? `<span class="code-${kind}">${escape(token)}</span>` : escape(token);
  }).join('');
}
