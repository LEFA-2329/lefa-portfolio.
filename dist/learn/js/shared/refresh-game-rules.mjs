// Pure game rules: no browser access. Keep these independently testable.
export const computingWords = [
  'ARRAY',
  'LOOP',
  'CLASS',
  'QUERY',
  'TABLE',
  'STACK',
  'BINARY',
  'CODE',
];
export function createWordSearch(random = Math.random) {
  const size = 10,
    grid = Array.from({ length: size }, () => Array(size).fill('')),
    placements = [];
  for (const [n, word] of computingWords.entries()) {
    // Separate shuffled rows guarantee every puzzle has all eight words.
    const row = n,
      reverse = random() < 0.5,
      start = Math.floor(random() * (size - word.length + 1));
    const cells = [...word].map((letter, i) => {
      const col = reverse ? start + word.length - 1 - i : start + i;
      grid[row][col] = letter;
      return row * size + col;
    });
    placements.push({ word, cells });
  }
  // Rotate the board randomly for horizontal or vertical reading.
  if (random() < 0.5) {
    const copy = grid.map((row) => [...row]);
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) grid[r][c] = copy[c][r];
    for (const p of placements)
      p.cells = p.cells.map((i) => (i % size) * size + Math.floor(i / size));
  }
  for (const row of grid)
    for (let c = 0; c < size; c++)
      if (!row[c]) row[c] = String.fromCharCode(65 + Math.floor(random() * 26));
  return { size, letters: grid.flat(), placements };
}
export function wordBetween(start, end, size = 10) {
  const r = Math.floor(start / size),
    c = start % size,
    dr = Math.floor(end / size) - r,
    dc = (end % size) - c;
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return [];
  const count = Math.max(Math.abs(dr), Math.abs(dc));
  return Array.from(
    { length: count + 1 },
    (_, i) => (r + Math.sign(dr) * i) * size + c + Math.sign(dc) * i,
  );
}
export function moveTile(board, index) {
  const blank = board.indexOf(0);
  if (
    Math.abs(Math.floor(blank / 3) - Math.floor(index / 3)) +
      Math.abs((blank % 3) - (index % 3)) !==
    1
  )
    return board;
  const next = [...board];
  [next[index], next[blank]] = [next[blank], next[index]];
  return next;
}
export const puzzleSolved = (board) => board.every((n, i) => n === (i + 1) % 9);
export function createSlidingPuzzle(random = Math.random) {
  let board = [1, 2, 3, 4, 5, 6, 7, 8, 0],
    previous = -1;
  for (let i = 0; i < 100; i++) {
    const choices = board
      .map((_, j) => j)
      .filter((j) => j !== previous && moveTile(board, j) !== board);
    const blank = board.indexOf(0);
    board = moveTile(board, choices[Math.floor(random() * choices.length)]);
    previous = blank;
  }
  return puzzleSolved(board) ? moveTile(board, 7) : board;
}
export function ticResult(board) {
  for (const [a, b, c] of [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ])
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  return board.every(Boolean) ? 'draw' : null;
}
export function computerMove(board) {
  function score(b, turn) {
    const result = ticResult(b);
    if (result) return result === 'O' ? 1 : result === 'X' ? -1 : 0;
    const values = b.flatMap((v, i) =>
      v
        ? []
        : [
            score(
              b.map((x, j) => (j === i ? turn : x)),
              turn === 'O' ? 'X' : 'O',
            ),
          ],
    );
    return turn === 'O' ? Math.max(...values) : Math.min(...values);
  }
  let best = -Infinity,
    chosen = -1;
  for (const i of [4, 0, 2, 6, 8, 1, 3, 5, 7])
    if (!board[i]) {
      const value = score(
        board.map((v, j) => (j === i ? 'O' : v)),
        'X',
      );
      if (value > best) {
        best = value;
        chosen = i;
      }
    }
  return chosen;
}
export function snakeStep(state, direction, size = 12) {
  const head = { x: state.body[0].x + direction.x, y: state.body[0].y + direction.y };
  const eating = head.x === state.food?.x && head.y === state.food?.y;
  const collision = state.body
    .slice(0, eating ? undefined : -1)
    .some((p) => p.x === head.x && p.y === head.y);
  if (head.x < 0 || head.y < 0 || head.x >= size || head.y >= size || collision)
    return { ...state, over: true };
  return {
    ...state,
    body: [head, ...state.body].slice(0, state.body.length + (eating ? 1 : 0)),
    score: state.score + (eating ? 1 : 0),
    ate: eating,
  };
}
export function snakeFood(body, size = 12, random = Math.random) {
  const free = [];
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++)
      if (!body.some((p) => p.x === x && p.y === y)) free.push({ x, y });
  return free[Math.floor(random() * free.length)] || null;
}
