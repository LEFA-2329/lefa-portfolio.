from pathlib import Path
import json,re,textwrap
from xml.sax.saxutils import escape
from docx import Document
from docx.shared import Inches,Pt,RGBColor
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Preformatted,PageBreak,KeepTogether
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
C=json.loads(Path('build/course.json').read_text());out=Path('dist/learn/downloads');out.mkdir(exist_ok=True)
entries=[]
for l in C['lessons']:
 for n,q in enumerate([l['quiz']]+C['practice'][l['id']]['quizzes'],1):
  entries.append(dict(id=l['id']+'-quiz-'+str(n),section='Unit '+str(l['unit'])+' '+l['title'],title='Knowledge check '+str(n),question=q['question']+'\n'+'\n'.join(chr(65+i)+'. '+o for i,o in enumerate(q['options'])),answer=chr(65+q['correct'])+'. '+q['options'][q['correct']]+'\n'+q['explanation']))
 b=l['bug'];entries.append(dict(id=l['id']+'-debug',section='Unit '+str(l['unit'])+' '+l['title'],title='Find and fix the error',question='Identify the faulty line, error category and correction.\n'+ '\n'.join(str(i+1)+'. '+x for i,x in enumerate(b['code'].splitlines())),answer='Line '+str(b['line'])+' - '+b['category']+'\n'+b['options'][b['correct']]+'\n'+b['explanation']))
 for t in C['practice'][l['id']]['tasks']:entries.append(dict(id=t['id'],section='Unit '+str(l['unit'])+' '+l['title'],title=t['title'],question=t['prompt'],answer=t['solution']+'\n\nReview:\n'+'\n'.join(t['checklist'])))
for t in C['taskBank']:entries.append(dict(id=t['id'],section='Task library '+t['topic'],title=t['title'],question=t['prompt'],answer=t['solution']+'\n\nReview:\n'+'\n'.join(t['checklist'])))
Path('build/pack-entries.json').write_text(json.dumps(entries));print(len(entries),'pack entries')
styles=getSampleStyleSheet();styles.add(ParagraphStyle(name='PackTitle',fontName='Helvetica-Bold',fontSize=25,leading=31,spaceAfter=18));styles.add(ParagraphStyle(name='PackSection',fontName='Helvetica-Bold',fontSize=16,leading=21,textColor=colors.HexColor('#0f766e'),spaceAfter=12));styles.add(ParagraphStyle(name='PackQuestion',fontName='Helvetica-Bold',fontSize=12,leading=17,spaceBefore=14,spaceAfter=8,keepWithNext=True));styles.add(ParagraphStyle(name='PackBody',fontName='Helvetica',fontSize=10,leading=15,spaceAfter=9));styles.add(ParagraphStyle(name='PackCode',fontName='Courier',fontSize=8.5,leading=12,spaceAfter=10))
def plain(s):return s.replace('→',' -> ').replace('·',' - ').replace('×','*').replace('−','-').replace('—','-').replace('–','-').replace('✓','Correct')
def pdfparts(s):
 # Preserve exact code indentation while wrapping long explanatory lines.
 lines=[]
 for line in plain(s).splitlines():lines.extend(textwrap.wrap(line,89,replace_whitespace=False,drop_whitespace=False) or [''])
 return [Preformatted(escape('\n'.join(lines)),styles['PackCode'])]
def footer(canvas,doc):
 canvas.setFillColor(colors.HexColor('#50677a'));canvas.setFont('Helvetica',8);canvas.drawString(42,25,'LogicLab - Supplementary Programming Logic and Design');canvas.drawRightString(A4[0]-42,25,str(doc.page))
for mode,label in [('questions','Questions only'),('answers','Answers only'),('questions-and-answers','Questions and answers')]:
 title='LogicLab Programming Logic and Design';doc=Document();sec=doc.sections[0];sec.top_margin=Inches(.7);sec.bottom_margin=Inches(.7);sec.left_margin=sec.right_margin=Inches(.7)
 doc.styles['Normal'].font.name='DejaVu Sans';doc.styles['Normal'].font.size=Pt(10)
 doc.styles['Title'].font.color.rgb=RGBColor(0,0,0);doc.styles['Title'].font.size=Pt(26)
 for st in ['Heading 1','Heading 2']:doc.styles[st].font.name='DejaVu Sans';doc.styles[st].font.color.rgb=RGBColor.from_string('0F766E')
 doc.add_paragraph(title,'Title');doc.add_paragraph(label,'Subtitle');intro=f'{len(entries)} numbered exercises covering the five learning units and task library. Use the same exercise numbers to match questions with the answer pack. Methods use zero-based arrays and inclusive FOR bounds. Written tasks can have other valid solutions.'
 doc.add_paragraph(intro);doc.add_paragraph('Questions only omits solutions. Answers only includes exercise labels and model solutions. The combined pack includes both. Downloads provide open revision material, so answers can be accessed directly.');story=[Paragraph(title,styles['PackTitle']),Paragraph(label,styles['PackSection']),Paragraph(intro,styles['PackBody']),Paragraph('Open revision material. Attempt each question before consulting the answer pack.',styles['PackBody'])]
 last=None
 for number,item in enumerate(entries,1):
  if item['section']!=last:
   doc.add_page_break();story.append(PageBreak());doc.add_heading(plain(item['section']),1);story.append(Paragraph(escape(plain(item['section'])),styles['PackSection']));last=item['section']
  h=f'Exercise {number} {plain(item["title"])}';doc.add_heading(h,2);story.append(Paragraph(escape(h),styles['PackQuestion']))
  for part in (['question'] if mode=='questions' else ['answer'] if mode=='answers' else ['question','answer']):
   if mode=='questions-and-answers':doc.add_paragraph('Question' if part=='question' else 'Model solution',style='Heading 3');story.append(Paragraph('Question' if part=='question' else 'Model solution',styles['PackQuestion']))
   val=plain(item[part])
   # Each code line remains a separate paragraph, preserving indent and allowing clean page breaks.
   for line in val.splitlines():
    pa=doc.add_paragraph();pa.paragraph_format.space_after=Pt(2);run=pa.add_run(line);run.font.name='DejaVu Sans Mono';run.font.size=Pt(9)
   story.extend(pdfparts(val));story.append(Spacer(1,8))
 doc.save(out/f'logiclab-{mode}.docx');SimpleDocTemplate(str(out/f'logiclab-{mode}.pdf'),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=42,bottomMargin=42,title=title+' '+label,author='Lefa Malatji').build(story,onFirstPage=footer,onLaterPages=footer)
 print(mode,'written')
