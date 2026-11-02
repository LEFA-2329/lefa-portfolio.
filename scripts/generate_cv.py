from pathlib import Path
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,PageBreak,Table,TableStyle,Image,KeepTogether
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
ROOT=Path(__file__).resolve().parents[1]
FONT='/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('CV',FONT+'DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('CVBold',FONT+'DejaVuSans-Bold.ttf'))
pdfmetrics.registerFontFamily('CV',normal='CV',bold='CVBold',italic='CV',boldItalic='CVBold')
ink=colors.HexColor('#152a32');teal=colors.HexColor('#315e65');muted=colors.HexColor('#52616a')
st=getSampleStyleSheet()
for name,size,leading,font,col in [('name',25,30,'CVBold',ink),('role',10,15,'CVBold',teal),('body',9.2,13.4,'CV',ink),('small',8.2,12,'CV',muted),('head',10.5,15,'CVBold',teal),('job',9.8,14,'CVBold',ink),('pageTitle',23,29,'CVBold',ink)]:
 st.add(ParagraphStyle(name=name,fontName=font,fontSize=size,leading=leading,textColor=col,spaceAfter=5))
st['head'].spaceBefore=12
flow=[]
def para(t,style='body'):return Paragraph(t,st[style])
def add(t,style='body'):flow.append(para(t,style))
def heading(t):add(t.upper(),'head')
def bullet(t):flow.append(Paragraph('- '+t,st['body']))
def link(url,label=None):return '<link href="'+url+'" color="#315e65">'+(label or url.replace('https://','').replace('http://',''))+'</link>'
photo=Image(str(ROOT/'dist/lefa-malatji.jpeg'),width=85,height=85.589)
intro=[para('LEFA LAZY MALATJI','name'),para('SOFTWARE DEVELOPER | AI &amp; NLP RESEARCHER','role'),para('Johannesburg, South Africa | +27 69 729 4309','small'),para(link('mailto:lazylefa@gmail.com','lazylefa@gmail.com')+' | '+link('https://lefamalatji.co.za','lefamalatji.co.za'),'small'),para(link('https://www.linkedin.com/in/lefa-malatji-574984276','LinkedIn')+' | '+link('https://github.com/LEFA-2329','GitHub'),'small')]
header=Table([[intro,photo]],colWidths=[420,91]);header.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),10),('LINEBELOW',(0,0),(-1,-1),1,teal)]));flow.append(header)
heading('Professional summary')
add('Software developer with one year of internship experience building web applications and managing PostgreSQL databases. Computer Science Honours graduate, MSc candidate and published NLP researcher focused on low-resource Sepedi-English text generation. Combines C#/ASP.NET Core and PHP development with relational database design, statistics and practical problem solving.')
heading('Professional experience')
add('Software Developer Intern | Simplifon','job');add('One year of professional software development experience','small')
bullet('Developed and maintained web-based applications.')
bullet('Developed and managed PostgreSQL databases supporting web applications.')
flow.append(Spacer(1,4));add('Lecturer | Rosebank College','job')
bullet('Teach programming, software development and database concepts through practical examples and assessments.')
bullet('Support learning in C#, object-oriented programming, web development, SQL and database normalisation.')
heading('Technical skills')
add('<b>Software:</b> C#, ASP.NET Core Web API, MVC, PHP, JavaScript, HTML5, CSS3, Bootstrap 5.<br/><b>Databases:</b> PostgreSQL, SQL Server, MySQL, SQL, data modelling, relational design, normalisation and Entity Framework migrations.<br/><b>AI &amp; data:</b> Python, TensorFlow/Keras, NLP, text preprocessing, FNet, LSTM, mBERT research, BLEU/ROUGE evaluation and statistics.<br/><b>Tools &amp; practices:</b> Git, GitHub, Docker, REST APIs, Swagger and Agile working environments.')
heading('Education')
add('MSc in Computer Science | University of Limpopo | 2026-present','job')
add('In progress. Investigating data-scarcity effects on Sepedi-English text generation using FNet, LSTM and mBERT.','small')
add('BSc (Honours) in Computer Science | University of Limpopo | 2025','job')
add('Advanced Operating Systems, Computer Security, Advanced Databases, Speech Technology and Research Project.','small')
add('BSc in Mathematical Sciences (ECP) | University of Limpopo | 2021-2024','job')
add('Completed. Majors: Computer Science and Statistics.','small')
flow.append(PageBreak())
add('PROJECTS & RESEARCH','pageTitle');add('Selected work in intelligent applications, software and data systems','small')
def project(title,stack,bullets,url=None,label=None):
 items=[para(title,'head'),para(stack,'small')]+[para('- '+x) for x in bullets]
 if url:items.append(para(link(url,label),'small'))
 flow.append(KeepTogether(items))
project('Store Hub | E-Commerce Platform','PHP | PostgreSQL | Multi-role application | AI features',[
'Built a multi-role e-commerce platform with AI-driven personalisation and intelligent product search.',
'Integrated AI business intelligence reporting and a session-aware customer-support chatbot.'
],'https://github.com/LEFA-2329/Advanced-E-Commerce-Marketplace-Platform','GitHub: Advanced E-Commerce Marketplace Platform')
project('HelpDeskHub | In Development','C# | ASP.NET Core REST API | PostgreSQL | Entity Framework | Identity',[
'Developed ticket, department and user API functionality, using DTOs and Swagger for API development and testing.',
'Integrated ASP.NET Identity and database migrations, linking tickets to creators, assigned users, comments and history.',
'Roadmap includes an MVC front end, workload-based assignment, notifications and reporting.'
])
project('Pre-School Management System','Admin dashboard | Data management | CRUD',[
'Built admin features with dashboard statistics, secure login and management of learners, teachers, books and borrowing records.'
],'https://github.com/LEFA-2329/Pre-school-management-system','GitHub: Pre-School Management System')
project('Airport Sky Base System','Application development | Information management | Testing',[
'Developed and tested an airport management application with an interface for accessing and managing airport information.'
],'https://github.com/LEFA-2329/Airport-Sky-Base-System','GitHub: Airport Sky Base System')
project('Burzarsnet | Team Project','Web platform | Admin management | Team of four',[
'Collaborated with three team members to develop a South African bursary and internship web platform with admin management.'
],'http://burzarsnet.com','Website: burzarsnet.com')
heading('Published research')
add('<b>Lefa L. Malatji &amp; Thipe I. Modipa.</b> Investigating Data Scarcity and Model Adaptation for Sepedi-English Code-Switching Text-Generation.','body')
add('Research on generative AI for code-switching using the FNet architecture. Current MSc work extends the investigation to data-scarcity effects and model comparison.','small')
heading('Additional information')
add('Languages: Sepedi and English. References available on request.','small')
def footer(c,d):
 c.setStrokeColor(colors.HexColor('#d5dfe1'));c.line(42,40,553,40);c.setFont('CV',7.4);c.setFillColor(muted);c.drawString(42,26,'LEFA MALATJI | '+ 'lefamalatji.co.za');c.drawRightString(553,26,f'{d.page} / 2')
SimpleDocTemplate(str(ROOT/'dist/Lefa-Malatji-CV.pdf'),pagesize=(595.28,841.89),leftMargin=42,rightMargin=42,topMargin=34,bottomMargin=53,title='Lefa Malatji - Curriculum Vitae',author='Lefa Malatji').build(flow,onFirstPage=footer,onLaterPages=footer)
print('CV generated')
