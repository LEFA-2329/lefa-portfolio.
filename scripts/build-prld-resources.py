"""Build PRLD5121 resources from live lessons plus clearly separated extension data.

Edit lessons in dist/learn/js/programming-logic/content. Edit additional written
practice and papers in scripts/study-packs/prld5121. No private premium inputs.
"""
import json, subprocess, re, textwrap, zipfile, importlib.util
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, XPreformatted, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from docx import Document
from docx.oxml.ns import qn
from docx.shared import Pt, Inches, RGBColor
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist/learn/downloads/modules'
DATA = ROOT / 'scripts/study-packs/prld5121'
INK = '#172943'
BLUE = '#2356a9'
GREEN = '#28764c'

def load_course():
    course = json.loads(subprocess.check_output(['node', str(ROOT / 'scripts/export-prld-course.mjs')], text=True))
    course['additional'] = json.loads((DATA / 'additional-practice.json').read_text())
    course['extra'] = json.loads((DATA / 'extra-topics.json').read_text())
    course['papers'] = json.loads((DATA / 'revision-papers.json').read_text())
    return course

def highlighted(line):
    pattern = '("[^"\\n]*"|//.*$|\\b(?:BEGIN|END|DECLARE|AS|SET|INPUT|OUTPUT|IF|THEN|ELSE|ELSEIF|ENDIF|FOR|TO|ENDFOR|WHILE|DO|ENDWHILE|METHOD|ENDMETHOD|RETURN|RETURNS|CLASS|ENDCLASS|PRIVATE|PUBLIC|NEW|CONSTRUCTOR|ENDCONSTRUCTOR|INHERITS|VIRTUAL|OVERRIDE|SWITCH|CASE|DEFAULT|ENDSWITCH|TRUE|FALSE|AND|OR|NOT|INTEGER|REAL|STRING|BOOLEAN|CALL|REPEAT|UNTIL|WHEN|OTHERWISE|ENDCASE)\\b)'
    pieces = []
    at = 0
    for match in re.finditer(pattern, line):
        pieces.append(escape(line[at:match.start()]))
        token = match.group()
        color = GREEN if token.startswith('//') else '#a24a16' if token.startswith('"') else BLUE
        pieces.append(f'<font color="{color}">{escape(token)}</font>')
        at = match.end()
    return ''.join(pieces) + escape(line[at:])

class Resource:

    def __init__(self, title):
        self.title = title
        self.story = []
        self.word = Document()
        sec = self.word.sections[0]
        sec.top_margin = sec.bottom_margin = Inches(0.7)
        for name in ['Normal', 'Body Text']:
            st = self.word.styles[name]
            st.font.name = 'Calibri'
            st.font.size = Pt(11)
            st.paragraph_format.space_after = Pt(7)
        self.word.styles['Title'].font.color.rgb = RGBColor(0, 0, 0)
        for style in self.word.styles:
            for border in list(style.element.iter(qn('w:pBdr'))):
                border.getparent().remove(border)
        self.styles = getSampleStyleSheet()
        for name in ['BodyText', 'Heading1', 'Heading2', 'Heading3', 'Title']:
            s = self.styles[name]
            s.textColor = colors.HexColor(INK)
            s.fontName = 'Helvetica' if name == 'BodyText' else 'Helvetica-Bold'
        self.styles['BodyText'].fontSize = 11
        self.styles['BodyText'].leading = 16
        self.styles['BodyText'].spaceAfter = 9
        self.styles['Title'].fontSize = 28
        self.styles['Title'].leading = 34
        for name in ['Heading1', 'Heading2', 'Heading3']:
            self.styles[name].keepWithNext = True
        self.styles.add(ParagraphStyle(name='CodeBlock', fontName='Courier', fontSize=8.5, leading=12, spaceAfter=12))
        self.h(title, 0)

    def h(self, text, level=1):
        self.story.append(Paragraph(escape(text), self.styles['Title' if level == 0 else 'Heading' + str(level)]))
        self.word.add_heading(text, level=level)

    def p(self, text):
        self.story.append(Paragraph(escape(text).replace('\n', '<br/>'), self.styles['BodyText']))
        self.word.add_paragraph(text)

    def code(self, code):
        lines = []
        for raw in code.splitlines():
            lines.extend(textwrap.wrap(raw, 86, replace_whitespace=False, drop_whitespace=False, subsequent_indent='  ') or [''])
        self.story.append(XPreformatted('\n'.join((highlighted(line) for line in lines)), self.styles['CodeBlock']))
        for line in lines:
            paragraph = self.word.add_paragraph()
            paragraph.paragraph_format.space_after = Pt(0)
            run = paragraph.add_run(line)
            run.font.name = 'Consolas'
            run.font.size = Pt(9)
            run.font.color.rgb = RGBColor.from_string(GREEN[1:] if line.lstrip().startswith('//') else BLUE[1:])

    def image(self, path, title):
        self.h(title, 2)
        w, h = ImageReader(str(path)).getSize()
        scale = min(500 / w, 310 / h)
        self.story.extend([Image(str(path), width=w * scale, height=h * scale), Spacer(1, 12)])
        self.word.add_picture(str(path), width=Inches(5.8))

    def page(self):
        self.story.append(PageBreak())
        self.word.add_page_break()

    def table(self, rows):
        available = A4[0] - 92
        n = len(rows[0])
        widths = [available / n] * n
        formatted = [[Paragraph(escape(str(v)), self.styles['BodyText']) for v in row] for row in rows]
        t = Table(formatted, colWidths=widths, repeatRows=1, hAlign='LEFT')
        t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#e5eefb')), ('GRID', (0, 0), (-1, -1), 0.4, colors.HexColor('#c7d4e5')), ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 7), ('TOPPADDING', (0, 0), (-1, -1), 6)]))
        self.story.extend([t, Spacer(1, 12)])
        table = self.word.add_table(rows=1, cols=n)
        table.style = 'Light Shading Accent 1'
        for i, val in enumerate(rows[0]):
            table.rows[0].cells[i].text = str(val)
        for row in rows[1:]:
            cells = table.add_row().cells
            for i, val in enumerate(row):
                cells[i].text = str(val)

    def save(self, base, word=False):

        def footer(c, d):
            c.setFont('Helvetica', 8)
            c.setFillColor(colors.HexColor(INK))
            c.drawString(46, 26, 'StudyLab . PRLD5121 . Lefa Malatji')
            c.drawRightString(A4[0] - 46, 26, str(d.page))
        doc = SimpleDocTemplate(str(OUT / (base + '.pdf')), pagesize=A4, leftMargin=46, rightMargin=46, topMargin=44, bottomMargin=48, title=self.title, author='Lefa Malatji', invariant=1)
        doc.build(self.story, onFirstPage=footer, onLaterPages=footer)
        if word:
            target = OUT / (base + '.docx')
            self.word.save(target)
            with zipfile.ZipFile(target) as archive:
                entries = [(item.filename, archive.read(item.filename)) for item in archive.infolist()]
            with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as archive:
                for name, content in entries:
                    info = zipfile.ZipInfo(name, (2026, 1, 1, 0, 0, 0))
                    info.compress_type = zipfile.ZIP_DEFLATED
                    archive.writestr(info, content)
        return doc.page

def build():
    c = load_course()
    lessons = c['lessons']
    extras = c['extra']
    questions = c['additional']
    bank = c['taskBank']
    papers = c['papers']
    guide = Resource('PRLD5121 Programming Logic Study Guide')
    guide.p('This guide supports all 22 lessons currently in StudyLab across five units. Learn the idea, follow a worked solution, trace it, then attempt the matching workbook task. Three extension chapters add SWITCH, two dimensional arrays and an integrated student marks project.')
    guide.p("Coverage is checked against the current StudyLab course, not a supplied official PRLD5121 outline. Use your lecturer's outline and notation for assessment. Examples are pseudocode designs, not Visual Studio programs. No material guarantees an examination result.")
    guide.h('How to use all the resources', 1)
    guide.p('1. Read the chapter and open the same online lesson. 2. Predict the worked output before checking the trace. 3. Complete the matching workbook task. 4. Use the answers to identify the exact error. 5. Retry with a changed input. 6. Take one mixed paper under timed conditions after completing the five units.')
    guide.h('Pseudocode conventions', 1)
    guide.p('DECLARE introduces a variable; SET assigns a value; INPUT reads; OUTPUT displays. IF closes with ENDIF. FOR includes its upper bound and a start greater than its end runs zero times for the positive default step. Array indexes start at 0. DIV is integer division and MOD is remainder. // begins a short comment. Indent blocks. A method declaration belongs outside BEGIN and END. Write all assumptions, including valid inputs and array length.')
    guide.p('Blue words show language keywords, brown text shows string literals and green text shows comments in the PDF. The online page follows the saved StudyLab theme. Browser tools support a documented subset: use written traces for unsupported class behaviour rather than treating a rendered diagram as proof of execution.')
    guide.h('Contents and coverage map', 1)
    guide.table([['Unit', 'Chapters', 'Focus']] + [[str(u['id']), ', '.join((str(i + 1) for i, l in enumerate(lessons) if l['unit'] == u['id'])), u['title']] for u in c['units']])
    for i, l in enumerate(lessons, 1):
        guide.p(f"{i}. {l['title']}")
    guide.p('Extensions: SWITCH; two dimensional arrays; integrated student marks project. The companion workbook contains 78 tasks: 25 chapter tasks and the existing 53-task practice bank. Mixed papers A and B each carry 100 marks.')
    diagrams = {d['lesson']: d for d in json.loads((DATA / 'diagrams.json').read_text())}
    for i, l in enumerate(lessons + extras, 1):
        guide.page()
        guide.h(f"Chapter {i} {l['title']}")
        guide.p('Unit ' + str(l['unit']) + ' . ' + ('Core lesson' if i <= 22 else 'Extension'))
        guide.h('What you should be able to do', 2)
        for outcome in l['outcomes']:
            guide.p(outcome)
        for section in l['sections']:
            guide.h(section['heading'], 2)
            guide.p(section['text'])
        guide.h('What you are building', 2)
        guide.p(l['examplePrompt'])
        if i in diagrams:
            guide.image(ROOT / f'dist/learn/images/study-packs/prld5121-lesson-{i}.png', diagrams[i]['title'])
        guide.h('Worked pseudocode', 2)
        guide.code(l['example'])
        guide.h('Follow the execution', 2)
        for step in l['exampleTrace']:
            guide.p(step)
        if i <= 22:
            bug = l['bug']
            guide.h('Debugging example', 2)
            guide.p(bug['prompt'])
            guide.code(bug['code'])
            guide.p('Find the incorrect line before reading the repair.')
            guide.h('Repair and explanation', 3)
            guide.code(bug['options'][bug['correct']])
            guide.p(bug['explanation'])
            guide.h('Independent practice', 2)
            guide.p('Attempt workbook task ' + str(i) + '. ' + questions[i - 1]['question'])
        else:
            guide.h('Independent practice', 2)
            guide.p(l['question'])
        guide.h('Check your readiness', 2)
        guide.p('Explain each variable, trace one ordinary case and one boundary case, then rewrite the solution without copying. Record any error and redo the task on another day.')
    guide.page()
    guide.h('Revision and self assessment')
    guide.table([['Skill', 'Ready when you can']] + [[l['title'], 'Explain it, trace it and solve its workbook task independently'] for l in lessons])
    guide.h('Useful StudyLab tools', 2)
    guide.p('Open https://lefamalatji.co.za/learn/prld5121/ for the complete linked route. Use lesson quizzes, debugging exercises, the task bank, pseudocode tracer, flowchart editor, guided traces and mixed practice exams. These browser tools help you practise; written diagram/design tasks still need your reasoning.')
    guide.h('Study plan', 2)
    guide.p('Work by unit rather than trying every topic in one sitting. After foundations, finish decisions and loops before array problems. Then practise methods and finally class design. Revisit a topic whenever its workbook answer needed help. Use Paper A, correct mistakes, revise weak topics and then use Paper B. There is no fixed number of days that suits every learner.')
    pages = guide.save('PRLD5121-Study-Guide', True)
    q = Resource('PRLD5121 Practice Workbook')
    a = Resource('PRLD5121 Worked Answers')
    q.p('78 tasks covering the full current StudyLab PRLD5121 course. Tasks 1-22 correspond to core lessons. Tasks 23-25 are extensions. Tasks 26-78 reuse the online practical bank. Write, trace, draw and debug; these are not only multiple choice questions.')
    q.p('Attempt each task before opening the answers. Each chapter task has a five-point self-check rubric. The additional online bank uses completion checklists. Work in sessions; the workbook is not one timed examination.')
    a.p('Use after an independent attempt. Chapter solutions give reasoning and a five-point self-check rubric, one point per criterion. Existing bank tasks use completion checklists, not numerical exam marks. Equivalent correct algorithms are acceptable when assumptions and outputs agree.')
    practice = questions + [dict(question=x['question'], answer=x['answer'], rubric=x['rubric']) for x in extras]
    for i, item in enumerate(practice, 1):
        title = lessons[i - 1]['title'] if i <= 22 else extras[i - 23]['title']
        q.h(f'Task {i} {title}')
        q.p(item['question'])
        q.p('Submit: your reasoning, solution or diagram, expected output and at least one boundary test. Five self-check points.')
        q.story.append(Spacer(1, 30))
        a.h(f'Answer {i} {title}')
        a.p(item['question'])
        a.p(item['answer'])
        a.h('Self check one point per item', 2)
        for criterion in item['rubric']:
            a.p(criterion)
    for i, item in enumerate(bank, 26):
        q.h(f"Task {i} {item['title']}")
        q.p(item['level'] + ' . ' + item['topic'])
        q.p(item['prompt'])
        q.story.append(Spacer(1, 25))
        a.h(f"Answer {i} {item['title']}")
        a.code(item['solution'])
        a.h('Completion checklist', 2)
        for criterion in item['checklist']:
            a.p(criterion)
    qpages = q.save('PRLD5121-Practice-Questions', True)
    apages = a.save('PRLD5121-Worked-Answers', True)
    paper = Resource('PRLD5121 Mixed Practice Papers')
    marks = Resource('PRLD5121 Mixed Practice Marking Guide')
    paper.p('Two original supplementary papers. Each paper has five written questions worth 20 marks each, totalling 100. Suggested time is 120 minutes per paper. These are practice papers, not official institutional examination papers. Work without the marking guide and state assumptions. Write answers separately. Use paper diagrams or a diagram editor.')
    marks.p('Mark each paper out of 100 using the explicit allocations. Award credit for equivalent correct methods. A correct final answer without requested working may not earn all design or trace marks. These rubrics support self-assessment and lecturer review.')
    for n, exam in enumerate(papers):
        if n:
            paper.page()
            marks.page()
        paper.h(exam['title'])
        marks.h(exam['title'])
        paper.p('120 minutes . 100 marks . Answer all five questions')
        assert sum((x['marks'] for x in exam['questions'])) == 100
        for j, item in enumerate(exam['questions'], 1):
            assert sum((v for _, v in item['criteria'])) == item['marks']
            paper.h(f"Question {j} {item['title']} 20 marks", 2)
            paper.p(item['question'])
            marks.h(f"Question {j} {item['title']}", 2)
            marks.p(item['solution'])
            marks.table([['Criterion', 'Marks']] + item['criteria'])
    pp = paper.save('PRLD5121-Mixed-Practice-Papers')
    mp = marks.save('PRLD5121-Mixed-Practice-Marking-Guide')
    ref = Resource('PRLD5121 Pseudocode Quick Reference')
    ref.p('Use alongside the full guide. This sheet summarises the teaching notation, typical mistakes and a final submission check.')
    for title, text in [('Sequence and variables', 'Declare before use. Initialise before reading. SET replaces the previous value. INPUT assigns a fresh value. A name such as totalSales communicates purpose.'), ('Selection', 'IF condition THEN ... ELSE ... ENDIF. AND needs both conditions, OR at least one and NOT reverses a Boolean. Check invalid inputs before classifying. Order thresholds to avoid unreachable branches.'), ('Repetition', 'FOR handles a known number of iterations. WHILE tests first and can run zero times. REPEAT tests after its body and runs at least once. Initialise before, update inside, and check termination.'), ('Counters and accumulators', 'count=count+1 counts events. total=total+value accumulates a quantity. Initialise once for the whole total, but restart a row total once for each new row.'), ('Arrays search and sort', 'Capacity n gives valid indexes0..n-1. Separate capacity from meaningful count. Linear search needs a not-found result. Bubble sort swaps neighbours and shrinks its bound. Swap associated parallel-array entries together.'), ('Methods', 'A parameter is declared in the header; an argument is supplied in a call. RETURN gives data to the caller; OUTPUT displays data. Local variables belong to their scope. A contract states allowed inputs and promised result.'), ('Objects', 'A class defines data and behaviour. NEW creates an instance. A constructor initialises state. Encapsulation controls access. Inheritance models is-a. Association models links. Overriding supports runtime polymorphism.'), ('Testing', 'Use ordinary, boundary and invalid inputs. Include empty data where permitted, duplicates, all-negative values for maximum searches and tied results. Predict independently, trace actual steps and compare.'), ('Submission check', 'Read the whole question. Declare variables. State indexing and input assumptions. Match opening and closing blocks. Show a labelled diagram and trace where requested. Include units in outputs and test every boundary.')]:
        ref.h(title, 2)
        ref.p(text)
    rp = ref.save('PRLD5121-Quick-Reference')
    import zipfile as zf
    ppt = 'PRLD5121-Illustrated-Revision.pptx'
    slides = 'PRLD5121-Revision-Slides.pdf'
    with zf.ZipFile(OUT / ppt) as z:
        slide_count = len([x for x in z.namelist() if re.fullmatch('ppt/slides/slide\\d+\\.xml', x)])

    def res(file, label, fmt, detail):
        return dict(file=file, label=label, format=fmt, detail=detail, bytes=(OUT / file).stat().st_size)
    resources = [res('PRLD5121-Study-Guide.pdf', 'Complete course study guide', 'PDF', f'{pages} pages . 22 core chapters and 3 extensions'), res('PRLD5121-Practice-Questions.pdf', 'Practice workbook', 'PDF', f'{qpages} pages . 78 written and practical tasks'), res('PRLD5121-Worked-Answers.pdf', 'Worked answers and checklists', 'PDF', f'{apages} pages . All 78 workbook solutions'), res(ppt, 'Illustrated revision', 'PPTX', f'{slide_count} editable slides'), res(slides, 'Slides for printing', 'PDF', f'{slide_count} slides'), res('PRLD5121-Mixed-Practice-Papers.pdf', 'Mixed practice papers A and B', 'PDF', f'{pp} pages . Two 100 mark papers'), res('PRLD5121-Mixed-Practice-Marking-Guide.pdf', 'Practice paper marking guide', 'PDF', f'{mp} pages . Worked answers and allocations'), res('PRLD5121-Quick-Reference.pdf', 'Pseudocode quick reference', 'PDF', f'{rp} pages . Notation and common mistakes')]
    for base, label in [('Study-Guide', 'Editable study guide'), ('Practice-Questions', 'Editable practice workbook'), ('Worked-Answers', 'Editable worked answers')]:
        resources.append(res('PRLD5121-' + base + '.docx', label, 'DOCX', 'Word document . Edit or print'))
    archive = 'PRLD5121-Complete-Free-Revision.zip'
    with zipfile.ZipFile(OUT / archive, 'w', zipfile.ZIP_DEFLATED) as z:
        for r in resources:
            info = zipfile.ZipInfo(r['file'], (2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            z.writestr(info, (OUT / r['file']).read_bytes())
    return dict(slug='prld5121', title='Programming Logic . PRLD5121', description='Full current StudyLab course: foundations, decisions, loops, arrays, methods and object-oriented design.', topics=[u['title'] for u in c['units']] + ['SWITCH, two dimensional arrays and integrated project'], resources=resources, archive=archive, archiveBytes=(OUT / archive).stat().st_size)
if __name__ == '__main__':
    print(json.dumps(build(), indent=2))
