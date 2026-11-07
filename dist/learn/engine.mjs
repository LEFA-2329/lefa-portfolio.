export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function normaliseLine(raw) {
  let text = '', quote = null;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (!quote && c === '/' && raw[i + 1] === '/') break;
    text += c;
    if ((c === '"' || c === "'") && raw[i - 1] !== '\\') quote = quote === c ? null : quote || c;
  }
  text = text.trim().replace(/;$/, '').trim();
  if (/^```/.test(text)) return '';
  text = text.replace(/^END\s+(IF|WHILE|FOR|CASE|METHOD|MODULE|FUNCTION)$/i, (_, k) => 'END' + k.toUpperCase());
  text = text.replace(/^ELSE\s+IF\b/i, 'ELSEIF').replace(/^DO\s+WHILE\b/i, 'WHILE');
  text = text.replace(/^PROCEDURE\b/i, 'METHOD').replace(/^ENDPROCEDURE$/i, 'ENDMETHOD');
  text = text.replace(/^(START|MAIN)$/i, 'BEGIN').replace(/^(STOP|ENDMAIN)$/i, 'END');
  text = text.replace(/^(PRINT|DISPLAY)\b/i, 'OUTPUT').replace(/^READ\b/i, 'INPUT');
  text = text.replace(/^NEXT(?:\s+\w+)?$/i, 'ENDFOR').replace(/^WEND$/i, 'ENDWHILE');
  text = text.replace(/^FOR\s+(\w+)\s+FROM\s+/i, 'FOR $1 = ');
  text = text.replace(/^UNTIL\s*\(/i, 'UNTIL (');
  if (/^(IF|ELSEIF)\s+/i.test(text) && !/\sTHEN$/i.test(text)) text += ' THEN';
  if (/^WHILE\s+/i.test(text) && !/\sDO$/i.test(text)) text += ' DO';
  text = text.replace(/^((?:METHOD|MODULE|FUNCTION)\s+[A-Za-z_]\w*)$/i, '$1()');
  text = text.replace(/^CALL\s+([A-Za-z_][\w.]*)$/i, 'CALL $1()');
  if (/^[A-Za-z_][\w.]*\s*\(.*\)$/.test(text) && !/^(INPUT|OUTPUT|IF|WHILE|UNTIL|RETURN|CALL)\b/i.test(text)) text = 'CALL ' + text;
  text = text.replace(/^(INTEGER|REAL|STRING|BOOLEAN)\s+([A-Za-z_]\w*(?:\[[^\]]*\])*)$/i, 'DECLARE $2 AS $1');
  if (/^[A-Za-z_][\w.]*(?:\[[^\]]+\])*\s*(?:=(?!=)|<-|←)/.test(text)) text = 'SET ' + text;
  return text.replace(/^(SET\s+[^=←]+?)\s*(?:<-|←)\s*/i, '$1 = ');
}
export function parse(source) {
  if (source.length > 100000) throw Error('This browser version accepts up to 100,000 characters. Split larger programs into modules.');
  const lines = source.split(/\r?\n/).map((s, i) => ({ text: normaliseLine(s), line: i + 1 })).filter(x => x.text);
  if (lines.length > 1000) throw Error('Use at most 1,000 non-empty lines for one diagram.');
  let i = 0;
  const modules = [];
  const error = (message, x = lines[i]) => { throw Error(`${x ? 'Line ' + x.line + ': ' : ''}${message}`); };
  function selection(condition, original, depth) {
    i++;
    const yes = block([/^ELSEIF\s/, /^ELSE$/, /^ENDIF$/], depth + 1);
    let no = [];
    const next = lines[i]?.text.match(/^ELSEIF\s+(.+)\s+THEN$/i);
    if (next) {
      no = [selection(next[1], lines[i], depth + 1)];
    } else {
      if (lines[i]?.text.toUpperCase() === 'ELSE') { i++; no = block([/^ENDIF$/], depth + 1); }
      if (lines[i]?.text.toUpperCase() !== 'ENDIF') error('IF needs a matching ENDIF or END IF.', original);
      i++;
    }
    return { type: 'if', condition, yes, no, line: original.line };
  }
  function block(stops = [], depth = 0) {
    if (depth > 16) error('Nesting exceeds 16 levels. Use smaller methods for a readable chart.');
    const out = [];
    while (i < lines.length) {
      const x = lines[i], t = x.text, u = t.toUpperCase();
      if (stops.some(s => s.test(u))) break;
      let m;
      if (u === 'BEGIN') {
        i++; const body = block([/^END$/], depth + 1);
        if (lines[i]?.text.toUpperCase() !== 'END') error('BEGIN needs END.', x);
        i++; out.push(...body);
      } else if ((m = t.match(/^IF\s+(.+)\s+THEN$/i))) {
        out.push(selection(m[1], x, depth));
      } else if ((m = t.match(/^WHILE\s+(.+)\s+DO$/i))) {
        i++; const body = block([/^ENDWHILE$/], depth + 1);
        if (lines[i]?.text.toUpperCase() !== 'ENDWHILE') error('WHILE needs ENDWHILE or END WHILE.', x);
        i++; out.push({ type: 'while', condition: m[1], body, line: x.line });
      } else if ((m = t.match(/^FOR\s+([A-Za-z_]\w*)\s*=\s*(.+?)\s+TO\s+(.+?)(?:\s+STEP\s+(-?\d+))?$/i))) {
        if (Number(m[4]) === 0) error('STEP cannot be zero.', x);
        i++; const body = block([/^ENDFOR$/], depth + 1);
        if (lines[i]?.text.toUpperCase() !== 'ENDFOR') error('FOR needs ENDFOR, END FOR or NEXT.', x);
        i++; out.push({ type: 'for', variable: m[1], from: m[2], to: m[3], step: Number(m[4] || 1), body, line: x.line });
      } else if (u === 'REPEAT') {
        i++; const body = block([/^UNTIL\s+/], depth + 1);
        const end = lines[i]?.text.match(/^UNTIL\s+(.+)$/i);
        if (!end) error('REPEAT needs UNTIL followed by a condition.', x);
        i++; out.push({ type: 'repeat', condition: end[1], body, line: x.line });
      } else if ((m = t.match(/^CASE\s+(.+)\s+OF$/i))) {
        i++; const branches = []; let otherwise = [];
        while (i < lines.length && !/^ENDCASE$/i.test(lines[i].text)) {
          const w = lines[i].text.match(/^WHEN\s+(.+):$/i);
          if (w) { i++; branches.push({ value: w[1], body: block([/^WHEN\s+/, /^OTHERWISE:$/, /^ENDCASE$/], depth + 1) }); }
          else if (/^OTHERWISE:$/i.test(lines[i].text)) { i++; otherwise = block([/^ENDCASE$/], depth + 1); break; }
          else error('CASE expects WHEN value: or OTHERWISE:.');
        }
        if (!/^ENDCASE$/i.test(lines[i]?.text || '')) error('CASE needs ENDCASE or END CASE.', x);
        if (!branches.length) error('CASE needs at least one WHEN branch.', x);
        i++; let tail = otherwise;
        for (const b of branches.reverse()) tail = [{ type: 'if', condition: `${m[1]} = ${b.value}`, yes: b.body, no: tail, line: x.line }];
        out.push(...tail);
      } else if ((m = t.match(/^(METHOD|MODULE|FUNCTION)\s+([A-Za-z_][\w.]*)\s*\(([^)]*)\)(?:\s+RETURNS\s+\w+)?$/i))) {
        if (depth > 0) error('Define methods outside other blocks.', x);
        if (modules.some(q => q.name.toLowerCase() === m[2].toLowerCase())) error('Use unique method names in the chart lab. Typed overload resolution is not supported.', x);
        i++; const end = 'END' + m[1].toUpperCase();
        const body = block([new RegExp('^' + end + '$')], depth + 1);
        if (lines[i]?.text.toUpperCase() !== end) error('Method needs ' + end + '.', x);
        i++; modules.push({ name: m[2], parameters: m[3], kind: m[1].toLowerCase(), body });
      } else if ((m = t.match(/^CALL\s+([A-Za-z_][\w.]*)\s*\((.*)\)$/i))) {
        out.push({ type: 'call', name: m[1], label: t, line: x.line }); i++;
      } else if (/^(INPUT|OUTPUT)\s+.+$/i.test(t)) {
        out.push({ type: 'io', label: t, line: x.line }); i++;
      } else if (/^RETURN(?:\s+.+)?$/i.test(t)) {
        out.push({ type: 'return', label: t, line: x.line }); i++;
      } else if (/^(DECLARE|CONSTANT|CONST)\s+\S.+$/i.test(t) || /^SET\s+[A-Za-z_][\w.]*(?:\[[^\]]+\])*\s*=\s*.+$/i.test(t)) {
        out.push({ type: 'process', label: t, line: x.line }); i++;
      } else if (/^(BREAK|CONTINUE)\b/i.test(t)) error('BREAK and CONTINUE are not supported yet. Express the exit in the loop condition.', x);
      else if (/^(END\w*|ELSE|ELSEIF|UNTIL)(?:\s|$)/i.test(t)) error('Unexpected ' + t + '. Check matching opening and closing blocks.', x);
      else error('Unrecognised statement. See the syntax guide; this converter does not support every pseudocode dialect.', x);
    }
    return out;
  }
  let main = block();
  if (!main.length) { const at = modules.findIndex(m => m.name.toLowerCase() === 'main'); if (at >= 0) main = modules.splice(at, 1)[0].body; }
  if (!main.length && !modules.length) throw Error('Enter some pseudocode first.');
  return { main, modules };
}
function words(text,max=30){const words=String(text).split(/\s+/),out=[];let row='';for(const w of words){if((row+' '+w).trim().length>max&&row){out.push(row);row=w}else row=(row+' '+w).trim()}if(row)out.push(row);return out;}
function svgText(text,x,y){const rows=words(text).slice(0,4);return `<text x="${x}" y="${y-(rows.length-1)*8}" text-anchor="middle" dominant-baseline="middle" font-family="Arial,sans-serif" font-size="13" fill="#172a43">${rows.map((r,i)=>`<tspan x="${x}" dy="${i?17:0}">${escapeHTML(r)}</tspan>`).join('')}</text>`}
function shell(body,w,h,title){return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escapeHTML(title)}"><title>${escapeHTML(title)}</title><defs><marker id="arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><path d="M0 0 L9 3.5 L0 7" fill="#66758c"/></marker></defs><rect width="100%" height="100%" fill="#fcfcff"/>${body}</svg>`}
export function flowchart(ast, module = 'main') {
  const sequence = module === 'main' ? ast.main : ast.modules.find(m => m.name === module)?.body;
  if (!sequence) throw Error('Unknown method.');
  const nodes = [], edges = [];
  let maxX = 500, minX = 0, maxY = 0;
  const point = (x, y) => ({ x, y });
  const edge = (a, b, label = '', via = []) => {
    if (!a || !b) return;
    const pts = [a, ...via, b];
    edges.push(`<path d="M${pts.map(p => `${p.x} ${p.y}`).join(' L')}" fill="none" stroke="#66758c" stroke-width="1.6" marker-end="url(#arrow)"/>${label ? `<text x="${(a.x + (via[0]?.x ?? b.x)) / 2 + 6}" y="${a.y + 17}" font-size="11" font-family="Arial" fill="#52617b">${escapeHTML(label)}</text>` : ''}`);
  };
  const node = (type, label, x, y) => {
    const w = 240, h = type === 'decision' ? 104 : 72;
    maxX = Math.max(maxX, x + w / 2 + 45); minX = Math.min(minX, x - w / 2 - 45); maxY = Math.max(maxY, y + h);
    const fill = type === 'decision' ? '#fff0ce' : type === 'io' ? '#e2f2ec' : type === 'terminal' ? '#eae7fc' : '#fff';
    const shape = type === 'decision' ? `<polygon points="${x},${y} ${x + w / 2},${y + h / 2} ${x},${y + h} ${x - w / 2},${y + h / 2}"/>` : type === 'io' ? `<polygon points="${x - w / 2 + 18},${y} ${x + w / 2},${y} ${x + w / 2 - 18},${y + h} ${x - w / 2},${y + h}"/>` : `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="${type === 'terminal' ? 36 : 7}"/>`;
    nodes.push(`<g fill="${fill}" stroke="#a5adc0" stroke-width="1.3"><title>${escapeHTML(label)}</title>${shape}</g>${type === 'call' ? `<path d="M${x - 100} ${y}v${h}M${x + 100} ${y}v${h}" stroke="#a5adc0"/>` : ''}${svgText(label, x, y + h / 2)}`);
    return { top: point(x, y), bottom: point(x, y + h), left: point(x - w / 2, y + h / 2), right: point(x + w / 2, y + h / 2) };
  };
  const width = list => Math.max(320, ...list.map(n => n.type === 'if' ? width(n.yes) + width(n.no) + 60 : n.body ? width(n.body) + 320 : 320));
  function draw(list, x, y) {
    let first = null, prev = null, cursor = y, ended = false;
    for (const n of list) {
      if (ended) throw Error(`Line ${n.line}: unreachable statement after an unconditional RETURN. Remove it or change the control structure.`);
      let entry, exit;
      if (n.type === 'if') {
        const test = node('decision', n.condition, x, cursor); entry = test.top;
        const wl = width(n.yes), wr = width(n.no), lx = x - (wr + 80) / 2, rx = x + (wl + 80) / 2;
        const yes = draw(n.yes, lx, cursor + 155), no = draw(n.no, rx, cursor + 155);
        edge(test.left, yes.start, 'True', [point(lx, test.left.y)]); edge(test.right, no.start, 'False', [point(rx, test.right.y)]);
        const bottom = Math.max(yes.bottom, no.bottom) + 45;
        exit = yes.end || no.end ? point(x, bottom) : null;
        edge(yes.end, exit, '', [point(lx, bottom)]); edge(no.end, exit, '', [point(rx, bottom)]); cursor = bottom + 55;
      } else if (n.type === 'while' || n.type === 'for') {
        let initial = null;
        if (n.type === 'for') { initial = node('process', `SET ${n.variable} = ${n.from}`, x, cursor); cursor += 110; }
        const condition = n.type === 'for' ? `${n.variable} ${n.step > 0 ? '<=' : '>='} ${n.to}` : n.condition;
        const test = node('decision', condition, x, cursor); entry = initial ? initial.top : test.top; if (initial) edge(initial.bottom, test.top);
        const body = draw(n.body, x, cursor + 160); edge(test.bottom, body.start, 'True'); let end = body.end;
        if (n.type === 'for' && end) { const inc = node('process', `SET ${n.variable} = ${n.variable} ${n.step > 0 ? '+' : '-'} ${Math.abs(n.step)}`, x, end.y + 40); edge(end, inc.top); end = inc.bottom; }
        const side = width(n.body) / 2 + 70; maxX = Math.max(maxX, x + side + 40); minX = Math.min(minX, x - side - 40);
        if (end) edge(end, test.right, '', [point(x, end.y + 30), point(x + side, end.y + 30), point(x + side, test.right.y)]);
        exit = point(x, Math.max(body.bottom, end?.y || 0) + 95); edge(test.left, exit, 'False', [point(x - side, test.left.y), point(x - side, exit.y)]); cursor = exit.y + 55;
      } else if (n.type === 'repeat') {
        const anchor = point(x, cursor), body = draw(n.body, x, cursor + 30); entry = anchor; edge(anchor, body.start);
        if (!body.end) { exit = null; cursor = body.bottom + 50; }
        else { const test = node('decision', n.condition, x, body.end.y + 45); edge(body.end, test.top); const side = width(n.body) / 2 + 60; minX = Math.min(minX, x - side - 40); edge(test.left, anchor, 'False', [point(x - side, test.left.y), point(x - side, anchor.y)]); exit = point(x, test.bottom.y + 55); edge(test.bottom, exit, 'True'); cursor = exit.y + 55; }
      } else {
        const shape = node(n.type === 'return' ? 'terminal' : n.type, n.label, x, cursor); entry = shape.top; exit = n.type === 'return' ? null : shape.bottom; cursor += 112;
      }
      if (!first) first = entry; if (prev) edge(prev, entry); prev = exit; ended = !exit;
    }
    if (!first) { const p = node('process', 'Continue', x, cursor); first = p.top; prev = p.bottom; cursor += 112; }
    return { start: first, end: prev, bottom: Math.max(cursor, prev?.y || 0) };
  }
  const w = width(sequence), cx = w / 2;
  if (w > 30000) throw Error('This chart is too wide to read safely. Generate separate method charts.');
  const start = node('terminal', module === 'main' ? 'Start' : module, cx, 28), body = draw(sequence, cx, 145); edge(start.bottom, body.start);
  if (body.end) { const end = node('terminal', 'End', cx, body.end.y + 45); edge(body.end, end.top); }
  const shift = minX < 0 ? -minX : 0, totalW = Math.max(w, maxX) + shift, height = maxY + 45;
  if (totalW > 30000 || height > 100000) throw Error('The diagram is too large for one view. Split it into methods.');
  return shell(`<g transform="translate(${shift} 0)">${edges.join('')}${nodes.join('')}</g>`, totalW, height, 'Flowchart for ' + module);
}
export function hierarchy(ast){
 const modules=new Map(ast.modules.map(m=>[m.name.toLowerCase(),m]));const relations=[],missing=new Set();const calls=(body)=>body.flatMap(n=>[...(n.type==='call'?[n.name]:[...String(n.label||'').matchAll(/\b([A-Za-z_]\w*)\s*\(/g)].map(m=>m[1]).filter(name=>modules.has(name.toLowerCase()))),...calls(n.yes||[]),...calls(n.no||[]),...calls(n.body||[])]);
 for(const [name,body]of [['Main',ast.main],...ast.modules.map(m=>[m.name,m.body])])for(const c of new Set(calls(body))){const resolved=modules.get(c.toLowerCase())?.name||c;relations.push([name,resolved]);if(!modules.has(c.toLowerCase()))missing.add(c);}
 const names=['Main',...ast.modules.map(m=>m.name),...missing];const unique=[...new Set(names)];const depth=new Map([['Main',0]]);for(let i=0;i<unique.length;i++)for(const[a,b]of relations)if(depth.has(a)&&!depth.has(b))depth.set(b,Math.min(5,depth.get(a)+1));for(const n of unique)if(!depth.has(n))depth.set(n,1);
 const levels=[];for(const n of unique)(levels[depth.get(n)]??=[]).push(n);const cols=Math.max(...levels.map(l=>l?.length||0),1),w=Math.max(600,cols*270+60),pos=new Map();let shapes='';levels.forEach((level,d)=>level?.forEach((name,i)=>{const x=w/2+(i-(level.length-1)/2)*270,y=45+d*160;pos.set(name,{x,y});shapes+=`<rect x="${x-115}" y="${y}" width="230" height="80" rx="8" fill="${name==='Main'?'#eae7fc':'#e2f2ec'}" stroke="#a5adc0"/>${svgText(name,x,y+40)}`;}));let edges='';for(const[a,b]of relations){const p=pos.get(a),q=pos.get(b);edges+=`<path d="M${p.x} ${p.y+80} L${q.x} ${q.y}" fill="none" stroke="#66758c" stroke-width="1.5" marker-end="url(#arrow)"/>`;}return {svg:shell(edges+shapes,w,levels.length*160+70,'Module call hierarchy'),missing:[...missing]};
}
export function classDiagram(){return shell(`<g fill="#fff" stroke="#a5adc0"><rect x="50" y="40" width="260" height="200" rx="8"/><rect x="400" y="40" width="260" height="200" rx="8"/><path d="M50 100H310M50 165H310M400 100H660M400 165H660"/></g>${svgText('Learner',180,72)}${svgText('- name: STRING',180,130)}${svgText('+ displayDetails()',180,200)}${svgText('Course',530,72)}${svgText('- title: STRING',530,130)}${svgText('+ enrol(learner)',530,200)}<path d="M310 140H400" stroke="#66758c" stroke-width="2"/><text x="326" y="125" fill="#52617b" font-size="12">enrols in</text>`,710,290,'Class diagram: Learner associated with Course');}

