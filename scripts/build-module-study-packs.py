"""Build named public PDF resources and their download catalogue.

Edit scripts/study-packs/teaching-chapters.json for explanations and
free-revision-questions.json for the short practice set. PowerPoint decks
are editable published resources maintained separately in downloads/modules.
Premium exams, question banks and private project bundles are not copied here.
"""
from pathlib import Path
from xml.sax.saxutils import escape
import json,zipfile,textwrap
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,PageBreak,Image,Preformatted,KeepTogether
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'dist/learn/downloads/modules';OUT.mkdir(exist_ok=True)
DATA=ROOT/'scripts/study-packs'
MODULES=json.loads((DATA/'free-revision-questions.json').read_text())
CHAPTERS=json.loads((DATA/'teaching-chapters.json').read_text())
S=getSampleStyleSheet()
for name in ['Normal','BodyText','Heading1','Heading2','Heading3','Title']:
 S[name].fontName='Helvetica' if name in ['Normal','BodyText'] else 'Helvetica-Bold';S[name].textColor=colors.HexColor('#172943')
for heading in ['Heading1','Heading2','Heading3']:S[heading].keepWithNext=True
S['BodyText'].fontSize=11;S['BodyText'].leading=16;S['BodyText'].spaceAfter=10
S['Title'].fontSize=28;S['Title'].leading=34;S['Title'].spaceAfter=22
S['Heading1'].fontSize=21;S['Heading1'].leading=27;S['Heading1'].spaceAfter=15
S['Heading2'].fontSize=15;S['Heading2'].leading=21;S['Heading2'].spaceBefore=14;S['Heading2'].spaceAfter=9
S.add(ParagraphStyle(name='StudyCode',fontName='Courier',fontSize=9,leading=12,textColor=colors.HexColor('#2356a9'),spaceAfter=12))
S.add(ParagraphStyle(name='SmallNote',fontName='Helvetica',fontSize=9,leading=13,textColor=colors.HexColor('#52637a'),spaceAfter=9))
def p(text,style='BodyText'):return Paragraph(escape(str(text)).replace('\n','<br/>'),S[style])
def code(text):
 lines=[]
 for line in text.splitlines():lines.extend(textwrap.wrap(line,82,replace_whitespace=False,drop_whitespace=False,subsequent_indent='  ') or [''])
 return Preformatted('\n'.join(lines),S['StudyCode'])
def footer(c,d):
 c.saveState();c.setFont('Helvetica',8);c.setFillColor(colors.HexColor('#52637a'));c.drawString(46,28,'StudyLab . Free revision . Original material by Lefa Malatji');c.drawRightString(A4[0]-46,28,str(d.page));c.restoreState()
def pdf(filename,story,title):
 d=SimpleDocTemplate(str(OUT/filename),pagesize=A4,leftMargin=46,rightMargin=46,topMargin=45,bottomMargin=48,title=title,author='Lefa Malatji . StudyLab',invariant=1);d.build(story,onFirstPage=footer,onLaterPages=footer)
 return d.page
catalog=[]
for slug,title,description,route,questions in MODULES:
 if slug == "prld5121":
  import importlib.util
  spec=importlib.util.spec_from_file_location("prld_resources", ROOT/"scripts/build-prld-resources.py")
  prld=importlib.util.module_from_spec(spec);spec.loader.exec_module(prld)
  catalog.append(prld.build());continue
 key=next(k for k in CHAPTERS if k.lower()==slug);chapters=CHAPTERS[key]
 prefix=key
 guide=f'{prefix}-Study-Guide.pdf';qp=f'{prefix}-Practice-Questions.pdf';ap=f'{prefix}-Worked-Answers.pdf';ppt=f'{prefix}-Illustrated-Revision.pptx';slides=f'{prefix}-Revision-Slides.pdf'
 intro=[p(title,'Title'),p('Illustrated study guide','Heading1'),p(description),p('Read the explanations first, trace each worked example, then try the check questions. Use the separate practice sheet before opening its worked answers. This is original supplementary revision, not an official exam or a guarantee of a pass.'),p('Learning route','Heading2')]
 for j,ch in enumerate(chapters,1):intro.append(p(f'{j}. {ch["title"]}'))
 intro+=[p('Study in sessions','Heading2'),p('Allow one focused session per chapter. Explain the diagram aloud, work through the example and test a boundary case. After all five chapters, attempt the five practice questions and record which topics need another pass.'),PageBreak()]
 story=intro
 for j,ch in enumerate(chapters,1):
  story+=[p(f'Chapter {j}. {ch["title"]}','Heading1'),p(ch['intro']),p(ch['why'])]
  img=ROOT/'dist/learn/images/study-packs'/ch['illustration'];w,h=ImageReader(str(img)).getSize();scale=min(500/w,170/h)
  story+=[Image(str(img),width=w*scale,height=h*scale),Spacer(1,10),p('Read the labelled relationships. This visual model supports the explanation; apply the exact business rules or code shown in the worked example.','SmallNote'),p('Step by step','Heading2')]
  story.extend(p(f'{i+1}. {step}') for i,step in enumerate(ch['steps']))
  story+=[p('Worked example','Heading2'),p(ch['example']),code(ch['code']),p('Check your understanding','Heading2'),p(ch['check']),p('Explained answer','Heading3'),p(ch['answer'])]
 story+=[PageBreak(),p('Revision checklist','Heading1')]
 for ch in chapters:story+=[p(ch['title'],'Heading2'),p('Can you explain this without reading the example? '+ch['check'])]
 story+=[p('Before running code','Heading2'),p('Code excerpts illustrate the named operation and may require the surrounding project, schema, declarations or inputs described in the question. Use local practice tools. SQL Server, Windows WPF and Docker need their native environments. The C# school API discussed in StudyLab stores students in memory unless a lesson explicitly adds persistence.'),p('Continue learning','Heading2'),p('Use the matching free StudyLab lessons, practical tools, existing downloads and practice exams at https://lefamalatji.co.za/learn/. Review the requirements from your lecturer alongside this guide.')]
 pages=pdf(guide,story,title+' Study Guide')
 q=[p(title,'Title'),p('Practice questions','Heading1'),p('Try all five tasks independently. Show your reasoning, code or diagram and at least one test case where appropriate. Some tasks request explanations or design rather than code. Suggested time: 45-60 minutes. Use the separately named worked answers only after attempting the sheet.')]
 for i,(question,_) in enumerate(questions,1):
  q+=[p(f'Question {i}','Heading2'),p(question),Spacer(1,45)]
 qpages=pdf(qp,q,title+' Practice Questions')
 a=[p(title,'Title'),p('Worked answers','Heading1'),p('Compare the reasoning and the result with your own attempt. Other correct approaches can be valid. Code fragments assume the environment and schema named in each question; they are not all standalone programs.')]
 for i,(question,answer) in enumerate(questions,1):
  a+=[p(f'Answer {i}','Heading2'),p(question,'SmallNote')]
  # Code-like answers retain line breaks and indentation; prose remains readable text.
  if '\n' in answer:a.append(code(answer))
  else:a.append(p(answer))
  a.append(p('Review: explain why this answer satisfies the question, then change one input or assumption and predict what changes.','SmallNote'))
 apages=pdf(ap,a,title+' Worked Answers')
 for filename in [ppt,slides]:
  if not (OUT/filename).exists():raise FileNotFoundError(f'Missing maintained presentation: {filename}. Add its reviewed PowerPoint and PDF copy before building the public catalogue.')
 import zipfile as zf
 with zf.ZipFile(OUT/ppt) as z:slide_count=len([n for n in z.namelist() if n.startswith('ppt/slides/slide') and n.endswith('.xml')])
 resources=[dict(file=guide,label='Study guide',format='PDF',detail=f'{pages} pages . 5 illustrated chapters'),dict(file=qp,label='Practice questions',format='PDF',detail=f'{qpages} page'+('' if qpages == 1 else 's')+' . 5 written and practical tasks'),dict(file=ap,label='Worked answers',format='PDF',detail=f'{apages} pages . Explained solutions'),dict(file=ppt,label='Illustrated revision',format='PPTX',detail=f'{slide_count} editable slides'),dict(file=slides,label='Slides for printing',format='PDF',detail=f'{slide_count} slides')]
 for res in resources:res['bytes']=(OUT/res['file']).stat().st_size
 zipname=f'{prefix}-Complete-Free-Revision.zip'
 with zipfile.ZipFile(OUT/zipname,'w',zipfile.ZIP_DEFLATED) as z:
  for res in resources:
   info=zipfile.ZipInfo(res['file'],(2026,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,(OUT/res['file']).read_bytes())
 catalog.append(dict(slug=slug,title=title,description=description,topics=[c['title'] for c in chapters],resources=resources,archive=zipname,archiveBytes=(OUT/zipname).stat().st_size))
from build_wede_resources import build as build_wede_resources
catalog.append(build_wede_resources())
(ROOT/'scripts/module-study-packs.json').write_text(json.dumps(catalog,indent=2)+'\n')
print('Built named module PDFs, revision bundles and the study-pack catalogue.')
