// Tokenise before adapting syntax: never rewrite comments, quoted names or strings.
export function statements(source) {
  if (typeof source !== 'string' || source.length > 30000)
    throw Error('Use at most 30,000 characters per run.');
  const parts = [];
  let start = 0,
    quote = null,
    line = false,
    block = false;
  for (let i = 0; i < source.length; i++) {
    const c = source[i],
      n = source[i + 1];
    if (line) {
      if (c === '\n') line = false;
      continue;
    }
    if (block) {
      if (c === '*' && n === '/') {
        block = false;
        i++;
      }
      continue;
    }
    if (quote) {
      if (c === quote) {
        if (n === quote) i++;
        else quote = null;
      }
      continue;
    }
    if (c === '-' && n === '-') {
      line = true;
      i++;
      continue;
    }
    if (c === '/' && n === '*') {
      block = true;
      i++;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') {
      quote = c;
      continue;
    }
    if (c === '[') {
      quote = ']';
      continue;
    }
    if (c === ';') {
      parts.push(source.slice(start, i));
      start = i + 1;
    }
  }
  if (quote || block)
    throw Error('Close the quoted text or block comment before running.');
  parts.push(source.slice(start));
  const result = parts.filter((s) => tokens(s).length);
  if (result.length > 20) throw Error('Run up to 20 statements at a time.');
  if (!result.length) throw Error('Write an SQL statement first.');
  return result;
}
export function tokens(source) {
  const result = [];
  for (let i = 0; i < source.length; ) {
    const start = i,
      c = source[i],
      n = source[i + 1];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (c === '-' && n === '-') {
      i = source.indexOf('\n', i + 2);
      if (i < 0) break;
      continue;
    }
    if (c === '/' && n === '*') {
      const end = source.indexOf('*/', i + 2);
      if (end < 0) throw Error('Close the block comment.');
      i = end + 2;
      continue;
    }
    if (c === "'" || c === '"' || c === '`' || c === '[') {
      const end = c === '[' ? ']' : c;
      i++;
      let closed = false;
      for (; i < source.length; i++) {
        if (source[i] === end) {
          if (source[i + 1] === end) {
            i++;
            continue;
          }
          i++;
          closed = true;
          break;
        }
      }
      if (!closed) throw Error('Close the quoted text.');
      result.push({
        text: source.slice(start, i),
        start,
        end: i,
        kind: c === "'" ? 'string' : 'identifier',
      });
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      i++;
      while (/[A-Za-z_0-9]/.test(source[i] || '') && i < source.length) i++;
      result.push({ text: source.slice(start, i), start, end: i, kind: 'word' });
      continue;
    }
    if (/\d/.test(c)) {
      i++;
      while (/[\d.]/.test(source[i] || '') && i < source.length) i++;
      result.push({ text: source.slice(start, i), start, end: i, kind: 'number' });
      continue;
    }
    i++;
    result.push({ text: c, start, end: i, kind: 'symbol' });
  }
  return result;
}
export function adaptStatement(source, mode) {
  if (!['sqlserver', 'postgresql', 'mysql'].includes(mode))
    throw Error('Choose SQL Server, PostgreSQL or MySQL.');
  let ts = tokens(source),
    words = ts.filter((t) => t.kind === 'word'),
    upper = (t) => (t?.kind === 'word' ? t.text.toUpperCase() : t?.text);
  const first = upper(ts[0]);
  if (
    !['SELECT', 'WITH', 'CREATE', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER'].includes(
      first,
    )
  )
    throw Error(
      'This practice engine supports SELECT, WITH, CREATE, INSERT, UPDATE, DELETE, DROP and basic ALTER. Server administration and transaction commands need the native DBMS.',
    );
  for (const t of words) {
    const word = upper(t);
    if (
      [
        'ATTACH',
        'DETACH',
        'PRAGMA',
        'VACUUM',
        'LOAD_EXTENSION',
        'READFILE',
        'WRITEFILE',
        'EXEC',
        'EXECUTE',
        'DECLARE',
        'PROCEDURE',
        'TRIGGER',
        'DATABASE',
        'SCHEMA',
        'IDENTITY',
        'SERIAL',
        'BIGSERIAL',
        'AUTO_INCREMENT',
        'ILIKE',
        'LEN',
        'ISNULL',
        'CONCAT',
        'GETDATE',
        'DATEADD',
        'DATEDIFF',
      ].includes(word)
    )
      throw Error(
        `${t.text} is outside this browser engine's supported subset. Use the native ${mode === 'sqlserver' ? 'SQL Server' : mode === 'postgresql' ? 'PostgreSQL' : 'MySQL'} tool for this syntax. Use explicit integer primary keys and portable functions here.`,
      );
  }
  const top = ts.findIndex((t) => upper(t) === 'TOP');
  const hasLimit = words.some((t) => upper(t) === 'LIMIT');
  if (mode === 'sqlserver' && hasLimit)
    throw Error('For SQL Server, use SELECT TOP (n) instead of LIMIT.');
  if (mode !== 'sqlserver' && top >= 0)
    throw Error('TOP is SQL Server syntax. Use LIMIT n in PostgreSQL or MySQL.');
  if (
    words.some((t) => ['OUTPUT', 'GO', 'TRY', 'CATCH'].includes(upper(t))) ||
    ts.some((t) => t.text === '@')
  )
    throw Error(
      'T-SQL variables, GO, OUTPUT and TRY/CATCH require native SQL Server / SSMS. Use the Intermediate lesson examples there.',
    );
  const edits = [];
  let suffix = '',
    indexTable = null,
    indexName = null;
  if (top >= 0) {
    if (
      first !== 'SELECT' ||
      ![1, 2].includes(top) ||
      (top === 2 && upper(ts[1]) !== 'DISTINCT') ||
      words.filter((t) => upper(t) === 'SELECT').length !== 1
    )
      throw Error(
        'TOP is supported for one simple outer SELECT. Use a native server for nested TOP queries.',
      );
    let end = top + 1;
    if (ts[end]?.text === '(') {
      end++;
      if (
        ts[end]?.kind !== 'number' ||
        !/^\d+$/.test(ts[end].text) ||
        ts[end + 1]?.text !== ')'
      )
        throw Error('Use a whole-number TOP (n) value.');
      end += 2;
    } else {
      if (ts[end]?.kind !== 'number' || !/^\d+$/.test(ts[end].text))
        throw Error('Use a whole-number TOP value.');
      end++;
    }
    const value = ts[top + 1].text === '(' ? ts[top + 2].text : ts[top + 1].text;
    if (Number(value) > 100000) throw Error('Use a TOP value no larger than 100,000.');
    if (['PERCENT', 'WITH'].includes(upper(ts[end])))
      throw Error('TOP PERCENT and WITH TIES require native SQL Server.');
    edits.push([ts[top].start, ts[end - 1].end, '']);
    suffix = '\nLIMIT ' + value;
  }
  for (let i = 0; i < ts.length; i++) {
    if (
      !(first === 'DROP' && upper(ts[1]) === 'INDEX') &&
      mode === 'sqlserver' &&
      upper(ts[i]) === 'DBO' &&
      ts[i + 1]?.text === '.'
    )
      edits.push([ts[i].start, ts[i + 1].end, '']);
  }
  // SQL Server and MySQL require a table name on DROP INDEX; SQLite does not.
  if (first === 'DROP' && upper(ts[1]) === 'INDEX' && mode !== 'postgresql') {
    const on = ts.findIndex((t) => upper(t) === 'ON');
    if (on < 0) throw Error('Use DROP INDEX index_name ON table_name in this dialect.');
    let tail = ts.slice(on + 1);
    if (
      mode === 'sqlserver' &&
      tail.length === 3 &&
      upper(tail[0]) === 'DBO' &&
      tail[1].text === '.'
    )
      tail = tail.slice(2);
    if (tail.length !== 1 || !['word', 'identifier'].includes(tail[0].kind))
      throw Error('Use one table name after ON.');
    indexTable = tail[0].text;
    indexName = ts[2]?.text;
    edits.push([ts[on].start, source.length, '']);
  }
  let adapted = source;
  for (const [a, b, text] of edits.sort((a, b) => b[0] - a[0]))
    adapted = adapted.slice(0, a) + text + adapted.slice(b);
  return {
    sql: adapted + suffix,
    adapted: !!edits.length,
    original: source,
    indexTable,
    indexName,
  };
}
export function executeBatch(db, source, mode) {
  const batch = statements(source).map((s) => adaptStatement(s, mode));
  const results = [];
  db.run('SAVEPOINT studylab_batch');
  try {
    for (let i = 0; i < batch.length; i++) {
      const { sql, adapted } = batch[i];
      let st;
      try {
        if (batch[i].indexTable) {
          const unquote = (x) =>
            x?.startsWith('[')
              ? x.slice(1, -1).replaceAll(']]', ']')
              : ['\"', '`'].includes(x?.[0])
                ? x.slice(1, -1).replaceAll(x[0] + x[0], x[0])
                : x;
          const lookup = db.prepare(
            "SELECT tbl_name FROM sqlite_master WHERE type='index' AND name=? COLLATE NOCASE",
          );
          try {
            lookup.bind([unquote(batch[i].indexName)]);
            if (
              lookup.step() &&
              lookup.get()[0].toLowerCase() !== unquote(batch[i].indexTable).toLowerCase()
            )
              throw Error(
                'The index belongs to another table. Check DROP INDEX ... ON table_name.',
              );
          } finally {
            lookup.free();
          }
        }
        st = db.prepare(sql);
        const columns = st.getColumnNames();
        const values = [];
        let truncated = false;
        while (st.step()) {
          if (values.length >= 500) {
            truncated = true;
            break;
          }
          values.push(
            st.get().map((v) => (v instanceof Uint8Array ? '[binary data]' : v)),
          );
        }
        results.push({
          columns,
          values,
          truncated,
          adapted,
          statement: i + 1,
          changed:
            columns.length ||
            !['INSERT', 'UPDATE', 'DELETE'].includes(
              tokens(batch[i].original)[0]?.text.toUpperCase(),
            )
              ? null
              : db.getRowsModified(),
        });
      } catch (error) {
        throw Error(`Statement ${i + 1}: ${error.message}`);
      } finally {
        st?.free();
      }
    }
    db.run('RELEASE studylab_batch');
    return results;
  } catch (error) {
    try {
      db.run('ROLLBACK TO studylab_batch');
      db.run('RELEASE studylab_batch');
    } catch {}
    throw error;
  }
}
