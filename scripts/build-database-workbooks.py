import json, sys
from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

content = json.loads(Path(sys.argv[1]).read_text())
out = Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
for course, data in content.items():
    for kind in ["questions", "answers"]:
        doc = Document()
        sec = doc.sections[0]
        sec.page_width = Inches(8.5)
        sec.page_height = Inches(11)
        sec.top_margin = sec.bottom_margin = Inches(0.75)
        sec.left_margin = sec.right_margin = Inches(0.8)
        for name, size in [
            ("Normal", 10.5),
            ("Title", 20),
            ("Heading 1", 18),
            ("Heading 2", 12),
        ]:
            st = doc.styles[name]
            st.font.name = "Arial"
            st.font.size = Pt(size)
            st.font.color.rgb = RGBColor(0, 0, 0)
            st.paragraph_format.space_after = Pt(7)
        doc.styles["Normal"].paragraph_format.line_spacing = 1.12
        foot = sec.footer.paragraphs[0]
        foot.paragraph_format.space_before = Pt(0)
        r = foot.add_run(f'StudyLab   {data["code"]}   {kind.title()}   ')
        r.font.size = Pt(8)
        field = OxmlElement("w:fldSimple")
        field.set(qn("w:instr"), "PAGE")
        foot._p.append(field)
        for index, unit in enumerate(data["units"]):
            if index:
                doc.add_page_break()
            r = doc.add_paragraph(f'STUDYLAB   {data["code"]}   {kind.upper()}').runs[0]
            r.font.size = Pt(9)
            r.font.bold = True
            doc.add_paragraph(f'Unit {unit["number"]} {unit["title"]}', style="Title")
            if index == 0:
                doc.add_paragraph(
                    (
                        "Work through this revision selection before checking the separate answer book. The full lesson and exercise bank is available on StudyLab."
                        if kind == "questions"
                        else "Use these model answers to check the corresponding question sheet. Other correct SQL and explanations may satisfy the same requirements."
                    )
                )
            if index == 0 and kind == "questions":
                doc.add_paragraph(
                    "SQL schema: Students(StudentID, StudentName, City, Age); Courses(CourseID, CourseName, Fee); Enrolments(EnrolmentID, StudentID, CourseID, Mark)."
                )
            if index > 0:
                doc.add_paragraph(
                    "Revision selection   Original supplementary material by Lefa Malatji"
                )
            for j, q in enumerate(unit["questions"], 1):
                number = f'{unit["number"]}.{j}'
                doc.add_paragraph(
                    f'{number} {q.get("title","Practice task")}', style="Heading 2"
                )
                if kind == "questions":
                    doc.add_paragraph(q["prompt"])
                    answer = doc.add_paragraph("Your answer")
                    answer.paragraph_format.space_after = Pt(2)
                    answer.runs[0].italic = True
                    for k in range(2):
                        blank = doc.add_paragraph(
                            "________________________________________________________________________"
                        )
                        blank.paragraph_format.space_after = Pt(8)
                        blank.runs[0].font.color.rgb = RGBColor.from_string("B5B5B5")
                        blank.runs[0].font.size = Pt(9)
                else:
                    para = doc.add_paragraph(q["solution"])
                    para.paragraph_format.space_after = Pt(12)
                    if "\n" in q["solution"]:
                        for run in para.runs:
                            run.font.name = "DejaVu Sans Mono"
                            run.font.size = Pt(9)
            if course == "intermediate":
                note = doc.add_paragraph(
                    "Native T SQL tasks use SQL Server and SSMS in a disposable practice database. Browser tasks use the documented SQLite compatibility subset."
                )
                note.paragraph_format.space_before = Pt(8)
                for run in note.runs:
                    run.font.size = Pt(8.5)
        doc.core_properties.title = f'{data["code"]} {data["title"]} {kind.title()}'
        doc.core_properties.author = "Lefa Malatji"
        for root in [doc.styles.element, doc.element]:
            for border in root.xpath(".//w:pBdr"):
                border.getparent().remove(border)
        target = out / f'{data["code"].lower()}-{kind}.docx'
        doc.save(target)
        print(target)
