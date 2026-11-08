export const units = [
  {
    "id": 1,
    "title": "Programming foundations",
    "subtitle": "Think clearly before you code",
    "themes": [
      "Computers and programming",
      "High-quality programs",
      "Control structures"
    ]
  },
  {
    "id": 2,
    "title": "Decisions and loops",
    "subtitle": "Control the path through a program",
    "themes": [
      "Basic selection",
      "Complex selection",
      "Loop control"
    ]
  },
  {
    "id": 3,
    "title": "Arrays and algorithms",
    "subtitle": "Organise, search and sort data",
    "themes": [
      "Array fundamentals",
      "Searching and parallel arrays",
      "Bubble sort"
    ]
  },
  {
    "id": 4,
    "title": "Methods and modules",
    "subtitle": "Break large problems into small solutions",
    "themes": [
      "Methods and decomposition",
      "Parameters and returns",
      "Hierarchy charts"
    ]
  },
  {
    "id": 5,
    "title": "Object-oriented design",
    "subtitle": "Model data and behaviour together",
    "themes": [
      "OOP principles",
      "Classes and objects",
      "Class diagrams"
    ]
  }
];
export const lessons = [
  {
    "id": "lesson-1",
    "unit": 1,
    "title": "Algorithms and the development life cycle",
    "outcomes": [
      "Explain an algorithm and input-process-output.",
      "Describe the program development life cycle."
    ],
    "sections": [
      {
        "heading": "What is a program?",
        "text": "A program is a set of instructions that a computer executes. Hardware performs the work; software specifies the instructions. An algorithm is a finite, ordered method for solving a problem. It should be clear enough that each step can be followed without guessing."
      },
      {
        "heading": "Start with the problem",
        "text": "Identify the inputs, the required output and the rules that connect them. For a total price, the inputs might be unit price and quantity; processing multiplies them; output is the total. Distinguish the problem requirements from the programming language used to implement them."
      },
      {
        "heading": "The development life cycle",
        "text": "Analyse requirements, design a solution, implement it, test and debug, deploy it, and maintain it. Documentation accompanies these activities. The cycle is iterative: a failed test may reveal a design issue or an unclear requirement."
      },
      {
        "heading": "Testing a design",
        "text": "Use normal, boundary and invalid data. Compare actual output with an independently calculated expected result. A program that runs without crashing can still produce incorrect results."
      }
    ],
    "example": "BEGIN\n  INPUT price\n  INPUT quantity\n  SET total = price * quantity\n  OUTPUT total\nEND",
    "quiz": {
      "question": "What should happen before choosing program statements?",
      "options": [
        "Write the final code",
        "Clarify inputs, outputs and requirements",
        "Deploy the program"
      ],
      "correct": 1,
      "explanation": "Requirements establish what the solution must achieve before implementation choices are made."
    },
    "bug": {
      "code": "BEGIN\nINPUT price\nINPUT quantity\nSET total = price + quantity\nOUTPUT total\nEND",
      "line": 4,
      "category": "Logic",
      "options": [
        "SET total = price * quantity",
        "SET total = price - quantity",
        "SET total = quantity / price"
      ],
      "correct": 0,
      "explanation": "The total price is unit price multiplied by the quantity. Adding them does not represent the stated rule.",
      "hint": "Write the input-process-output relationship in words."
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-2",
    "unit": 1,
    "title": "Pseudocode and flowchart symbols",
    "outcomes": [
      "Explain the purpose of pseudocode.",
      "Choose the correct flowchart symbols."
    ],
    "sections": [
      {
        "heading": "Pseudocode is a design notation",
        "text": "Pseudocode expresses an algorithm in a readable, language-independent form. There is no single universal syntax. This platform documents its own consistent conventions so that examples and the converter can be checked predictably."
      },
      {
        "heading": "Flowchart symbols",
        "text": "A rounded terminal represents Start or End. A rectangle represents a process, such as a calculation. A parallelogram represents input or output. A diamond represents a decision with labelled branches. Arrows show the direction of execution; they are not decoration."
      },
      {
        "heading": "Represent complete paths",
        "text": "Every decision needs a path for each possible outcome. A loop must have a route back to its condition and a route out. Keep flow direction consistent, label branches and avoid ambiguous crossings."
      },
      {
        "heading": "Readability",
        "text": "Indent statements inside a structure, use meaningful identifiers and pair opening and closing keywords. Comments begin with // in the chart lab. Comments explain a reason or assumption rather than repeat an obvious statement."
      }
    ],
    "example": "BEGIN\n  INPUT age\n  IF age >= 18 THEN\n    OUTPUT \"Adult\"\n  ELSE\n    OUTPUT \"Under 18\"\n  ENDIF\nEND",
    "quiz": {
      "question": "Which symbol represents an input operation?",
      "options": [
        "Rectangle",
        "Diamond",
        "Parallelogram"
      ],
      "correct": 2,
      "explanation": "Input and output use parallelograms; a diamond is a decision."
    },
    "bug": {
      "code": "BEGIN\nINPUT age\nIF age >= 18 THEN\nOUTPUT \"Adult\"\nENDWHILE\nEND",
      "line": 5,
      "category": "Syntax",
      "options": [
        "ENDIF",
        "ENDFOR",
        "ELSE"
      ],
      "correct": 0,
      "explanation": "An IF structure must close with ENDIF in the platform notation. ENDWHILE closes a different structure.",
      "hint": "Match the closing keyword to the opening keyword."
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-3",
    "unit": 1,
    "title": "Data types, variables and constants",
    "outcomes": [
      "Distinguish variables from constants.",
      "Choose appropriate data types."
    ],
    "sections": [
      {
        "heading": "Variables and constants",
        "text": "A variable is a named storage location whose value can change during execution. A constant represents a value that should not change. Choose names that convey meaning, such as numberOfLearners instead of n when context is unclear."
      },
      {
        "heading": "Common data types",
        "text": "NUM stores numeric values, including whole numbers and decimals, for example 7 and 7.5. INTEGER restricts values to whole numbers; REAL also accepts whole numbers and decimals; STRING stores text; BOOLEAN represents TRUE or FALSE. A phone number is often text because leading zeroes and symbols matter and arithmetic is not required."
      },
      {
        "heading": "Initialisation and assignment",
        "text": "Initialisation gives a variable its starting value. Assignment replaces its current value. In this platform SET total = total + price means evaluate the right side using the old total, then store the result on the left."
      },
      {
        "heading": "Type and validation",
        "text": "A type describes the kind of value; validation checks whether a value is acceptable for the problem. An integer age of -4 has the expected type but fails the business rule. Document assumptions about input and conversions."
      }
    ],
    "example": "BEGIN\n  DECLARE total AS REAL\n  SET total = 0\n  INPUT price\n  SET total = total + price\n  OUTPUT total\nEND",
    "quiz": {
      "question": "Which is usually the best type for a South African phone number?",
      "options": [
        "INTEGER",
        "STRING",
        "BOOLEAN"
      ],
      "correct": 1,
      "explanation": "A phone number is an identifier, not a quantity; a string preserves leading zeroes and formatting."
    },
    "bug": {
      "code": "BEGIN\nDECLARE total AS REAL\nINPUT price\nSET total = total + price\nOUTPUT total\nEND",
      "line": 3,
      "category": "Initialisation",
      "options": [
        "SET total = 0, then INPUT price",
        "SET total = total",
        "OUTPUT price"
      ],
      "correct": 0,
      "explanation": "Before accumulation, initialise total to zero. Keep the original INPUT price after the initialisation.",
      "hint": "What value does total hold before its first calculation?"
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-4",
    "unit": 1,
    "title": "Expressions and operator precedence",
    "outcomes": [
      "Create and evaluate mathematical expressions.",
      "Use parentheses to make intent explicit."
    ],
    "sections": [
      {
        "heading": "Expressions produce values",
        "text": "An expression combines values, variables and operators to produce a result. A statement performs an action, such as assigning that result. For example, price * quantity is an expression; SET total = price * quantity is a statement."
      },
      {
        "heading": "Precedence",
        "text": "In this course, parentheses are evaluated first, then multiplication and division, then addition and subtraction. Operators at the same arithmetic level are evaluated left to right. Use parentheses to state intent rather than rely on a reader remembering the rules."
      },
      {
        "heading": "Division and remainders",
        "text": "Real division can produce a fraction. DIV denotes integer quotient and MOD the remainder in theory examples. They are useful for divisibility checks and time conversion. The flowchart lab displays expressions but does not evaluate their mathematical correctness."
      },
      {
        "heading": "Checking a result",
        "text": "Trace with small values and calculate the expected result separately. If two marks are 40 and 60, their average is 50. An expression giving 70 has a logic problem even if the syntax is accepted."
      }
    ],
    "example": "BEGIN\n  INPUT mark1\n  INPUT mark2\n  SET average = (mark1 + mark2) / 2\n  OUTPUT average\nEND",
    "quiz": {
      "question": "What is 4 + 3 * 2?",
      "options": [
        "14",
        "10",
        "11"
      ],
      "correct": 1,
      "explanation": "Multiplication is performed before addition, so 3 * 2 is 6 and 4 + 6 is 10."
    },
    "bug": {
      "code": "BEGIN\nINPUT mark1\nINPUT mark2\nSET average = mark1 + mark2 / 2\nOUTPUT average\nEND",
      "line": 4,
      "category": "Calculation",
      "options": [
        "SET average = (mark1 + mark2) / 2",
        "SET average = mark1 * mark2 / 2",
        "SET average = mark1 + (mark2 / 2)"
      ],
      "correct": 0,
      "explanation": "Parentheses make the addition happen before dividing the total by two.",
      "hint": "Both marks must be included in the sum before division."
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-5",
    "unit": 1,
    "title": "Structured design and trace tables",
    "outcomes": [
      "Describe sequence, selection and repetition.",
      "Identify features of good program design."
    ],
    "sections": [
      {
        "heading": "Three control structures",
        "text": "Sequence executes statements in order. Selection chooses a path using a condition. Repetition executes a block repeatedly under a control rule. Structured programs combine these patterns into understandable, nested blocks."
      },
      {
        "heading": "Good design",
        "text": "Aim for correctness, clarity, modularity and maintainability. Give each module a clear responsibility, use meaningful names, validate input and reduce unnecessary duplication. A shorter solution is not automatically a clearer or more correct one."
      },
      {
        "heading": "Trace tables",
        "text": "A trace table records changing variable values and output as statements execute. Record the initial state, then each assignment or loop iteration. Evaluate conditions using the current values, not the values you expect later."
      },
      {
        "heading": "Dry run",
        "text": "Manually execute an algorithm using a small test case. Record the actual output and compare it with the expected output. A trace is evidence about that test case, not proof that every possible input works."
      }
    ],
    "example": "BEGIN\n  SET x = 3\n  SET y = x + 2\n  SET x = y * 2\n  OUTPUT x\nEND",
    "quiz": {
      "question": "Which structure repeats a block of statements?",
      "options": [
        "Sequence",
        "Selection",
        "Repetition"
      ],
      "correct": 2,
      "explanation": "Repetition is the structure for repeated execution."
    },
    "bug": {
      "code": "BEGIN\nSET x = 3\nSET y = x + 2\nSET x = y * 2\nOUTPUT y\nEND",
      "line": 5,
      "category": "Logic",
      "options": [
        "OUTPUT x",
        "OUTPUT 3",
        "OUTPUT x + y"
      ],
      "correct": 0,
      "explanation": "The requirement is to display the final x. Here y is 5 and the final x is 10.",
      "hint": "Trace x and y separately; which variable is the requested output?"
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-6",
    "unit": 2,
    "title": "Boolean expressions and basic selection",
    "outcomes": [
      "Use relational operators.",
      "Apply AND, OR and NOT."
    ],
    "sections": [
      {
        "heading": "Boolean results",
        "text": "A Boolean expression evaluates to TRUE or FALSE. Relational comparisons include =, <>, <, <=, > and >= in this notation. Use a decision to choose an action based on the result."
      },
      {
        "heading": "AND, OR and NOT",
        "text": "A AND B is true only if both operands are true. A OR B is true if at least one operand is true. NOT reverses a Boolean value. Inclusive OR also allows both operands to be true."
      },
      {
        "heading": "Single and dual alternatives",
        "text": "An IF without ELSE runs its body only when the condition is true. IF/ELSE chooses exactly one of two branches. Use the full condition, such as age >= 18 AND hasID = TRUE, instead of an incomplete comparison."
      },
      {
        "heading": "Boundaries",
        "text": "Check the exact boundary value, as well as values just below and above it. If the pass mark is 50, the test mark >= 50 includes a learner who scores exactly 50."
      }
    ],
    "example": "BEGIN\n  INPUT mark\n  IF mark >= 50 THEN\n    OUTPUT \"Pass\"\n  ELSE\n    OUTPUT \"Not yet passed\"\n  ENDIF\nEND",
    "quiz": {
      "question": "When is A OR B false?",
      "options": [
        "When both are false",
        "When either is true",
        "When both are true"
      ],
      "correct": 0,
      "explanation": "Inclusive OR is false only when neither operand is true."
    },
    "bug": {
      "code": "BEGIN\nINPUT mark\nIF mark > 50 THEN\nOUTPUT \"Pass\"\nELSE\nOUTPUT \"Not yet passed\"\nENDIF\nEND",
      "line": 3,
      "category": "Boundary",
      "options": [
        "IF mark >= 50 THEN",
        "IF mark < 50 THEN",
        "IF mark = 100 THEN"
      ],
      "correct": 0,
      "explanation": "A score of exactly 50 must pass. The >= operator includes that boundary.",
      "hint": "Test the algorithm using exactly 50."
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-7",
    "unit": 2,
    "title": "Precedence and nested decisions",
    "outcomes": [
      "Apply logical precedence.",
      "Create complex and nested selection."
    ],
    "sections": [
      {
        "heading": "Logical precedence",
        "text": "This platform uses NOT before AND before OR, after arithmetic and relational expressions. Parenthesise combined conditions when the intended grouping may be unclear."
      },
      {
        "heading": "Nested selection",
        "text": "A nested decision is an IF inside another branch. Each IF needs its own ENDIF. Follow the outer decision first; only evaluate a nested branch when execution enters it."
      },
      {
        "heading": "Complex selection",
        "text": "Several conditions may be combined in one Boolean expression or organised into nested decisions. For example, an applicant may need both an age requirement and either of two acceptable qualifications."
      },
      {
        "heading": "CASE selection",
        "text": "CASE chooses among explicit values of one expression. Use a default branch when other values need handling. It is useful for a menu; it does not replace every kind of range-based decision."
      }
    ],
    "example": "BEGIN\n  INPUT age\n  INPUT hasID\n  IF age >= 18 THEN\n    IF hasID = TRUE THEN\n      OUTPUT \"Entry allowed\"\n    ELSE\n      OUTPUT \"ID required\"\n    ENDIF\n  ELSE\n    OUTPUT \"Age requirement not met\"\n  ENDIF\nEND",
    "quiz": {
      "question": "What is TRUE OR FALSE AND FALSE?",
      "options": [
        "FALSE",
        "TRUE",
        "Invalid"
      ],
      "correct": 1,
      "explanation": "AND is evaluated before OR: TRUE OR (FALSE AND FALSE) is TRUE."
    },
    "bug": {
      "code": "BEGIN\nINPUT age\nINPUT hasID\nIF age >= 18 OR hasID = TRUE THEN\nOUTPUT \"Entry allowed\"\nENDIF\nEND",
      "line": 4,
      "category": "Logic",
      "options": [
        "IF age >= 18 AND hasID = TRUE THEN",
        "IF age < 18 OR hasID = TRUE THEN",
        "IF NOT hasID = TRUE THEN"
      ],
      "correct": 0,
      "explanation": "Both conditions are required. OR would allow someone who meets only one condition.",
      "hint": "Does the requirement say both conditions, or either condition?"
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-8",
    "unit": 2,
    "title": "Counted loops and accumulators",
    "outcomes": [
      "Write counted loops.",
      "Use counters and accumulators."
    ],
    "sections": [
      {
        "heading": "Counted repetition",
        "text": "A FOR loop is useful when the number of repetitions is known. Here FOR i = 1 TO 5 includes both endpoints, so it runs five times. A STEP changes the amount added to the counter."
      },
      {
        "heading": "Counter versus accumulator",
        "text": "A counter tracks occurrences or repetitions. An accumulator combines values, often by addition. Initialise a sum to zero and a product to one before accumulation."
      },
      {
        "heading": "Order matters",
        "text": "Read the current value before using it, update the accumulator after the input, and display the final total after the loop if only one final result is required."
      },
      {
        "heading": "Checking iterations",
        "text": "Trace the first iteration, the last valid iteration and the next condition check. For a negative STEP, the loop condition uses the corresponding descending bound."
      }
    ],
    "example": "BEGIN\n  SET total = 0\n  FOR i = 1 TO 3\n    INPUT value\n    SET total = total + value\n  ENDFOR\n  OUTPUT total\nEND",
    "quiz": {
      "question": "How many times does FOR i = 1 TO 4 execute with STEP 1?",
      "options": [
        "3",
        "4",
        "5"
      ],
      "correct": 1,
      "explanation": "Both endpoints are included: i is 1, 2, 3 and 4."
    },
    "bug": {
      "code": "BEGIN\nSET total = 0\nFOR i = 1 TO 3\nINPUT value\nSET total = value\nENDFOR\nOUTPUT total\nEND",
      "line": 5,
      "category": "Logic",
      "options": [
        "SET total = total + value",
        "SET total = total - value",
        "SET total = 0"
      ],
      "correct": 0,
      "explanation": "Assigning value alone discards the previous total. An accumulator adds the new value to the running total.",
      "hint": "What happens to the previous total on each iteration?"
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-9",
    "unit": 2,
    "title": "Conditional loops and priming input",
    "outcomes": [
      "Use WHILE and REPEAT/UNTIL.",
      "Use sentinel values and priming input."
    ],
    "sections": [
      {
        "heading": "Pre-test loops",
        "text": "WHILE checks its condition before entering the body. It can execute zero times. Something in the body must be able to change the condition, or the loop may never terminate."
      },
      {
        "heading": "Post-test loops",
        "text": "REPEAT executes the body before checking UNTIL. It runs at least once and stops when the UNTIL condition becomes true. This differs from WHILE, which continues while its condition is true."
      },
      {
        "heading": "Priming input",
        "text": "A priming input is read before a loop so the first condition can be evaluated. Read another value at the end of the body to prepare for the next check."
      },
      {
        "heading": "Sentinel-controlled input",
        "text": "A sentinel is a special value that ends input, such as -1 when valid marks are 0 to 100. Do not accidentally include the sentinel in the total or count. Validate other invalid values separately."
      }
    ],
    "example": "BEGIN\n  SET total = 0\n  INPUT value\n  WHILE value <> -1 DO\n    SET total = total + value\n    INPUT value\n  ENDWHILE\n  OUTPUT total\nEND",
    "quiz": {
      "question": "Which loop always executes its body at least once?",
      "options": [
        "WHILE",
        "REPEAT/UNTIL",
        "Every FOR loop"
      ],
      "correct": 1,
      "explanation": "REPEAT/UNTIL tests after executing its body."
    },
    "bug": {
      "code": "BEGIN\nINPUT value\nWHILE value <> -1 DO\nOUTPUT value\nSET value = value\nENDWHILE\nEND",
      "line": 5,
      "category": "Logic",
      "options": [
        "INPUT value",
        "OUTPUT -1",
        "SET value = value + 0"
      ],
      "correct": 0,
      "explanation": "A new input allows the condition to change. Assigning value to itself cannot obtain the next value.",
      "hint": "Where is the next input read?"
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-10",
    "unit": 2,
    "title": "Nested loops",
    "outcomes": [
      "Trace nested loops.",
      "Predict the number of body executions."
    ],
    "sections": [
      {
        "heading": "A loop inside a loop",
        "text": "For each outer-loop iteration, the entire inner loop runs. With three rows and four columns, a simple nested traversal visits twelve cells."
      },
      {
        "heading": "Independent counters",
        "text": "Use separate variables for outer and inner control. Reusing the outer counter inside the inner loop changes the outer-loop state and makes the algorithm difficult to reason about."
      },
      {
        "heading": "Reset at the correct level",
        "text": "Reset a per-row total at the beginning of each outer iteration. Reset a grand total only once before the outer loop. Initialising at the wrong level changes what is accumulated."
      },
      {
        "heading": "Trace one row first",
        "text": "Record the outer counter, inner counter and output for a small example. Count how many times the body executes before generalising to larger bounds."
      }
    ],
    "example": "BEGIN\n  FOR row = 1 TO 2\n    FOR column = 1 TO 3\n      OUTPUT row, column\n    ENDFOR\n  ENDFOR\nEND",
    "quiz": {
      "question": "How many pairs are output by the example?",
      "options": [
        "2",
        "3",
        "6"
      ],
      "correct": 2,
      "explanation": "Each of the two outer iterations runs three inner iterations: 2 * 3 = 6."
    },
    "bug": {
      "code": "BEGIN\nFOR row = 1 TO 2\nFOR row = 1 TO 3\nOUTPUT row\nENDFOR\nENDFOR\nEND",
      "line": 3,
      "category": "Logic",
      "options": [
        "FOR column = 1 TO 3",
        "FOR row = 1 TO 2",
        "SET row = 0"
      ],
      "correct": 0,
      "explanation": "Use a distinct inner counter, such as column. Adjust the body to use row and column as required.",
      "hint": "Does the inner loop overwrite the outer counter?"
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-11",
    "unit": 3,
    "title": "Arrays and element access",
    "outcomes": [
      "Explain an array data structure.",
      "Access array elements safely."
    ],
    "sections": [
      {
        "heading": "What an array stores",
        "text": "An array groups values under one name and provides access by index. The values normally share a data type. A fixed-size array has a defined capacity; the number of meaningful values may be smaller than that capacity."
      },
      {
        "heading": "Index convention",
        "text": "This platform uses zero-based indexing: an array with n elements has indices 0 through n - 1. State the convention in a solution. A one-based algorithm is also possible when its bounds are consistently defined."
      },
      {
        "heading": "Traversal",
        "text": "Visit each element using a loop. Never use n as a valid index in a zero-based array of length n. Check array bounds before accessing an element."
      },
      {
        "heading": "Two-dimensional arrays",
        "text": "A two-dimensional array uses row and column indices, such as marks[row][column]. Nested loops traverse the rows and columns. Keep track of both dimensions and their valid ranges."
      }
    ],
    "example": "BEGIN\n  FOR i = 0 TO 3\n    INPUT marks[i]\n  ENDFOR\n  FOR i = 0 TO 3\n    OUTPUT marks[i]\n  ENDFOR\nEND",
    "quiz": {
      "question": "What is the last valid index in a zero-based array of length 5?",
      "options": [
        "5",
        "4",
        "6"
      ],
      "correct": 1,
      "explanation": "Indices are 0, 1, 2, 3 and 4."
    },
    "bug": {
      "code": "BEGIN\nFOR i = 0 TO 5\nOUTPUT values[i]\nENDFOR\nEND",
      "line": 2,
      "category": "Boundary",
      "options": [
        "FOR i = 0 TO 4",
        "FOR i = 1 TO 5",
        "FOR i = 0 TO 6"
      ],
      "correct": 0,
      "explanation": "For an array of length five, index five is out of bounds. The last valid index is four.",
      "hint": "List all five valid indices."
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-12",
    "unit": 3,
    "title": "Linear search",
    "outcomes": [
      "Search an array for a specific value.",
      "Handle a value that is not found."
    ],
    "sections": [
      {
        "heading": "Search one element at a time",
        "text": "Linear search compares the target with elements in sequence. It works on unsorted arrays and may need to inspect every element."
      },
      {
        "heading": "Track the result",
        "text": "Use a found flag or an index initialised to a value outside the valid index range, such as -1. A match at index zero must not be confused with not found."
      },
      {
        "heading": "Stop appropriately",
        "text": "You can stop at the first match when only one position is needed. Searching for every occurrence requires continuing and recording each match."
      },
      {
        "heading": "Efficiency",
        "text": "In the worst case, linear search examines n elements, written O(n). Search cost grows with the number of elements. This is a broad growth description, not a stopwatch measurement."
      }
    ],
    "example": "BEGIN\n  SET foundAt = -1\n  FOR i = 0 TO 3\n    IF values[i] = target THEN\n      SET foundAt = i\n    ENDIF\n  ENDFOR\n  OUTPUT foundAt\nEND",
    "quiz": {
      "question": "Why initialise foundAt to -1?",
      "options": [
        "It is a valid first index",
        "It distinguishes not found from index 0",
        "It sorts the array"
      ],
      "correct": 1,
      "explanation": "-1 is outside the valid indices and can represent no match."
    },
    "bug": {
      "code": "BEGIN\nSET foundAt = 0\nFOR i = 0 TO 3\nIF values[i] = target THEN\nSET foundAt = i\nENDIF\nENDFOR\nOUTPUT foundAt\nEND",
      "line": 2,
      "category": "Initialisation",
      "options": [
        "SET foundAt = -1",
        "SET foundAt = 1",
        "SET foundAt = target"
      ],
      "correct": 0,
      "explanation": "Zero is a valid position, so it cannot unambiguously mean not found. Use -1 for this zero-based example.",
      "hint": "How can you distinguish a first-element match from no match?"
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-13",
    "unit": 3,
    "title": "Parallel arrays",
    "outcomes": [
      "Explain related positions in parallel arrays.",
      "Keep associated values aligned."
    ],
    "sections": [
      {
        "heading": "Related records across arrays",
        "text": "Parallel arrays store different attributes in separate arrays, linked by a shared index. names[2] and scores[2] describe the same learner when the arrays are kept aligned."
      },
      {
        "heading": "Search and retrieve",
        "text": "Search one array to find an index, then use that index in the related arrays. Check for not found before using a result index."
      },
      {
        "heading": "Maintain alignment",
        "text": "If you reorder one parallel array, move the corresponding entries in every related array. Sorting only scores would disconnect learners from their marks."
      },
      {
        "heading": "Design alternative",
        "text": "Objects or records can keep related attributes together, reducing alignment errors. Parallel arrays remain useful for understanding indexing and relationships."
      }
    ],
    "example": "BEGIN\n  FOR i = 0 TO 2\n    INPUT names[i]\n    INPUT scores[i]\n  ENDFOR\n  FOR i = 0 TO 2\n    OUTPUT names[i], scores[i]\n  ENDFOR\nEND",
    "quiz": {
      "question": "Which name belongs to scores[2]?",
      "options": [
        "names[0]",
        "names[2]",
        "The largest name"
      ],
      "correct": 1,
      "explanation": "A shared index connects attributes belonging to the same record."
    },
    "bug": {
      "code": "BEGIN\nSET i = 2\nOUTPUT names[i], scores[0]\nEND",
      "line": 3,
      "category": "Logic",
      "options": [
        "OUTPUT names[i], scores[i]",
        "OUTPUT names[0], scores[i]",
        "OUTPUT scores[0]"
      ],
      "correct": 0,
      "explanation": "Use the same index for related attributes; scores[0] may belong to another learner.",
      "hint": "Check whether both attributes refer to the same position."
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-14",
    "unit": 3,
    "title": "Bubble sort",
    "outcomes": [
      "Explain why sorting is useful.",
      "Write and trace bubble sort."
    ],
    "sections": [
      {
        "heading": "Why sort?",
        "text": "Sorting puts values into a defined order so they can be read, compared or processed more conveniently. It can support other algorithms, but sorting itself has a cost."
      },
      {
        "heading": "Adjacent comparisons",
        "text": "Bubble sort compares neighbouring values and swaps them when they are in the wrong order. In ascending order, swap when values[j] > values[j + 1]. A temporary variable prevents losing a value."
      },
      {
        "heading": "Passes and bounds",
        "text": "After a full left-to-right pass, the largest remaining value reaches the end of the unsorted part. Shorten later passes. For n elements, a basic implementation needs at most n - 1 passes."
      },
      {
        "heading": "Complexity",
        "text": "The straightforward nested-loop version has O(n squared) comparisons in the worst case. A swapped flag can stop early when a pass makes no swaps. It is useful for learning but usually not the best general sorting choice for large data."
      }
    ],
    "example": "BEGIN\n  FOR pass = 0 TO 2\n    FOR j = 0 TO 2 - pass\n      IF values[j] > values[j + 1] THEN\n        SET temp = values[j]\n        SET values[j] = values[j + 1]\n        SET values[j + 1] = temp\n      ENDIF\n    ENDFOR\n  ENDFOR\nEND",
    "quiz": {
      "question": "Why use a temporary variable during a swap?",
      "options": [
        "To preserve a value before overwriting it",
        "To increase the array length",
        "To avoid comparing values"
      ],
      "correct": 0,
      "explanation": "Without temporary storage, the first overwritten value can be lost."
    },
    "bug": {
      "code": "BEGIN\nSET temp = values[j]\nSET values[j] = values[j + 1]\nSET values[j + 1] = values[j]\nEND",
      "line": 4,
      "category": "Logic",
      "options": [
        "SET values[j + 1] = temp",
        "SET values[j + 1] = j",
        "SET temp = values[j + 1]"
      ],
      "correct": 0,
      "explanation": "The original left value is in temp. Using values[j] again duplicates the right value.",
      "hint": "Where was the original left-hand value saved?"
    },
    "diagram": "flow"
  },
  {
    "id": "lesson-15",
    "unit": 4,
    "title": "Decomposition and hierarchy charts",
    "outcomes": [
      "Explain methods and modules.",
      "Break a program into modules and draw a hierarchy chart."
    ],
    "sections": [
      {
        "heading": "One responsibility per module",
        "text": "A method or module is a named unit of work. Decomposition divides a problem into smaller responsibilities, such as reading input, calculating a result and displaying output."
      },
      {
        "heading": "Method headers",
        "text": "A header names the method and describes its parameters. A function also specifies a result type in many notations. Methods perform work without an explicit returned result; functions return a result."
      },
      {
        "heading": "Hierarchy charts",
        "text": "A hierarchy chart shows the relationship between a controlling module and the modules it calls. It describes program organisation, not the step-by-step decision paths shown by a flowchart."
      },
      {
        "heading": "Cohesion and coupling",
        "text": "Cohesion is how closely a module’s tasks belong together. Coupling describes dependencies between modules. Prefer focused modules with clear interfaces instead of modules that rely on many unrelated global variables."
      }
    ],
    "example": "METHOD readData()\n  INPUT value\nENDMETHOD\nMETHOD showResult()\n  OUTPUT \"Result ready\"\nENDMETHOD\nBEGIN\n  CALL readData()\n  CALL showResult()\nEND",
    "quiz": {
      "question": "What does a hierarchy chart primarily show?",
      "options": [
        "Every loop iteration",
        "Module organisation and calls",
        "The current values of all variables"
      ],
      "correct": 1,
      "explanation": "A hierarchy chart describes the module structure and call relationships."
    },
    "bug": {
      "code": "METHOD showResult()\nOUTPUT \"Result ready\"\nENDMETHOD\nBEGIN\nCALL showResults()\nEND",
      "line": 5,
      "category": "Syntax",
      "options": [
        "CALL showResult()",
        "CALL readData()",
        "OUTPUT showResults"
      ],
      "correct": 0,
      "explanation": "The call name must match the defined method name in this example.",
      "hint": "Compare the call spelling with the method header."
    },
    "diagram": "hierarchy"
  },
  {
    "id": "lesson-16",
    "unit": 4,
    "title": "Parameters, arguments and scope",
    "outcomes": [
      "Distinguish parameters from arguments.",
      "Use methods with and without parameters."
    ],
    "sections": [
      {
        "heading": "Parameters and arguments",
        "text": "A parameter is a placeholder declared in a method header. An argument is the actual value or variable supplied at a call. In displayName(name), name is a parameter in the definition; \"Lebo\" is an argument in CALL displayName(\"Lebo\")."
      },
      {
        "heading": "Passing values",
        "text": "Match argument order, number and compatible types to the method signature. With pass-by-value, the method receives a copy of a value; reassigning the parameter does not reassign the caller’s variable."
      },
      {
        "heading": "Scope",
        "text": "Scope determines where an identifier is accessible. Local variables belong to their method or block. A caller cannot normally read another method’s local variable directly."
      },
      {
        "heading": "No-parameter methods",
        "text": "A method can take no parameters when it needs no caller-supplied values. Avoid replacing clear parameters with unnecessary shared global state."
      }
    ],
    "example": "METHOD displayName(name)\n  OUTPUT name\nENDMETHOD\nBEGIN\n  CALL displayName(\"Lebo\")\nEND",
    "quiz": {
      "question": "In CALL displayName(\"Lebo\"), what is \"Lebo\"?",
      "options": [
        "A parameter declaration",
        "An argument",
        "A method header"
      ],
      "correct": 1,
      "explanation": "The actual supplied value is an argument; name is the parameter in the method definition."
    },
    "bug": {
      "code": "METHOD displayPair(first, second)\nOUTPUT first, second\nENDMETHOD\nBEGIN\nCALL displayPair(\"Lebo\")\nEND",
      "line": 5,
      "category": "Syntax",
      "options": [
        "CALL displayPair(\"Lebo\", \"Mpho\")",
        "CALL displayPair()",
        "CALL displayPair"
      ],
      "correct": 0,
      "explanation": "The method expects two arguments. Supply both in the required order.",
      "hint": "Count the parameters and the supplied arguments."
    },
    "diagram": "hierarchy"
  },
  {
    "id": "lesson-17",
    "unit": 4,
    "title": "Functions and return values",
    "outcomes": [
      "Write methods that return data.",
      "Distinguish returning from displaying."
    ],
    "sections": [
      {
        "heading": "Return versus output",
        "text": "RETURN passes a result back to the caller and ends that method invocation. OUTPUT displays information. A method that prints a number has not necessarily returned that number for another calculation."
      },
      {
        "heading": "Using a function result",
        "text": "A caller can store a returned value, use it in an expression or pass it to another method. The return type should match the kind of result produced."
      },
      {
        "heading": "All required paths",
        "text": "If a function promises a value, every possible path that finishes normally should return an appropriate value. Missing branches can leave the caller without a defined result."
      },
      {
        "heading": "Converter scope",
        "text": "The chart lab builds control-flow diagrams for its documented statement subset. RETURN is shown as a terminal exit in a method flowchart. Select the method body in the lab to inspect each return path."
      }
    ],
    "example": "FUNCTION add(a, b) RETURNS REAL\n  RETURN a + b\nENDFUNCTION\nBEGIN\n  SET result = add(4, 6)\n  OUTPUT result\nEND",
    "quiz": {
      "question": "Which statement gives a function result back to its caller?",
      "options": [
        "OUTPUT result",
        "RETURN result",
        "INPUT result"
      ],
      "correct": 1,
      "explanation": "RETURN supplies the result to the caller; OUTPUT displays it."
    },
    "bug": {
      "code": "FUNCTION add(a, b) RETURNS REAL\nSET result = a + b\nOUTPUT result\nENDFUNCTION",
      "line": 3,
      "category": "Logic",
      "options": [
        "RETURN result",
        "INPUT result",
        "SET result = 0"
      ],
      "correct": 0,
      "explanation": "The function promises a returned value. Displaying the result alone does not fulfil that contract.",
      "hint": "Can the caller store a value that was only printed?"
    },
    "diagram": "hierarchy"
  },
  {
    "id": "lesson-18",
    "unit": 4,
    "title": "Passing arrays to methods",
    "outcomes": [
      "Pass an array and its meaningful length.",
      "Explain array update assumptions."
    ],
    "sections": [
      {
        "heading": "An array as a parameter",
        "text": "Passing an array lets a method process a collection without duplicating the traversal logic. Include the number of meaningful elements when the array’s capacity may be larger than the data used."
      },
      {
        "heading": "Reference and copy semantics",
        "text": "Whether changes affect the caller depends on the language and the parameter-passing convention. State the assumption in pseudocode. In C#, an array is a reference type: passing the reference by value still permits element updates to the same array."
      },
      {
        "heading": "Respect bounds",
        "text": "Process indices 0 through count - 1 when count is the number of meaningful elements in a zero-based array. Validate that count does not exceed capacity."
      },
      {
        "heading": "Choose a clear contract",
        "text": "Specify what the method receives, what it returns and whether it changes the original elements. Tests should check both the result and any intended changes."
      }
    ],
    "example": "METHOD displayValues(values, count)\n  FOR i = 0 TO count - 1\n    OUTPUT values[i]\n  ENDFOR\nENDMETHOD\nBEGIN\n  CALL displayValues(marks, 4)\nEND",
    "quiz": {
      "question": "Why might a method need count as well as the array?",
      "options": [
        "Count may differ from capacity",
        "Arrays cannot contain numbers",
        "It removes the need for bounds"
      ],
      "correct": 0,
      "explanation": "The method may need to process only the meaningful portion of a partially filled array."
    },
    "bug": {
      "code": "METHOD displayValues(values, count)\nFOR i = 0 TO count\nOUTPUT values[i]\nENDFOR\nENDMETHOD",
      "line": 2,
      "category": "Boundary",
      "options": [
        "FOR i = 0 TO count - 1",
        "FOR i = 1 TO count + 1",
        "FOR i = 0 TO count + 1"
      ],
      "correct": 0,
      "explanation": "A zero-based collection containing count values ends at count - 1.",
      "hint": "Test with count equal to the array length."
    },
    "diagram": "hierarchy"
  },
  {
    "id": "lesson-19",
    "unit": 4,
    "title": "Overloading and method contracts",
    "outcomes": [
      "Explain overloaded methods.",
      "Match a call to an appropriate signature."
    ],
    "sections": [
      {
        "heading": "One name, different signatures",
        "text": "Overloading uses the same method name with different parameter lists. The parameter count or types differ. A caller’s arguments determine which compatible overload is selected."
      },
      {
        "heading": "Return type alone is insufficient",
        "text": "In C# and this course’s examples, changing only the return type does not create a valid overload. Parameter names alone do not distinguish overloads either."
      },
      {
        "heading": "Unambiguous design",
        "text": "Use overloads for closely related operations. Avoid combinations that make it unclear which method a call selects. Use meaningful method names when the operations have different responsibilities."
      },
      {
        "heading": "Chart lab limitation",
        "text": "The lab currently requires unique module names. Overload examples belong to the theory and debugging exercises until typed signature resolution is added."
      }
    ],
    "example": "// Overload A: add(INTEGER a, INTEGER b) returns INTEGER\n// Overload B: add(REAL a, REAL b) returns REAL\n// add(2, 3) selects the integer overload.\n// add(2.5, 3.5) selects the real overload.",
    "quiz": {
      "question": "Which change can create a valid overload?",
      "options": [
        "Change only the return type",
        "Change the parameter types",
        "Change only parameter names"
      ],
      "correct": 1,
      "explanation": "A distinct parameter signature can distinguish an overload."
    },
    "bug": {
      "code": "FUNCTION calculate(INTEGER a) RETURNS INTEGER\nRETURN a\nENDFUNCTION\nFUNCTION calculate(INTEGER b) RETURNS REAL\nRETURN b\nENDFUNCTION",
      "line": 4,
      "category": "Syntax",
      "options": [
        "Change the second header to calculate(REAL b) RETURNS REAL",
        "Rename only b to c",
        "Change only RETURNS REAL to RETURNS STRING"
      ],
      "correct": 0,
      "explanation": "The original parameter types and count are identical. Change the parameter type or count to create a distinct signature.",
      "hint": "Ignore parameter names and compare the parameter types."
    },
    "diagram": "none"
  },
  {
    "id": "lesson-20",
    "unit": 5,
    "title": "Classes, objects and constructors",
    "outcomes": [
      "Distinguish a class from an object.",
      "Describe attributes and methods."
    ],
    "sections": [
      {
        "heading": "Class versus object",
        "text": "A class defines a type with data and behaviour. An object is a particular instance of that class. Two Learner objects can have different names while following the same class definition."
      },
      {
        "heading": "State and behaviour",
        "text": "Attributes hold state, such as name and mark. Methods express behaviour, such as calculateAverage. Choose responsibilities that belong to the abstraction being modelled."
      },
      {
        "heading": "Constructors",
        "text": "A constructor initialises a new object into a valid state. It may receive arguments that supply required data. Construction is different from an ordinary method call on an existing object."
      },
      {
        "heading": "Object identity",
        "text": "Two objects can have the same attribute values and still be distinct instances. A reference identifies an object; a class name identifies a type."
      }
    ],
    "example": "// Class Learner\n// Private attribute: name : STRING\n// Constructor Learner(newName): initialise name\n// Public method displayDetails(): output name\n// lebo and mpho are separate Learner objects.",
    "quiz": {
      "question": "Which is an object rather than a class?",
      "options": [
        "The Learner type definition",
        "One particular Learner instance",
        "The STRING type"
      ],
      "correct": 1,
      "explanation": "An object is a specific instance with its own state."
    },
    "bug": {
      "code": "CLASS Learner\nPRIVATE name AS STRING\nMETHOD initialise(newName)\nSET name = name\nENDMETHOD\nENDCLASS",
      "line": 4,
      "category": "Logic",
      "options": [
        "SET name = newName",
        "SET newName = name",
        "OUTPUT name"
      ],
      "correct": 0,
      "explanation": "The incoming value should initialise the attribute. Assigning name to itself ignores newName.",
      "hint": "Which identifier contains the caller-supplied value?"
    },
    "diagram": "class"
  },
  {
    "id": "lesson-21",
    "unit": 5,
    "title": "Encapsulation, inheritance and polymorphism",
    "outcomes": [
      "Define the three OOP principles.",
      "Choose an appropriate relationship."
    ],
    "sections": [
      {
        "heading": "Encapsulation",
        "text": "Encapsulation groups data with behaviour and controls access to state. Private attributes and appropriate public methods help preserve valid state. A setter should enforce rules where needed, not merely expose unrestricted changes."
      },
      {
        "heading": "Inheritance",
        "text": "Inheritance defines an is-a relationship: a SavingsAccount is an Account when it fulfils the base contract. A subclass can reuse and specialise behaviour. A has-a relationship is usually represented with composition or association instead."
      },
      {
        "heading": "Polymorphism",
        "text": "Polymorphism allows a common operation to have different implementations depending on the object’s type. A common interface or base type can refer to different concrete objects, and an overridden operation can behave appropriately for each."
      },
      {
        "heading": "Keep the contract",
        "text": "An overriding method should honour the expectations of the common abstraction. Overloading changes parameter signatures; overriding specialises an inherited operation. These are related but distinct ideas."
      }
    ],
    "example": "// Shape declares area().\n// Rectangle overrides area() using width * height.\n// Circle overrides area() using pi * radius * radius.\n// Each object responds to area() through the common Shape abstraction.",
    "quiz": {
      "question": "A Course contains Learner objects. Which relationship is suggested?",
      "options": [
        "Course is a Learner",
        "Course has learners",
        "Learner is a number"
      ],
      "correct": 1,
      "explanation": "Containment suggests has-a, not an inheritance relationship."
    },
    "bug": {
      "code": "CLASS Account\nPUBLIC balance AS REAL\nMETHOD deposit(amount)\nIF amount > 0 THEN\nSET balance = balance + amount\nENDIF\nENDMETHOD\nENDCLASS",
      "line": 2,
      "category": "Design",
      "options": [
        "PRIVATE balance AS REAL, with controlled access methods",
        "PUBLIC balance AS STRING",
        "Remove the deposit method"
      ],
      "correct": 0,
      "explanation": "Unrestricted public balance allows callers to bypass the deposit rules. Encapsulation controls updates through an appropriate interface.",
      "hint": "Can callers bypass the rule that the deposit method enforces?"
    },
    "diagram": "class"
  },
  {
    "id": "lesson-22",
    "unit": 5,
    "title": "Class diagrams and class organisation",
    "outcomes": [
      "Draw a class diagram.",
      "Describe associations and class responsibilities."
    ],
    "sections": [
      {
        "heading": "The three compartments",
        "text": "A basic UML class box has a class name, attributes and operations. Attributes show names and types; operations show parameters and return types where relevant. Use consistent visibility notation: + is public and - is private."
      },
      {
        "heading": "Relationships",
        "text": "An association describes a connection between objects. Inheritance uses a solid line with a hollow triangle pointing to the more general class. Multiplicity describes how many objects participate, such as 1 or 0..*."
      },
      {
        "heading": "Organising classes",
        "text": "Group related responsibilities into cohesive classes. Use association or composition for has-a relationships, inheritance for justified is-a relationships and interfaces for shared contracts. Avoid a single class doing every task."
      },
      {
        "heading": "Class versus hierarchy chart",
        "text": "A class diagram models types, responsibilities and relationships. A hierarchy chart models procedural decomposition. A flowchart models control flow. Choose the diagram that answers the question being asked."
      }
    ],
    "example": "// Learner\n// - name : STRING\n// + displayDetails()\n// Course\n// - title : STRING\n// + enrol(learner)\n// Association: a learner enrols in a course.",
    "quiz": {
      "question": "In a basic UML class diagram, what does - indicate?",
      "options": [
        "Public visibility",
        "Private visibility",
        "An arithmetic error"
      ],
      "correct": 1,
      "explanation": "A minus prefix denotes private visibility; a plus prefix denotes public visibility."
    },
    "bug": {
      "code": "Class diagram: SavingsAccount inherits Account\nInheritance triangle points to SavingsAccount",
      "line": 2,
      "category": "Design",
      "options": [
        "Point the hollow triangle to Account",
        "Point arrows in both directions",
        "Remove both class names"
      ],
      "correct": 0,
      "explanation": "The inheritance triangle points toward the more general superclass, Account.",
      "hint": "Which class is the general type and which is the specialised type?"
    },
    "diagram": "class"
  }
];


