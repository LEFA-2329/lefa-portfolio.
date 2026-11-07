export const practice = {
  "lesson-1": {
    "teaching": [
      "Identify weight and rate as inputs.",
      "Multiply the current inputs to obtain charge.",
      "Display the result and test zero as a boundary."
    ],
    "worked": {
      "title": "A delivery quotation",
      "prompt": "Read a parcel weight and a rate per kilogram. Calculate and display the delivery charge. Assume valid non-negative input.",
      "code": "BEGIN\nINPUT weight\nINPUT rate\nSET charge = weight * rate\nOUTPUT charge\nEND",
      "expected": "For weight 3 and rate 12, charge is 36. For weight 0 and rate 12, charge is 0."
    },
    "quizzes": [
      {
        "question": "Which activity belongs to requirements analysis?",
        "options": [
          "Choose a button colour first",
          "Ignore invalid data",
          "Identify required inputs and outputs"
        ],
        "correct": 2,
        "explanation": "Identify required inputs and outputs. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which statement describes an algorithm?",
        "options": [
          "A particular graphics card",
          "A finite ordered solution procedure",
          "Only source code in C#"
        ],
        "correct": 1,
        "explanation": "A finite ordered solution procedure. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "When should documentation happen?",
        "options": [
          "Throughout development",
          "Only after retirement",
          "Never during design"
        ],
        "correct": 0,
        "explanation": "Throughout development. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "A program runs without crashing. What follows?",
        "options": [
          "It must be correct",
          "All boundaries are covered",
          "Its outputs still need testing"
        ],
        "correct": 2,
        "explanation": "Its outputs still need testing. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "1-a",
        "title": "Build or trace a solution",
        "prompt": "Read a parcel weight and a rate per kilogram. Calculate and display the delivery charge. Assume valid non-negative input. Work independently before comparing your answer.",
        "solution": "BEGIN\nINPUT weight\nINPUT rate\nSET charge = weight * rate\nOUTPUT charge\nEND\n\nExpected behaviour:\nFor weight 3 and rate 12, charge is 36. For weight 0 and rate 12, charge is 0.",
        "checklist": [
          "Identify weight and rate as inputs.",
          "Multiply the current inputs to obtain charge.",
          "Display the result and test zero as a boundary."
        ],
        "diagram": true
      },
      {
        "id": "1-b",
        "title": "Apply the concept",
        "prompt": "Add a fixed handling charge of R15. Give two test cases.",
        "solution": "SET charge = weight * rate + 15. For weight 3 and rate 12, expect 51; for weight 0, expect 15. Confirm whether zero-weight parcels are actually permitted in the requirements.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-2": {
    "teaching": [
      "Use a parallelogram for input.",
      "Use a diamond for temperature < 15 and label both branches.",
      "Join the paths after their output symbols."
    ],
    "worked": {
      "title": "A temperature decision",
      "prompt": "Read a temperature. Display \"Cold\" below 15 and \"Mild or warm\" otherwise. Draw the corresponding flowchart.",
      "code": "BEGIN\nREAD temperature\nIF temperature < 15 THEN\nDISPLAY \"Cold\"\nELSE\nDISPLAY \"Mild or warm\"\nEND IF\nEND",
      "expected": "14 gives Cold; 15 gives Mild or warm."
    },
    "quizzes": [
      {
        "question": "Which symbol should contain a calculation?",
        "options": [
          "Decision diamond",
          "Process rectangle",
          "Input parallelogram"
        ],
        "correct": 1,
        "explanation": "Process rectangle. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What does a flowchart arrow show?",
        "options": [
          "Direction of control flow",
          "The data type",
          "The program title"
        ],
        "correct": 0,
        "explanation": "Direction of control flow. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Why label decision branches?",
        "options": [
          "To sort values",
          "To create variables",
          "To distinguish condition outcomes"
        ],
        "correct": 2,
        "explanation": "To distinguish condition outcomes. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Is there one universal pseudocode syntax?",
        "options": [
          "Only indentation is relevant",
          "No, state the chosen conventions",
          "Yes, every language uses one"
        ],
        "correct": 1,
        "explanation": "No, state the chosen conventions. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "2-a",
        "title": "Build or trace a solution",
        "prompt": "Read a temperature. Display \"Cold\" below 15 and \"Mild or warm\" otherwise. Draw the corresponding flowchart. Work independently before comparing your answer.",
        "solution": "BEGIN\nREAD temperature\nIF temperature < 15 THEN\nDISPLAY \"Cold\"\nELSE\nDISPLAY \"Mild or warm\"\nEND IF\nEND\n\nExpected behaviour:\n14 gives Cold; 15 gives Mild or warm.",
        "checklist": [
          "Use a parallelogram for input.",
          "Use a diamond for temperature < 15 and label both branches.",
          "Join the paths after their output symbols."
        ],
        "diagram": true
      },
      {
        "id": "2-b",
        "title": "Apply the concept",
        "prompt": "List the correct flowchart shapes for reading a mark, computing an average, testing a pass condition and ending.",
        "solution": "Reading: parallelogram. Computing: process rectangle. Testing: decision diamond with labelled branches. Ending: rounded terminal. A hierarchy chart would not show these execution paths.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-3": {
    "teaching": [
      "Use REAL because inputs may have fractional parts.",
      "Initialise multiplication to 1, not 0.",
      "Multiply each value into product once."
    ],
    "worked": {
      "title": "Initialising a product",
      "prompt": "Calculate the product of three input numbers using an accumulator.",
      "code": "BEGIN\nDECLARE product AS REAL\nproduct = 1\nFOR i = 1 TO 3\nINPUT value\nproduct = product * value\nNEXT i\nOUTPUT product\nEND",
      "expected": "Inputs 2, 3, 4 give 24. Inputs 2, 0, 4 give 0."
    },
    "quizzes": [
      {
        "question": "What does initialisation do?",
        "options": [
          "Gives a variable its starting value",
          "Ends every loop",
          "Changes the identifier type automatically"
        ],
        "correct": 0,
        "explanation": "Gives a variable its starting value. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which type represents TRUE or FALSE?",
        "options": [
          "STRING only",
          "REAL",
          "BOOLEAN"
        ],
        "correct": 2,
        "explanation": "BOOLEAN. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What value begins a multiplication accumulator?",
        "options": [
          "-1 always",
          "1",
          "0"
        ],
        "correct": 1,
        "explanation": "1. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Can an INTEGER age be invalid?",
        "options": [
          "Yes, a negative age can violate requirements",
          "No, types guarantee all rules",
          "Only if its name is age"
        ],
        "correct": 0,
        "explanation": "Yes, a negative age can violate requirements. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "3-a",
        "title": "Build or trace a solution",
        "prompt": "Calculate the product of three input numbers using an accumulator. Work independently before comparing your answer.",
        "solution": "BEGIN\nDECLARE product AS REAL\nproduct = 1\nFOR i = 1 TO 3\nINPUT value\nproduct = product * value\nNEXT i\nOUTPUT product\nEND\n\nExpected behaviour:\nInputs 2, 3, 4 give 24. Inputs 2, 0, 4 give 0.",
        "checklist": [
          "Use REAL because inputs may have fractional parts.",
          "Initialise multiplication to 1, not 0.",
          "Multiply each value into product once."
        ],
        "diagram": true
      },
      {
        "id": "3-b",
        "title": "Apply the concept",
        "prompt": "Choose types for student number, active flag, whole-item count and average mark. Justify each.",
        "solution": "Student number: STRING, to preserve leading zeroes. Active flag: BOOLEAN. Whole-item count: INTEGER. Average mark: REAL. Validate allowed values separately from choosing types.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-4": {
    "teaching": [
      "Calculate subtotal before applying the discount.",
      "A 10% discount leaves 90% of subtotal.",
      "Test no items and a simple positive quantity."
    ],
    "worked": {
      "title": "A discounted basket",
      "prompt": "Read price and quantity, then apply a 10% discount to the subtotal.",
      "code": "BEGIN\nINPUT price\nINPUT quantity\nSET subtotal = price * quantity\nSET total = subtotal * (1 - 0.10)\nOUTPUT total\nEND",
      "expected": "Price 20, quantity 3: subtotal 60 and total 54."
    },
    "quizzes": [
      {
        "question": "What is (8 + 4) / 3?",
        "options": [
          "12",
          "9",
          "4"
        ],
        "correct": 2,
        "explanation": "4. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What is 17 MOD 5?",
        "options": [
          "5",
          "2",
          "3"
        ],
        "correct": 1,
        "explanation": "2. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What is 17 DIV 5?",
        "options": [
          "3",
          "2",
          "3.4"
        ],
        "correct": 0,
        "explanation": "3. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which expression averages a and b?",
        "options": [
          "a + b / 2",
          "a * b / 2",
          "(a + b) / 2"
        ],
        "correct": 2,
        "explanation": "(a + b) / 2. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "4-a",
        "title": "Build or trace a solution",
        "prompt": "Read price and quantity, then apply a 10% discount to the subtotal. Work independently before comparing your answer.",
        "solution": "BEGIN\nINPUT price\nINPUT quantity\nSET subtotal = price * quantity\nSET total = subtotal * (1 - 0.10)\nOUTPUT total\nEND\n\nExpected behaviour:\nPrice 20, quantity 3: subtotal 60 and total 54.",
        "checklist": [
          "Calculate subtotal before applying the discount.",
          "A 10% discount leaves 90% of subtotal.",
          "Test no items and a simple positive quantity."
        ],
        "diagram": true
      },
      {
        "id": "4-b",
        "title": "Apply the concept",
        "prompt": "Write an expression converting 135 minutes to whole hours and remaining minutes.",
        "solution": "hours = 135 DIV 60 gives 2; minutes = 135 MOD 60 gives 15. DIV and MOD are expressions displayed by the converter, not executed by it.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-5": {
    "teaching": [
      "Assignment changes only the variable on its left.",
      "Use the latest values on the right-hand side.",
      "Distinguish the current state from displayed output."
    ],
    "worked": {
      "title": "Trace changing state",
      "prompt": "Dry-run the assignments and record the values after each statement.",
      "code": "BEGIN\nSET a = 4\nSET b = a + 3\nSET a = b - 2\nSET b = a * 2\nOUTPUT a, b\nEND",
      "expected": "After assignments: (a=4,b=unset), (4,7), (5,7), (5,10). Output: 5, 10."
    },
    "quizzes": [
      {
        "question": "What is a trace table used for?",
        "options": [
          "List only method names",
          "Record changing state and output",
          "Replace every test"
        ],
        "correct": 1,
        "explanation": "Record changing state and output. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "After x=2 and y=x+5, what is y?",
        "options": [
          "7",
          "2",
          "5"
        ],
        "correct": 0,
        "explanation": "7. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which is a selection structure?",
        "options": [
          "A single OUTPUT",
          "An assignment alone",
          "IF/ELSE"
        ],
        "correct": 2,
        "explanation": "IF/ELSE. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which is a feature of maintainable code?",
        "options": [
          "All tasks in one enormous method",
          "Clear names and focused responsibilities",
          "Maximum duplication"
        ],
        "correct": 1,
        "explanation": "Clear names and focused responsibilities. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "5-a",
        "title": "Build or trace a solution",
        "prompt": "Dry-run the assignments and record the values after each statement. Work independently before comparing your answer.",
        "solution": "BEGIN\nSET a = 4\nSET b = a + 3\nSET a = b - 2\nSET b = a * 2\nOUTPUT a, b\nEND\n\nExpected behaviour:\nAfter assignments: (a=4,b=unset), (4,7), (5,7), (5,10). Output: 5, 10.",
        "checklist": [
          "Assignment changes only the variable on its left.",
          "Use the latest values on the right-hand side.",
          "Distinguish the current state from displayed output."
        ],
        "diagram": true
      },
      {
        "id": "5-b",
        "title": "Apply the concept",
        "prompt": "Classify each action: read two marks, choose whether a mark passes, repeat input for ten learners.",
        "solution": "Reading the two marks in order is sequence. Choosing a result is selection. Processing ten learners uses repetition. A complete program can combine all three structures.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-6": {
    "teaching": [
      "Both the lower and upper bounds must hold.",
      "Use AND for the intersection of the two conditions.",
      "Check values at and just outside each endpoint."
    ],
    "worked": {
      "title": "Checking a valid range",
      "prompt": "Read a mark and display whether it is between 0 and 100 inclusive.",
      "code": "BEGIN\nINPUT mark\nIF mark >= 0 AND mark <= 100 THEN\nOUTPUT \"Valid\"\nELSE\nOUTPUT \"Invalid\"\nENDIF\nEND",
      "expected": "-1 invalid, 0 valid, 100 valid, 101 invalid."
    },
    "quizzes": [
      {
        "question": "When is A AND B true?",
        "options": [
          "Only when both are true",
          "When either is true",
          "When both are false"
        ],
        "correct": 0,
        "explanation": "Only when both are true. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What is NOT FALSE?",
        "options": [
          "FALSE",
          "Undefined",
          "TRUE"
        ],
        "correct": 2,
        "explanation": "TRUE. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which condition accepts 0 through 100?",
        "options": [
          "mark > 0 AND mark < 100",
          "mark >= 0 AND mark <= 100",
          "mark >= 0 OR mark <= 100"
        ],
        "correct": 1,
        "explanation": "mark >= 0 AND mark <= 100. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which values best test a pass boundary of 50?",
        "options": [
          "49, 50 and 51",
          "1, 2 and 3",
          "Only 100"
        ],
        "correct": 0,
        "explanation": "49, 50 and 51. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "6-a",
        "title": "Build or trace a solution",
        "prompt": "Read a mark and display whether it is between 0 and 100 inclusive. Work independently before comparing your answer.",
        "solution": "BEGIN\nINPUT mark\nIF mark >= 0 AND mark <= 100 THEN\nOUTPUT \"Valid\"\nELSE\nOUTPUT \"Invalid\"\nENDIF\nEND\n\nExpected behaviour:\n-1 invalid, 0 valid, 100 valid, 101 invalid.",
        "checklist": [
          "Both the lower and upper bounds must hold.",
          "Use AND for the intersection of the two conditions.",
          "Check values at and just outside each endpoint."
        ],
        "diagram": true
      },
      {
        "id": "6-b",
        "title": "Apply the concept",
        "prompt": "Write an invalid-range condition using OR, and another using NOT.",
        "solution": "Invalid: mark < 0 OR mark > 100. Equivalent: NOT (mark >= 0 AND mark <= 100). Parentheses make the negated range explicit.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-7": {
    "teaching": [
      "Test the highest band first.",
      "ELSEIF is considered only after the preceding condition is false.",
      "Check each exact threshold and the value immediately below."
    ],
    "worked": {
      "title": "Three result bands",
      "prompt": "Display Distinction for marks of at least 75, Pass for marks of at least 50, otherwise Revise.",
      "code": "BEGIN\nINPUT mark\nIF mark >= 75 THEN\nOUTPUT \"Distinction\"\nELSEIF mark >= 50 THEN\nOUTPUT \"Pass\"\nELSE\nOUTPUT \"Revise\"\nEND IF\nEND",
      "expected": "75 -> Distinction, 74 -> Pass, 50 -> Pass, 49 -> Revise."
    },
    "quizzes": [
      {
        "question": "Which logical operator has highest precedence here?",
        "options": [
          "OR",
          "AND",
          "NOT"
        ],
        "correct": 2,
        "explanation": "NOT. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "In nested IF, when is the inner branch considered?",
        "options": [
          "Only at program end",
          "Only after execution enters its outer branch",
          "Before every outer condition"
        ],
        "correct": 1,
        "explanation": "Only after execution enters its outer branch. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Why test a 75 distinction before a 50 pass band?",
        "options": [
          "The more specific higher band should be checked first",
          "It changes the input type",
          "It removes the need for ELSE"
        ],
        "correct": 0,
        "explanation": "The more specific higher band should be checked first. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What does CASE typically compare?",
        "options": [
          "Only two variables without values",
          "Every array position automatically",
          "One expression against listed values"
        ],
        "correct": 2,
        "explanation": "One expression against listed values. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "7-a",
        "title": "Build or trace a solution",
        "prompt": "Display Distinction for marks of at least 75, Pass for marks of at least 50, otherwise Revise. Work independently before comparing your answer.",
        "solution": "BEGIN\nINPUT mark\nIF mark >= 75 THEN\nOUTPUT \"Distinction\"\nELSEIF mark >= 50 THEN\nOUTPUT \"Pass\"\nELSE\nOUTPUT \"Revise\"\nEND IF\nEND\n\nExpected behaviour:\n75 -> Distinction, 74 -> Pass, 50 -> Pass, 49 -> Revise.",
        "checklist": [
          "Test the highest band first.",
          "ELSEIF is considered only after the preceding condition is false.",
          "Check each exact threshold and the value immediately below."
        ],
        "diagram": true
      },
      {
        "id": "7-b",
        "title": "Apply the concept",
        "prompt": "Rewrite the band selection using a nested IF inside ELSE.",
        "solution": "IF mark >= 75 THEN\n  OUTPUT \"Distinction\"\nELSE\n  IF mark >= 50 THEN\n    OUTPUT \"Pass\"\n  ELSE\n    OUTPUT \"Revise\"\n  ENDIF\nENDIF",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-8": {
    "teaching": [
      "Initialise the counter once before the loop.",
      "Increment by one only when the condition is true.",
      "Display passes after all four inputs."
    ],
    "worked": {
      "title": "Count qualifying marks",
      "prompt": "Read four marks and count how many are at least 50.",
      "code": "BEGIN\nSET passes = 0\nFOR i = 1 TO 4\nINPUT mark\nIF mark >= 50 THEN\nSET passes = passes + 1\nENDIF\nENDFOR\nOUTPUT passes\nEND",
      "expected": "Inputs 40, 50, 70, 20 give 2 passes."
    },
    "quizzes": [
      {
        "question": "What is a counter normally increased by when counting occurrences?",
        "options": [
          "0",
          "1",
          "The total input value"
        ],
        "correct": 1,
        "explanation": "1. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "When should a final grand total usually be displayed?",
        "options": [
          "After accumulation finishes",
          "Before initialisation",
          "Only inside the first iteration"
        ],
        "correct": 0,
        "explanation": "After accumulation finishes. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "How many iterations does FOR i=2 TO 6 STEP 2 have?",
        "options": [
          "2",
          "6",
          "3"
        ],
        "correct": 2,
        "explanation": "3. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "How many iterations does FOR i=5 TO 1 STEP -1 have?",
        "options": [
          "0",
          "5",
          "4"
        ],
        "correct": 1,
        "explanation": "5. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "8-a",
        "title": "Build or trace a solution",
        "prompt": "Read four marks and count how many are at least 50. Work independently before comparing your answer.",
        "solution": "BEGIN\nSET passes = 0\nFOR i = 1 TO 4\nINPUT mark\nIF mark >= 50 THEN\nSET passes = passes + 1\nENDIF\nENDFOR\nOUTPUT passes\nEND\n\nExpected behaviour:\nInputs 40, 50, 70, 20 give 2 passes.",
        "checklist": [
          "Initialise the counter once before the loop.",
          "Increment by one only when the condition is true.",
          "Display passes after all four inputs."
        ],
        "diagram": true
      },
      {
        "id": "8-b",
        "title": "Apply the concept",
        "prompt": "Calculate the average of four marks. Include initialisation and final output.",
        "solution": "BEGIN\nSET total = 0\nFOR i = 1 TO 4\nINPUT mark\nSET total = total + mark\nENDFOR\nSET average = total / 4\nOUTPUT average\nEND",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-9": {
    "teaching": [
      "Read the priming value before checking the condition.",
      "Exclude the sentinel from total and count.",
      "Guard division so count cannot be zero."
    ],
    "worked": {
      "title": "Sentinel average with no-data handling",
      "prompt": "Read values until -1. Display their average, or No data when the first input is -1.",
      "code": "BEGIN\nSET total = 0\nSET count = 0\nINPUT value\nWHILE value <> -1 DO\nSET total = total + value\nSET count = count + 1\nINPUT value\nENDWHILE\nIF count > 0 THEN\nOUTPUT total / count\nELSE\nOUTPUT \"No data\"\nENDIF\nEND",
      "expected": "10, 20, -1 gives 15. The input -1 alone gives No data."
    },
    "quizzes": [
      {
        "question": "Can a WHILE body run zero times?",
        "options": [
          "Yes",
          "No",
          "Only with strings"
        ],
        "correct": 0,
        "explanation": "Yes. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What should happen to a sentinel value?",
        "options": [
          "It must be added to every total",
          "It becomes the average",
          "It should normally be excluded from data totals"
        ],
        "correct": 2,
        "explanation": "It should normally be excluded from data totals. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "When does REPEAT/UNTIL stop?",
        "options": [
          "Before the first body execution",
          "When its condition is true",
          "While its condition is false before entry"
        ],
        "correct": 1,
        "explanation": "When its condition is true. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Why guard average calculation when count is zero?",
        "options": [
          "To avoid division by zero",
          "To change count into an array",
          "To force one more valid value"
        ],
        "correct": 0,
        "explanation": "To avoid division by zero. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "9-a",
        "title": "Build or trace a solution",
        "prompt": "Read values until -1. Display their average, or No data when the first input is -1. Work independently before comparing your answer.",
        "solution": "BEGIN\nSET total = 0\nSET count = 0\nINPUT value\nWHILE value <> -1 DO\nSET total = total + value\nSET count = count + 1\nINPUT value\nENDWHILE\nIF count > 0 THEN\nOUTPUT total / count\nELSE\nOUTPUT \"No data\"\nENDIF\nEND\n\nExpected behaviour:\n10, 20, -1 gives 15. The input -1 alone gives No data.",
        "checklist": [
          "Read the priming value before checking the condition.",
          "Exclude the sentinel from total and count.",
          "Guard division so count cannot be zero."
        ],
        "diagram": true
      },
      {
        "id": "9-b",
        "title": "Apply the concept",
        "prompt": "Validate a non-negative age with a post-test loop.",
        "solution": "REPEAT\n  INPUT age\nUNTIL age >= 0\nOUTPUT age\nThe loop runs at least once and continues while invalid input is supplied.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-10": {
    "teaching": [
      "Keep row and column counters separate.",
      "For each row, complete both column iterations.",
      "Multiply the number of iterations to check the six outputs."
    ],
    "worked": {
      "title": "A multiplication grid",
      "prompt": "Output the products for rows 1 to 3 and columns 1 to 2.",
      "code": "BEGIN\nFOR row = 1 TO 3\nFOR column = 1 TO 2\nSET product = row * column\nOUTPUT product\nENDFOR\nENDFOR\nEND",
      "expected": "Outputs in order: 1, 2, 2, 4, 3, 6."
    },
    "quizzes": [
      {
        "question": "A 4 by 3 nested traversal visits how many cells?",
        "options": [
          "7",
          "4",
          "12"
        ],
        "correct": 2,
        "explanation": "12. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Where does a per-row total reset?",
        "options": [
          "At every inner comparison after adding",
          "At the start of each outer iteration",
          "Only once after both loops"
        ],
        "correct": 1,
        "explanation": "At the start of each outer iteration. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Why use distinct nested-loop counters?",
        "options": [
          "So the inner loop does not overwrite the outer state",
          "To prevent all arithmetic",
          "Because counters must be text"
        ],
        "correct": 0,
        "explanation": "So the inner loop does not overwrite the outer state. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "The inner loop runs 5 times for each of 2 outer iterations. Body count?",
        "options": [
          "5",
          "2",
          "10"
        ],
        "correct": 2,
        "explanation": "10. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "10-a",
        "title": "Build or trace a solution",
        "prompt": "Output the products for rows 1 to 3 and columns 1 to 2. Work independently before comparing your answer.",
        "solution": "BEGIN\nFOR row = 1 TO 3\nFOR column = 1 TO 2\nSET product = row * column\nOUTPUT product\nENDFOR\nENDFOR\nEND\n\nExpected behaviour:\nOutputs in order: 1, 2, 2, 4, 3, 6.",
        "checklist": [
          "Keep row and column counters separate.",
          "For each row, complete both column iterations.",
          "Multiply the number of iterations to check the six outputs."
        ],
        "diagram": true
      },
      {
        "id": "10-b",
        "title": "Apply the concept",
        "prompt": "Where should a row total and a grand total be initialised?",
        "solution": "Initialise grandTotal once before both loops. Initialise rowTotal at the start of each outer-loop iteration. Add each cell to both totals inside the inner loop; output each row total after the inner loop and the grand total after the outer loop.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-11": {
    "teaching": [
      "The meaningful indices run from 0 to length - 1.",
      "Initialise total before visiting any element.",
      "Use each index exactly once."
    ],
    "worked": {
      "title": "A five-value total",
      "prompt": "Total an existing zero-based array containing five values.",
      "code": "BEGIN\nSET total = 0\nFOR i = 0 TO 4\nSET total = total + values[i]\nENDFOR\nOUTPUT total\nEND",
      "expected": "For [2,4,6,8,10], output 30. The last accessed index is 4."
    },
    "quizzes": [
      {
        "question": "What is the first index in this platform?",
        "options": [
          "-1",
          "0",
          "1"
        ],
        "correct": 1,
        "explanation": "0. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "For n values, which bound is correct?",
        "options": [
          "0 TO n - 1",
          "0 TO n",
          "1 TO n + 1"
        ],
        "correct": 0,
        "explanation": "0 TO n - 1. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What accesses row r, column c?",
        "options": [
          "values[r + c] always",
          "values[n]",
          "values[r][c]"
        ],
        "correct": 2,
        "explanation": "values[r][c]. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "How does capacity differ from meaningful count?",
        "options": [
          "Capacity is a variable name only",
          "Capacity can exceed the number of used values",
          "They must always be equal"
        ],
        "correct": 1,
        "explanation": "Capacity can exceed the number of used values. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "11-a",
        "title": "Build or trace a solution",
        "prompt": "Total an existing zero-based array containing five values. Work independently before comparing your answer.",
        "solution": "BEGIN\nSET total = 0\nFOR i = 0 TO 4\nSET total = total + values[i]\nENDFOR\nOUTPUT total\nEND\n\nExpected behaviour:\nFor [2,4,6,8,10], output 30. The last accessed index is 4.",
        "checklist": [
          "The meaningful indices run from 0 to length - 1.",
          "Initialise total before visiting any element.",
          "Use each index exactly once."
        ],
        "diagram": true
      },
      {
        "id": "11-b",
        "title": "Apply the concept",
        "prompt": "Write a traversal for a 2 by 3 zero-based array.",
        "solution": "FOR row = 0 TO 1\n  FOR column = 0 TO 2\n    OUTPUT values[row][column]\n  ENDFOR\nENDFOR\nThere are six element accesses.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-12": {
    "teaching": [
      "Use -1 for not found because 0 is a valid index.",
      "Check the bound before accessing values[i].",
      "Stop when foundAt changes from -1."
    ],
    "worked": {
      "title": "Find the first match",
      "prompt": "Find the first position of target in a four-value array, stopping after a match.",
      "code": "BEGIN\nSET foundAt = -1\nSET i = 0\nWHILE i < 4 AND foundAt = -1 DO\nIF values[i] = target THEN\nSET foundAt = i\nENDIF\nSET i = i + 1\nENDWHILE\nOUTPUT foundAt\nEND",
      "expected": "Array [7,3,7,2], target 7 -> 0. Target 9 -> -1."
    },
    "quizzes": [
      {
        "question": "Does linear search require sorted data?",
        "options": [
          "No",
          "Yes, always",
          "Only in ascending order"
        ],
        "correct": 0,
        "explanation": "No. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Worst-case linear search comparisons for n items?",
        "options": [
          "1 always",
          "0",
          "n"
        ],
        "correct": 2,
        "explanation": "n. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "How do you find every occurrence?",
        "options": [
          "Only compare index zero",
          "Continue through all valid positions",
          "Stop at the first match"
        ],
        "correct": 1,
        "explanation": "Continue through all valid positions. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What should happen before using foundAt as an index?",
        "options": [
          "Check that a match was found",
          "Replace it with zero",
          "Add one without checking"
        ],
        "correct": 0,
        "explanation": "Check that a match was found. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "12-a",
        "title": "Build or trace a solution",
        "prompt": "Find the first position of target in a four-value array, stopping after a match. Work independently before comparing your answer.",
        "solution": "BEGIN\nSET foundAt = -1\nSET i = 0\nWHILE i < 4 AND foundAt = -1 DO\nIF values[i] = target THEN\nSET foundAt = i\nENDIF\nSET i = i + 1\nENDWHILE\nOUTPUT foundAt\nEND\n\nExpected behaviour:\nArray [7,3,7,2], target 7 -> 0. Target 9 -> -1.",
        "checklist": [
          "Use -1 for not found because 0 is a valid index.",
          "Check the bound before accessing values[i].",
          "Stop when foundAt changes from -1."
        ],
        "diagram": true
      },
      {
        "id": "12-b",
        "title": "Apply the concept",
        "prompt": "How would you find every matching position rather than only the first?",
        "solution": "Traverse all valid indices. Whenever values[i] = target, output or record i. Do not stop after the first match. For [7,3,7,2] and target 7, the positions are 0 and 2.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-13": {
    "teaching": [
      "Use the name array to locate an index.",
      "Guard against the not-found result.",
      "Use the same index in scores."
    ],
    "worked": {
      "title": "Look up a parallel attribute",
      "prompt": "Search three learner names and output the matching mark.",
      "code": "BEGIN\nSET foundAt = -1\nFOR i = 0 TO 2\nIF names[i] = targetName THEN\nSET foundAt = i\nENDIF\nENDFOR\nIF foundAt <> -1 THEN\nOUTPUT scores[foundAt]\nELSE\nOUTPUT \"Not found\"\nENDIF\nEND",
      "expected": "names=[Lebo,Mpho,Ana], scores=[65,80,72], targetName=Mpho -> 80."
    },
    "quizzes": [
      {
        "question": "What links parallel arrays?",
        "options": [
          "Identical variable names",
          "The largest array value",
          "A shared record index"
        ],
        "correct": 2,
        "explanation": "A shared record index. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What must happen when a name is swapped?",
        "options": [
          "Nothing else may change",
          "Its related attributes must move too",
          "All marks must be cleared"
        ],
        "correct": 1,
        "explanation": "Its related attributes must move too. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which design can reduce parallel-array alignment errors?",
        "options": [
          "Objects or records holding related attributes",
          "More unrelated global variables",
          "Sorting just one array"
        ],
        "correct": 0,
        "explanation": "Objects or records holding related attributes. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "names[1] belongs with which score?",
        "options": [
          "scores[0] always",
          "The highest score",
          "scores[1]"
        ],
        "correct": 2,
        "explanation": "scores[1]. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "13-a",
        "title": "Build or trace a solution",
        "prompt": "Search three learner names and output the matching mark. Work independently before comparing your answer.",
        "solution": "BEGIN\nSET foundAt = -1\nFOR i = 0 TO 2\nIF names[i] = targetName THEN\nSET foundAt = i\nENDIF\nENDFOR\nIF foundAt <> -1 THEN\nOUTPUT scores[foundAt]\nELSE\nOUTPUT \"Not found\"\nENDIF\nEND\n\nExpected behaviour:\nnames=[Lebo,Mpho,Ana], scores=[65,80,72], targetName=Mpho -> 80.",
        "checklist": [
          "Use the name array to locate an index.",
          "Guard against the not-found result.",
          "Use the same index in scores."
        ],
        "diagram": true
      },
      {
        "id": "13-b",
        "title": "Apply the concept",
        "prompt": "Explain how to swap two parallel records at positions j and j+1.",
        "solution": "Swap names[j] with names[j+1] using a temporary name. Also swap scores[j] with scores[j+1] using a temporary score. Both swaps must happen together to preserve the name-mark relationship.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-14": {
    "teaching": [
      "Compare adjacent values in order.",
      "Swap only when the left value exceeds the right.",
      "The largest value reaches the last position after this full pass."
    ],
    "worked": {
      "title": "Bubble-sort one pass",
      "prompt": "Perform one left-to-right ascending pass through four existing values.",
      "code": "BEGIN\nFOR j = 0 TO 2\nIF values[j] > values[j + 1] THEN\nSET temp = values[j]\nSET values[j] = values[j + 1]\nSET values[j + 1] = temp\nENDIF\nENDFOR\nOUTPUT values\nEND",
      "expected": "[4,1,3,2] becomes [1,3,2,4] after one pass. It is not fully sorted yet."
    },
    "quizzes": [
      {
        "question": "After a full ascending left-to-right bubble pass, where is the largest value?",
        "options": [
          "Removed from the array",
          "At the end of the unsorted part",
          "Always at index zero"
        ],
        "correct": 1,
        "explanation": "At the end of the unsorted part. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Maximum basic passes for n values?",
        "options": [
          "n - 1",
          "n + 1",
          "1 for every input"
        ],
        "correct": 0,
        "explanation": "n - 1. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which adjacent comparison causes an ascending swap?",
        "options": [
          "values[j] < values[j + 1]",
          "values[j] = values[j + 1]",
          "values[j] > values[j + 1]"
        ],
        "correct": 2,
        "explanation": "values[j] > values[j + 1]. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What can a swapped flag improve?",
        "options": [
          "Increase array capacity",
          "Stop after a pass with no swaps",
          "Guarantee zero comparisons"
        ],
        "correct": 1,
        "explanation": "Stop after a pass with no swaps. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "14-a",
        "title": "Build or trace a solution",
        "prompt": "Perform one left-to-right ascending pass through four existing values. Work independently before comparing your answer.",
        "solution": "BEGIN\nFOR j = 0 TO 2\nIF values[j] > values[j + 1] THEN\nSET temp = values[j]\nSET values[j] = values[j + 1]\nSET values[j + 1] = temp\nENDIF\nENDFOR\nOUTPUT values\nEND\n\nExpected behaviour:\n[4,1,3,2] becomes [1,3,2,4] after one pass. It is not fully sorted yet.",
        "checklist": [
          "Compare adjacent values in order.",
          "Swap only when the left value exceeds the right.",
          "The largest value reaches the last position after this full pass."
        ],
        "diagram": true
      },
      {
        "id": "14-b",
        "title": "Apply the concept",
        "prompt": "Give a full bubble sort for a zero-based array with n values.",
        "solution": "FOR pass = 0 TO n - 2\n  FOR j = 0 TO n - 2 - pass\n    IF values[j] > values[j + 1] THEN\n      SET temp = values[j]\n      SET values[j] = values[j + 1]\n      SET values[j + 1] = temp\n    ENDIF\n  ENDFOR\nENDFOR",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-15": {
    "teaching": [
      "Identify two separate responsibilities.",
      "Define the modules with clear names.",
      "Draw the main module above the two called modules."
    ],
    "worked": {
      "title": "Decompose a greeting",
      "prompt": "Create separate modules for greeting and displaying a learning reminder.",
      "code": "MODULE greet()\nOUTPUT \"Welcome\"\nENDMODULE\nMODULE remind()\nOUTPUT \"Try an exercise\"\nENDMODULE\nBEGIN\nCALL greet()\nCALL remind()\nEND",
      "expected": "The main module calls greet and remind. Output: Welcome, then Try an exercise."
    },
    "quizzes": [
      {
        "question": "Which is good decomposition?",
        "options": [
          "Separate focused responsibilities",
          "Put every operation in one module",
          "Use one method for unrelated tasks"
        ],
        "correct": 0,
        "explanation": "Separate focused responsibilities. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What describes cohesion?",
        "options": [
          "How many fonts a page uses",
          "The total variable count only",
          "How closely a module’s tasks belong together"
        ],
        "correct": 2,
        "explanation": "How closely a module’s tasks belong together. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Does a hierarchy chart show every Boolean path?",
        "options": [
          "Only if methods return integers",
          "No, it shows module organisation",
          "Yes, that is its main purpose"
        ],
        "correct": 1,
        "explanation": "No, it shows module organisation. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What is coupling?",
        "options": [
          "Dependencies between modules",
          "The number of array elements",
          "The multiplication operator"
        ],
        "correct": 0,
        "explanation": "Dependencies between modules. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "15-a",
        "title": "Build or trace a solution",
        "prompt": "Create separate modules for greeting and displaying a learning reminder. Work independently before comparing your answer.",
        "solution": "MODULE greet()\nOUTPUT \"Welcome\"\nENDMODULE\nMODULE remind()\nOUTPUT \"Try an exercise\"\nENDMODULE\nBEGIN\nCALL greet()\nCALL remind()\nEND\n\nExpected behaviour:\nThe main module calls greet and remind. Output: Welcome, then Try an exercise.",
        "checklist": [
          "Identify two separate responsibilities.",
          "Define the modules with clear names.",
          "Draw the main module above the two called modules."
        ],
        "diagram": true
      },
      {
        "id": "15-b",
        "title": "Apply the concept",
        "prompt": "Draw a hierarchy where Main calls calculate and calculate calls validate. Describe what the links mean.",
        "solution": "Main -> calculate -> validate. The links mean that one module calls another. They do not show Boolean branches, variable values or every execution step. validate need not be a direct child of Main.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-16": {
    "teaching": [
      "Declare placeholders in the method header.",
      "Match the two actual arguments to their positions.",
      "Do not confuse the local parameter names with caller variables."
    ],
    "worked": {
      "title": "Pass two arguments",
      "prompt": "Write a method that displays a supplied learner name and mark.",
      "code": "METHOD displayResult(name, mark)\nOUTPUT name, mark\nENDMETHOD\nBEGIN\nCALL displayResult(\"Lebo\", 68)\nEND",
      "expected": "Parameters: name and mark. Arguments: \"Lebo\" and 68. Output: Lebo, 68."
    },
    "quizzes": [
      {
        "question": "What is a parameter?",
        "options": [
          "Only a literal at the call site",
          "The final program output",
          "A placeholder in a method definition"
        ],
        "correct": 2,
        "explanation": "A placeholder in a method definition. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What is local scope?",
        "options": [
          "The whole computer network",
          "The region where a local identifier is accessible",
          "An automatic global variable"
        ],
        "correct": 1,
        "explanation": "The region where a local identifier is accessible. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "For pass-by-value INTEGER x, local reassignment changes what?",
        "options": [
          "The local parameter copy",
          "The caller variable automatically",
          "Every integer in the program"
        ],
        "correct": 0,
        "explanation": "The local parameter copy. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What should match at a call?",
        "options": [
          "Only parameter spelling",
          "Only return-value colour",
          "Argument count, order and compatible types"
        ],
        "correct": 2,
        "explanation": "Argument count, order and compatible types. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "16-a",
        "title": "Build or trace a solution",
        "prompt": "Write a method that displays a supplied learner name and mark. Work independently before comparing your answer.",
        "solution": "METHOD displayResult(name, mark)\nOUTPUT name, mark\nENDMETHOD\nBEGIN\nCALL displayResult(\"Lebo\", 68)\nEND\n\nExpected behaviour:\nParameters: name and mark. Arguments: \"Lebo\" and 68. Output: Lebo, 68.",
        "checklist": [
          "Declare placeholders in the method header.",
          "Match the two actual arguments to their positions.",
          "Do not confuse the local parameter names with caller variables."
        ],
        "diagram": true
      },
      {
        "id": "16-b",
        "title": "Apply the concept",
        "prompt": "Explain what happens with pass-by-value when a method reassigns an INTEGER parameter.",
        "solution": "The parameter receives a copy of the integer value. Reassigning that local parameter does not reassign the caller’s original variable. Returning a result or an explicitly different passing mode is needed to communicate the new value.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-17": {
    "teaching": [
      "State the return type and parameters.",
      "Make every possible branch return a value.",
      "The caller stores the returned value before displaying it."
    ],
    "worked": {
      "title": "Return the larger value",
      "prompt": "Write a method returning the larger of two values. Include an early return in each branch.",
      "code": "METHOD larger(a, b) RETURNS REAL\nIF a >= b THEN\nRETURN a\nELSE\nRETURN b\nENDIF\nENDMETHOD\nBEGIN\nSET result = larger(8, 5)\nOUTPUT result\nEND",
      "expected": "larger(8,5) -> 8; larger(3,9) -> 9; larger(4,4) -> 4."
    },
    "quizzes": [
      {
        "question": "Does OUTPUT necessarily return a usable function value?",
        "options": [
          "Only for positive numbers",
          "No",
          "Yes, always"
        ],
        "correct": 1,
        "explanation": "No. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What does RETURN do to its method invocation?",
        "options": [
          "Supplies a result and exits that invocation",
          "Always restarts it",
          "Displays every local variable"
        ],
        "correct": 0,
        "explanation": "Supplies a result and exits that invocation. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "A function promises a result. Which paths need one?",
        "options": [
          "Only the first branch",
          "Only the ELSE branch",
          "Every normal finishing path"
        ],
        "correct": 2,
        "explanation": "Every normal finishing path. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Where can a returned result be used?",
        "options": [
          "Only in a flowchart title",
          "In an assignment or expression",
          "Only in a comment"
        ],
        "correct": 1,
        "explanation": "In an assignment or expression. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "17-a",
        "title": "Build or trace a solution",
        "prompt": "Write a method returning the larger of two values. Include an early return in each branch. Work independently before comparing your answer.",
        "solution": "METHOD larger(a, b) RETURNS REAL\nIF a >= b THEN\nRETURN a\nELSE\nRETURN b\nENDIF\nENDMETHOD\nBEGIN\nSET result = larger(8, 5)\nOUTPUT result\nEND\n\nExpected behaviour:\nlarger(8,5) -> 8; larger(3,9) -> 9; larger(4,4) -> 4.",
        "checklist": [
          "State the return type and parameters.",
          "Make every possible branch return a value.",
          "The caller stores the returned value before displaying it."
        ],
        "diagram": true
      },
      {
        "id": "17-b",
        "title": "Apply the concept",
        "prompt": "Write a method that returns whether a number is even.",
        "solution": "METHOD isEven(number) RETURNS BOOLEAN\n  RETURN number MOD 2 = 0\nENDMETHOD\nTests: 4 -> TRUE; 5 -> FALSE; 0 -> TRUE. RETURN communicates the Boolean result; OUTPUT alone would only display it.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-18": {
    "teaching": [
      "Use count rather than assuming capacity equals meaningful data.",
      "Visit 0 through count - 1.",
      "Return the accumulated total to the caller."
    ],
    "worked": {
      "title": "Array total as a method",
      "prompt": "Pass an array and meaningful count to a method that returns their total.",
      "code": "METHOD totalValues(values, count) RETURNS REAL\nSET total = 0\nFOR i = 0 TO count - 1\nSET total = total + values[i]\nENDFOR\nRETURN total\nENDMETHOD\nBEGIN\nSET result = totalValues(marks, 3)\nOUTPUT result\nEND",
      "expected": "For marks=[10,20,30,999], count=3, output 60. The spare capacity is ignored."
    },
    "quizzes": [
      {
        "question": "Which count bound should an array method require?",
        "options": [
          "0 <= count <= capacity",
          "count > capacity",
          "count must be -1"
        ],
        "correct": 0,
        "explanation": "0 <= count <= capacity. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Should array mutation assumptions be documented?",
        "options": [
          "No",
          "Only for sorted arrays",
          "Yes"
        ],
        "correct": 2,
        "explanation": "Yes. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "When a C# array reference is passed by value, can elements be updated?",
        "options": [
          "Only if the array is empty",
          "Yes, the reference copy can refer to the same array",
          "No, all elements are copied automatically"
        ],
        "correct": 1,
        "explanation": "Yes, the reference copy can refer to the same array. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "For count=3, which indices are processed?",
        "options": [
          "0, 1, 2",
          "1, 2, 3, 4",
          "0, 1, 2, 3"
        ],
        "correct": 0,
        "explanation": "0, 1, 2. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "18-a",
        "title": "Build or trace a solution",
        "prompt": "Pass an array and meaningful count to a method that returns their total. Work independently before comparing your answer.",
        "solution": "METHOD totalValues(values, count) RETURNS REAL\nSET total = 0\nFOR i = 0 TO count - 1\nSET total = total + values[i]\nENDFOR\nRETURN total\nENDMETHOD\nBEGIN\nSET result = totalValues(marks, 3)\nOUTPUT result\nEND\n\nExpected behaviour:\nFor marks=[10,20,30,999], count=3, output 60. The spare capacity is ignored.",
        "checklist": [
          "Use count rather than assuming capacity equals meaningful data.",
          "Visit 0 through count - 1.",
          "Return the accumulated total to the caller."
        ],
        "diagram": true
      },
      {
        "id": "18-b",
        "title": "Apply the concept",
        "prompt": "What preconditions should an array-processing method document?",
        "solution": "Document the element type, zero-based indexing convention, meaningful count, capacity, whether count may be zero and whether the method changes the caller’s elements. Require 0 <= count <= capacity and test those boundaries.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-19": {
    "teaching": [
      "Compare parameter types, not parameter names.",
      "Match each actual argument to the compatible signature.",
      "Return type alone cannot distinguish an overload."
    ],
    "worked": {
      "title": "Choose an overload",
      "prompt": "Compare two signatures and identify the selected overload for two calls.",
      "code": "// METHOD display(INTEGER value)\n// METHOD display(STRING value)\n// CALL display(42) uses INTEGER.\n// CALL display(\"42\") uses STRING.",
      "expected": "42 is numeric; \"42\" is text. The parameter type distinguishes the signatures."
    },
    "quizzes": [
      {
        "question": "Do parameter names alone distinguish overloads?",
        "options": [
          "Yes",
          "Only when uppercase",
          "No"
        ],
        "correct": 2,
        "explanation": "No. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Can return type alone distinguish a C# overload?",
        "options": [
          "Only when REAL",
          "No",
          "Yes"
        ],
        "correct": 1,
        "explanation": "No. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which pair is distinct?",
        "options": [
          "sum(a,b) and sum(a,b,c)",
          "sum(INTEGER a) and sum(INTEGER b)",
          "Two methods with identical parameter types"
        ],
        "correct": 0,
        "explanation": "sum(a,b) and sum(a,b,c). Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What should overloaded operations usually share?",
        "options": [
          "Completely unrelated behaviour",
          "No understandable purpose",
          "A closely related responsibility"
        ],
        "correct": 2,
        "explanation": "A closely related responsibility. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "19-a",
        "title": "Build or trace a solution",
        "prompt": "Compare two signatures and identify the selected overload for two calls. Work independently before comparing your answer.",
        "solution": "// METHOD display(INTEGER value)\n// METHOD display(STRING value)\n// CALL display(42) uses INTEGER.\n// CALL display(\"42\") uses STRING.\n\nExpected behaviour:\n42 is numeric; \"42\" is text. The parameter type distinguishes the signatures.",
        "checklist": [
          "Compare parameter types, not parameter names.",
          "Match each actual argument to the compatible signature.",
          "Return type alone cannot distinguish an overload."
        ],
        "diagram": false
      },
      {
        "id": "19-b",
        "title": "Apply the concept",
        "prompt": "Design two valid overloads for a total method using different parameter counts.",
        "solution": "total(REAL first, REAL second) and total(REAL first, REAL second, REAL third) are distinct signatures. total(REAL a, REAL b) and total(REAL x, REAL y) are not distinct merely because parameter names differ.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-20": {
    "teaching": [
      "Separate the type definition from its instances.",
      "Give each instance its own state.",
      "Use methods to express actions that belong to a book."
    ],
    "worked": {
      "title": "Two independent objects",
      "prompt": "Model two Book objects created from the same class. Describe their independent state.",
      "code": "// CLASS Book\n// - title : STRING\n// - borrowed : BOOLEAN\n// + borrow()\n// + returnBook()\n// bookA: title=\"Algorithms\", borrowed=TRUE\n// bookB: title=\"Databases\", borrowed=FALSE",
      "expected": "Both objects share the Book definition but hold different attribute values."
    },
    "quizzes": [
      {
        "question": "What does a constructor normally establish?",
        "options": [
          "The user’s browser type",
          "An initial valid object state",
          "Every object’s final report"
        ],
        "correct": 1,
        "explanation": "An initial valid object state. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Can two objects share equal values yet be distinct?",
        "options": [
          "Yes",
          "No",
          "Only if they are different classes"
        ],
        "correct": 0,
        "explanation": "Yes. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What describes an attribute?",
        "options": [
          "Only an external file",
          "A loop terminator",
          "Object state"
        ],
        "correct": 2,
        "explanation": "Object state. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What describes a method?",
        "options": [
          "A number type",
          "Behaviour associated with a class or module",
          "Only the object’s colour"
        ],
        "correct": 1,
        "explanation": "Behaviour associated with a class or module. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "20-a",
        "title": "Build or trace a solution",
        "prompt": "Model two Book objects created from the same class. Describe their independent state. Work independently before comparing your answer.",
        "solution": "// CLASS Book\n// - title : STRING\n// - borrowed : BOOLEAN\n// + borrow()\n// + returnBook()\n// bookA: title=\"Algorithms\", borrowed=TRUE\n// bookB: title=\"Databases\", borrowed=FALSE\n\nExpected behaviour:\nBoth objects share the Book definition but hold different attribute values.",
        "checklist": [
          "Separate the type definition from its instances.",
          "Give each instance its own state.",
          "Use methods to express actions that belong to a book."
        ],
        "diagram": false
      },
      {
        "id": "20-b",
        "title": "Apply the concept",
        "prompt": "Describe a constructor for Book that requires a title and starts with borrowed = FALSE.",
        "solution": "Book(newTitle) stores newTitle in title and initialises borrowed to FALSE. Validate that the title is not empty. Two constructor calls create two distinct instances even if their titles are equal.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-21": {
    "teaching": [
      "Ask whether the specialised type fulfils the general contract.",
      "Use has-a for a class containing or referring to other objects.",
      "Keep private state protected by appropriate operations."
    ],
    "worked": {
      "title": "An is-a versus has-a design",
      "prompt": "Compare inheritance and containment in a school model.",
      "code": "// Person is a general type.\n// Learner is a Person.\n// Course has Learners.\n// A Course is not a Learner.",
      "expected": "Use inheritance for the justified Learner-Person is-a relationship and association for Course-Learner."
    },
    "quizzes": [
      {
        "question": "What is encapsulation intended to protect?",
        "options": [
          "Valid state through controlled access",
          "Only variable spelling",
          "Every class from having methods"
        ],
        "correct": 0,
        "explanation": "Valid state through controlled access. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which phrase indicates inheritance?",
        "options": [
          "Has-a in every case",
          "Prints-a",
          "Is-a"
        ],
        "correct": 2,
        "explanation": "Is-a. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What is overriding?",
        "options": [
          "Creating an unrelated class variable",
          "Specialising an inherited operation with the same contract",
          "Changing only a parameter name"
        ],
        "correct": 1,
        "explanation": "Specialising an inherited operation with the same contract. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What enables runtime polymorphic behaviour?",
        "options": [
          "A common abstraction with specialised implementations",
          "Sorting the object names",
          "Making every attribute public"
        ],
        "correct": 0,
        "explanation": "A common abstraction with specialised implementations. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "21-a",
        "title": "Build or trace a solution",
        "prompt": "Compare inheritance and containment in a school model. Work independently before comparing your answer.",
        "solution": "// Person is a general type.\n// Learner is a Person.\n// Course has Learners.\n// A Course is not a Learner.\n\nExpected behaviour:\nUse inheritance for the justified Learner-Person is-a relationship and association for Course-Learner.",
        "checklist": [
          "Ask whether the specialised type fulfils the general contract.",
          "Use has-a for a class containing or referring to other objects.",
          "Keep private state protected by appropriate operations."
        ],
        "diagram": false
      },
      {
        "id": "21-b",
        "title": "Apply the concept",
        "prompt": "Explain polymorphism with Shape, Circle and Rectangle without confusing it with overloading.",
        "solution": "A Shape reference can refer to a Circle or Rectangle. Each overrides area() with its own implementation. The call uses the same operation signature; runtime object type determines the behaviour. Overloading instead distinguishes different parameter signatures.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  },
  "lesson-22": {
    "teaching": [
      "Read the class name, attributes and operations separately.",
      "Interpret visibility and return types.",
      "Explain the association and its multiplicity without claiming an execution order."
    ],
    "worked": {
      "title": "Read a class diagram",
      "prompt": "Describe a Library associated with zero or more Books and its public borrow operation.",
      "code": "// Library\n// - name : STRING\n// + borrow(book : Book) : BOOLEAN\n// Book\n// - title : STRING\n// Association: Library 1 -- 0..* Book",
      "expected": "The library has a private name; borrow is public and returns a Boolean. Multiplicity 0..* permits no books or many."
    },
    "quizzes": [
      {
        "question": "What does + indicate in a basic UML class diagram?",
        "options": [
          "Private visibility",
          "An addition instruction to execute",
          "Public visibility"
        ],
        "correct": 2,
        "explanation": "Public visibility. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "What does 0..* indicate?",
        "options": [
          "A negative array index",
          "Zero or more related objects",
          "Exactly one object"
        ],
        "correct": 1,
        "explanation": "Zero or more related objects. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Where does an inheritance triangle point?",
        "options": [
          "The general superclass",
          "The specialised subclass",
          "Both directions simultaneously"
        ],
        "correct": 0,
        "explanation": "The general superclass. Review the related theory and work through a small example to check the rule."
      },
      {
        "question": "Which diagram fits a class’s attributes and operations?",
        "options": [
          "A procedural call hierarchy only",
          "A loop trace table only",
          "Class diagram"
        ],
        "correct": 2,
        "explanation": "Class diagram. Review the related theory and work through a small example to check the rule."
      }
    ],
    "tasks": [
      {
        "id": "22-a",
        "title": "Build or trace a solution",
        "prompt": "Describe a Library associated with zero or more Books and its public borrow operation. Work independently before comparing your answer.",
        "solution": "// Library\n// - name : STRING\n// + borrow(book : Book) : BOOLEAN\n// Book\n// - title : STRING\n// Association: Library 1 -- 0..* Book\n\nExpected behaviour:\nThe library has a private name; borrow is public and returns a Boolean. Multiplicity 0..* permits no books or many.",
        "checklist": [
          "Read the class name, attributes and operations separately.",
          "Interpret visibility and return types.",
          "Explain the association and its multiplicity without claiming an execution order."
        ],
        "diagram": false
      },
      {
        "id": "22-b",
        "title": "Apply the concept",
        "prompt": "Describe the direction of the inheritance triangle between SavingsAccount and Account.",
        "solution": "Draw a solid line from SavingsAccount to Account with a hollow triangle pointing at Account, the general type. A procedural hierarchy chart is a different diagram and should not be substituted for a class diagram.",
        "checklist": [
          "Check that your answer addresses every part of the question.",
          "State assumptions and relevant boundary cases.",
          "Equivalent correct solutions may use different names or structure."
        ],
        "diagram": false
      }
    ]
  }
};
