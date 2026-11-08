export const activities = [
  {
    "id": "u1-missing",
    "unit": 1,
    "kind": "Missing line",
    "title": "Declare before input",
    "prompt": "Choose the declaration for a value that can contain whole numbers or decimals. NUM is the numeric type used here.",
    "code": "BEGIN\n  ____\n  INPUT price\n  OUTPUT price\nEND",
    "choices": [
      "DECLARE price AS STRING",
      "DECLARE price AS NUM",
      "SET price = NUM"
    ],
    "correct": 1,
    "hints": [
      "A declaration names a storage location and states its type.",
      "Use DECLARE followed by the name, AS and a numeric data type."
    ],
    "solution": "BEGIN\n  DECLARE price AS NUM\n  INPUT price\n  OUTPUT price\nEND",
    "explanation": "price must be declared before INPUT. NUM accepts values such as 12 and 12.5; STRING is for text."
  },
  {
    "id": "u1-output",
    "unit": 1,
    "kind": "Predict the output",
    "title": "Assignment uses the old value",
    "prompt": "Select the single output after both assignments.",
    "code": "BEGIN\n  DECLARE total AS NUM = 4\n  SET total = total + 3\n  SET total = total * 2\n  OUTPUT total\nEND",
    "choices": [
      "10",
      "14",
      "11"
    ],
    "correct": 1,
    "hints": [
      "Apply one assignment at a time.",
      "The first calculation happens before the multiplication. Write down total after each line."
    ],
    "solution": "total starts at 4\ntotal = 4 + 3 = 7\ntotal = 7 * 2 = 14\nOUTPUT: 14",
    "explanation": "Assignment evaluates the right side using the current value and then stores the result."
  },
  {
    "id": "u1-debug",
    "unit": 1,
    "kind": "Debugging",
    "title": "Fix integer division",
    "prompt": "The algorithm must output the decimal average 2.5. DIV calculates a whole-number quotient. Choose the corrected assignment.",
    "code": "BEGIN\n  DECLARE total AS NUM = 5\n  DECLARE count AS INTEGER = 2\n  DECLARE average AS NUM\n  SET average = total DIV count\n  OUTPUT average\nEND",
    "choices": [
      "SET average = count / total",
      "SET average = total MOD count",
      "SET average = total / count"
    ],
    "correct": 2,
    "hints": [
      "The inputs and declarations are already correct.",
      "Choose the operator that keeps the fractional part of division."
    ],
    "solution": "BEGIN\n  DECLARE total AS NUM = 5\n  DECLARE count AS INTEGER = 2\n  DECLARE average AS NUM\n  SET average = total / count\n  OUTPUT average\nEND",
    "explanation": "5 / 2 is 2.5. DIV would produce 2 and MOD would produce the remainder 1."
  },
  {
    "id": "u1-order",
    "unit": 1,
    "kind": "Reorder statements",
    "title": "Input, update, output",
    "prompt": "Arrange these statements to read a number, increase it by 1 and display the increased value.",
    "statements": [
      "DECLARE num AS NUM",
      "INPUT num",
      "SET num = num + 1",
      "OUTPUT num"
    ],
    "initialOrder": [
      1,
      2,
      3,
      0
    ],
    "hints": [
      "A variable must exist before it receives input.",
      "Read the original value before changing it; display the value after the change."
    ],
    "solution": "DECLARE num AS NUM\nINPUT num\nSET num = num + 1\nOUTPUT num",
    "explanation": "Declare num, read its starting value, increase it, then display the result. Each step depends on the previous one."
  },
  {
    "id": "u2-missing",
    "unit": 2,
    "kind": "Missing line",
    "title": "Include the boundary",
    "prompt": "A learner passes with a mark of 50 or higher. Choose the condition.",
    "code": "BEGIN\n  DECLARE mark AS NUM = 50\n  IF ____ THEN\n    OUTPUT \"Pass\"\n  ELSE\n    OUTPUT \"Revise\"\n  ENDIF\nEND",
    "choices": [
      "mark > 50",
      "mark >= 50",
      "mark < 50"
    ],
    "correct": 1,
    "hints": [
      "The boundary value must follow the pass branch.",
      "Check whether your comparison is TRUE when mark equals exactly 50."
    ],
    "solution": "BEGIN\n  DECLARE mark AS NUM = 50\n  IF mark >= 50 THEN\n    OUTPUT \"Pass\"\n  ELSE\n    OUTPUT \"Revise\"\n  ENDIF\nEND",
    "explanation": ">= includes the boundary. > would incorrectly exclude a mark of exactly 50."
  },
  {
    "id": "u2-output",
    "unit": 2,
    "kind": "Predict the output",
    "title": "Trace a counted loop",
    "prompt": "Select the final output. FOR includes both its start and end values.",
    "code": "BEGIN\n  DECLARE i AS INTEGER\n  DECLARE total AS NUM = 0\n  FOR i = 1 TO 3\n    SET total = total + i\n  ENDFOR\n  OUTPUT total\nEND",
    "choices": [
      "3",
      "6",
      "7"
    ],
    "correct": 1,
    "hints": [
      "List the three values taken by i.",
      "Track total after adding each counter value, starting from zero."
    ],
    "solution": "i = 1: total = 1\ni = 2: total = 3\ni = 3: total = 6\nOUTPUT: 6",
    "explanation": "The loop adds 1, 2 and 3. OUTPUT runs once, after the loop finishes."
  },
  {
    "id": "u2-debug",
    "unit": 2,
    "kind": "Debugging",
    "title": "Make a WHILE loop stop",
    "prompt": "The loop must display 1, 2 and 3, then stop. Which replacement fixes the update?",
    "code": "BEGIN\n  DECLARE count AS INTEGER = 1\n  WHILE count <= 3 DO\n    OUTPUT count\n    SET count = count - 1\n  ENDWHILE\nEND",
    "choices": [
      "SET count = count + 1",
      "SET count = 1",
      "SET count = count * 0"
    ],
    "correct": 0,
    "hints": [
      "The counter must move toward making the condition FALSE.",
      "Starting at 1, what change takes the counter toward a value greater than 3?"
    ],
    "solution": "BEGIN\n  DECLARE count AS INTEGER = 1\n  WHILE count <= 3 DO\n    OUTPUT count\n    SET count = count + 1\n  ENDWHILE\nEND",
    "explanation": "Incrementing eventually makes count equal 4. The original decrement keeps count <= 3 TRUE."
  },
  {
    "id": "u2-order",
    "unit": 2,
    "kind": "Reorder statements",
    "title": "Build a countdown",
    "prompt": "Order the statements to display 2, then 1. Display each value before decreasing it.",
    "statements": [
      "DECLARE count AS INTEGER = 2",
      "WHILE count > 0 DO",
      "OUTPUT count",
      "SET count = count - 1",
      "ENDWHILE"
    ],
    "initialOrder": [
      1,
      2,
      3,
      4,
      0
    ],
    "hints": [
      "Initialise the counter before testing it.",
      "The loop contains output followed by the decrement; close the loop after both."
    ],
    "solution": "DECLARE count AS INTEGER = 2\nWHILE count > 0 DO\nOUTPUT count\nSET count = count - 1\nENDWHILE",
    "explanation": "The initial value is 2. Each iteration displays the current value and decreases it. The loop stops at zero."
  },
  {
    "id": "u3-missing",
    "unit": 3,
    "kind": "Missing line",
    "title": "Stay inside array bounds",
    "prompt": "values contains exactly 3 elements. Indexes start at zero. Choose the complete FOR header to visit every element once.",
    "code": "BEGIN\n  DECLARE values[3] AS NUM\n  DECLARE i AS INTEGER\n  ____\n    INPUT values[i]\n  ENDFOR\nEND",
    "choices": [
      "FOR i = 1 TO 3",
      "FOR i = 0 TO 3",
      "FOR i = 0 TO 2"
    ],
    "correct": 2,
    "hints": [
      "A length of 3 does not mean the final index is 3.",
      "The first index is 0; the final index is length minus 1."
    ],
    "solution": "BEGIN\n  DECLARE values[3] AS NUM\n  DECLARE i AS INTEGER\n  FOR i = 0 TO 2\n    INPUT values[i]\n  ENDFOR\nEND",
    "explanation": "Indexes 0, 1 and 2 access all three elements. Index 3 is outside the array."
  },
  {
    "id": "u3-output",
    "unit": 3,
    "kind": "Predict the output",
    "title": "Update one array element",
    "prompt": "Select the output after the indexed assignment.",
    "code": "BEGIN\n  DECLARE values[3] AS NUM\n  SET values[0] = 2\n  SET values[1] = 5\n  SET values[2] = 8\n  SET values[1] = values[0] + values[2]\n  OUTPUT values[1]\nEND",
    "choices": [
      "5",
      "10",
      "15"
    ],
    "correct": 1,
    "hints": [
      "Only one element changes in the last assignment.",
      "Read indexes 0 and 2, then store their sum at index 1."
    ],
    "solution": "Before: [2, 5, 8]\nvalues[1] = 2 + 8 = 10\nAfter: [2, 10, 8]\nOUTPUT: 10",
    "explanation": "The old value 5 is replaced. The other two elements remain unchanged."
  },
  {
    "id": "u3-debug",
    "unit": 3,
    "kind": "Debugging",
    "title": "Keep parallel arrays aligned",
    "prompt": "names and marks describe the same learners at matching indexes. Choose the output that displays the selected learner and their mark.",
    "code": "BEGIN\n  DECLARE names[2] AS STRING\n  DECLARE marks[2] AS NUM\n  DECLARE selected AS INTEGER = 1\n  SET names[0] = \"Lebo\"\n  SET names[1] = \"Neo\"\n  SET marks[0] = 65\n  SET marks[1] = 72\n  OUTPUT names[selected], marks[0]\nEND",
    "choices": [
      "OUTPUT names[0], marks[selected]",
      "OUTPUT names[selected], marks[selected]",
      "OUTPUT names[selected], marks[2]"
    ],
    "correct": 1,
    "hints": [
      "One shared index identifies the same learner in both arrays.",
      "The selected learner is at index 1 in names; use that same position in marks."
    ],
    "solution": "OUTPUT names[selected], marks[selected]\nOUTPUT: Neo, 72",
    "explanation": "Using marks[0] mixes Neo with Lebo's mark. Both arrays need the selected index."
  },
  {
    "id": "u3-order",
    "unit": 3,
    "kind": "Reorder statements",
    "title": "Initialise before reading",
    "prompt": "Arrange the statements so the final output is 7.",
    "statements": [
      "DECLARE values[1] AS NUM",
      "SET values[0] = 4",
      "SET values[0] = values[0] + 3",
      "OUTPUT values[0]"
    ],
    "initialOrder": [
      1,
      2,
      3,
      0
    ],
    "hints": [
      "Array allocation does not assign a value to each element.",
      "Assign the starting value before reading that element in a calculation."
    ],
    "solution": "DECLARE values[1] AS NUM\nSET values[0] = 4\nSET values[0] = values[0] + 3\nOUTPUT values[0]",
    "explanation": "Allocate one element, initialise it to 4, add 3 and display 7."
  },
  {
    "id": "u4-missing",
    "unit": 4,
    "kind": "Missing line",
    "title": "Return a result",
    "prompt": "A parameter is an input declared in the method header. double receives a NUM parameter and must return twice its value. Choose its missing statement.",
    "code": "METHOD double(value AS NUM)\n  ____\nENDMETHOD\nBEGIN\n  DECLARE result AS NUM\n  SET result = double(4)\n  OUTPUT result\nEND",
    "choices": [
      "OUTPUT value * 2",
      "RETURN value * 2",
      "INPUT value"
    ],
    "correct": 1,
    "hints": [
      "Displaying a result is different from sending it back to the caller.",
      "The caller assigns the method result to result, so the method must return a value."
    ],
    "solution": "METHOD double(value AS NUM)\n  RETURN value * 2\nENDMETHOD\nBEGIN\n  DECLARE result AS NUM\n  SET result = double(4)\n  OUTPUT result\nEND",
    "explanation": "RETURN sends 8 back to the assignment. OUTPUT inside the method would display a value without returning it."
  },
  {
    "id": "u4-output",
    "unit": 4,
    "kind": "Predict the output",
    "title": "Match arguments to parameters",
    "prompt": "Arguments are supplied at the call; parameters are the names declared in the header. Select the displayed result.",
    "code": "METHOD difference(first AS NUM, second AS NUM)\n  RETURN first - second\nENDMETHOD\nBEGIN\n  OUTPUT difference(9, 4)\nEND",
    "choices": [
      "-5",
      "5",
      "13"
    ],
    "correct": 1,
    "hints": [
      "Argument order matters for subtraction.",
      "The first argument supplies first; the second supplies second."
    ],
    "solution": "first = 9\nsecond = 4\nRETURN 9 - 4 = 5\nOUTPUT: 5",
    "explanation": "Positional arguments map from left to right, so the method calculates 9 minus 4."
  },
  {
    "id": "u4-debug",
    "unit": 4,
    "kind": "Debugging",
    "title": "Supply every required argument",
    "prompt": "Choose the corrected call. add requires two NUM parameters.",
    "code": "METHOD add(first AS NUM, second AS NUM)\n  RETURN first + second\nENDMETHOD\nBEGIN\n  OUTPUT add(3)\nEND",
    "choices": [
      "OUTPUT add(3, 4)",
      "OUTPUT add()",
      "OUTPUT add(3, 4, 5)"
    ],
    "correct": 0,
    "hints": [
      "Count the parameters in the header.",
      "The corrected call must supply exactly two numeric arguments."
    ],
    "solution": "METHOD add(first AS NUM, second AS NUM)\n  RETURN first + second\nENDMETHOD\nBEGIN\n  OUTPUT add(3, 4)\nEND",
    "explanation": "The original call has only one argument. add(3, 4) supplies both required values and returns 7."
  },
  {
    "id": "u4-order",
    "unit": 4,
    "kind": "Reorder statements",
    "title": "Define and call a method",
    "prompt": "Place the method definition before BEGIN. Order its return statement and closing keyword, then call it from the main program.",
    "statements": [
      "METHOD double(value AS NUM)",
      "RETURN value * 2",
      "ENDMETHOD",
      "BEGIN",
      "OUTPUT double(3)",
      "END"
    ],
    "initialOrder": [
      1,
      2,
      3,
      4,
      5,
      0
    ],
    "hints": [
      "Keep the method definition separate from the main program.",
      "RETURN belongs inside METHOD; the call belongs between BEGIN and END."
    ],
    "solution": "METHOD double(value AS NUM)\nRETURN value * 2\nENDMETHOD\nBEGIN\nOUTPUT double(3)\nEND",
    "explanation": "The parameter value is declared in the method header. The call supplies 3, the method returns 6, and OUTPUT displays 6."
  },
  {
    "id": "u5-missing",
    "unit": 5,
    "kind": "Missing line",
    "title": "Protect an object field",
    "prompt": "PRIVATE restricts direct field access to the class. PUBLIC permits external access. Choose the declaration that keeps balance private.",
    "code": "CLASS Account\n  ____\n  METHOD deposit(amount AS NUM)\n    IF amount > 0 THEN\n      SET balance = balance + amount\n    ENDIF\n  ENDMETHOD\nENDCLASS",
    "choices": [
      "PUBLIC balance AS NUM = 0",
      "PRIVATE balance AS NUM = 0",
      "DECLARE balance AS STRING"
    ],
    "correct": 1,
    "hints": [
      "The field must store a number and begin with a value.",
      "Choose the access modifier that prevents direct changes from outside the class."
    ],
    "solution": "CLASS Account\n  PRIVATE balance AS NUM = 0\n  METHOD deposit(amount AS NUM)\n    IF amount > 0 THEN\n      SET balance = balance + amount\n    ENDIF\n  ENDMETHOD\nENDCLASS",
    "explanation": "PRIVATE supports encapsulation. The deposit method can validate changes before updating the initial balance of 0."
  },
  {
    "id": "u5-output",
    "unit": 5,
    "kind": "Predict the output",
    "title": "Follow object state",
    "prompt": "PRIVATE fields are used inside the class. NEW creates an object. CALL invokes a method. Select the output.",
    "code": "CLASS Counter\n  PRIVATE count AS NUM = 0\n  METHOD increment()\n    SET count = count + 1\n  ENDMETHOD\n  METHOD getCount()\n    RETURN count\n  ENDMETHOD\nENDCLASS\nBEGIN\n  DECLARE counter AS Counter\n  SET counter = NEW Counter()\n  CALL counter.increment()\n  CALL counter.increment()\n  OUTPUT counter.getCount()\nEND",
    "choices": [
      "0",
      "1",
      "2"
    ],
    "correct": 2,
    "hints": [
      "Both calls act on the same object.",
      "Start with the initial field value and add one for each increment call."
    ],
    "solution": "New counter: count = 0\nFirst increment: count = 1\nSecond increment: count = 2\nOUTPUT: 2",
    "explanation": "The object retains its field between method calls. getCount returns the updated field value."
  },
  {
    "id": "u5-debug",
    "unit": 5,
    "kind": "Debugging",
    "title": "Assign the incoming parameter",
    "prompt": "The private field name must receive the newName parameter. Choose the corrected assignment.",
    "code": "CLASS Learner\n  PRIVATE name AS STRING = \"\"\n  METHOD setName(newName AS STRING)\n    SET name = name\n  ENDMETHOD\nENDCLASS",
    "choices": [
      "SET newName = name",
      "SET name = newName",
      "OUTPUT newName"
    ],
    "correct": 1,
    "hints": [
      "The left side is the destination that must change.",
      "The field is name; the new incoming value is stored in newName."
    ],
    "solution": "CLASS Learner\n  PRIVATE name AS STRING = \"\"\n  METHOD setName(newName AS STRING)\n    SET name = newName\n  ENDMETHOD\nENDCLASS",
    "explanation": "name = name assigns the field to itself. name = newName copies the incoming text into the object field."
  },
  {
    "id": "u5-order",
    "unit": 5,
    "kind": "Reorder statements",
    "title": "Organise a class",
    "prompt": "Place the field before the method. Keep the update inside increment and close the method before closing the class. PRIVATE means the field is internal to the class.",
    "statements": [
      "CLASS Counter",
      "PRIVATE count AS NUM = 0",
      "METHOD increment()",
      "SET count = count + 1",
      "ENDMETHOD",
      "ENDCLASS"
    ],
    "initialOrder": [
      1,
      2,
      3,
      4,
      5,
      0
    ],
    "hints": [
      "The class contains its field and method.",
      "Initialise the private field first; put the assignment between METHOD and ENDMETHOD."
    ],
    "solution": "CLASS Counter\nPRIVATE count AS NUM = 0\nMETHOD increment()\nSET count = count + 1\nENDMETHOD\nENDCLASS",
    "explanation": "The field starts at 0. Each call to increment adds 1. ENDMETHOD closes the method; ENDCLASS closes its containing class."
  }
];
export function checkActivity(activity,answer){
 if(activity.kind==='Reorder statements')return Array.isArray(answer)&&answer.length===activity.statements.length&&answer.every((value,index)=>Number.isInteger(value)&&value===index);
 return Number.isInteger(answer)&&answer>=0&&answer<activity.choices.length&&answer===activity.correct;
}
