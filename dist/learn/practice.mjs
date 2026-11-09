export const practice = {
  "lesson-1": {
    "teaching": [
      "weight = 3 and rate = 12.",
      "charge = 3 * 12 = 36. The displayed answer is 36.",
      "For weight = 0, charge = 0."
    ],
    "worked": {
      "title": "A delivery quotation",
      "prompt": "A delivery charge is weight * rate. Write a complete program. Assume valid non-negative inputs. Test weight = 3 and rate = 12.",
      "code": "BEGIN\n  DECLARE weight AS REAL\n  DECLARE rate AS REAL\n  DECLARE charge AS REAL\n  INPUT weight\n  INPUT rate\n  SET charge = weight * rate\n  OUTPUT charge\nEND",
      "expected": "weight = 3 and rate = 12. charge = 3 * 12 = 36. The displayed answer is 36. For weight = 0, charge = 0."
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
      "14 < 15 is TRUE, so display Cold.",
      "15 < 15 is FALSE, so display Mild or warm.",
      "Flowchart: input parallelogram, decision diamond, two output branches and a shared end."
    ],
    "worked": {
      "title": "A temperature decision",
      "prompt": "Read a temperature. Display Cold below 15, otherwise Mild or warm. Give outputs for 14 and 15. Sketch a flowchart with labelled branches.",
      "code": "BEGIN\n  DECLARE temperature AS REAL\n  INPUT temperature\n  IF temperature < 15 THEN\n    OUTPUT \"Cold\"\n  ELSE\n    OUTPUT \"Mild or warm\"\n  ENDIF\nEND",
      "expected": "14 < 15 is TRUE, so display Cold. 15 < 15 is FALSE, so display Mild or warm. Flowchart: input parallelogram, decision diamond, two output branches and a shared end."
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
      "Before the loop, product = 1.",
      "After inputs 2, 3 and 4, product becomes 2, then 6, then 24.",
      "Output: 24. Initialising to 0 would incorrectly keep every product at 0."
    ],
    "worked": {
      "title": "A running product",
      "prompt": "Read three REAL numbers using a FOR loop. Return their product as program output. Test inputs 2, 3 and 4. Choose types and initialise correctly.",
      "code": "BEGIN\n  DECLARE value AS REAL\n  DECLARE product AS REAL\n  DECLARE i AS INTEGER\n  SET product = 1\n  FOR i = 1 TO 3\n    INPUT value\n    SET product = product * value\n  ENDFOR\n  OUTPUT product\nEND",
      "expected": "Before the loop, product = 1. After inputs 2, 3 and 4, product becomes 2, then 6, then 24. Output: 24. Initialising to 0 would incorrectly keep every product at 0."
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
      "subtotal = 20 * 3 = 60.",
      "Discount factor = 1 - 0.10 = 0.90.",
      "due = 60 * 0.90 = 54. Output: 54."
    ],
    "worked": {
      "title": "A discounted purchase",
      "prompt": "Read price and quantity, compute a subtotal and apply a 10% discount. Display the amount due. Test price = 20 and quantity = 3.",
      "code": "BEGIN\n  DECLARE price AS REAL\n  DECLARE quantity AS INTEGER\n  DECLARE subtotal AS REAL\n  DECLARE due AS REAL\n  INPUT price\n  INPUT quantity\n  SET subtotal = price * quantity\n  SET due = subtotal * (1 - 0.10)\n  OUTPUT due\nEND",
      "expected": "subtotal = 20 * 3 = 60. Discount factor = 1 - 0.10 = 0.90. due = 60 * 0.90 = 54. Output: 54."
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
      "State after each assignment: (a,b) = (4,unset), (4,7), (5,7), (5,10).",
      "The last expression uses the updated a = 5.",
      "Final output: 5, 10."
    ],
    "worked": {
      "title": "Tracing two variables",
      "prompt": "Trace two variables. Set a to 4, b to a + 3, a to b - 2 and b to a * 2. Write a complete program and give both final values.",
      "code": "BEGIN\n  DECLARE a AS INTEGER\n  DECLARE b AS INTEGER\n  SET a = 4\n  SET b = a + 3\n  SET a = b - 2\n  SET b = a * 2\n  OUTPUT a, b\nEND",
      "expected": "State after each assignment: (a,b) = (4,unset), (4,7), (5,7), (5,10). The last expression uses the updated a = 5. Final output: 5, 10."
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
      "Member with total 500: TRUE AND TRUE, so due = 500 * 0.9 = 450.",
      "Non-member with total 500: FALSE AND TRUE, so due = 500.",
      "Set due in both branches before displaying it."
    ],
    "worked": {
      "title": "A membership discount",
      "prompt": "Read a non-negative total and a Boolean membership flag. Members spending at least 500 receive 10% off. Display due for a member spending 500 and a non-member spending 500.",
      "code": "BEGIN\n  DECLARE total AS REAL\n  DECLARE due AS REAL\n  DECLARE isMember AS BOOLEAN\n  INPUT total\n  INPUT isMember\n  IF isMember AND total >= 500 THEN\n    SET due = total * 0.9\n  ELSE\n    SET due = total\n  ENDIF\n  OUTPUT due\nEND",
      "expected": "Member with total 500: TRUE AND TRUE, so due = 500 * 0.9 = 450. Non-member with total 500: FALSE AND TRUE, so due = 500. Set due in both branches before displaying it."
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
      "Age 15 gives Too young. The inner decision is skipped.",
      "Age 16 with FALSE gives Approval required.",
      "Age 16 with TRUE gives Eligible. Each IF has its own ENDIF."
    ],
    "worked": {
      "title": "Nested eligibility checks",
      "prompt": "Use nested IF statements. A fictional activity requires age at least 16 and approval. Display Too young, Approval required or Eligible. Assume valid age and a Boolean approval flag.",
      "code": "BEGIN\n  DECLARE age AS INTEGER\n  DECLARE approved AS BOOLEAN\n  INPUT age\n  INPUT approved\n  IF age >= 16 THEN\n    IF approved THEN\n      OUTPUT \"Eligible\"\n    ELSE\n      OUTPUT \"Approval required\"\n    ENDIF\n  ELSE\n    OUTPUT \"Too young\"\n  ENDIF\nEND",
      "expected": "Age 15 gives Too young. The inner decision is skipped. Age 16 with FALSE gives Approval required. Age 16 with TRUE gives Eligible. Each IF has its own ENDIF."
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
      "Start passed = 0. Mark 50 increments it to 1.",
      "Mark 49 leaves it at 1. Mark 100 increments it to 2.",
      "Output: 2. Do not reset passed inside the loop."
    ],
    "worked": {
      "title": "Counting passing marks",
      "prompt": "Read n positive-count student marks and count marks at least 50. Use FOR. Assume n > 0 and valid marks. Test n = 3 with marks 50, 49, 100.",
      "code": "BEGIN\n  DECLARE n AS INTEGER\n  DECLARE i AS INTEGER\n  DECLARE mark AS REAL\n  DECLARE passed AS INTEGER\n  INPUT n\n  SET passed = 0\n  FOR i = 1 TO n\n    INPUT mark\n    IF mark >= 50 THEN\n      SET passed = passed + 1\n    ENDIF\n  ENDFOR\n  OUTPUT passed\nEND",
      "expected": "Start passed = 0. Mark 50 increments it to 1. Mark 49 leaves it at 1. Mark 100 increments it to 2. Output: 2. Do not reset passed inside the loop."
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
      "101 is above 100, so the loop requests another value.",
      "-5 is below 0, so the loop requests another value.",
      "70 is valid, so the loop ends. Full output: two validation messages followed by 70. The input changes on every retry."
    ],
    "worked": {
      "title": "Validating a mark",
      "prompt": "Read a mark repeatedly until it is between 0 and 100 inclusive. Display the accepted mark. Test input sequence 101, -5, 70.",
      "code": "BEGIN\n  DECLARE mark AS REAL\n  INPUT mark\n  WHILE mark < 0 OR mark > 100 DO\n    OUTPUT \"Enter a mark from 0 to 100\"\n    INPUT mark\n  ENDWHILE\n  OUTPUT mark\nEND",
      "expected": "101 is above 100, so the loop requests another value. -5 is below 0, so the loop requests another value. 70 is valid, so the loop ends. Full output: two validation messages followed by 70. The input changes on every retry."
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
      "At row 0, reset rowTotal to 0, then add 2 and 4. Output: 6.",
      "At row 1, reset it again, then add 6 and 8. Output: 14.",
      "Resetting outside the outer loop would wrongly produce a cumulative second total of 20."
    ],
    "worked": {
      "title": "Two dimensional row totals",
      "prompt": "Input a 2 by 2 matrix using nested loops. Display the total of each row. Test rows [2,4] and [6,8].",
      "code": "BEGIN\n  DECLARE matrix[2][2] AS INTEGER\n  DECLARE row AS INTEGER\n  DECLARE col AS INTEGER\n  DECLARE rowTotal AS INTEGER\n  FOR row = 0 TO 1\n    SET rowTotal = 0\n    FOR col = 0 TO 1\n      INPUT matrix[row][col]\n      SET rowTotal = rowTotal + matrix[row][col]\n    ENDFOR\n    OUTPUT rowTotal\n  ENDFOR\nEND",
      "expected": "At row 0, reset rowTotal to 0, then add 2 and 4. Output: 6. At row 1, reset it again, then add 6 and 8. Output: 14. Resetting outside the outer loop would wrongly produce a cumulative second total of 20."
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
      "Initial maximum = -8. Comparing -3 replaces it with -3.",
      "Neither -12 nor -5 is greater than -3.",
      "Output: -3. Initialising maximum to 0 would give a wrong answer."
    ],
    "worked": {
      "title": "Finding a maximum",
      "prompt": "Find the maximum in [-8,-3,-12,-5]. Use one array and a loop. The solution must handle all-negative values.",
      "code": "BEGIN\n  DECLARE values[4] AS INTEGER\n  DECLARE maximum AS INTEGER\n  DECLARE i AS INTEGER\n  SET values[0] = -8\n  SET values[1] = -3\n  SET values[2] = -12\n  SET values[3] = -5\n  SET maximum = values[0]\n  FOR i = 1 TO 3\n    IF values[i] > maximum THEN\n      SET maximum = values[i]\n    ENDIF\n  ENDFOR\n  OUTPUT maximum\nEND",
      "expected": "Initial maximum = -8. Comparing -3 replaces it with -3. Neither -12 nor -5 is greater than -3. Output: -3. Initialising maximum to 0 would give a wrong answer."
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
      "Comparisons at indices 0, 1, 2 and 3 all fail. foundAt remains -1.",
      "i becomes 4, so i < 4 is FALSE. No out-of-bounds element is read.",
      "Output: Not found. The program checks foundAt before using it as an index."
    ],
    "worked": {
      "title": "An unsuccessful search",
      "prompt": "Use the same four values to search for target 9. Write the full program and show the result when no match exists.",
      "code": "BEGIN\n  DECLARE values[4] AS INTEGER\n  DECLARE target AS INTEGER\n  DECLARE foundAt AS INTEGER\n  DECLARE i AS INTEGER\n  SET values[0] = 7\n  SET values[1] = 3\n  SET values[2] = 7\n  SET values[3] = 2\n  SET target = 9\n  SET foundAt = -1\n  SET i = 0\n  WHILE i < 4 AND foundAt = -1 DO\n    IF values[i] = target THEN\n      SET foundAt = i\n    ENDIF\n    SET i = i + 1\n  ENDWHILE\n  IF foundAt <> -1 THEN\n    OUTPUT foundAt\n  ELSE\n    OUTPUT \"Not found\"\n  ENDIF\nEND",
      "expected": "Comparisons at indices 0, 1, 2 and 3 all fail. foundAt remains -1. i becomes 4, so i < 4 is FALSE. No out-of-bounds element is read. Output: Not found. The program checks foundAt before using it as an index."
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
      "Initial best = 0 with mark 64. At index 1, 81 > 64 sets best = 1.",
      "At index 2, 72 > 81 is FALSE, so best stays 1.",
      "Output: Naledi, 81. Strict > preserves the first occurrence on a tie."
    ],
    "worked": {
      "title": "The highest scoring learner",
      "prompt": "Using those parallel arrays, find and display the student with the highest mark. Keep the first student on a tie.",
      "code": "BEGIN\n  DECLARE names[3] AS STRING\n  DECLARE marks[3] AS REAL\n  DECLARE best AS INTEGER\n  DECLARE i AS INTEGER\n  SET names[0] = \"Lebo\"\n  SET names[1] = \"Naledi\"\n  SET names[2] = \"Thabo\"\n  SET marks[0] = 64\n  SET marks[1] = 81\n  SET marks[2] = 72\n  SET best = 0\n  FOR i = 1 TO 2\n    IF marks[i] > marks[best] THEN\n      SET best = i\n    ENDIF\n  ENDFOR\n  OUTPUT names[best], marks[best]\nEND",
      "expected": "Initial best = 0 with mark 64. At index 1, 81 > 64 sets best = 1. At index 2, 72 > 81 is FALSE, so best stays 1. Output: Naledi, 81. Strict > preserves the first occurrence on a tie."
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
      "Compare 4 and 1: [1,4,3,2]. Then compare 4 and 3: [1,3,4,2].",
      "Compare 4 and 2: [1,3,2,4]. Output: [1,3,2,4].",
      "4 is in its final position, but 3 and 2 remain out of order."
    ],
    "worked": {
      "title": "One bubble sort pass",
      "prompt": "Perform exactly one left-to-right bubble-sort pass through [4,1,3,2]. Display the resulting array and explain why it may still need more passes.",
      "code": "BEGIN\n  DECLARE values[4] AS INTEGER\n  DECLARE j AS INTEGER\n  DECLARE temp AS INTEGER\n  SET values[0] = 4\n  SET values[1] = 1\n  SET values[2] = 3\n  SET values[3] = 2\n  FOR j = 0 TO 2\n    IF values[j] > values[j + 1] THEN\n      SET temp = values[j]\n      SET values[j] = values[j + 1]\n      SET values[j + 1] = temp\n    ENDIF\n  ENDFOR\n  OUTPUT values[0], values[1], values[2], values[3]\nEND",
      "expected": "Compare 4 and 1: [1,4,3,2]. Then compare 4 and 3: [1,3,4,2]. Compare 4 and 2: [1,3,2,4]. Output: [1,3,2,4]. 4 is in its final position, but 3 and 2 remain out of order."
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
      "Area receives length 6 and width 4. It returns 24.",
      "Main stores 24 in result and passes it to ShowArea.",
      "Output: Area, 24. Each method has one clear responsibility."
    ],
    "worked": {
      "title": "Two focused methods",
      "prompt": "Write Area(length,width) returning rectangle area and ShowArea(area) displaying it. The main program must call both. Test dimensions 6 and 4.",
      "code": "METHOD Area(length AS REAL, width AS REAL) RETURNS REAL\n  RETURN length * width\nENDMETHOD\nMETHOD ShowArea(area AS REAL)\n  OUTPUT \"Area\", area\nENDMETHOD\nBEGIN\n  DECLARE result AS REAL\n  SET result = Area(6, 4)\n  CALL ShowArea(result)\nEND",
      "expected": "Area receives length 6 and width 4. It returns 24. Main stores 24 in result and passes it to ShowArea. Output: Area, 24. Each method has one clear responsibility."
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
      "Bump receives a copy of counter. Its number becomes 6, so the first output is 6.",
      "Changing the local copy does not change the caller variable under this convention.",
      "Back in Main, counter is still 5. Final outputs in order: 6, 5."
    ],
    "worked": {
      "title": "A local parameter copy",
      "prompt": "Assume scalar parameters are passed by value. Write Bump(number) that adds 1 and displays its local parameter. Main passes counter = 5, then displays counter. Explain both outputs.",
      "code": "METHOD Bump(number AS INTEGER)\n  SET number = number + 1\n  OUTPUT number\nENDMETHOD\nBEGIN\n  DECLARE counter AS INTEGER\n  SET counter = 5\n  CALL Bump(counter)\n  OUTPUT counter\nEND",
      "expected": "Bump receives a copy of counter. Its number becomes 6, so the first output is 6. Changing the local copy does not change the caller variable under this convention. Back in Main, counter is still 5. Final outputs in order: 6, 5."
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
      "48 >= 50 evaluates to FALSE and is returned to the caller.",
      "The IF uses that returned Boolean and selects ELSE. Output: Revise.",
      "At mark 50, HasPassed returns TRUE and output becomes Pass."
    ],
    "worked": {
      "title": "A Boolean return value",
      "prompt": "Write HasPassed(mark) returning a BOOLEAN. Use the returned value in an IF to display Pass or Revise. Test a valid mark of 48.",
      "code": "METHOD HasPassed(mark AS REAL) RETURNS BOOLEAN\n  RETURN mark >= 50\nENDMETHOD\nBEGIN\n  IF HasPassed(48) THEN\n    OUTPUT \"Pass\"\n  ELSE\n    OUTPUT \"Revise\"\n  ENDIF\nEND",
      "expected": "48 >= 50 evaluates to FALSE and is returned to the caller. The IF uses that returned Boolean and selects ELSE. Output: Revise. At mark 50, HasPassed returns TRUE and output becomes Pass."
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
      "count is 4, so the loop visits indices 0 to 3.",
      "Outputs in order: 2, 4, 6, 8. The spare element at index 4 is excluded.",
      "Use the supplied count instead of assuming that every capacity slot contains meaningful data."
    ],
    "worked": {
      "title": "Passing a meaningful count",
      "prompt": "Write DisplayValues(values,count) to display only the first four elements of [2,4,6,8,999]. Pass both the array and count from Main.",
      "code": "METHOD DisplayValues(values AS INTEGER[], count AS INTEGER)\n  DECLARE i AS INTEGER\n  FOR i = 0 TO count - 1\n    OUTPUT values[i]\n  ENDFOR\nENDMETHOD\nBEGIN\n  DECLARE numbers[5] AS INTEGER\n  SET numbers = [2, 4, 6, 8, 999]\n  CALL DisplayValues(numbers, 4)\nEND",
      "expected": "count is 4, so the loop visits indices 0 to 3. Outputs in order: 2, 4, 6, 8. The spare element at index 4 is excluded. Use the supplied count instead of assuming that every capacity slot contains meaningful data."
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
      "One argument selects the square overload: 5.0 * 5.0 = 25.0.",
      "Two arguments select the rectangle overload: 6.0 * 4.0 = 24.0.",
      "Outputs: 25.0 and 24.0. The parameter counts make these signatures distinct."
    ],
    "worked": {
      "title": "Overloaded area methods",
      "prompt": "Write overloaded CalculateArea methods for a square (one REAL parameter) and a rectangle (two REAL parameters). Show calls for 5.0 and (6.0,4.0).",
      "code": "METHOD CalculateArea(side AS REAL) RETURNS REAL\n  RETURN side * side\nENDMETHOD\nMETHOD CalculateArea(length AS REAL, width AS REAL) RETURNS REAL\n  RETURN length * width\nENDMETHOD\nBEGIN\n  OUTPUT CalculateArea(5.0)\n  OUTPUT CalculateArea(6.0, 4.0)\nEND",
      "expected": "One argument selects the square overload: 5.0 * 5.0 = 25.0. Two arguments select the rectangle overload: 6.0 * 4.0 = 24.0. Outputs: 25.0 and 24.0. The parameter counts make these signatures distinct."
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
      "NEW creates a NumberPrinter object. The call invokes its public method.",
      "The inclusive FOR loop visits i = 1, 2, 3, 4, 5.",
      "Output: 1, 2, 3, 4, 5. The explicitly declared no-argument constructor creates an object with no fields to initialise."
    ],
    "worked": {
      "title": "A number printing object",
      "prompt": "Write NumberPrinter with a public DisplayNumbers() method that displays 1 to 5 using FOR. Create an object and call the method.",
      "code": "CLASS NumberPrinter\n  CONSTRUCTOR NumberPrinter()\n    // No fields need initial values\n  ENDCONSTRUCTOR\n  PUBLIC METHOD DisplayNumbers()\n    DECLARE i AS INTEGER\n    FOR i = 1 TO 5\n      OUTPUT i\n    ENDFOR\n  ENDMETHOD\nENDCLASS\nBEGIN\n  DECLARE printer AS NumberPrinter\n  SET printer = NEW NumberPrinter()\n  CALL printer.DisplayNumbers()\nEND",
      "expected": "NEW creates a NumberPrinter object. The call invokes its public method. The inclusive FOR loop visits i = 1, 2, 3, 4, 5. Output: 1, 2, 3, 4, 5. The explicitly declared no-argument constructor creates an object with no fields to initialise."
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
      "Constructor stores balance = 100. Deposit receives 50, which passes the amount > 0 test.",
      "The controlled update sets balance = 100 + 50 = 150. Output: 150.",
      "Private balance prevents direct caller assignment. Depositing 0 or a negative amount leaves it unchanged."
    ],
    "worked": {
      "title": "Controlled deposits",
      "prompt": "Design Account with a private balance. Its constructor takes a non-negative opening balance. Deposit accepts only positive amounts. Display the balance after opening with 100 and depositing 50.",
      "code": "CLASS Account\n  PRIVATE balance AS REAL\n  CONSTRUCTOR Account(opening AS REAL)\n    SET balance = opening\n  ENDCONSTRUCTOR\n  PUBLIC METHOD Deposit(amount AS REAL)\n    IF amount > 0 THEN\n      SET balance = balance + amount\n    ENDIF\n  ENDMETHOD\n  PUBLIC METHOD GetBalance() RETURNS REAL\n    RETURN balance\n  ENDMETHOD\nENDCLASS\nBEGIN\n  DECLARE account AS Account\n  SET account = NEW Account(100)\n  CALL account.Deposit(50)\n  OUTPUT account.GetBalance()\nEND",
      "expected": "Constructor stores balance = 100. Deposit receives 50, which passes the amount > 0 test. The controlled update sets balance = 100 + 50 = 150. Output: 150. Private balance prevents direct caller assignment. Depositing 0 or a negative amount leaves it unchanged."
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
      "After construction, borrowed = FALSE. The first call selects ELSE, stores TRUE and returns TRUE.",
      "The second call sees borrowed = TRUE and returns FALSE without changing it.",
      "Outputs in order: TRUE, FALSE. In the class diagram, Borrow is public and returns BOOLEAN."
    ],
    "worked": {
      "title": "A stateful book object",
      "prompt": "Design LibraryBook with a private borrowed flag initially FALSE. Borrow returns TRUE and changes the flag on the first call. Later calls return FALSE. Show two calls on the same object.",
      "code": "CLASS LibraryBook\n  PRIVATE borrowed AS BOOLEAN\n  CONSTRUCTOR LibraryBook()\n    SET borrowed = FALSE\n  ENDCONSTRUCTOR\n  PUBLIC METHOD Borrow() RETURNS BOOLEAN\n    IF borrowed THEN\n      RETURN FALSE\n    ELSE\n      SET borrowed = TRUE\n      RETURN TRUE\n    ENDIF\n  ENDMETHOD\nENDCLASS\nBEGIN\n  DECLARE book AS LibraryBook\n  SET book = NEW LibraryBook()\n  OUTPUT book.Borrow()\n  OUTPUT book.Borrow()\nEND",
      "expected": "After construction, borrowed = FALSE. The first call selects ELSE, stores TRUE and returns TRUE. The second call sees borrowed = TRUE and returns FALSE without changing it. Outputs in order: TRUE, FALSE. In the class diagram, Borrow is public and returns BOOLEAN."
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
