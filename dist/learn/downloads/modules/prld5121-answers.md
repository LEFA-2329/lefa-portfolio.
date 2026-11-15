# Programming Logic . PRLD5121 - worked answers

Compare your reasoning, not only the final result. Code fragments assume the schema and environment in each question. Test SQL Server, WPF and Docker examples in their native tools.

## Answer 1

1, 3, 6, 10. The loop adds the current counter to the running total.

## Answer 2

count = 0
FOR EACH mark IN marks
  IF mark >= 50 THEN
    count = count + 1
  END IF
END FOR
OUTPUT count // 2 passes

## Answer 3

Add n = n + 1 inside the loop. The values processed are 1, 2, 3 and 4. Without the update the loop never ends.

## Answer 4

FUNCTION Area(length, width)
  RETURN length * width
END FUNCTION
OUTPUT Area(3, 4) // 12

## Answer 5

Keep name and marks private. Provide methods to update marks after checking they are between 0 and 100. Encapsulation keeps the data and its rules together.

