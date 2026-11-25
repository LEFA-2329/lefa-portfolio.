"""Build the WEDE5020 guide and practice PDFs from the lessons used on the site."""
from pathlib import Path
import json
import subprocess
import textwrap
from xml.sax.saxutils import escape
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import PageBreak, Paragraph, Preformatted, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = ROOT / 'dist/learn/downloads'
OUT = DOWNLOADS / 'modules'
SAMPLE = ROOT / 'scripts/study-packs/wede5020/repair-cafe'
BLUE = colors.HexColor('#15384e')
TEAL = colors.HexColor('#12655d')
INK = colors.HexColor('#1d3341')
MUTED = colors.HexColor('#496474')
STYLES = {
    'label': ParagraphStyle('Label', fontName='Helvetica-Bold', fontSize=9, leading=12, spaceAfter=7, textColor=TEAL),
    'title': ParagraphStyle('Title', fontName='Helvetica-Bold', fontSize=24, leading=27, spaceAfter=12, textColor=BLUE),
    'sub': ParagraphStyle('Sub', fontName='Helvetica-Bold', fontSize=12, leading=15, spaceBefore=6, spaceAfter=5, textColor=BLUE, keepWithNext=True),
    'body': ParagraphStyle('Body', fontName='Helvetica', fontSize=10.5, leading=14.2, spaceAfter=6, textColor=INK),
    'note': ParagraphStyle('Note', fontName='Helvetica', fontSize=9.5, leading=13.4, spaceAfter=5, textColor=MUTED),
    'code': ParagraphStyle('Code', fontName='Courier', fontSize=8.5, leading=11.1, leftIndent=10, rightIndent=9, spaceBefore=4, spaceAfter=9, textColor=BLUE),
}

def para(text, style='body'):
    return Paragraph(escape(text), STYLES[style])

def code(text):
    lines = []
    for line in text.splitlines():
        wrapped = textwrap.wrap(line, width=87, replace_whitespace=False, drop_whitespace=False, subsequent_indent='  ')
        lines.extend(wrapped or [''])
    return Preformatted('\n'.join(lines), STYLES['code'])

def frame(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(TEAL)
    canvas.rect(0, height - 6, width, 6, stroke=0, fill=1)
    canvas.setStrokeColor(colors.HexColor('#bed1d5'))
    canvas.line(46, 38, width-46, 38)
    canvas.setFillColor(MUTED)
    canvas.setFont('Helvetica', 8)
    canvas.drawString(46, 23, 'StudyLab  /  WEDE5020   ·   Web Development (Introduction)')
    canvas.drawRightString(width-46, 23, str(doc.page))
    canvas.restoreState()

def write_pdf(filename, title, pages):
    doc = SimpleDocTemplate(str(OUT/filename), pagesize=A4, leftMargin=46, rightMargin=46,
                            topMargin=42, bottomMargin=49, title=title, author='StudyLab', invariant=1)
    story = []
    for page in pages:
        if story:
            story.append(PageBreak())
        story.extend(page)
    doc.build(story, onFirstPage=frame, onLaterPages=frame)
    return doc.page

def lesson_guide(units):
    intro = [para('WEDE5020   /   STUDY GUIDE', 'label'), para('Web Development (Introduction)', 'title'),
             para('Build a website for a campus repair café. Use each lesson to make one decision, try one example and test the result on your own page.'),
             para('Your learning route', 'sub')]
    for unit in units:
        intro.extend([para(f"Unit {unit['id']}  ·  {unit['title']}", 'sub'), para(unit['goal'])])
    intro.extend([para('Course sources', 'sub'),
                  para('The 2026 IIE WEDE5020 Module Outline supplies the unit sequence and learning outcomes. The supplied Module Manual excerpt covers Units 1 and 2. The examples and exercises in this guide are original StudyLab material.', 'note'),
                  para('Open the interactive lessons at https://lefamalatji.co.za/learn/#wede', 'note')])
    pages = [intro]
    for unit in units:
        for lesson in unit['lessons']:
            page = [para(f"UNIT {unit['id']}   /   {lesson['outcomes']}", 'label'), para(lesson['title'], 'title')]
            for heading, body in lesson['sections']:
                page.extend([para(heading, 'sub'), para(body)])
            page.extend([para('Key concepts', 'sub'), para(lesson['tutorial'][0])])
            page.extend([para(lesson['example'], 'sub'), code(lesson['code']), para(lesson['result']),
                         para('Practise', 'sub'), para(lesson['task'])])
            pages.append(page)
    return pages

def practice_pages(units, answers):
    pages = []
    for unit in units:
        heading = 'WORKED ANSWERS' if answers else 'PRACTICE WORKBOOK'
        page = [para('WEDE5020   /   ' + heading, 'label'),
                para(f"Unit {unit['id']}. {unit['title']}", 'title')]
        if not answers:
            page.append(para('Try each task in your own project or on paper. Record the change you made and the result you observed.'))
        for number, lesson in enumerate(unit['lessons'], 1):
            page.extend([para(f"{unit['id']}.{number}   {lesson['title']}", 'sub'),
                         para(lesson['task'])])
            if answers:
                model = lesson['solution']
                page.append(code(model) if '\n' in model else para(model))
            else:
                page.extend([para('Hint: ' + lesson['hint'], 'note'), Spacer(1, 12)])
            for exercise, answer in zip(lesson['tutorial'][1::2], lesson['tutorial'][2::2]):
                page.append(para(exercise))
                if answers:
                    page.append(para(answer, 'note'))
        page.extend([para('Project checkpoint', 'sub'), para(unit['checkpoint'])])
        pages.append(page)
    return pages

def archive(destination, entries):
    destination.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(destination, 'w') as bundle:
        for filename, path in entries:
            info = ZipInfo(filename, (2026, 1, 1, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            bundle.writestr(info, path.read_bytes())

def build():
    query = "import {wedeUnits} from './dist/learn/js/web-development/content/course.mjs'; import {tutorials} from './dist/learn/js/web-development/content/tutorials.mjs'; console.log(JSON.stringify(wedeUnits.map(unit => ({...unit, lessons: unit.lessons.map(lesson => ({...lesson, tutorial: tutorials[lesson.slug]}))}))));"
    units = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', query], cwd=ROOT))
    lessons = sum(len(unit['lessons']) for unit in units)
    resources = []
    def add(filename, label, file_type, detail):
        resources.append(dict(file=filename, label=label, format=file_type, detail=detail, bytes=(OUT/filename).stat().st_size))

    for filename, label, pages, detail in [
        ('WEDE5020-Study-Guide.pdf', 'Study guide', lesson_guide(units), f'{lessons} worked lessons'),
        ('WEDE5020-Practice-Questions.pdf', 'Practice workbook', practice_pages(units, False), f'{lessons * 3} exercises'),
        ('WEDE5020-Worked-Answers.pdf', 'Worked answers', practice_pages(units, True), 'Model answers and project checkpoints'),
    ]:
        count = write_pdf(filename, 'WEDE5020 ' + label, pages)
        add(filename, label, 'PDF', f'{count} pages · {detail}')
    # PowerPoint and its print copy are maintained together, as for the other modules.
    deck = 'WEDE5020-Revision.pptx'
    with ZipFile(OUT/deck) as files:
        slide_count = sum(p.startswith('ppt/slides/slide') and p.endswith('.xml') for p in files.namelist())
    add(deck, 'Editable revision slides', 'PPTX', f'{slide_count} slides · Examples across seven units')
    add('WEDE5020-Revision-Slides.pdf', 'Slides for printing', 'PDF', f'{slide_count} slides')
    bundle = 'WEDE5020-Complete-Free-Revision.zip'
    archive(OUT/bundle, [(r['file'], OUT/r['file']) for r in resources])
    archive(DOWNLOADS/'web-development/WEDE5020-Repair-Cafe.zip',
            [('repair-cafe/' + p.relative_to(SAMPLE).as_posix(), p) for p in sorted(SAMPLE.rglob('*')) if p.is_file()])
    return dict(slug='wede5020', title='Web Development (Introduction) · WEDE5020',
                description='Plan, build, style and publish a campus repair café website.',
                topics=[u['title'] for u in units], resources=resources, archive=bundle,
                archiveBytes=(OUT/bundle).stat().st_size)
