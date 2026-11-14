// Layout: pages/refresh-games.html. Rules: refresh-game-rules.mjs.
import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=39';
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
} from './refresh-game-rules.mjs?v=39';
export function mountRefreshGame(host, game) {
  const info = {
    words: [
      'Computing word search',
      'Find eight computing words. Choose the first and last letter of a word, forwards or backwards. Words run horizontally or vertically. Use Tab and Enter to choose letters.',
    ],
    sliding: [
      'Sliding puzzle',
      'Arrange tiles from 1 to 8, leaving the bottom-right space empty. Choose a tile next to the empty space to slide it. Every puzzle can be solved.',
    ],
    tic: [
      'Tic-tac-toe',
      'Choose a square to play X. Make a line of three. Play the computer or share this device with a friend.',
    ],
    snake: [
      'Snake',
      'Collect fruit without hitting a wall or yourself. Start the game, then use the arrow keys or WASD while the board is focused, or the direction buttons. Space pauses.',
    ],
  };
  host.innerHTML = renderHtmlPage('studylab/refresh-games', {
    dynamic_1: info[game][0],
    dynamic_2: info[game][1],
  });
  const board = host.querySelector('#refresh-board'),
    status = host.querySelector('#refresh-status'),
    controls = host.querySelector('#refresh-controls'),
    extra = host.querySelector('#refresh-extra');
  function button(label, action, parent = controls) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'button secondary';
    b.textContent = label;
    b.addEventListener('click', action);
    parent.append(b);
    return b;
  }
  function cells(count, click) {
    board.replaceChildren(
      ...Array.from({ length: count }, (_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.addEventListener('click', () => click(i));
        return b;
      }),
    );
  }
  if (game === 'words') {
    let puzzle,
      start = null,
      found = new Set();
    board.className = 'word-search-board';
    function reset() {
      puzzle = createWordSearch();
      start = null;
      found = new Set();
      cells(100, choose);
      paint();
      status.textContent = 'Find all eight computing words.';
    }
    function paint() {
      [...board.children].forEach((b, i) => {
        b.textContent = puzzle.letters[i];
        b.setAttribute(
          'aria-label',
          `Row ${Math.floor(i / 10) + 1}, column ${(i % 10) + 1}: ${puzzle.letters[i]}`,
        );
        b.classList.toggle('word-start', i === start);
        b.classList.toggle(
          'word-found',
          puzzle.placements.some((p) => found.has(p.word) && p.cells.includes(i)),
        );
      });
      extra.replaceChildren();
      const list = document.createElement('ul');
      list.className = 'word-list';
      for (const p of puzzle.placements) {
        const li = document.createElement('li');
        li.textContent = p.word + (found.has(p.word) ? ' ✓ Found' : '');
        list.append(li);
      }
      extra.append(list);
    }
    function choose(i) {
      if (start === null) {
        start = i;
        status.textContent = `${puzzle.letters[i]} selected. Choose the last letter.`;
      } else {
        const line = wordBetween(start, i),
          text = line.map((j) => puzzle.letters[j]).join('');
        const match = puzzle.placements.find(
          (p) =>
            (text === p.word || [...text].reverse().join('') === p.word) &&
            line.length === p.cells.length &&
            line.every((j) => p.cells.includes(j)),
        );
        start = null;
        if (match) {
          found.add(match.word);
          status.textContent =
            found.size === 8
              ? 'All eight words found. Nicely done!'
              : `${match.word} found. ${found.size} of 8 words.`;
        } else
          status.textContent =
            'No listed word there. Choose a new first letter and try again.';
      }
      paint();
    }
    button('New word search', reset);
    button('Clear selection', () => {
      start = null;
      paint();
      status.textContent = 'Choose the first letter of a word.';
    });
    reset();
  } else if (game === 'sliding') {
    let tiles, moves;
    board.className = 'sliding-board';
    function paint() {
      [...board.children].forEach((b, i) => {
        b.textContent = tiles[i] || '';
        b.setAttribute(
          'aria-label',
          tiles[i]
            ? `Tile ${tiles[i]}, row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}`
            : 'Empty space',
        );
        b.setAttribute('aria-disabled', String(!tiles[i]));
        b.classList.toggle('empty-tile', !tiles[i]);
      });
      status.textContent = puzzleSolved(tiles)
        ? `Puzzle complete in ${moves} moves!`
        : `${moves} moves. Slide a tile beside the empty space.`;
    }
    function reset() {
      tiles = createSlidingPuzzle();
      moves = 0;
      cells(9, (i) => {
        if (puzzleSolved(tiles)) return;
        const next = moveTile(tiles, i);
        if (next !== tiles) {
          tiles = next;
          moves++;
          paint();
        }
      });
      paint();
    }
    button('New puzzle', reset);
    reset();
  } else if (game === 'tic') {
    let squares, turn;
    board.className = 'tic-board';
    const label = document.createElement('label');
    label.textContent = 'Opponent ';
    const mode = document.createElement('select');
    mode.setAttribute('aria-label', 'Tic-tac-toe opponent');
    for (const [value, text] of [
      ['computer', 'Computer'],
      ['friend', 'Friend on this device'],
    ]) {
      const o = document.createElement('option');
      o.value = value;
      o.textContent = text;
      mode.append(o);
    }
    label.append(mode);
    controls.append(label);
    mode.addEventListener('change', reset);
    function paint() {
      [...board.children].forEach((b, i) => {
        b.textContent = squares[i] || '·';
        b.setAttribute('aria-label', `Square ${i + 1}: ${squares[i] || 'empty'}`);
        b.setAttribute('aria-disabled', String(!!squares[i] || !!ticResult(squares)));
      });
      const result = ticResult(squares);
      status.textContent =
        result === 'draw'
          ? 'A draw! Try another round.'
          : result
            ? `${result} wins!`
            : `${turn} to play${mode.value === 'computer' ? ' · You are X' : ''}.`;
    }
    function reset() {
      squares = Array(9).fill('');
      turn = 'X';
      cells(9, (i) => {
        if (squares[i] || ticResult(squares)) return;
        squares[i] = turn;
        if (mode.value === 'computer' && !ticResult(squares)) {
          squares[computerMove(squares)] = 'O';
        } else turn = turn === 'X' ? 'O' : 'X';
        paint();
      });
      paint();
    }
    button('New round', reset);
    reset();
  } else if (game === 'snake') {
    let state,
      direction,
      pending,
      timer = null;
    board.className = 'snake-board';
    board.tabIndex = 0;
    board.setAttribute('role', 'img');
    board.setAttribute(
      'aria-label',
      'Snake playfield. Focus here to use arrow keys or WASD.',
    );
    board.replaceChildren(
      ...Array.from({ length: 144 }, () => document.createElement('span')),
    );
    function paint() {
      [...board.children].forEach((cell, i) => {
        cell.className = state.body.some(
          (p) => p.x === i % 12 && p.y === Math.floor(i / 12),
        )
          ? 'snake-body'
          : state.food && state.food.x === i % 12 && state.food.y === Math.floor(i / 12)
            ? 'snake-fruit'
            : '';
        cell.textContent = cell.className === 'snake-fruit' ? '●' : '';
      });
      board.setAttribute(
        'aria-label',
        `Snake playfield. Score ${state.score}. ${state.over ? 'Game over.' : timer ? 'Running.' : 'Paused.'} Arrow keys or WASD to steer.`,
      );
    }
    function pause(message = 'Paused. Start when ready.') {
      clearInterval(timer);
      timer = null;
      status.textContent = message;
      paint();
    }
    function reset() {
      clearInterval(timer);
      timer = null;
      state = {
        body: [
          { x: 4, y: 6 },
          { x: 3, y: 6 },
          { x: 2, y: 6 },
        ],
        score: 0,
        over: false,
      };
      state.food = snakeFood(state.body);
      direction = { x: 1, y: 0 };
      pending = direction;
      status.textContent = 'Ready. Choose Start / resume to play.';
      paint();
    }
    function steer(d) {
      if (d.x !== -direction.x || d.y !== -direction.y) pending = d;
    }
    function tick() {
      direction = pending;
      state = snakeStep(state, direction);
      if (state.over) {
        pause(`Game over. Score ${state.score}. Choose New snake to try again.`);
        return;
      }
      if (state.ate) {
        state.food = snakeFood(state.body);
        if (!state.food) {
          state.over = true;
          pause(`You filled the garden! Score ${state.score}.`);
          return;
        }
        status.textContent = `Score ${state.score}. Keep going!`;
      }
      paint();
    }
    function start() {
      if (timer || state.over) return;
      timer = setInterval(tick, 200);
      status.textContent = `Running. Score ${state.score}. Space or Pause to stop.`;
      board.focus();
      paint();
    }
    button('Start / resume', start);
    button('Pause', () => pause());
    button('New snake', reset);
    const pad = document.createElement('div');
    pad.className = 'snake-directions';
    extra.append(pad);
    for (const [name, d] of [
      ['Up', { x: 0, y: -1 }],
      ['Left', { x: -1, y: 0 }],
      ['Down', { x: 0, y: 1 }],
      ['Right', { x: 1, y: 0 }],
    ])
      button(name, () => steer(d), pad);
    board.addEventListener('keydown', (event) => {
      const map = {
        ArrowUp: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      };
      if (map[event.key]) {
        event.preventDefault();
        steer(map[event.key]);
      } else if (event.key === ' ') {
        event.preventDefault();
        timer ? pause() : start();
      }
    });
    const visibility = () => {
      if (document.hidden && timer) pause('Paused while you were away.');
    };
    document.addEventListener('visibilitychange', visibility);
    reset();
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', visibility);
    };
  }
  return () => {};
}
