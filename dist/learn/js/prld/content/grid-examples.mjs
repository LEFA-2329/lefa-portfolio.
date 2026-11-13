export const gridExamples = {
  '2D grid input and total': {
    hint: 'Enter 1, 2, 3 and 4 in row order. The 2 by 2 grid should total 10. Rows and columns both start at index 0.',
    code: 'BEGIN\n  DECLARE grid[2][2] AS INTEGER\n  DECLARE row AS INTEGER\n  DECLARE column AS INTEGER\n  DECLARE total AS INTEGER = 0\n  FOR row = 0 TO 1\n    FOR column = 0 TO 1\n      INPUT grid[row][column]\n      SET total = total + grid[row][column]\n    ENDFOR\n  ENDFOR\n  OUTPUT total\nEND',
  },
  '2D row totals': {
    hint: 'Each row contains three values. The outputs should be 6 and 15. Reset each row total before its inner loop.',
    code: 'BEGIN\n  DECLARE grid[2][3] AS INTEGER\n  DECLARE rowTotals[2] AS INTEGER\n  DECLARE row AS INTEGER\n  DECLARE column AS INTEGER\n  SET grid[0][0] = 1\n  SET grid[0][1] = 2\n  SET grid[0][2] = 3\n  SET grid[1][0] = 4\n  SET grid[1][1] = 5\n  SET grid[1][2] = 6\n  FOR row = 0 TO 1\n    SET rowTotals[row] = 0\n    FOR column = 0 TO 2\n      SET rowTotals[row] = rowTotals[row] + grid[row][column]\n    ENDFOR\n    OUTPUT rowTotals[row]\n  ENDFOR\nEND',
  },
  '2D grid search': {
    hint: 'Enter 11 to find row 1, column 1. Enter 99 to see Not found. The search stops at its first match.',
    code: 'BEGIN\n  DECLARE grid[2][3] AS INTEGER\n  DECLARE row AS INTEGER = 0\n  DECLARE column AS INTEGER = 0\n  DECLARE target AS INTEGER\n  DECLARE found AS BOOLEAN = FALSE\n  DECLARE foundRow AS INTEGER = -1\n  DECLARE foundColumn AS INTEGER = -1\n  SET grid[0][0] = 8\n  SET grid[0][1] = 3\n  SET grid[0][2] = 5\n  SET grid[1][0] = 2\n  SET grid[1][1] = 11\n  SET grid[1][2] = 7\n  INPUT target\n  WHILE row < 2 AND NOT found DO\n    SET column = 0\n    WHILE column < 3 AND NOT found DO\n      IF grid[row][column] = target THEN\n        SET found = TRUE\n        SET foundRow = row\n        SET foundColumn = column\n      ENDIF\n      SET column = column + 1\n    ENDWHILE\n    SET row = row + 1\n  ENDWHILE\n  IF found THEN\n    OUTPUT foundRow, foundColumn\n  ELSE\n    OUTPUT "Not found"\n  ENDIF\nEND',
  },
};
