// Numbered teaching fragments are cut only at explicit comments in editable examples.
// Joining every fragment reproduces the exact full file, including its comments.
export function codeParts(file) {
  const matches = [
    ...file.content.matchAll(
      /^[ \t]*(?:\/\/|#|--|<!--) STUDY PART: (.+?)(?: -->)?\r?$/gm,
    ),
  ];
  if (!matches.length)
    return [
      {
        title: file.name.endsWith('.json')
          ? 'Configuration values (JSON does not support comments)'
          : 'Complete file contents',
        code: file.content,
      },
    ];
  const parts = [];
  if (matches[0].index > 0)
    parts.push({
      title: 'File setup and imports',
      code: file.content.slice(0, matches[0].index),
    });
  matches.forEach((match, i) =>
    parts.push({
      title: match[1],
      code: file.content.slice(match.index, matches[i + 1]?.index ?? file.content.length),
    }),
  );
  return parts;
}
export function orderedTeachingFiles(files) {
  const rank = (name) =>
    name.endsWith('.csproj')
      ? 0
      : /Models\/|SharedRules\/MarkRules/.test(name)
        ? 1
        : /Data\/|StudentStore|\.sql$/.test(name)
          ? 2
          : /Controllers\/|ViewModel|RelayCommand/.test(name)
            ? 3
            : name.endsWith('Program.cs') || name.endsWith('App.xaml.cs')
              ? 4
              : /\.xaml$|\.cshtml$/.test(name)
                ? 5
                : name.endsWith('Dockerfile')
                  ? 6
                  : name === 'compose.yaml'
                    ? 7
                    : name.endsWith('.json') || name.endsWith('.env.example')
                      ? 8
                      : name.endsWith('.http')
                        ? 9
                        : 10;
  return files
    .map((file, index) => ({ file, index }))
    .filter(({ file }) => !/README\.md$|\.gitignore$|\.dockerignore$/.test(file.name))
    .sort((a, b) => rank(a.file.name) - rank(b.file.name));
}
