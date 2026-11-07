export const taskBank = [
  {
    "id": "maximum",
    "title": "Return the larger value",
    "topic": "Methods",
    "level": "Foundation",
    "prompt": "Write Maximum(first, second) to return the larger of two integers. Return either when equal. Call it with (17, 9) and (8, 8).",
    "solution": "METHOD Maximum(first, second) RETURNS INTEGER\n  IF first >= second THEN\n    RETURN first\n  ELSE\n    RETURN second\n  ENDIF\nENDMETHOD\nBEGIN\n  OUTPUT Maximum(17, 9)\n  OUTPUT Maximum(8, 8)\nEND\n\nCheck your result: 17 and 8.",
    "checklist": [
      "Use METHOD or MODULE with a matching end.",
      "Check the parameters, return value and call.",
      "Trace normal, boundary and equal-value cases where relevant."
    ],
    "diagram": true
  },
  {
    "id": "while-method",
    "title": "A method that counts",
    "topic": "Methods",
    "level": "Foundation",
    "prompt": "Write a method DisplayNumbers() that displays 1 to 5 using WHILE. Call it from the main program.",
    "solution": "METHOD DisplayNumbers()\n  SET number = 1\n  WHILE number <= 5 DO\n    OUTPUT number\n    SET number = number + 1\n  ENDWHILE\nENDMETHOD\nBEGIN\n  CALL DisplayNumbers()\nEND\n\nCheck your result: 1, 2, 3, 4, 5. The counter reaches 6 before the loop ends.",
    "checklist": [
      "Use METHOD or MODULE with a matching end.",
      "Check the parameters, return value and call.",
      "Trace normal, boundary and equal-value cases where relevant."
    ],
    "diagram": true
  },
  {
    "id": "rectangle",
    "title": "Rectangle area",
    "topic": "Methods",
    "level": "Foundation",
    "prompt": "Write RectangleArea(length, width) to return an area. Assume non-negative dimensions. Show calls for (6, 4) and (0, 4).",
    "solution": "METHOD RectangleArea(length, width) RETURNS REAL\n  RETURN length * width\nENDMETHOD\nBEGIN\n  OUTPUT RectangleArea(6, 4)\n  OUTPUT RectangleArea(0, 4)\nEND\n\nCheck your result: 24 and 0.",
    "checklist": [
      "Use METHOD or MODULE with a matching end.",
      "Check the parameters, return value and call.",
      "Trace normal, boundary and equal-value cases where relevant."
    ],
    "diagram": true
  },
  {
    "id": "five-average",
    "title": "Input and average five marks",
    "topic": "Methods",
    "level": "Developing",
    "prompt": "Write a method that inputs exactly five marks using FOR and returns their average. Call it and display the returned value. Assume valid marks.",
    "solution": "METHOD ReadAverage() RETURNS REAL\n  SET total = 0\n  FOR i = 1 TO 5\n    INPUT mark\n    SET total = total + mark\n  ENDFOR\n  RETURN total / 5.0\nENDMETHOD\nBEGIN\n  OUTPUT ReadAverage()\nEND\n\nCheck your result: For 50, 60, 70, 80, 90 the average is 70. Initialise total once before the loop.",
    "checklist": [
      "Use METHOD or MODULE with a matching end.",
      "Check the parameters, return value and call.",
      "Trace normal, boundary and equal-value cases where relevant."
    ],
    "diagram": true
  },
  {
    "id": "square",
    "title": "RETURN or OUTPUT?",
    "topic": "Methods",
    "level": "Foundation",
    "prompt": "Explain RETURN versus OUTPUT. Write Square(number), then display Square(6).",
    "solution": "METHOD Square(number) RETURNS INTEGER\n  RETURN number * number\nENDMETHOD\nBEGIN\n  SET result = Square(6)\n  OUTPUT result\nEND\n\nCheck your result: 36. RETURN supplies a value to the caller; OUTPUT displays it.",
    "checklist": [
      "Use METHOD or MODULE with a matching end.",
      "Check the parameters, return value and call.",
      "Trace normal, boundary and equal-value cases where relevant."
    ],
    "diagram": true
  },
  {
    "id": "three-average",
    "title": "Average through parameters",
    "topic": "Methods",
    "level": "Foundation",
    "prompt": "Write CalculateAverage(a, b, c) to return the average of three REAL marks. Test 60, 75 and 90.",
    "solution": "METHOD CalculateAverage(a, b, c) RETURNS REAL\n  RETURN (a + b + c) / 3.0\nENDMETHOD\nBEGIN\n  OUTPUT CalculateAverage(60, 75, 90)\nEND\n\nCheck your result: 75. Use parentheses so addition happens before division.",
    "checklist": [
      "Use METHOD or MODULE with a matching end.",
      "Check the parameters, return value and call.",
      "Trace normal, boundary and equal-value cases where relevant."
    ],
    "diagram": true
  },
  {
    "id": "boolean-method",
    "title": "A Boolean returning method",
    "topic": "Methods",
    "level": "Foundation",
    "prompt": "Write HasPassed(mark) returning TRUE for marks of at least 50. Use it in an IF for 48. Assume valid marks.",
    "solution": "METHOD HasPassed(mark) RETURNS BOOLEAN\n  RETURN mark >= 50\nENDMETHOD\nBEGIN\n  IF HasPassed(48) THEN\n    OUTPUT \"Passed\"\n  ELSE\n    OUTPUT \"Failed\"\n  ENDIF\nEND\n\nCheck your result: Failed. Check marks 49, 50 and 51 to test the boundary.",
    "checklist": [
      "Use METHOD or MODULE with a matching end.",
      "Check the parameters, return value and call.",
      "Trace normal, boundary and equal-value cases where relevant."
    ],
    "diagram": true
  },
  {
    "id": "factorial",
    "title": "Return a factorial",
    "topic": "Methods",
    "level": "Developing",
    "prompt": "Write Factorial(number) with a FOR loop. Assume a non-negative integer small enough to avoid overflow. Explain the case number = 0.",
    "solution": "METHOD Factorial(number) RETURNS INTEGER\n  SET product = 1\n  FOR counter = 1 TO number\n    SET product = product * counter\n  ENDFOR\n  RETURN product\nENDMETHOD\nBEGIN\n  OUTPUT Factorial(4)\n  OUTPUT Factorial(0)\nEND\n\nCheck your result: 24 and 1. The FOR loop has no iterations for 0.",
    "checklist": [
      "Use METHOD or MODULE with a matching end.",
      "Check the parameters, return value and call.",
      "Trace normal, boundary and equal-value cases where relevant."
    ],
    "diagram": true
  },
  {
    "id": "add-overloads",
    "title": "Overload by parameter count",
    "topic": "Overloading",
    "level": "Challenge",
    "prompt": "Create two Add methods: one accepts two integers, the other three. Show calls and expected outputs.",
    "solution": "METHOD Add(a AS INTEGER, b AS INTEGER) RETURNS INTEGER\n  RETURN a + b\nENDMETHOD\nMETHOD Add(a AS INTEGER, b AS INTEGER, c AS INTEGER) RETURNS INTEGER\n  RETURN a + b + c\nENDMETHOD\n\nAdd(4, 6) returns 10. Add(4, 6, 2) returns 12.",
    "checklist": [
      "Differentiate the parameter count or types.",
      "State the selected signature for each call.",
      "Overload exercises are for written practice; duplicate method names are not supported by the diagram lab."
    ],
    "diagram": false
  },
  {
    "id": "multiply-overloads",
    "title": "Overload by parameter type",
    "topic": "Overloading",
    "level": "Challenge",
    "prompt": "Write Multiply for two INTEGER arguments and for two REAL arguments. Explain how the caller selects a method.",
    "solution": "METHOD Multiply(a AS INTEGER, b AS INTEGER) RETURNS INTEGER\n  RETURN a * b\nENDMETHOD\nMETHOD Multiply(a AS REAL, b AS REAL) RETURNS REAL\n  RETURN a * b\nENDMETHOD\n\nMultiply(3, 4) returns 12. Multiply(2.5, 4.0) returns 10.0. Argument types select the overload.",
    "checklist": [
      "Differentiate the parameter count or types.",
      "State the selected signature for each call.",
      "Overload exercises are for written practice; duplicate method names are not supported by the diagram lab."
    ],
    "diagram": false
  },
  {
    "id": "area-overloads",
    "title": "One name, two shapes",
    "topic": "Overloading",
    "level": "Challenge",
    "prompt": "Write CalculateArea for a square and a rectangle using overloaded methods. Explain the distinguishing parameter lists.",
    "solution": "METHOD CalculateArea(side AS REAL) RETURNS REAL\n  RETURN side * side\nENDMETHOD\nMETHOD CalculateArea(length AS REAL, width AS REAL) RETURNS REAL\n  RETURN length * width\nENDMETHOD\n\nCalculateArea(5.0) returns 25.0. CalculateArea(6.0, 4.0) returns 24.0.",
    "checklist": [
      "Differentiate the parameter count or types.",
      "State the selected signature for each call.",
      "Overload exercises are for written practice; duplicate method names are not supported by the diagram lab."
    ],
    "diagram": false
  },
  {
    "id": "trace-overloads",
    "title": "Trace nested calls",
    "topic": "Overloading",
    "level": "Challenge",
    "prompt": "Calculate(a, b) returns a + b. Calculate(a, b, c) returns a * b * c. Trace Calculate(2, 3), Calculate(2, 3, 4) and Calculate(Calculate(1, 2), 5). Explain each selection.",
    "solution": "Outputs: 5, 24, 8.\nThe first call has two arguments. The second has three. In the nested call the inner result is 3, so the outer two-argument call is Calculate(3, 5).",
    "checklist": [
      "Differentiate the parameter count or types.",
      "State the selected signature for each call.",
      "Overload exercises are for written practice; duplicate method names are not supported by the diagram lab."
    ],
    "diagram": false
  },
  {
    "id": "fix-overloads",
    "title": "Repair an invalid overload",
    "topic": "Overloading",
    "level": "Challenge",
    "prompt": "GetPrice(price AS REAL) RETURNS REAL and GetPrice(price AS REAL) RETURNS INTEGER have identical parameter lists. Explain the problem. Design a discount version with a valid overload.",
    "solution": "Changing only the return type does not distinguish calls. Add a second parameter:\n\nMETHOD GetPrice(price AS REAL) RETURNS REAL\n  RETURN price\nENDMETHOD\nMETHOD GetPrice(price AS REAL, discountPercent AS REAL) RETURNS REAL\n  RETURN price - price * discountPercent / 100.0\nENDMETHOD\n\nAssume a non-negative price and discount 0 to 100. GetPrice(200.0, 10.0) returns 180.0.",
    "checklist": [
      "Differentiate the parameter count or types.",
      "State the selected signature for each call.",
      "Overload exercises are for written practice; duplicate method names are not supported by the diagram lab."
    ],
    "diagram": false
  },
  {
    "id": "pass-count",
    "title": "Count students who passed",
    "topic": "Loops",
    "level": "Foundation",
    "prompt": "Input a positive student count and each mark. Count marks at least 50. Write a FOR solution, then rewrite it using WHILE. Assume valid input.",
    "solution": "BEGIN\n  INPUT n\n  SET count = 0\n  FOR i = 1 TO n\n    INPUT mark\n    IF mark >= 50 THEN\n      SET count = count + 1\n    ENDIF\n  ENDFOR\n  OUTPUT count\nEND\n\nEquivalent WHILE solution:\nBEGIN\n  INPUT n\n  SET count = 0\n  SET i = 1\n  WHILE i <= n DO\n    INPUT mark\n    IF mark >= 50 THEN\n      SET count = count + 1\n    ENDIF\n    SET i = i + 1\n  ENDWHILE\n  OUTPUT count\nEND\n\nFor 45, 50, 82: 2 passed.",
    "checklist": [
      "Initialise count before the loop.",
      "Use identical bounds in both versions.",
      "Increment the WHILE counter exactly once per iteration."
    ],
    "diagram": false
  },
  {
    "id": "even-count",
    "title": "Count even numbers",
    "topic": "Loops",
    "level": "Foundation",
    "prompt": "Input a positive number count and each integer. Count the even integers. Write a FOR solution, then rewrite it using WHILE. Assume valid input.",
    "solution": "BEGIN\n  INPUT n\n  SET count = 0\n  FOR i = 1 TO n\n    INPUT number\n    IF number MOD 2 = 0 THEN\n      SET count = count + 1\n    ENDIF\n  ENDFOR\n  OUTPUT count\nEND\n\nEquivalent WHILE solution:\nBEGIN\n  INPUT n\n  SET count = 0\n  SET i = 1\n  WHILE i <= n DO\n    INPUT number\n    IF number MOD 2 = 0 THEN\n      SET count = count + 1\n    ENDIF\n    SET i = i + 1\n  ENDWHILE\n  OUTPUT count\nEND\n\nFor -2, 0, 3, 8: 3 are even.",
    "checklist": [
      "Initialise count before the loop.",
      "Use identical bounds in both versions.",
      "Increment the WHILE counter exactly once per iteration."
    ],
    "diagram": false
  },
  {
    "id": "salary-count",
    "title": "Count salaries above a threshold",
    "topic": "Loops",
    "level": "Foundation",
    "prompt": "Input a positive employee count and each salary. Count salaries strictly above R15 000. Write a FOR solution, then rewrite it using WHILE. Assume valid input.",
    "solution": "BEGIN\n  INPUT n\n  SET count = 0\n  FOR i = 1 TO n\n    INPUT salary\n    IF salary > 15000 THEN\n      SET count = count + 1\n    ENDIF\n  ENDFOR\n  OUTPUT count\nEND\n\nEquivalent WHILE solution:\nBEGIN\n  INPUT n\n  SET count = 0\n  SET i = 1\n  WHILE i <= n DO\n    INPUT salary\n    IF salary > 15000 THEN\n      SET count = count + 1\n    ENDIF\n    SET i = i + 1\n  ENDWHILE\n  OUTPUT count\nEND\n\nFor 15000, 15001, 22000: 2 qualify.",
    "checklist": [
      "Initialise count before the loop.",
      "Use identical bounds in both versions.",
      "Increment the WHILE counter exactly once per iteration."
    ],
    "diagram": false
  },
  {
    "id": "class-average",
    "title": "Calculate a class average",
    "topic": "Loops",
    "level": "Developing",
    "prompt": "Input a student count n. If n is positive, read n marks and display their average. Handle n = 0. Write FOR and WHILE versions.",
    "solution": "BEGIN\n  INPUT n\n  IF n > 0 THEN\n    SET total = 0\n    FOR i = 1 TO n\n      INPUT mark\n      SET total = total + mark\n    ENDFOR\n    OUTPUT total / n\n  ELSE\n    OUTPUT \"No students\"\n  ENDIF\nEND\n\nWHILE conversion: set i = 1 before the loop, use WHILE i <= n DO, keep the same body, add SET i = i + 1, then ENDWHILE. The average remains after the loop.",
    "checklist": [
      "Avoid division by zero.",
      "Accumulate every mark once.",
      "For 50, 70, 90 the average is 70."
    ],
    "diagram": false
  },
  {
    "id": "sign-count",
    "title": "Positive, negative or zero?",
    "topic": "Loops",
    "level": "Developing",
    "prompt": "Read n integers for a positive n. Count positive and negative values separately. Zero belongs to neither count. Give FOR and WHILE versions.",
    "solution": "BEGIN\n  INPUT n\n  SET positive = 0\n  SET negative = 0\n  FOR i = 1 TO n\n    INPUT value\n    IF value > 0 THEN\n      SET positive = positive + 1\n    ELSEIF value < 0 THEN\n      SET negative = negative + 1\n    ENDIF\n  ENDFOR\n  OUTPUT positive, negative\nEND\n\nWHILE conversion: initialise i to 1, test i <= n, execute the same body and increment i each time.\nFor -4, 0, 3, 7, -1: positive = 2, negative = 2.",
    "checklist": [
      "Use two separate counters.",
      "Do not classify zero as negative.",
      "Keep input inside the loop."
    ],
    "diagram": false
  },
  {
    "id": "student-input",
    "title": "Capture names and marks",
    "topic": "Parallel arrays",
    "level": "Foundation",
    "prompt": "Use parallel arrays to input names and marks for five students. Then display each name with its corresponding mark. Use zero-based indices.",
    "solution": "BEGIN\n  DECLARE names[5] AS STRING\n  DECLARE marks[5] AS REAL\n  FOR i = 0 TO 4\n    INPUT names[i]\n    INPUT marks[i]\n  ENDFOR\n  FOR i = 0 TO 4\n    OUTPUT names[i], marks[i]\n  ENDFOR\nEND",
    "checklist": [
      "Both arrays have five elements.",
      "The same index identifies one student in both arrays.",
      "The valid indices are 0 through 4."
    ],
    "diagram": true
  },
  {
    "id": "employee-filter",
    "title": "Filter employee salaries",
    "topic": "Parallel arrays",
    "level": "Foundation",
    "prompt": "Input names and salaries of four employees into parallel arrays. Display only employees earning more than R20 000.",
    "solution": "BEGIN\n  DECLARE names[4] AS STRING\n  DECLARE salaries[4] AS REAL\n  FOR i = 0 TO 3\n    INPUT names[i]\n    INPUT salaries[i]\n  ENDFOR\n  FOR i = 0 TO 3\n    IF salaries[i] > 20000 THEN\n      OUTPUT names[i], salaries[i]\n    ENDIF\n  ENDFOR\nEND",
    "checklist": [
      "Use indices 0 through 3.",
      "R20 000 does not qualify; R20 001 does.",
      "Display the name and salary from the same index."
    ],
    "diagram": true
  },
  {
    "id": "display-passes",
    "title": "Show all passing students",
    "topic": "Parallel arrays",
    "level": "Developing",
    "prompt": "Given names [Lebo, Thabo, Naledi, Peter, Maria] and marks [65, 48, 72, 55, 81], display all names and marks with a mark of at least 50. Give a FOR solution and explain its WHILE conversion.",
    "solution": "BEGIN\n  SET names = [\"Lebo\", \"Thabo\", \"Naledi\", \"Peter\", \"Maria\"]\n  SET marks = [65, 48, 72, 55, 81]\n  FOR i = 0 TO 4\n    IF marks[i] >= 50 THEN\n      OUTPUT names[i], marks[i]\n    ENDIF\n  ENDFOR\nEND\n\nWHILE: initialise i = 0, loop while i < 5, keep the IF body and increment i.\nOutput: Lebo 65; Naledi 72; Peter 55; Maria 81.",
    "checklist": [
      "Visit all five indices.",
      "Include exactly 50.",
      "Preserve the name-mark pairing."
    ],
    "diagram": false
  },
  {
    "id": "student-search",
    "title": "Search by student name",
    "topic": "Parallel arrays",
    "level": "Developing",
    "prompt": "Use names [\"Lebo\", \"Thabo\", \"Naledi\", \"Peter\", \"Maria\"] and marks [65, 48, 72, 55, 81]. Ask for a name. Display its paired value when found, otherwise display Not found. Use a WHILE loop; assume unique, case-sensitive names.",
    "solution": "BEGIN\n  SET names = [\"Lebo\", \"Thabo\", \"Naledi\", \"Peter\", \"Maria\"]\n  SET marks = [65, 48, 72, 55, 81]\n  INPUT target\n  SET foundAt = -1\n  SET i = 0\n  WHILE i < 5 DO\n    IF names[i] = target THEN\n      SET foundAt = i\n    ENDIF\n    SET i = i + 1\n  ENDWHILE\n  IF foundAt <> -1 THEN\n    OUTPUT names[foundAt], marks[foundAt]\n  ELSE\n    OUTPUT \"Not found\"\n  ENDIF\nEND",
    "checklist": [
      "Initialise foundAt to an invalid index.",
      "Never read an array at index -1.",
      "Test an existing name and a missing name."
    ],
    "diagram": true
  },
  {
    "id": "product-search",
    "title": "Find a product price",
    "topic": "Parallel arrays",
    "level": "Developing",
    "prompt": "Use names [\"Keyboard\", \"Mouse\", \"Monitor\", \"Printer\", \"Laptop\"] and prices [250, 150, 2500, 1800, 9500]. Ask for a name. Display its paired value when found, otherwise display Not found. Use a WHILE loop; assume unique, case-sensitive names.",
    "solution": "BEGIN\n  SET names = [\"Keyboard\", \"Mouse\", \"Monitor\", \"Printer\", \"Laptop\"]\n  SET prices = [250, 150, 2500, 1800, 9500]\n  INPUT target\n  SET foundAt = -1\n  SET i = 0\n  WHILE i < 5 DO\n    IF names[i] = target THEN\n      SET foundAt = i\n    ENDIF\n    SET i = i + 1\n  ENDWHILE\n  IF foundAt <> -1 THEN\n    OUTPUT names[foundAt], prices[foundAt]\n  ELSE\n    OUTPUT \"Not found\"\n  ENDIF\nEND",
    "checklist": [
      "Initialise foundAt to an invalid index.",
      "Never read an array at index -1.",
      "Test an existing name and a missing name."
    ],
    "diagram": true
  },
  {
    "id": "highest-mark",
    "title": "Find the top mark",
    "topic": "Parallel arrays",
    "level": "Developing",
    "prompt": "Use the five student names and marks [65, 48, 72, 55, 81]. Find the highest mark and its matching name. Keep the first student if there is a tie.",
    "solution": "BEGIN\n  SET names = [\"Lebo\", \"Thabo\", \"Naledi\", \"Peter\", \"Maria\"]\n  SET marks = [65, 48, 72, 55, 81]\n  SET best = 0\n  FOR i = 1 TO 4\n    IF marks[i] > marks[best] THEN\n      SET best = i\n    ENDIF\n  ENDFOR\n  OUTPUT names[best], marks[best]\nEND\n\nResult: Maria, 81.",
    "checklist": [
      "Initialise the best index to an existing element.",
      "Use > to preserve the first occurrence of a tie.",
      "Use best to access both arrays."
    ],
    "diagram": true
  },
  {
    "id": "combined-results",
    "title": "A complete results report",
    "topic": "Parallel arrays",
    "level": "Challenge",
    "prompt": "Use names [John, Mary, David, Sarah, Peter] and marks [45, 78, 66, 82, 39]. Display every pair, count passes and failures (pass >= 50), and show the top student. Assume a non-empty class.",
    "solution": "BEGIN\n  SET names = [\"John\", \"Mary\", \"David\", \"Sarah\", \"Peter\"]\n  SET marks = [45, 78, 66, 82, 39]\n  SET passed = 0\n  SET failed = 0\n  SET best = 0\n  FOR i = 0 TO 4\n    OUTPUT names[i], marks[i]\n    IF marks[i] >= 50 THEN\n      SET passed = passed + 1\n    ELSE\n      SET failed = failed + 1\n    ENDIF\n    IF marks[i] > marks[best] THEN\n      SET best = i\n    ENDIF\n  ENDFOR\n  OUTPUT passed, failed\n  OUTPUT names[best], marks[best]\nEND",
    "checklist": [
      "Expected: 3 passed, 2 failed, Sarah 82.",
      "Check that passed + failed equals 5.",
      "Initialise counters outside the loop."
    ],
    "diagram": true
  },
  {
    "id": "commission",
    "title": "Build a salary flowchart",
    "topic": "Revision",
    "level": "Developing",
    "prompt": "For a practice sales report, input a basic salary, sales total and commission percentage. Calculate salary = basic + sales * percentage / 100. Write pseudocode and create a flowchart. Test basic 5000, sales 20000 and rate 5.",
    "solution": "BEGIN\n  INPUT basic\n  INPUT sales\n  INPUT rate\n  SET salary = basic + sales * rate / 100.0\n  OUTPUT salary\nEND",
    "checklist": [
      "Expected salary: R6 000.",
      "Use a parallelogram for input/output.",
      "Use a process rectangle for the calculation."
    ],
    "diagram": true
  },
  {
    "id": "positive-triple",
    "title": "Stop on a sentinel",
    "topic": "Revision",
    "level": "Developing",
    "prompt": "Read numbers while they are greater than zero. Display three times each positive input. Stop when zero or a negative number is entered, without displaying its triple.",
    "solution": "BEGIN\n  INPUT number\n  WHILE number > 0 DO\n    OUTPUT number * 3\n    INPUT number\n  ENDWHILE\nEND",
    "checklist": [
      "Include the first input before the loop.",
      "Read a new value each iteration.",
      "For 2, 5, 0: display 6 and 15 only."
    ],
    "diagram": true
  },
  {
    "id": "discount-logic",
    "title": "Explain Boolean decisions",
    "topic": "Revision",
    "level": "Foundation",
    "prompt": "A fictional club offers a discount to members aged 65 or older. Write the Boolean condition. Explain AND, OR and NOT using this scenario. State the outcome for a member aged 64 and a non-member aged 70.",
    "solution": "Eligible: isMember AND age >= 65.\nAND requires both conditions. OR would accept either condition, so it would not implement this rule. NOT reverses a Boolean result; NOT isMember is true for a non-member.\nBoth specified people are ineligible. A member aged 65 is eligible.",
    "checklist": [
      "Check age 65 as the inclusive boundary.",
      "Explain why OR changes the policy.",
      "Use Boolean values rather than quoted strings for isMember."
    ],
    "diagram": false
  },
  {
    "id": "contribution",
    "title": "Return a practice contribution",
    "topic": "Revision",
    "level": "Foundation",
    "prompt": "For a fictional exercise only, a company uses a contribution rate of 3%. Write Contribution(salary, rate) returning salary * rate / 100. Call it for salary 10000 and rate 3. This is a programming example, not a real payroll rule.",
    "solution": "METHOD Contribution(salary, rate) RETURNS REAL\n  RETURN salary * rate / 100.0\nENDMETHOD\nBEGIN\n  OUTPUT Contribution(10000, 3)\nEND",
    "checklist": [
      "Expected: 300.",
      "The rate is passed as a parameter.",
      "RETURN makes the result available to the caller."
    ],
    "diagram": true
  },
  {
    "id": "leave-ipo",
    "title": "Plan before coding",
    "topic": "Revision",
    "level": "Foundation",
    "prompt": "In a fictional leave exercise, staff earn 1.5 days per month worked. Assume monthsRemaining is already known. Identify input, processing and output, then give two test cases.",
    "solution": "Input: employee name and monthsRemaining.\nProcessing: leaveDays = monthsRemaining * 1.5.\nOutput: employee name and leaveDays.\nTests: 4 months -> 6 days; 0 months -> 0 days.\nValidate monthsRemaining as an integer from 0 to 12 if validation is required.",
    "checklist": [
      "Identify the formula separately from inputs.",
      "Include units in the output.",
      "Test zero months."
    ],
    "diagram": false
  },
  {
    "id": "oop-for",
    "title": "A class that prints numbers",
    "topic": "OOP",
    "level": "Developing",
    "prompt": "Design NumberPrinter with DisplayNumbers() using FOR to display 1 to 10. Show an object creation and method call.",
    "solution": "CLASS NumberPrinter\n  METHOD DisplayNumbers()\n    FOR i = 1 TO 10\n      OUTPUT i\n    ENDFOR\n  ENDMETHOD\nENDCLASS\nBEGIN\n  SET printer = NEW NumberPrinter()\n  CALL printer.DisplayNumbers()\nEND",
    "checklist": [
      "Separate the class definition from object use.",
      "Check member visibility and loop bounds.",
      "Class syntax is written practice; the flowchart converter does not parse classes."
    ],
    "diagram": false
  },
  {
    "id": "oop-while",
    "title": "Even numbers through an object",
    "topic": "OOP",
    "level": "Developing",
    "prompt": "Design EvenPrinter with a WHILE method displaying even numbers from 2 to 20. Create an object and call it.",
    "solution": "CLASS EvenPrinter\n  METHOD DisplayEven()\n    SET number = 2\n    WHILE number <= 20 DO\n      OUTPUT number\n      SET number = number + 2\n    ENDWHILE\n  ENDMETHOD\nENDCLASS\nBEGIN\n  SET printer = NEW EvenPrinter()\n  CALL printer.DisplayEven()\nEND",
    "checklist": [
      "Separate the class definition from object use.",
      "Check member visibility and loop bounds.",
      "Class syntax is written practice; the flowchart converter does not parse classes."
    ],
    "diagram": false
  },
  {
    "id": "oop-array",
    "title": "A class with an array",
    "topic": "OOP",
    "level": "Developing",
    "prompt": "Design MarkBook with a private marks array containing 60, 75 and 90. A public method must display all marks with FOR. Explain encapsulation.",
    "solution": "CLASS MarkBook\n  PRIVATE marks = [60, 75, 90]\n  PUBLIC METHOD DisplayMarks()\n    FOR i = 0 TO 2\n      OUTPUT marks[i]\n    ENDFOR\n  ENDMETHOD\nENDCLASS\n\nEncapsulation keeps marks private and exposes a public operation. A MarkBook object can call DisplayMarks().",
    "checklist": [
      "Separate the class definition from object use.",
      "Check member visibility and loop bounds.",
      "Class syntax is written practice; the flowchart converter does not parse classes."
    ],
    "diagram": false
  },
  {
    "id": "oop-total",
    "title": "Return a total from a class",
    "topic": "OOP",
    "level": "Developing",
    "prompt": "Design NumberStore with values [4, 6, 10]. Use a WHILE method Total() returning the sum. Explain the counter and accumulator.",
    "solution": "CLASS NumberStore\n  PRIVATE values = [4, 6, 10]\n  PUBLIC METHOD Total() RETURNS INTEGER\n    SET total = 0\n    SET i = 0\n    WHILE i < 3 DO\n      SET total = total + values[i]\n      SET i = i + 1\n    ENDWHILE\n    RETURN total\n  ENDMETHOD\nENDCLASS\n\ni is the index counter. total is the accumulator. The returned result is 20.",
    "checklist": [
      "Separate the class definition from object use.",
      "Check member visibility and loop bounds.",
      "Class syntax is written practice; the flowchart converter does not parse classes."
    ],
    "diagram": false
  },
  {
    "id": "oop-inheritance",
    "title": "Model a person and student",
    "topic": "OOP",
    "level": "Developing",
    "prompt": "Design Person with a protected address and Student inheriting from Person with number, firstName and surname. Explain protected versus private. Sketch a class relationship.",
    "solution": "CLASS Person\n  PROTECTED address AS STRING\nENDCLASS\nCLASS Student INHERITS Person\n  PRIVATE number AS STRING\n  PRIVATE firstName AS STRING\n  PRIVATE surname AS STRING\nENDCLASS\n\nStudent is a Person. Draw a generalisation line from Student towards Person with a hollow triangle at Person. Protected allows direct subclass access; private restricts direct access to the declaring class. Prefer controlled methods when exposing data.",
    "checklist": [
      "Separate the class definition from object use.",
      "Check member visibility and loop bounds.",
      "Class syntax is written practice; the flowchart converter does not parse classes."
    ],
    "diagram": false
  }
];
