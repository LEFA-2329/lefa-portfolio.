const types=new Set(['INTEGER','REAL','NUM','STRING','BOOLEAN','CHARACTER','VOID']);
const keywords=new Set('BEGIN END SET INPUT OUTPUT IF THEN ELSE ELSEIF ENDIF FOR TO STEP ENDFOR WHILE DO ENDWHILE REPEAT UNTIL SWITCH CASE DEFAULT ENDSWITCH AND OR NOT TRUE FALSE MOD DIV RETURN CALL NEW'.split(' '));
const purposes={price:'the item price',quantity:'the number of items',total:'a running or calculated total',weight:'the parcel weight',rate:'the rate used in the calculation',charge:'the calculated charge',age:'the supplied age',temperature:'the supplied temperature',learnerId:'the learner identifier',count:'the meaningful item count',average:'the calculated mean',active:'a logical state',value:'the current supplied value',product:'the running product',i:'a traversal or loop counter',mark1:'the first mark',mark2:'the second mark',subtotal:'the amount before discount',due:'the final amount due',x:'the current traced value',a:'the first local value',b:'the second local value',c:'the third local value',mark:'the supplied mark',isMember:'the membership flag',approved:'the approval flag',n:'the number of entries',passed:'the pass counter',row:'the row index',col:'the column index',matrix:'the two-dimensional data',rowTotal:'one row total',values:'the collection of values',maximum:'the largest value found so far',target:'the search value',foundAt:'the match index or -1',names:'the stored names',marks:'the stored marks',best:'the index of the best mark',pass:'the sorting pass counter',j:'the adjacent-pair index',temp:'the saved value during a swap',name:'a name',learner:'the learner value or object reference',result:'a returned calculation result',area:'a rectangle area',length:'a length',width:'a width',number:'the local whole number',counter:'the caller or loop counter',numbers:'the collection of whole numbers',side:'a square side length',first:'the first object reference',second:'the second object reference',title:'the object title',printer:'the printer object reference',height:'a height',w:'the supplied width',h:'the supplied height',shape:'the shape object reference',balance:'the object balance',opening:'the opening balance',amount:'the proposed deposit amount',account:'the account object reference',course:'the course object reference',enrolledCourse:'the incoming course reference',borrowed:'the object borrowing flag',book:'the book object reference',option:'the menu selection',day:'the day code'};
const words=x=>x.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g,'').match(/[A-Za-z_]\w*/g)||[];
export function auditDeclarations(code){
 const lines=code.split('\n');const methods=new Set(),classes=new Set();
 for(const line of lines){let m;if(m=line.trim().match(/^(?:(?:PUBLIC|PRIVATE|PROTECTED|VIRTUAL|OVERRIDE)\s+)*METHOD\s+(\w+)/))methods.add(m[1]);if(m=line.trim().match(/^CLASS\s+(\w+)/))classes.add(m[1]);}
 let fields=new Set(),vars=new Set(),className=null,context='definitions';const declaredTypes=new Set(types);const declarations=[];
 const check=(statement,line)=>{for(const name of words(statement)){if(keywords.has(name)||vars.has(name)||fields.has(name)||methods.has(name)||declaredTypes.has(name))continue;throw Error(`Line ${line}: ${name} is used without a declaration in ${context}.`);}};
 for(let i=0;i<lines.length;i++){const line=lines[i].trim();if(!line||line.startsWith('//'))continue;let m;
  if(m=line.match(/^CLASS (\w+)(?: INHERITS (\w+))?$/)){if(m[2]&&!declaredTypes.has(m[2]))throw Error('Undeclared base class '+m[2]);className=m[1];declaredTypes.add(className);fields=new Set();vars=new Set();context='class '+className;continue;}
  if(line==='ENDCLASS'){className=null;fields=new Set();vars=new Set();context='definitions';continue;}
  if(m=line.match(/^(?:(?:PUBLIC|PRIVATE|PROTECTED|VIRTUAL|OVERRIDE)\s+)*(METHOD|CONSTRUCTOR)\s+(\w+)\((.*)\)(?: RETURNS (\w+))?$/)){
   vars=new Set();context=m[1].toLowerCase()+' '+m[2];for(const param of m[3].split(',').map(x=>x.trim()).filter(Boolean)){const d=param.match(/^(\w+) AS (\w+)(\[\])?$/);if(!d||!declaredTypes.has(d[2]))throw Error('Invalid typed parameter: '+param);vars.add(d[1]);declarations.push({line:i+1,name:d[1],type:d[2]+(d[3]||''),scope:context,kind:'parameter'});}if(m[4]&&!declaredTypes.has(m[4]))throw Error('Unknown return type '+m[4]);continue;
  }
  if(/^(ENDMETHOD|ENDCONSTRUCTOR)$/.test(line)){vars=new Set();context=className?'class '+className:'definitions';continue;}
  if(line==='BEGIN'){vars=new Set();context='main';continue;}
  if(m=line.match(/^(?:DECLARE|PRIVATE|PUBLIC|PROTECTED) (\w+)((?:\[\d+\])*) AS (\w+)$/)){if(!declaredTypes.has(m[3]))throw Error('Unknown type '+m[3]);const isField=!line.startsWith('DECLARE');const set=isField?fields:vars;if(set.has(m[1]))throw Error('Duplicate declaration '+m[1]);set.add(m[1]);declarations.push({line:i+1,name:m[1],type:m[3]+m[2],scope:context,kind:isField?'field':'variable'});continue;}
  check(line,i+1);
 }
 return declarations;
}
function parameters(s){return s?s.split(',').map(x=>x.trim()).join(', '):'no parameters';}
export function explainProgram(code){
 auditDeclarations(code);
 return code.split('\n').map((raw,i)=>{const line=raw.trim();let explanation,m;
 if(!line)explanation='Blank line separating definitions for readability. It does not execute.';
 else if(line.startsWith('//'))explanation='Comment for the reader. The program ignores this line during execution.';
 else if(m=line.match(/^DECLARE (\w+)((?:\[\d+\])*) AS (\w+)$/)){
  const dims=[...m[2].matchAll(/\d+/g)].map(x=>Number(x[0]));
  explanation=dims.length?`Declare ${m[1]} as ${m[3]} data with dimensions ${dims.join(' by ')}. Supply element values before reading them.`:`Declare ${m[1]} as ${m[3]} for ${purposes[m[1]]||'this local value'}. A declaration does not initialise its value.`;
 }
 else if(m=line.match(/^(PUBLIC|PRIVATE|PROTECTED) (\w+) AS (\w+)$/))explanation=`Declare the ${m[1]} field ${m[2]} of type ${m[3]}. Each object owns this field. Its constructor supplies the initial value.`;
 else if(m=line.match(/^CLASS (\w+)(?: INHERITS (\w+))?$/))explanation=`Define the ${m[1]} class${m[2]?`, inheriting from the already defined ${m[2]} class`:''}. This is a type definition, not an object creation.`;
 else if(m=line.match(/^(?:(PUBLIC|PRIVATE|PROTECTED)\s+)?(?:(VIRTUAL|OVERRIDE)\s+)?METHOD (\w+)\((.*)\)(?: RETURNS (\w+))?$/))explanation=`Define ${m[3]} with ${parameters(m[4])}. ${m[5]?'Its returned value must be '+m[5]+'.':'It returns no value (VOID).'}${m[1]?' '+m[1]+' states member visibility.':''}${m[2]==='VIRTUAL'?' VIRTUAL permits a subclass override.':m[2]==='OVERRIDE'?' OVERRIDE replaces the inherited implementation.':''}`;
 else if(m=line.match(/^CONSTRUCTOR (\w+)\((.*)\)$/))explanation=`Declare the ${m[1]} constructor with ${parameters(m[2])}. NEW supplies these arguments before the object is used.`;
 else if(line==='BEGIN')explanation='Start the main program. Definitions above this point run only when their method or constructor is invoked.';
 else if(line==='END')explanation='End the main program after all preceding selected statements complete.';
 else if(m=line.match(/^SET (.+?) = (.+)$/)){
  const rhs=m[2];explanation=/^NEW /.test(rhs)?`Construct the object using the declared constructor, then store its reference in ${m[1]}.`:`Evaluate ${rhs} using current values, then assign the result to the declared destination ${m[1]}.`;
 }
 else if(m=line.match(/^INPUT (.+)$/))explanation=`Read the next supplied test input into the declared destination ${m[1]}.${m[1].includes('[')?' The indices select one array element.':''}`;
 else if(m=line.match(/^OUTPUT (.+)$/))explanation=`Display ${m[1]}. Read variables at their current values and evaluate any expressions or returning method calls before displaying the result.`;
 else if(m=line.match(/^IF (.+) THEN$/))explanation=`Test ${m[1]}. Execute the following branch only if it is TRUE. Otherwise continue to an ELSEIF, ELSE or the matching ENDIF.`;
 else if(m=line.match(/^ELSEIF (.+) THEN$/))explanation=`After earlier conditions failed, test ${m[1]}. Run this branch if TRUE; otherwise continue to the next alternative.`;
 else if(line==='ELSE')explanation='Take this alternative only when the preceding IF or ELSEIF conditions in the same decision were false.';
 else if(line==='ENDIF')explanation='Close this decision and join control after its selected branch, unless a RETURN already ended the method.';
 else if(m=line.match(/^FOR (\w+) = (.+) TO (.+)$/))explanation=`Control the declared counter ${m[1]} from ${m[2]} through ${m[3]}, inclusive, increasing by 1. Skip the body when the initial upper-bound test fails.`;
 else if(line==='ENDFOR')explanation='Finish this loop body, advance its FOR counter and check the bound for the next iteration.';
 else if(m=line.match(/^WHILE (.+) DO$/))explanation=`Check ${m[1]} before the loop body. TRUE enters the body and FALSE leaves this loop. The relevant values must already be initialised.`;
 else if(line==='ENDWHILE')explanation='Return to the matching WHILE condition. The body has updated the input or counter that controls repetition.';
 else if(m=line.match(/^RETURN (.+)$/))explanation=`Evaluate ${m[1]}, return that value to the caller and end this method invocation immediately.`;
 else if(m=line.match(/^CALL (.+)$/))explanation=`Invoke ${m[1]} for its action. Arguments provide values for the declared parameters. Resume with the next caller statement when it finishes.`;
 else if(line==='ENDMETHOD')explanation='End this method definition. A no-value method returns control here. A returning method supplies its result with RETURN.';
 else if(line==='ENDCONSTRUCTOR')explanation='End construction. Its field assignments have established the initial state of the new object.';
 else if(line==='ENDCLASS')explanation='End this class definition. The main program creates instances with NEW rather than executing the class body as a main program.';
 else if(m=line.match(/^SWITCH (.+)$/))explanation=`Read the declared selector ${m[1]} and select a CASE with an equal value, or DEFAULT if none matches.`;
 else if(m=line.match(/^CASE (.+):$/))explanation=`This branch matches the literal ${m[1]}. Only the selected branch executes in this no-fall-through teaching dialect.`;
 else if(line==='DEFAULT:')explanation='Handle a selector value that matched none of the listed CASE values.';
 else if(line==='ENDSWITCH')explanation='End this selection and continue after it. No other CASE branch runs.';
 else throw Error('Missing explanation for line: '+line);
 return {line:i+1,code:raw,explanation};
 });
}
