// Edit these public learning guides to improve explanations and search-page content.
export const searchTopics = [
  {
    slug: 'pseudocode',
    title: 'Learn pseudocode and programming logic',
    description:
      'Learn pseudocode with worked examples, loops, arrays, methods, tracing, flowcharts and PRLD5121 practice in StudyLab.',
    route: '#home',
    intro:
      'Pseudocode describes a program in readable steps before you write it in a programming language. StudyLab helps you practise the reasoning behind a solution, then trace how values change.',
    sections: [
      [
        'Start with input, processing and output',
        'Input is the information a program receives. Processing is the work it performs. Output is the result it produces. For a student result program, input might be a mark, processing compares it with a pass rule and output reports the result.',
      ],
      [
        'Make decisions and repeat steps',
        'Use IF and ELSE when different conditions require different actions. Use a FOR loop when the repetition count is known, or a WHILE loop when repetition depends on a condition. Check the starting value, condition and update to avoid an endless loop.',
      ],
      [
        'Organise data and reusable work',
        'Arrays store several related values. Methods group steps behind a name. Start with a small example, trace it on paper and compare your prediction with the interactive tracer.',
      ],
    ],
    code: 'BEGIN\n  NUM mark = 65\n  IF mark >= 50 THEN\n    OUTPUT "Pass"\n  ELSE\n    OUTPUT "Try again"\n  ENDIF\nEND',
    result:
      'The condition is true for 65, so the output is Pass. This is readable teaching pseudocode; use the syntax shown in the interactive editor for runnable tracing.',
    task: 'Change the mark to 45. Which branch runs, and what does the program output?',
    answer: '45 is less than 50. The ELSE branch runs and prints Try again.',
    links: [
      ['#trace', 'Trace pseudocode'],
      ['#lab', 'Build a flowchart'],
      ['#practice', 'Practise programming logic'],
    ],
  },
  {
    slug: 'databases',
    title: 'Learn databases and SQL',
    description:
      'Practise SQL queries, tables, keys, joins, database design and SQL Server concepts for DATA6211 and DATA6222 in StudyLab.',
    route: '#db',
    intro:
      'A relational database stores information in tables. SQL lets you ask questions about those rows and change them. Begin with one table, then connect related tables using keys.',
    sections: [
      [
        'Understand rows, columns and keys',
        'A row describes one record, such as one student. A column holds one kind of value, such as a name or mark. A primary key identifies a row. A foreign key refers to a key in another table and helps maintain valid relationships.',
      ],
      [
        'Build a query one clause at a time',
        'SELECT chooses columns. FROM names the table. WHERE filters individual rows. ORDER BY sorts the result. GROUP BY creates groups for aggregate functions, and HAVING filters those grouped results.',
      ],
      [
        'Move to intermediate database work',
        'DATA6222 adds joins, table definitions, constraints, normalisation, indexes, views, scripts and stored procedures. The browser practice tools and SQL Server teaching examples use different environments; follow the lesson dialect and setup notes.',
      ],
    ],
    code: '-- Suppose Students contains Name and Mark columns.\nSELECT Name, Mark\nFROM Students\nWHERE Mark >= 50\nORDER BY Mark DESC;',
    result:
      'This returns passing students, with the highest mark first. A student with mark 45 is excluded.',
    task: 'How would you find the average mark for every student, rather than only passing students?',
    answer:
      'Use SELECT AVG(Mark) AS AverageMark FROM Students; without the pass filter. AVG ignores NULL values.',
    links: [
      ['#db-practice', 'Open SQL practice'],
      ['#db-intermediate', 'Explore intermediate databases'],
      ['#db-advanced', 'Explore advanced databases'],
    ],
  },
  {
    slug: 'csharp',
    title: 'Learn C# step by step - PROG6212',
    description:
      'Learn C# with beginner explanations, commented examples, downloadable Visual Studio projects and guided PROG6212 practice.',
    route: '#cs/csharp',
    intro:
      'C# is a programming language used for console programs, websites, APIs and Windows desktop applications. StudyLab starts with small student register examples, then builds towards database access and web development.',
    sections: [
      [
        'Begin with a console student register',
        'Learn variables, conditions, loops, methods, classes and lists. Predict a small program before running it. Change one value and explain what changed instead of memorising the whole file.',
      ],
      [
        'Follow the PROG6212 learning units',
        'The course covers object lifetime and language features, ASP.NET Core APIs, files and database access, WPF with MVVM, and reusable class libraries with reflection and dynamic programming. A foundations lesson gives beginners a starting point before the advanced units.',
      ],
      [
        'Use the same learning cycle',
        'Each C# lesson includes prerequisites, a prediction question, a guided change, complete example files, an independent task and readiness checks. Download each project into its own folder and open its .csproj file in Visual Studio.',
      ],
    ],
    code: '// Store the student mark.\nint mark = 65;\n// Choose a result message.\nstring result = mark >= 50 ? "Pass" : "Try again";\n// Show the message in a Console App.\nConsole.WriteLine(result);',
    result:
      'The console prints Pass. This small example belongs in a separate Console App, rather than underneath an existing API startup file.',
    task: 'Change the mark to 45. Explain what the conditional expression returns.',
    answer: 'The expression returns Try again because 45 >= 50 is false.',
    links: [
      ['#cs-lesson/cs-foundations', 'Start C# foundations'],
      ['#cs-practice/csharp', 'Try C# unit practicals'],
      ['#cs-downloads/csharp', 'Download example projects'],
    ],
  },
  {
    slug: 'asp-net',
    title: 'Learn ASP.NET Core, REST APIs and CRUD',
    description:
      'Build ASP.NET Core APIs in C#: beginner CRUD, controllers, validation, EF Core, SQL Server, authentication, Swagger and MVC examples.',
    route: '#cs-unit/csharp-2',
    intro:
      'ASP.NET Core helps C# programs receive web requests and send responses. A student API can add, show, change and delete students. An MVC website adds pages and forms that people use to call that API.',
    sections: [
      [
        'Learn the request and response',
        'A client sends an HTTP method and address. The API matches that request to an endpoint. The endpoint checks input, performs work and returns a status and optional data. A normal browser address bar sends GET; use an HTTP client for the other CRUD actions.',
      ],
      [
        'Build CRUD before adding a database',
        'Use GET to read, POST to create, PUT to replace editable data and DELETE to remove a resource. Start with the supplied in-memory example. Test a missing ID and invalid input as well as the successful path.',
      ],
      [
        'Add persistence and access control in stages',
        'Then move to EF Core with SQLite or SQL Server, or use ADO.NET with typed SQL parameters. Later examples cover Identity access tokens, ownership, paging and concurrency. OpenAPI describes endpoints; Swagger UI provides a development testing interface.',
      ],
    ],
    code: '// In an ASP.NET Core Empty project:\nvar builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n// Reply to GET /api/hello.\napp.MapGet("/api/hello", () => new { message = "Hello, student" });\napp.Run();',
    result:
      'When the project is running, a GET request to /api/hello returns a JSON object containing the message Hello, student.',
    task: 'Why is a successful GET response different from the response used after creating a new resource?',
    answer:
      'A successful read commonly uses 200 OK. Creating a new resource commonly uses 201 Created and supplies its location.',
    links: [
      ['#cs-lesson/cs-web-foundations', 'Understand ASP.NET Core'],
      ['#cs-lesson/cs-crud-minimal', 'Build beginner CRUD'],
      ['#cs-lesson/cs-mvc-client', 'Build an MVC client'],
    ],
  },
  {
    slug: 'normalisation',
    title: 'Database normalisation: 1NF, 2NF and 3NF',
    description:
      'Learn 1NF, 2NF and 3NF with keys, partial and transitive dependencies, worked schemas and dependency diagram practice.',
    route: '#db-intermediate',
    intro:
      'Normalisation organises relational tables so facts are stored in sensible places. It reduces repeated facts and helps prevent inconsistent updates. State the business rules and functional dependencies before deciding which tables to split.',
    sections: [
      [
        'First normal form: one value in each cell',
        'Use atomic values for the chosen domain and remove repeating groups. Identify the candidate key or keys. A table can be in 1NF and still repeat names or contain partial dependencies.',
      ],
      [
        'Second normal form: depend on the whole key',
        'A table is in 2NF when it is in 1NF and every non-prime attribute depends on every candidate key as a whole, rather than on a proper subset of a candidate key. For the simple composite-key examples, move facts that depend on only one key component into their own tables.',
      ],
      [
        'Third normal form: remove problematic transitive dependencies',
        'In beginner examples, move a non-key fact that depends on another non-key attribute into a separate table. More precisely, for each non-trivial functional dependency X determines A, X must be a superkey or A must be a prime attribute. Keep keys that reconnect the decomposed tables.',
      ],
    ],
    code: 'Assume (ProjectId, StudentId) identifies an assignment.\nProjectId determines ProjectName.\nStudentId determines StudentName.\n(ProjectId, StudentId) determines Hours.\n\n2NF tables:\nProject(ProjectId, ProjectName)\nStudent(StudentId, StudentName)\nAssignment(ProjectId, StudentId, Hours)',
    result:
      'ProjectName and StudentName depend on only part of the original composite key. Hours belongs to the full assignment key. Under the stated dependencies, these three tables are also in 3NF.',
    task: 'If StudentId determines DepartmentId and DepartmentId determines DepartmentName, where should DepartmentName be stored?',
    answer:
      'Create Department(DepartmentId, DepartmentName). Store DepartmentId as a foreign key in Student. This removes the transitive dependence of DepartmentName on StudentId in the student table.',
    links: [
      ['#db-practice', 'Open database practice'],
      ['#db-intermediate', 'Find dependency diagram lessons'],
    ],
  },
  {
    slug: 'docker',
    title: 'Learn Docker for .NET applications',
    description:
      'Learn containers, multi-stage .NET Dockerfiles, Docker Compose, networks, volumes and a student website/API/SQL Server teaching stack.',
    route: '#cs/docker',
    intro:
      'Docker packages an application with the files it needs to run. An image is the package template. A container is a running instance. StudyLab teaches Docker as its own module using a .NET student website, API and SQL Server stack.',
    sections: [
      [
        'Start with one image and container',
        'A Dockerfile describes how to build an image. A multi-stage .NET build uses SDK tools to compile the application, then copies the published output into a smaller runtime stage. Keep credentials out of images and source control.',
      ],
      [
        'Run services together with Compose',
        'Docker Compose describes the website, API and database in one configuration file. Services communicate using their service names on the Compose network. localhost inside a container refers to that container, not another service.',
      ],
      [
        'Understand persistent data',
        'A named volume can retain database files when containers are replaced. A volume is not a backup. Read the classroom setup notes, architecture requirements and credential guidance before starting the SQL Server stack.',
      ],
    ],
    code: '# Run these in the supplied Compose project folder.\ndocker compose up --build -d\n# Inspect the running services.\ndocker compose ps\n# Read recent API logs.\ndocker compose logs --tail 50 api',
    result:
      'Compose starts the configured services and reports their status. Setup, environment variables and the supplied migration steps must be completed first.',
    task: 'Why should an API container connect to the database service name instead of localhost?',
    answer:
      'Each container has its own network context. localhost points back to the API container; the Compose service name resolves to the database service.',
    links: [
      ['#cs/docker', 'Open the Docker module'],
      ['#cs-lesson/docker-compose-stack', 'Build the Compose stack'],
    ],
  },
  {
    slug: 'hadoop',
    title: 'Learn Hadoop and distributed data concepts',
    description:
      'Explore Hadoop, HDFS, YARN, MapReduce and distributed data processing with StudyLab advanced database learning activities.',
    route: '#db-unit/209',
    intro:
      'Hadoop is a collection of tools for storing and processing data across multiple machines. StudyLab introduces where distributed processing is useful and how it differs from querying a small relational database.',
    sections: [
      [
        'HDFS stores distributed files',
        'HDFS divides large files into blocks stored across machines. Replication supports fault tolerance. HDFS is designed for large-file access patterns, rather than replacing every ordinary database table or desktop file.',
      ],
      [
        'YARN manages cluster resources',
        'YARN coordinates resources for applications in a cluster. Storage and resource scheduling have different responsibilities: HDFS stores files, while YARN allocates resources for processing work.',
      ],
      [
        'MapReduce groups and combines work',
        'In a word-count example, mappers emit a word and a count. The shuffle groups the same words. Reducers add the counts for each word. This illustrates a distributed processing pattern; a small word list does not need a cluster.',
      ],
    ],
    code: 'Input: "data helps data"\nMap output: (data, 1), (helps, 1), (data, 1)\nGrouped: data = [1, 1], helps = [1]\nReduce output: data = 2, helps = 1',
    result:
      'The repeated word data has count 2 and helps has count 1. This is a conceptual trace, not an installation command.',
    task: 'Which component stores the input files, and which component manages processing resources?',
    answer:
      'HDFS stores the files. YARN manages cluster resources. MapReduce is a processing model that can run on that infrastructure.',
    links: [
      ['#db-unit/209', 'Open Hadoop lessons'],
      ['#db-advanced', 'Explore advanced databases'],
    ],
  },
];
