import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile } from '@oai/artifact-tool';
const [contentPath, outputDir, qaDir] = process.argv.slice(2),
  content = JSON.parse(await fs.readFile(contentPath, 'utf8'));
const concepts = {
  database: [
    [
      'A DBMS manages related data, controlled sharing, integrity and recovery.',
      'Designers model the rules. Developers build applications. DBAs maintain reliable operation.',
      'A migration needs verified data, clear ownership and a tested recovery plan.',
    ],
    [
      'An entity represents a subject. Attributes describe it. Relationships connect occurrences.',
      'State minimum and maximum participation in both directions.',
      'A foreign key on the many side implements a one to many relationship.',
    ],
    [
      'A candidate key uniquely identifies a row and contains no unnecessary attribute.',
      'Choose one primary key and enforce other required candidate identifiers.',
      'Foreign keys reference an existing parent key and can repeat in child rows.',
    ],
    [
      'Optional relationships require a deliberate nullability rule.',
      'Resolve many to many membership through an associative table.',
      'Review the ERD with normal, missing and exceptional business cases.',
    ],
    [
      '1NF uses one value per cell and removes repeating groups.',
      '2NF removes nonprime attribute dependencies on proper subsets of candidate keys.',
      '3NF removes the illustrated nonkey transitive dependencies while preserving the joins.',
    ],
    [
      'WHERE filters rows before grouping. HAVING filters groups after aggregation.',
      'COUNT(*) counts rows. Column aggregates ignore NULL values.',
      'Preview UPDATE and DELETE predicates before changing data.',
    ],
  ],
  intermediate: [
    [
      'A database system combines data, people, procedures, software and hardware.',
      'master stores instance metadata, model supplies the template and msdb supports jobs.',
      'tempdb holds temporary objects and internal work and is recreated at restart.',
    ],
    [
      'SELECT chooses columns. WHERE filters rows. ORDER BY makes output order explicit.',
      'GROUP BY creates groups and HAVING filters aggregated results.',
      'Capture @@ROWCOUNT immediately after the statement being measured.',
    ],
    [
      'INNER JOIN returns matches. LEFT JOIN also preserves unmatched left rows.',
      'Put a child match condition in ON when unmatched parents must remain.',
      'UNION removes duplicate result rows. UNION ALL retains them.',
    ],
    [
      'A schema is a namespace within a database. CREATE DATABASE creates a database.',
      'Choose Unicode names, exact currency types and nullability from business requirements.',
      'Review dependencies and existing values before ALTER or DROP.',
    ],
    [
      'PRIMARY KEY identifies rows. FOREIGN KEY protects parent child references.',
      'CHECK validates a predicate. NOT NULL separately requires a value.',
      'Choose NO ACTION, CASCADE or SET NULL from the business rule.',
    ],
    [
      'State candidate keys and functional dependencies before decomposing tables.',
      'Separate partial dependencies for 2NF and the illustrated transitive dependencies for 3NF.',
      'EXISTS tests for related rows without multiplying each outer row.',
    ],
    [
      'A clustered index has table rows at its leaf level. A heap has no clustered index.',
      'Nonclustered indexes can reduce reads but require storage and write maintenance.',
      'A normal view stores a query definition. Aggregate views have update restrictions.',
    ],
    [
      'GO separates client batches. Local variables do not cross that boundary.',
      'BEGIN and END group statements. They do not start a transaction.',
      'TRY CATCH handles many runtime errors. Use ERROR functions and a deliberate recovery policy.',
    ],
    [
      'Procedures centralise reusable parameterised database operations.',
      'A result set, an OUTPUT parameter and an integer RETURN status are different interfaces.',
      'Validate inputs and keep constraints for integrity across concurrent write paths.',
    ],
  ],
};
const examples = {
  database: [
    [
      'Responsibilities in a college system',
      'Lecturer: enters authorised marks.\nDeveloper: builds the portal and queries.\nDBA: tests backup restoration.',
      'Separate responsibilities even when one person performs several roles. Permissions should reflect the work each role needs.',
    ],
    [
      'A requester and their tickets',
      'Requesters(RequesterID PK, Name)\nTickets(TicketID PK, RequesterID FK)\nEach ticket has one requester.\nEach requester may have zero or many tickets.',
      'The foreign key belongs on Tickets. A requester can exist before creating a ticket. A required requester reference cannot be NULL.',
    ],
    [
      'Candidate keys and search keys',
      'Students(\n StudentID PRIMARY KEY,\n StudentNumber UNIQUE NOT NULL,\n StudentName, City\n)',
      'StudentID and StudentNumber can be candidate keys when both are minimal and unique. Names and cities are useful search attributes but do not reliably identify a row.',
    ],
    [
      'An associative table',
      'Employees(EmployeeID PK, Name)\nProjects(ProjectID PK, Title)\nEmployeeProjects(\n EmployeeID PK/FK,\n ProjectID PK/FK, Allocation\n)',
      'Allocation belongs on the employee project pair when it describes that membership. The composite key prevents duplicate membership under the stated rule.',
    ],
    [
      'The 3NF order line design',
      'Customers(CustomerID PK, CustomerName)\nOrders(OrderID PK, CustomerID FK, OrderDate)\nProducts(ProductID PK, ProductName)\nOrderLines(OrderID PK/FK,\n ProductID PK/FK, Quantity)',
      'Order facts depend on OrderID, product facts on ProductID and quantity on the pair. CustomerName moves to Customers to remove the transitive dependency.',
    ],
    [
      'Averages over known marks',
      'SELECT CourseID,\n COUNT(Mark) AS MarkedCount,\n AVG(CAST(Mark AS DECIMAL(10,2))) AS AverageMark\nFROM Enrolments\nWHERE Mark IS NOT NULL\nGROUP BY CourseID\nHAVING COUNT(Mark)>=5\nORDER BY AverageMark DESC, CourseID;',
      'WHERE removes unmarked rows before grouping. HAVING keeps groups with at least five known marks. The decimal cast preserves fractional averages in SQL Server.',
    ],
  ],
  intermediate: [
    [
      'The four teaching system databases',
      "SELECT name, database_id\nFROM sys.databases\nWHERE name IN\n ('master','model','msdb','tempdb')\nORDER BY name;",
      'Run this metadata query in SQL Server. Keep application practice tables in a dedicated user database. Visibility depends on permissions.',
    ],
    [
      'Filter groups after aggregation',
      'SELECT CourseID, COUNT(*) AS N,\n AVG(CAST(Mark AS DECIMAL(10,2))) AS AverageMark\nFROM Enrolments\nWHERE Mark IS NOT NULL\nGROUP BY CourseID\nHAVING COUNT(*)>=5\nORDER BY AverageMark DESC;',
      'The WHERE condition removes NULL marks before COUNT(*). If all enrolments must be counted, move or change that reporting rule deliberately.',
    ],
    [
      'Preserve courses without marked rows',
      'SELECT c.CourseID, c.CourseName,\n COUNT(e.Mark) AS MarkedCount\nFROM Courses c\nLEFT JOIN Enrolments e\n ON e.CourseID=c.CourseID\nGROUP BY c.CourseID, c.CourseName\nORDER BY c.CourseID;',
      'COUNT(e.Mark) returns zero when no mark exists. COUNT(*) would count the preserved NULL extended row for a course without any enrolments.',
    ],
    [
      'A constrained assessment table',
      'CREATE TABLE teaching.PracticeTests(\n TestID INT PRIMARY KEY,\n Title NVARCHAR(100) NOT NULL,\n DueDate DATE NULL,\n Weight DECIMAL(5,2) NOT NULL\n  CHECK(Weight BETWEEN 0 AND 100)\n);',
      'Use a practice SQL Server database with the teaching schema already created. A data type, a presence rule and a range constraint serve different purposes.',
    ],
    [
      'CHECK and NOT NULL together',
      'CREATE TABLE PracticeScores(\n ScoreID INT PRIMARY KEY,\n Mark INT NOT NULL\n  CONSTRAINT CK_PracticeScores_Mark\n  CHECK(Mark BETWEEN 0 AND 100)\n);',
      'CHECK alone can accept UNKNOWN for NULL in SQL Server. NOT NULL requires a mark. Test a valid mark, 101 and NULL in a disposable database.',
    ],
    [
      'Remove the department transitive dependency',
      'Before:\nEmployees(EmployeeID PK, EmployeeName,\n DepartmentID, DepartmentName)\n\nAfter:\nDepartments(DepartmentID PK, DepartmentName)\nEmployees(EmployeeID PK, EmployeeName,\n DepartmentID FK)',
      'EmployeeID determines DepartmentID, which determines DepartmentName. With the single candidate key assumed here, no 2NF split is needed before the 3NF department split.',
    ],
    [
      'A candidate covering index',
      'CREATE INDEX IX_Enrolments_Course_Mark\nON dbo.Enrolments(CourseID ASC, Mark DESC)\nINCLUDE(StudentID);\n\nDROP INDEX IX_Enrolments_Course_Mark\nON dbo.Enrolments;',
      'This native SQL Server index targets course filtering and mark ordering while covering StudentID. Check actual plans and write costs before keeping it.',
    ],
    [
      'A terminating WHILE loop',
      'DECLARE @n INT=1;\nWHILE @n<=3\nBEGIN\n SELECT @n AS Counter;\n SET @n=@n+1;\nEND;',
      'The outputs are 1, 2 and 3. The assignment moves the condition toward false. Keep this variable and its use in the same batch in SSMS.',
    ],
    [
      'OUTPUT parameters and return status',
      "CREATE PROCEDURE dbo.usp_RevisionCount\n @City VARCHAR(60), @Total INT OUTPUT\nAS\nBEGIN\n SELECT @Total=COUNT(*) FROM dbo.Students\n WHERE City=@City;\n RETURN 0;\nEND;\nGO\nDECLARE @n INT,@rc INT;\nEXEC @rc=dbo.usp_RevisionCount\n @City='Polokwane',@Total=@n OUTPUT;\nSELECT @n AS Total,@rc AS Status;",
      'Run in SQL Server after the college setup. The original Polokwane count is 5 and status is 0. OUTPUT is required in the parameter declaration and the caller.',
    ],
  ],
};
const font = 'Liberation Sans',
  mono = 'DejaVu Sans Mono';
const { finalizePresentation } = await import(
  pathToFileURL(
    '/home/agent/.codex/skills/builtins/presentations/container_tools/artifact_tool_utils.mjs',
  ).href
);
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(qaDir, { recursive: true });
for (const [course, data] of Object.entries(content)) {
  const pres = Presentation.create({ slideSize: { width: 1280, height: 720 } }),
    qa = path.join(qaDir, data.code.toLowerCase());
  await fs.mkdir(qa, { recursive: true });
  function text(
    slide,
    name,
    value,
    x,
    y,
    w,
    h,
    size = 28,
    colour = '#17324d',
    bold = false,
    typeface = font,
  ) {
    const shape = slide.shapes.add({
      geometry: 'textbox',
      name,
      position: { left: x, top: y, width: w, height: h },
      fill: 'none',
      line: { style: 'solid', fill: 'none', width: 0 },
    });
    shape.text = value;
    shape.text.style = {
      fontSize: size,
      typeface,
      color: colour,
      bold,
      verticalAlignment: 'top',
      insets: 0,
      wrap: 'square',
      autoFit: 'none',
    };
    return shape;
  }
  function page(title, kicker, source) {
    const slide = pres.slides.add();
    slide.background.fill = '#ffffff';
    text(
      slide,
      'course-label',
      data.code + '  ' + kicker,
      64,
      38,
      1152,
      30,
      18,
      '#2563eb',
      true,
    );
    text(slide, 'slide-title', title, 64, 92, 1152, 100, 40, '#17324d', true);
    text(slide, 'footer', 'StudyLab  |  Lefa Malatji', 64, 670, 1000, 22, 14, '#526578');
    text(
      slide,
      'page-number',
      String(pres.slides.items.length),
      1160,
      670,
      56,
      22,
      14,
      '#526578',
    );
    slide.speakerNotes.text =
      'Original supplementary revision material. Source lesson: ' +
      source +
      '\nNative T-SQL examples require SQL Server/SSMS. Browser examples execute the documented SQLite subset.';
    return slide;
  }
  let slide = page(
    data.title + ' revision',
    'REVISION SLIDES',
    'https://lefamalatji.co.za/learn/',
  );
  text(
    slide,
    'cover-context',
    data.code +
      '\nKey concepts and worked examples\n' +
      data.units.length +
      ' learning units',
    64,
    245,
    1050,
    230,
    34,
  );
  text(
    slide,
    'cover-use',
    'Use alongside the separate question sheets and model answers.',
    64,
    555,
    1080,
    70,
    24,
    '#526578',
  );
  for (const [i, u] of data.units.entries()) {
    const url = 'https://lefamalatji.co.za/learn/#db-unit/' + u.id;
    slide = page(u.title, 'UNIT ' + u.number, url);
    concepts[course][i].forEach((line, j) =>
      text(slide, 'concept-' + j, line, 64, 220 + j * 130, 1125, 100, 28),
    );
    const [title, code, explanation] = examples[course][i];
    slide = page(title, 'UNIT ' + u.number + ' WORKED EXAMPLE', url);
    text(slide, 'example-code', code, 64, 210, 790, 430, 22, '#17324d', false, mono);
    text(slide, 'example-explanation', explanation, 910, 210, 306, 420, 25, '#34516d');
  }
  slide = page(
    'Revision and self checking',
    'NEXT STEPS',
    'https://lefamalatji.co.za/learn/#db-practice',
  );
  text(
    slide,
    'revision-plan',
    'Attempt the question sheet before reading the model answers.\n\nUse the SQL workspace to check supported queries.\n\nTry a mixed practice exam and review missed topics in My progress.',
    64,
    220,
    1120,
    360,
    29,
  );
  text(
    slide,
    'revision-boundary',
    'Native SQL Server scripts need SSMS. StudyLab provides supplementary practice.',
    64,
    600,
    1120,
    48,
    22,
    '#526578',
  );
  const candidate = path.join(qa, 'candidate.pptx'),
    final = path.join(outputDir, data.code.toLowerCase() + '-revision.pptx');
  await (await PresentationFile.exportPptx(pres)).save(candidate);
  await finalizePresentation({
    workspaceDir: '/workspace/scratch/03dc25bc4d92',
    candidatePath: candidate,
    finalPath: final,
    pythonExecutable: process.env.CODEX_PRIMARY_RUNTIME_PYTHON,
    integrityValidatorPath:
      '/home/agent/.codex/skills/builtins/presentations/container_tools/inspect_presentation_package_integrity.py',
    layoutValidatorPath:
      '/home/agent/.codex/skills/builtins/presentations/container_tools/inspect_presentation_layout_geometry.py',
    layoutArgs: [
      '--expected-slide-size-emu',
      '12192000,6858000',
      '--validate-bullet-geometry',
      '--validate-heading-fit',
    ],
    explicitTotalSlideCount: data.units.length * 2 + 2,
    fontPolicy: { basis: 'design', families: [font, mono] },
    verifyArtifactToolImport: true,
    receiptPath: path.join(qa, 'validation.json'),
  });
  for (const [i, s] of pres.slides.items.entries()) {
    const blob = await pres.export({ slide: s, format: 'png', scale: 1 });
    await fs.writeFile(
      path.join(qa, 'slide-' + String(i + 1).padStart(2, '0') + '.png'),
      new Uint8Array(await blob.arrayBuffer()),
    );
  }
  console.log(
    data.code + ': ' + pres.slides.items.length + ' slides saved and rendered.',
  );
}
