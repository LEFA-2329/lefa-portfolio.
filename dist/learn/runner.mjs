import {parse} from './engine.mjs?v=10';
const numberPattern=/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/;
const identifier=/^[A-Za-z_]\w*$/;
const MAX_STRING=2000;
const reserved=new Set('DECLARE AS SET INPUT OUTPUT BEGIN END IF THEN ELSE ELSEIF ENDIF FOR TO STEP ENDFOR WHILE DO ENDWHILE REPEAT UNTIL SWITCH CASE DEFAULT ENDSWITCH CONSTANT CONST TRUE FALSE AND OR NOT DIV MOD METHOD MODULE FUNCTION RETURN CALL CLASS NEW INTEGER REAL STRING BOOLEAN'.split(' '));
const validName=name=>identifier.test(name)&&!reserved.has(name.toUpperCase());
class InputError extends Error{constructor(message){super(message);this.recoverable=true;}}
function tokens(source){
 const out=[];let at=0;
 while(at<source.length){const c=source[at];if(/\s/.test(c)){at++;continue;}
  if(c==='"'||c==="'"){const quote=c;let value='',closed=false;at++;while(at<source.length){let ch=source[at++];if(ch===quote){closed=true;break;}if(ch==='\\'){if(at>=source.length)break;const esc=source[at++];if(!['n','t','r','\\','"',"'"].includes(esc))throw Error('Unsupported string escape.');ch=({n:'\n',t:'\t',r:'\r'})[esc]??esc;}value+=ch;}if(!closed)throw Error('Close the quoted string.');if(value.length>MAX_STRING)throw Error('Text values may contain at most 2,000 characters.');out.push({kind:'literal',value});continue;}
  const num=source.slice(at).match(numberPattern);if(num){const value=Number(num[0]);if(!Number.isFinite(value))throw Error('Use a finite number.');out.push({kind:'literal',value});at+=num[0].length;continue;}
  const word=source.slice(at).match(/^[A-Za-z_]\w*/);if(word){const upper=word[0].toUpperCase();out.push(upper==='TRUE'||upper==='FALSE'?{kind:'literal',value:upper==='TRUE'}:['AND','OR','NOT','DIV','MOD'].includes(upper)?{kind:'op',value:upper}:{kind:'name',value:word[0]});at+=word[0].length;continue;}
  const op=source.slice(at).match(/^(>=|<=|<>|!=|==|[+\-*/=<>(),\[\]])/);if(op){out.push({kind:'op',value:op[0]});at+=op[0].length;continue;}
  throw Error(`Unsupported expression symbol ${JSON.stringify(c)}. Properties and method calls are not executable in this tracer.`);
 }
 if(out.length>500)throw Error('Keep each expression below 500 tokens.');return out;
}
const precedence={OR:1,AND:2,'=':3,'==':3,'<>':3,'!=':3,'<':3,'<=':3,'>':3,'>=':3,'+':4,'-':4,'*':5,'/':5,DIV:5,MOD:5};
function expressionList(source){const ts=tokens(source);let at=0,depth=0;
 function expression(min=0){if(++depth>40)throw Error('Expression nesting exceeds 40 levels.');let token=ts[at++],left;if(!token)throw Error('Expected a value or expression.');
  if(token.kind==='literal')left={type:'literal',value:token.value};
  else if(token.kind==='name'){left={type:'name',name:token.value};if(ts[at]?.value==='['){const indices=[];while(ts[at]?.value==='['){if(indices.length===2)throw Error('Only one-dimensional and two-dimensional arrays are supported.');at++;indices.push(expression());if(ts[at++]?.value!==']')throw Error('Array access needs a closing bracket.');}left={type:'element',name:token.value,indices};}}
  else if(token.value==='('){left={type:'group',value:expression()};if(ts[at++]?.value!==')')throw Error('Expression needs a closing parenthesis.');}
  else if(['-','+','NOT'].includes(token.value))left={type:'unary',op:token.value,value:expression(token.value==='NOT'?3:6)};
  else throw Error('Expected a number, quoted string, Boolean or declared variable.');
  while(at<ts.length){const op=ts[at].value,p=precedence[op];if(p===undefined||p<min)break;at++;if(p===3&&left.type==='binary'&&precedence[left.op]===3)throw Error('Combine separate comparisons with AND or OR.');left={type:'binary',op,left,right:expression(p+1)};}
  depth--;return left;
 }
 const result=[];if(!ts.length)throw Error('An expression is required.');do{result.push(expression());if(at===ts.length)break;if(ts[at++]?.value!==',')throw Error('Unexpected expression content. Use a supported expression, with one index for a list or two indexes for a grid. Method calls are not supported.');if(at===ts.length)throw Error('A value is required after the comma.');}while(at<ts.length);return result;
}
function one(source){const list=expressionList(source);if(list.length!==1)throw Error('Use a single expression here.');return list[0];}
function numeric(value){if(typeof value!=='number'||!Number.isFinite(value))throw Error('This operation requires a finite numeric value.');return value;}
function logical(value){if(typeof value!=='boolean')throw Error('A condition must be BOOLEAN, using TRUE/FALSE or a comparison.');return value;}
function bounded(value){if(typeof value==='number'&&!Number.isFinite(value))throw Error('The numeric result is not finite.');if(typeof value==='string'&&value.length>MAX_STRING)throw Error('Text values may contain at most 2,000 characters.');return value;}
function arrayIndex(v,indices){
 if(!v.array)throw Error(`${v.name} is not an array.`);
 const dimensions=v.dimensions||[v.value.length];
 if(indices.length!==dimensions.length)throw Error(`${v.name} requires ${dimensions.length} index${dimensions.length===1?'':'es'}; use ${v.name}${dimensions.map(()=> '[0]').join('')}.`);
 let offset=0;
 indices.forEach((index,axis)=>{const label=dimensions.length===2?(axis===0?'row':'column'):'index';if(!Number.isSafeInteger(index)||index<0||index>=dimensions[axis])throw Error(`${v.name} ${label} must be a whole number from 0 to ${dimensions[axis]-1}; received ${displayValue(index)}.`);offset=offset*dimensions[axis]+index;});
 return {offset,name:v.name+indices.map(i=>`[${i}]`).join('')};
}
function evaluate(node,env){
 if(node.type==='literal')return node.value;
 if(node.type==='group')return evaluate(node.value,env);
 if(node.type==='element'){const v=env.get(node.name.toLowerCase());if(!v)throw Error(`${node.name} must be declared before use.`);const ref=arrayIndex(v,node.indices.map(i=>evaluate(i,env)));if(v.value[ref.offset]===undefined)throw Error(`${ref.name} has not been assigned an input or initial value.`);return v.value[ref.offset];}
 if(node.type==='name'){const v=env.get(node.name.toLowerCase());if(!v)throw Error(`${node.name} must be declared before use.`);if(v.array)throw Error(`Use ${v.name}${v.dimensions.map(()=>"[0]").join("")} to read one array element.`);if(v.value===undefined)throw Error(`${v.name} has not been assigned an input or initial value.`);return v.value;}
 if(node.type==='unary'){const v=evaluate(node.value,env);return node.op==='NOT'?!logical(v):bounded(node.op==='-'?-numeric(v):numeric(v));}
 const a=evaluate(node.left,env);if(node.op==='AND')return logical(a)?logical(evaluate(node.right,env)):false;if(node.op==='OR')return logical(a)?true:logical(evaluate(node.right,env));const b=evaluate(node.right,env);let v;
 switch(node.op){case '+':if(typeof a==='string'&&typeof b==='string')v=a+b;else v=numeric(a)+numeric(b);break;case '-':v=numeric(a)-numeric(b);break;case '*':v=numeric(a)*numeric(b);break;case '/':case 'DIV':case 'MOD':numeric(a);numeric(b);if(b===0)throw Error('Division by zero is not allowed.');v=node.op==='/'?a/b:node.op==='DIV'?Math.trunc(a/b):a-Math.trunc(a/b)*b;break;
 case '=':case '==':case '<>':case '!=':if(typeof a!==typeof b)throw Error('Compare values of matching types.');v=node.op==='='||node.op==='=='?a===b:a!==b;break;
 case '<':v=numeric(a)<numeric(b);break;case '<=':v=numeric(a)<=numeric(b);break;case '>':v=numeric(a)>numeric(b);break;case '>=':v=numeric(a)>=numeric(b);break;default:throw Error('Unsupported operator.');}
 return bounded(v);
}
function typed(value,type){if(type==='INTEGER'){numeric(value);if(!Number.isSafeInteger(value))throw Error('INTEGER requires a whole number within the safe integer range.');}else if(type==='REAL'||type==='NUM')numeric(value);else if(type==='STRING'){if(typeof value!=='string')throw Error('STRING requires a text value in quotation marks in code.');}else if(type==='BOOLEAN')logical(value);else throw Error('Use NUM, INTEGER, REAL, STRING or BOOLEAN.');return bounded(value);}
function inputValue(raw,type){if(type==='STRING'){try{return bounded(String(raw));}catch(err){throw new InputError(err.message);}}const text=String(raw).trim();if(type==='BOOLEAN'){if(!/^(true|false)$/i.test(text))throw new InputError('Enter TRUE or FALSE without quotation marks.');return /^true$/i.test(text);}if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(text))throw new InputError('Enter a number using a decimal point, without text or quotation marks.');try{return typed(Number(text),type);}catch(err){throw new InputError(err.message);}}
export function displayValue(value){return value===undefined?'Not assigned':typeof value==='boolean'?(value?'TRUE':'FALSE'):String(value);}
function target(source){const expr=one(source);if(!['name','element'].includes(expr.type)||!validName(expr.name))throw Error('Use a declared variable or one array element as the target.');return expr;}
function compile(source){
 if(source.length>20000||source.split(/\r?\n/).filter(x=>x.trim()).length>300)throw Error('Keep a trace below 20,000 characters and 300 non-empty lines.');
 if(/^\s*(?:CLASS|(?:PUBLIC|PRIVATE|PROTECTED)\b)/im.test(source))throw Error('This tracer runs main programs. Classes, objects and access modifiers remain written exercises.');
 const ast=parse(source);if(ast.modules.length)throw Error('Methods and modules are not executable in this first tracer. Use a main program with declared variables and one-dimensional or two-dimensional arrays.');
 const program=[];let loopId=0;const repeatEnds=new Map(),repeats=[];source.split(/\r?\n/).forEach((line,i)=>{if(/^\s*REPEAT(?:\s*\/\/.*)?\s*$/i.test(line))repeats.push(i+1);if(/^\s*UNTIL\s+/i.test(line))repeatEnds.set(repeats.pop(),i+1);});
 const add=x=>(program.push(x),program.length-1);
 function block(nodes){for(const n of nodes){try{
  if(n.type==='process'){let m;if(m=n.label.match(/^DECLARE\s+([A-Za-z_]\w*)((?:\[[^\]]+\]){1,2})\s+AS\s+(INTEGER|REAL|NUM|STRING|BOOLEAN)$/i)){if(!validName(m[1]))throw Error('An array name cannot be a keyword.');add({op:'array',name:m[1],sizes:[...m[2].matchAll(/\[([^\]]+)\]/g)].map(x=>one(x[1])),type:m[3].toUpperCase(),line:n.line});}
   else if(m=n.label.match(/^DECLARE\s+(.+?)\s+AS\s+(INTEGER|REAL|NUM|STRING|BOOLEAN)(?:\s*=\s*(.+))?$/i)){const names=m[1].split(',').map(x=>x.trim());if(!names.every(validName))throw Error('Declare names that are not keywords. Use DECLARE values[5] AS INTEGER or DECLARE grid[2][3] AS INTEGER; initialise its elements individually.');add({op:'declare',names,type:m[2].toUpperCase(),initial:m[3]?one(m[3]):null,line:n.line});}
   else if(m=n.label.match(/^(?:CONSTANT|CONST)\s+(\w+)(?:\s+AS\s+(INTEGER|REAL|NUM|STRING|BOOLEAN))?\s*=\s*(.+)$/i)){if(!validName(m[1]))throw Error('A constant name cannot be a keyword.');add({op:'constant',name:m[1],type:m[2]?.toUpperCase(),expr:one(m[3]),line:n.line});}
   else if(m=n.label.match(/^SET\s+([A-Za-z_]\w*(?:\[[^\]]+\]){0,2})\s*=\s*(.+)$/i))add({op:'set',target:target(m[1]),expr:one(m[2]),line:n.line});else throw Error('Use DECLARE name AS type, CONSTANT name = value, or SET name = expression. Assign one array element at a time; whole-array and object assignments are not supported.');
  }else if(n.type==='io'){const m=n.label.match(/^(INPUT|OUTPUT)\s+(.+)$/i);if(m[1].toUpperCase()==='INPUT'){add({op:'input',target:target(m[2].trim()),line:n.line});}else add({op:'output',expressions:expressionList(m[2]),line:n.line});}
  else if(n.type==='if'){const at=add({op:'branch',expr:one(n.condition),yes:program.length+1,no:0,line:n.line,condition:n.condition});block(n.yes);const skip=add({op:'jump',to:0});program[at].no=program.length;block(n.no);program[skip].to=program.length;}
  else if(n.type==='while'){const at=add({op:'branch',mode:'while',expr:one(n.condition),yes:program.length+1,no:0,line:n.line,condition:n.condition});block(n.body);add({op:'jump',to:at});program[at].no=program.length;}
  else if(n.type==='for'){const id=loopId++;add({op:'forinit',id,name:n.variable,from:one(n.from),to:one(n.to),step:n.step,line:n.line});const at=add({op:'fortest',id,name:n.variable,yes:program.length+1,no:0,line:n.line});block(n.body);add({op:'forinc',id,name:n.variable,line:n.line});add({op:'jump',to:at});program[at].no=program.length;}
  else if(n.type==='repeat'){const at=add({op:'repeat',line:n.line});block(n.body);const test=add({op:'branch',expr:one(n.condition),yes:0,no:at,line:repeatEnds.get(n.line)||n.line,condition:n.condition,until:true});program[test].yes=program.length;}
  else throw Error('Calls and RETURN are not executable in this tracer.');
 }catch(err){throw Error(`Line ${n.line}: ${err.message}`);}}}
 block(ast.main);return program;
}
export function createRunner(source,{maxSteps=2000}={}){
 const program=compile(String(source));const env=new Map(),loops=new Map(),output=[];let pc=0,steps=0,finished=false,failed=false;
 const snapshot=(extra={})=>({kind:'step',steps,variables:[...env.values()].map(v=>({...v,value:v.array?[...v.value]:v.value,...(v.array?{dimensions:[...v.dimensions]}:{})})),output:[...output],...extra});
 const variable=name=>{const v=env.get(name.toLowerCase());if(!v)throw Error(`${name} must be declared before use.`);return v;};
 const resolve=t=>{const v=variable(t.name);if(t.type==='element'){const ref=arrayIndex(v,t.indices.map(i=>evaluate(i,env)));return {v,index:ref.offset,name:ref.name};}if(v.array)throw Error(`Use one element such as ${v.name}${v.dimensions.map(()=>"[0]").join("")} as the target.`);return {v,index:null,name:v.name};};
 const write=(ref,value)=>{if(ref.v.constant)throw Error(`${ref.v.name} is a constant and cannot be reassigned.`);const result=typed(value,ref.v.type);if(ref.index===null)ref.v.value=result;else ref.v.value[ref.index]=result;};
 const assign=(name,value)=>{const v=variable(name);write(resolve({type:'name',name}),value);};
 return {initial:()=>snapshot({kind:'ready',line:null,note:'Ready. Next step executes the first statement.'}),step(rawInput){
  if(failed)throw Error('This run has stopped. Prepare the code again after correcting it.');if(finished)return snapshot({kind:'done',line:null,note:'Program completed.'});let ins;
  try{
   let jumps=0;while(program[pc]?.op==='jump'){pc=program[pc].to;if(++jumps>3000)throw Error('Control-flow limit reached.');}
   if(pc>=program.length){finished=true;return snapshot({kind:'done',line:null,note:'Program completed.'});}
   ins=program[pc];if(steps>=maxSteps)throw Error(`Stopped after ${maxSteps} steps. Check for a loop whose condition never changes.`);
   let note='',changed=[],condition=null;
   switch(ins.op){
    case 'array':{if(env.has(ins.name.toLowerCase()))throw Error(`${ins.name} is already declared.`);if(env.size>=50)throw Error('Use at most 50 variables.');const dimensions=ins.sizes.map(x=>evaluate(x,env));if(dimensions.some(x=>!Number.isSafeInteger(x)||x<1||x>100))throw Error('Each array dimension must be a positive whole number, with at most 100 elements across all arrays.');const size=dimensions.reduce((a,b)=>a*b,1),allocated=[...env.values()].reduce((sum,v)=>sum+(v.array?v.value.length:0),0);if(!Number.isSafeInteger(size)||size<1||size>100||allocated+size>100)throw Error('Declare positive whole-number array sizes with at most 100 elements across all arrays.');env.set(ins.name.toLowerCase(),{name:ins.name,type:ins.type,array:true,dimensions,value:Array(size).fill(undefined),constant:false});changed=[ins.name];note=`Declare ${ins.name}${dimensions.map(x=>`[${x}]`).join('')} with ${size} ${ins.type} elements. ${dimensions.length===2?`Rows: 0 to ${dimensions[0]-1}; columns: 0 to ${dimensions[1]-1}.`:`Valid indexes: 0 to ${size-1}.`} Each element starts unassigned.`;pc++;break;}
    case 'declare':{if(env.size+ins.names.length>50)throw Error('Use at most 50 variables.');const keys=ins.names.map(n=>n.toLowerCase());if(new Set(keys).size!==keys.length||keys.some(k=>env.has(k)))throw Error('A variable is already declared. Keep declarations outside repeated loops.');const value=ins.initial?typed(evaluate(ins.initial,env),ins.type):undefined;for(const name of ins.names)env.set(name.toLowerCase(),{name,type:ins.type,value,constant:false});changed=ins.names;note=`Declare ${ins.names.join(', ')} as ${ins.type}${ins.initial?' and assign the initial value.':'. The value is not assigned yet.'}`;pc++;break;}
    case 'constant':{if(env.has(ins.name.toLowerCase()))throw Error(`${ins.name} is already declared.`);if(env.size>=50)throw Error('Use at most 50 variables.');const value=evaluate(ins.expr,env),type=ins.type||(typeof value==='string'?'STRING':typeof value==='boolean'?'BOOLEAN':Number.isSafeInteger(value)?'INTEGER':'REAL');env.set(ins.name.toLowerCase(),{name:ins.name,type,value:typed(value,type),constant:true});changed=[ins.name];note=`Define constant ${ins.name} = ${displayValue(value)}.`;pc++;break;}
    case 'set':{const ref=resolve(ins.target),value=evaluate(ins.expr,env);write(ref,value);changed=[ref.name];note=`Assign ${displayValue(value)} to ${ref.name}.`;pc++;break;}
    case 'input':{const ref=resolve(ins.target),v=ref.v;if(v.constant)throw Error('A constant cannot receive INPUT.');if(rawInput===undefined)return snapshot({kind:'input',line:ins.line,name:ref.name,type:v.type,note:`Waiting for ${ref.name} (${v.type}).`});const value=inputValue(rawInput,v.type);write(ref,value);changed=[ref.name];note=`INPUT stores ${displayValue(value)} in ${ref.name}.`;pc++;break;}
    case 'output':{const text=ins.expressions.map(x=>displayValue(evaluate(x,env))).join(', ');if(output.length>=200||output.reduce((sum,x)=>sum+x.length,0)+text.length>10000)throw Error('Output limit reached: 200 output records or 10,000 characters.');output.push(text);note=`Display ${text===''?'an empty line':text}.`;pc++;break;}
    case 'branch':{condition=logical(evaluate(ins.expr,env));pc=condition?ins.yes:ins.no;note=`${ins.condition} is ${condition?'TRUE':'FALSE'}. ${ins.until?(condition?'Leave the REPEAT loop.':'Repeat the body.'):(ins.mode==='while'?(condition?'Enter the WHILE body.':'Leave the WHILE loop.'):(condition?'Follow the true branch.':'Follow the false branch.'))}`;break;}
    case 'forinit':{const v=variable(ins.name);if(v.array||!['INTEGER','NUM'].includes(v.type))throw Error('A FOR counter must be declared INTEGER or NUM and use whole-number values.');const start=typed(evaluate(ins.from,env),'INTEGER'),end=typed(evaluate(ins.to,env),'INTEGER');assign(ins.name,start);loops.set(ins.id,{end,step:ins.step});changed=[ins.name];note=`Initialise ${v.name} = ${start}. The upper bound ${end} and STEP ${ins.step} are fixed for this loop entry.`;pc++;break;}
    case 'fortest':{const loop=loops.get(ins.id),v=variable(ins.name);const counter=typed(v.value,'INTEGER');condition=loop.step>0?counter<=loop.end:counter>=loop.end;pc=condition?ins.yes:ins.no;note=`Test ${v.name} ${loop.step>0?'<=':'>='} ${loop.end}: ${displayValue(condition)}. ${condition?'Enter the loop body.':'Leave the FOR loop.'}`;break;}
    case 'forinc':{const loop=loops.get(ins.id),v=variable(ins.name);assign(ins.name,typed(typed(v.value,'INTEGER')+loop.step,'INTEGER'));changed=[ins.name];note=`Advance ${v.name} by ${loop.step} to ${v.value}, then check the loop bound again.`;pc++;break;}
    case 'repeat':note='Enter the REPEAT body before testing UNTIL.';pc++;break;
    default:throw Error('Unknown trace instruction.');
   }
   steps++;return snapshot({line:ins.line,note,changed,condition});
  }catch(err){if(!err.recoverable)failed=true;err.line=ins?.line;err.message=(err.line?'Line '+err.line+': ':'')+err.message;throw err;}
 }};
}

