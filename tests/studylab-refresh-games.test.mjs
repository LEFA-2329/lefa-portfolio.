import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createWordSearch,
  wordBetween,
  createSlidingPuzzle,
  moveTile,
  puzzleSolved,
  ticResult,
  computerMove,
  snakeStep,
  snakeFood,
} from '../dist/learn/js/shared/refresh-game-rules.mjs';
test('word searches include every computing word with valid endpoints', () => {
  for (let n = 0; n < 20; n++) {
    const p = createWordSearch();
    assert.equal(p.letters.length, 100);
    assert.equal(p.placements.length, 8);
    for (const w of p.placements) {
      assert.equal(w.cells.map((i) => p.letters[i]).join(''), w.word);
      assert.deepEqual(wordBetween(w.cells[0], w.cells.at(-1)), w.cells);
    }
  }
  assert.deepEqual(wordBetween(0, 12), []);
});
test('sliding puzzles are unsolved permutations with even inversion parity', () => {
  for (let n = 0; n < 40; n++) {
    const b = createSlidingPuzzle();
    assert(!puzzleSolved(b));
    assert.deepEqual([...b].sort(), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const a = b.filter(Boolean);
    let inversions = 0;
    for (let i = 0; i < 8; i++)
      for (let j = i + 1; j < 8; j++) if (a[i] > a[j]) inversions++;
    assert.equal(inversions % 2, 0);
  }
  const b = [1, 2, 3, 4, 5, 6, 7, 0, 8];
  assert(puzzleSolved(moveTile(b, 8)));
  assert.equal(moveTile(b, 0), b);
  assert.equal(moveTile([1, 2, 0, 4, 5, 6, 7, 8, 3], 3)[2], 0);
});
test('tic-tac-toe detects wins and draws and computer never loses', () => {
  assert.equal(ticResult(['X', 'X', 'X', '', '', '', '', '', '']), 'X');
  assert.equal(ticResult(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']), 'draw');
  function explore(b) {
    if (ticResult(b)) {
      assert.notEqual(ticResult(b), 'X');
      return;
    }
    for (let i = 0; i < 9; i++)
      if (!b[i]) {
        const next = b.map((v, j) => (i === j ? 'X' : v));
        if (!ticResult(next)) next[computerMove(next)] = 'O';
        explore(next);
      }
  }
  explore(Array(9).fill(''));
});
test('snake handles eating, walls, body collisions and moving into a vacating tail', () => {
  const s = {
    body: [
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ],
    food: { x: 3, y: 1 },
    score: 0,
  };
  const grown = snakeStep(s, { x: 1, y: 0 });
  assert.equal(grown.body.length, 3);
  assert.equal(grown.score, 1);
  assert.equal(s.body.length, 2);
  assert(snakeStep(s, { x: 0, y: -2 }).over);
  const loop = {
    body: [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
      { x: 0, y: 1 },
    ],
    food: { x: 5, y: 5 },
    score: 0,
  };
  assert(!snakeStep(loop, { x: -1, y: 0 }).over);
  assert(snakeStep(loop, { x: 0, y: 1 }).over);
  const food = snakeFood(s.body);
  assert(!s.body.some((p) => p.x === food.x && p.y === food.y));
  assert.equal(snakeFood([{ x: 0, y: 0 }], 1), null);
});
