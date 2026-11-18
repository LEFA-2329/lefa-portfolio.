// Editable examples shown in the pseudocode diagram lab.
export const diagramExamples = {
  'Pass or revise':
    'BEGIN\n  DECLARE mark AS NUM\n  INPUT mark\n  IF mark >= 50 THEN\n    OUTPUT "Pass"\n  ELSE\n    OUTPUT "Revise and try again"\n  ENDIF\nEND',
  'Counted loop':
    'BEGIN\n  DECLARE total AS NUM\n  DECLARE value AS NUM\n  DECLARE i AS INTEGER\n  SET total = 0\n  FOR i = 1 TO 3\n    INPUT value\n    SET total = total + value\n  ENDFOR\n  OUTPUT total\nEND',
  'Sentinel input':
    'BEGIN\n  DECLARE value AS NUM\n  INPUT value\n  WHILE value <> -1 DO\n    OUTPUT value\n    INPUT value\n  ENDWHILE\nEND',
  'Post-test loop':
    'BEGIN\n  DECLARE age AS INTEGER\n  REPEAT\n    INPUT age\n  UNTIL age >= 0\n  OUTPUT age\nEND',
  'CASE menu':
    'BEGIN\n  DECLARE choice AS INTEGER\n  INPUT choice\n  CASE choice OF\n    WHEN 1:\n      OUTPUT "Add"\n    WHEN 2:\n      OUTPUT "Edit"\n    OTHERWISE:\n      OUTPUT "Unknown choice"\n  ENDCASE\nEND',
  'Module hierarchy':
    'METHOD doubleValue(value AS NUM) RETURNS NUM\n  RETURN value * 2\nENDMETHOD\nMETHOD showResult(result AS NUM)\n  OUTPUT result\nENDMETHOD\nBEGIN\n  DECLARE value AS NUM\n  DECLARE result AS NUM\n  INPUT value\n  SET result = doubleValue(value)\n  CALL showResult(result)\nEND',
};
