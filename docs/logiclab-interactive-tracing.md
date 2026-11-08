# Interactive pseudocode tracing

Open `/learn/#trace`. Students can load twelve declared examples or enter a program with scalar variables and one-dimensional arrays, prepare it, supply INPUT values and inspect each executed statement. Variables show declared types and changed rows; decisions show TRUE/FALSE and output accumulates separately. Previous/Next replay immutable recorded states. Restart creates a new run for different inputs. Editing clears the trace. The diagram lab and tracer can exchange source code. Existing guided array/search/sorting traces remain at `#trace-guided`.

Supported: INTEGER, REAL, STRING, BOOLEAN declarations; constants; assignment; INPUT/OUTPUT; arithmetic, comparisons, Boolean operators; IF/ELSEIF/ELSE; SWITCH; FOR with inclusive fixed bounds and positive/negative nonzero STEP; WHILE; REPEAT/UNTIL. Names are case insensitive. Variables must be declared and assigned before use. DIV truncates toward zero; MOD follows the corresponding remainder. The on-page guide explains syntax and precedence.

The interpreter supports one-dimensional arrays, indexed input/output and element assignments, including parallel-array, linear-search and bubble-sort programs. It does not execute two-dimensional arrays, methods/modules or classes. These remain available in the teaching material and guided tools. Unsupported syntax fails explicitly. A tokenizer, expression parser and instruction interpreter process the program without JavaScript eval or Function. Inputs and traces stay in page memory, with no server/API transmission or persistent storage. Limits: 20,000 source characters, 300 nonempty lines, 2,000 execution steps, 50 variables, 100 total array elements, 200 output records, 10,000 output characters and 2,000 characters per string. Invalid INPUT can be corrected without losing the current state.

Validation: `node tests/logiclab-runner.test.mjs` covers types, declarations, constants, expression precedence, input recovery, branch/loop behavior, snapshot independence and execution limits. Existing lesson/task/download/slide audit checks also pass. Browser checks cover numeric input recovery, calculation output, replay, restart, IF selection and flowchart source transfer.


## Array syntax and behaviour

`DECLARE values[3] AS INTEGER` allocates indexes 0 through 2. The length expression is evaluated once and must be a positive whole number. Use `SET values[i] = expression`, `INPUT values[i]` and `OUTPUT values[i]`; declare and assign index variables first. STRING, REAL and BOOLEAN element types are also supported. Parallel arrays use the same numeric index in independent arrays. Whole-array assignment/output and multidimensional declarations are rejected. Every access checks bounds and every read checks assignment. Array snapshots copy their element lists, preserving history as later steps change elements. Indexed cells identify changed values in green and pending INPUT in amber, with text labels as well as colour.

Regression checks cover size limits, bounds, unassigned reads, wrong types, input correction, indexed expressions, case-insensitive names, snapshot independence and the shipped search/sort/parallel examples.
