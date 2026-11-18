// Pure teaching data. These fixed traces do not execute student code.
export function guidedTraceData(kind) {
  if (kind === 'sum') {
    let states = [
      {
        line: 1,
        vars: { total: 0, i: '-' },
        output: '',
        note: 'Initialise total before the loop.',
      },
    ];
    let total = 0;
    for (let i = 1; i <= 3; i++) {
      states.push({
        line: 2,
        vars: { total, i },
        output: '',
        note: `The loop condition is true for i = ${i}.`,
      });
      total += i;
      states.push({
        line: 3,
        vars: { total, i },
        output: '',
        note: `Add ${i} to the running total.`,
      });
    }
    states.push(
      {
        line: 2,
        vars: { total, i: 4 },
        output: '',
        note: 'i is now 4. The upper bound is 3, so the loop ends.',
      },
      {
        line: 5,
        vars: { total, i: 4 },
        output: String(total),
        note: 'Display the final total after the loop.',
      },
    );
    return {
      code: 'SET total = 0\nFOR i = 1 TO 3\n  SET total = total + i\nENDFOR\nOUTPUT total',
      states,
    };
  }
  if (kind === 'search') {
    const a = [8, 3, 11, 5],
      states = [
        {
          line: 1,
          vars: { i: 0, foundAt: -1 },
          array: a,
          compare: [],
          output: '',
          note: 'Search for 11. Initialise the result to -1.',
        },
      ];
    for (let i = 0; i < a.length; i++) {
      states.push({
        line: 3,
        vars: { i, foundAt: i > 2 ? 2 : -1 },
        array: a,
        compare: [i],
        output: '',
        note: `Compare values[${i}] (${a[i]}) with 11.`,
      });
      if (a[i] === 11)
        states.push({
          line: 4,
          vars: { i, foundAt: i },
          array: a,
          compare: [i],
          output: '',
          note: 'A match is found at index 2. Store its position.',
        });
    }
    states.push({
      line: 7,
      vars: { i: 4, foundAt: 2 },
      array: a,
      compare: [],
      output: '2',
      note: 'The full traversal is complete. Display the match position.',
    });
    return {
      code: 'SET foundAt = -1\nFOR i = 0 TO 3\n  IF values[i] = 11 THEN\n    SET foundAt = i\n  ENDIF\nENDFOR\nOUTPUT foundAt',
      states,
    };
  }
  const a = [5, 2, 4, 1],
    states = [
      {
        line: 1,
        vars: { pass: 0, j: '-' },
        array: [...a],
        compare: [],
        output: '',
        note: 'Start with four unsorted values.',
      },
    ];
  for (let p = 0; p < a.length - 1; p++)
    for (let j = 0; j < a.length - 1 - p; j++) {
      states.push({
        line: 3,
        vars: { pass: p, j },
        array: [...a],
        compare: [j, j + 1],
        output: '',
        note: `Compare adjacent values ${a[j]} and ${a[j + 1]}.`,
      });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        states.push({
          line: 6,
          vars: { pass: p, j },
          array: [...a],
          compare: [j, j + 1],
          output: '',
          note: 'Swap the pair using a temporary value.',
        });
      }
    }
  states.push({
    line: 10,
    vars: { pass: 3, j: '-' },
    array: [...a],
    compare: [],
    output: a.join(', '),
    note: 'The array is now sorted in ascending order.',
  });
  return {
    code: 'FOR pass = 0 TO 2\n  FOR j = 0 TO 2 - pass\n    IF values[j] > values[j + 1] THEN\n      SET temp = values[j]\n      SET values[j] = values[j + 1]\n      SET values[j + 1] = temp\n    ENDIF\n  ENDFOR\nENDFOR\nOUTPUT values',
    states,
  };
}
