// Original explanations aligned to the supplied PROG6212 outline. Docker is a separate course.
export const courseUnits = [
  {
    id: 'csharp-1',
    number: 1,
    title: 'Object lifetime and advanced C#',
    sessions: '1-12',
    outcomes: [
      'LO1 Explain garbage collection in .NET.',
      'LO2 Develop programs using disposable objects.',
      'LO3 Use operator overloading.',
      'LO4 Use custom exception types.',
      'LO5 Use extension methods.',
      'LO6 Use anonymous types.',
      'LO7 Use LINQ to perform data operations.',
      'LO8 Use anonymous types in LINQ projections.',
      'LO9 Discuss Windows processes, application domains and object contexts.',
      'LO10 Develop multithreaded applications.',
      'LO11 Perform parallel and asynchronous programming.',
      'LO12 Differentiate multithreaded, parallel and asynchronous programming.',
    ],
  },
  {
    id: 'csharp-2',
    number: 2,
    title: 'ASP.NET Core and REST API development',
    sessions: '13-34',
    outcomes: [
      'LO1 Explain the Model View Controller pattern.',
      'LO2 Identify ASP.NET Core features.',
      'LO3 Create an ASP.NET Core application.',
      'LO4 Develop RESTful web services using ASP.NET Core.',
    ],
  },
  {
    id: 'csharp-3',
    number: 3,
    title: 'Files, data access and desktop applications',
    sessions: '35-45',
    outcomes: [
      'LO1 Create desktop applications that store data.',
      'LO2 Manipulate files and directories with core I/O types.',
      'LO3 Manipulate text data and serialize objects.',
      'LO4 Develop data-centric applications with ADO.NET.',
      'LO5 Use relational databases through ADO.NET types and providers.',
      'LO6 Explain object-relational mapping.',
      'LO7 Identify Entity Framework building blocks.',
      'LO8 Model a database in memory.',
      'LO9 Develop applications with EF Core.',
      'LO10 Differentiate code-first and database-first.',
      'LO11 Create records.',
      'LO12 Update records.',
      'LO13 Delete records.',
    ],
  },
  {
    id: 'csharp-4',
    number: 4,
    title: 'WPF, MVVM, notifications and commands',
    sessions: '46-58',
    outcomes: [
      'LO1 Use MVVM in WPF.',
      'LO2 Explain Model, View and ViewModel.',
      'LO3 Use binding notifications in WPF.',
      'LO4 Perform WPF validation.',
      'LO5 Create custom commands.',
      'LO6 Create MVC web applications with ASP.NET Core.',
    ],
  },
  {
    id: 'csharp-5',
    number: 5,
    title: 'Libraries, reflection and dynamic programming',
    sessions: '59-62',
    outcomes: [
      'LO1 Share code through class libraries.',
      'LO2 Explain when a class library is useful.',
      'LO3 Discuss class library benefits.',
      'LO4 Inspect metadata with reflection.',
      'LO5 Perform late binding through reflection.',
      'LO6 Use dynamic types.',
      'LO7 Explain the Dynamic Language Runtime.',
      'LO8 Discuss Common Intermediate Language.',
      'LO9 Implement dynamic assemblies.',
      'LO10 Explain the role of dynamic assemblies.',
    ],
  },
  {
    id: 'docker-foundations',
    number: 1,
    title: 'Docker foundations and image creation',
    sessions: 'Standalone Docker module',
    outcomes: [
      'LO1 Compare virtual machines and containers; explain isolation.',
      'LO2 Write an efficient multi-stage Dockerfile for a .NET application.',
      'LO3 Build images, manage image repositories and run containers.',
    ],
  },
  {
    id: 'docker-compose',
    number: 2,
    title: 'Docker Compose and multi-container applications',
    sessions: 'Standalone Docker module',
    outcomes: [
      'LO4 Configure an ASP.NET Core MVC application and SQL Server stack.',
      'LO5 Manage networking, environment variables and persistent volumes.',
      'LO6 Initialise, monitor, scale and shut down a multi-tier stack.',
    ],
  },
];
export const courseLessons = [
  {
    id: 'cs-foundations',
    unit: 'csharp-1',
    title: 'Start here: C# foundations and your first student register',
    outcomes: [],
    project: '15-csharp-foundations',
    page: 'cs-foundations',
    quiz: [
      {
        question: 'Which statement stores a whole-number mark?',
        options: ['int mark = 65;', 'string mark = 65;', 'mark int 65;'],
        answer: 0,
        explanation:
          'int is the whole-number type. The variable name is mark and its value is 65.',
      },
      {
        question: 'For mark = 45, is mark >= 50 true?',
        options: ['Yes', 'No'],
        answer: 1,
        explanation: '45 is less than 50, so the else branch runs.',
      },
      {
        question: 'What does foreach do here?',
        options: ['Visits every item in marks', 'Deletes the list', 'Creates a database'],
        answer: 0,
        explanation: 'The loop runs once for each mark in the list.',
      },
    ],
  },
  {
    id: 'cs-lifetime',
    unit: 'csharp-1',
    title: 'Garbage collection and using disposable objects',
    outcomes: ['LO1', 'LO2'],
    project: '08-csharp-features',
    page: 'cs-lifetime',
    quiz: [
      {
        question: 'Which guarantees prompt cleanup of an owned stream?',
        options: ['Wait for GC', 'Use using', 'Set a comment'],
        answer: 1,
        explanation: 'using invokes Dispose when the scope exits.',
      },
    ],
  },
  {
    id: 'cs-language-tools',
    unit: 'csharp-1',
    title: 'Operator overloading, custom exceptions and extension methods',
    outcomes: ['LO3', 'LO4', 'LO5'],
    project: '08-csharp-features',
    page: 'cs-language-tools',
    quiz: [
      {
        question: 'Does an extension method modify the source of string?',
        options: ['Yes', 'No'],
        answer: 1,
        explanation: 'It is a static helper used through instance-call syntax.',
      },
    ],
  },
  {
    id: 'cs-linq',
    unit: 'csharp-1',
    title: 'Anonymous types and LINQ queries',
    outcomes: ['LO6', 'LO7', 'LO8'],
    project: '08-csharp-features',
    page: 'cs-linq',
    quiz: [
      {
        question: 'Which operator chooses the output fields?',
        options: ['Where', 'Select', 'OrderBy'],
        answer: 1,
        explanation: 'Select transforms each item into its result shape.',
      },
    ],
  },
  {
    id: 'cs-processes',
    unit: 'csharp-1',
    title: 'Processes, AppDomains and object contexts',
    outcomes: ['LO9'],
    project: '08-csharp-features',
    page: 'cs-processes',
    quiz: [
      {
        question: 'Can AssemblyLoadContext be treated as a security sandbox?',
        options: ['Yes', 'No'],
        answer: 1,
        explanation: 'Loading isolation is not a permission/security boundary.',
      },
    ],
  },
  {
    id: 'cs-threads',
    unit: 'csharp-1',
    title: 'Threads, parallel work and shared data',
    outcomes: ['LO10', 'LO12'],
    project: '08-csharp-features',
    page: 'cs-threads',
    quiz: [
      {
        question: 'Which update is atomic here?',
        options: ['count++', 'Interlocked.Increment(ref count)'],
        answer: 1,
        explanation: 'Interlocked performs the update as one atomic operation.',
      },
    ],
  },
  {
    id: 'cs-async',
    unit: 'csharp-1',
    title: 'Async, await, cancellation and Task.WhenAll',
    outcomes: ['LO11', 'LO12'],
    project: '08-csharp-features',
    page: 'cs-async',
    quiz: [
      {
        question: 'Does async guarantee a new thread?',
        options: ['Yes', 'No'],
        answer: 1,
        explanation:
          'Asynchrony describes waiting without blocking; it does not promise a new thread.',
      },
    ],
  },
  {
    id: 'cs-web-foundations',
    unit: 'csharp-2',
    title: 'Start here: ASP.NET Core, MVC and HTTP',
    outcomes: ['LO1', 'LO2', 'LO3'],
    project: '02-controller-api',
    page: 'cs-web-foundations',
    quiz: [
      {
        question: 'Which MVC part creates the HTML page?',
        options: ['Model', 'View', 'Database'],
        answer: 1,
        explanation: 'The View renders the page.',
      },
    ],
  },
  {
    id: 'cs-crud-minimal',
    unit: 'csharp-2',
    title: 'Beginner CRUD with Minimal APIs',
    outcomes: ['LO3', 'LO4'],
    project: '01-minimal-api',
    page: 'cs-crud-minimal',
    quiz: [
      {
        question: 'Which response normally follows a successful resource creation?',
        options: ['201 Created', '404 Not Found', '500 Error'],
        answer: 0,
        explanation: '201 tells the client a new resource exists.',
      },
    ],
  },
  {
    id: 'cs-crud-controllers',
    unit: 'csharp-2',
    title: 'Controller-based CRUD and DTO validation',
    outcomes: ['LO3', 'LO4'],
    project: '02-controller-api',
    page: 'cs-crud-controllers',
    quiz: [
      {
        question: 'What does Scoped usually mean in an ASP.NET Core API?',
        options: [
          'One object forever',
          'One service instance per request scope',
          'One per computer',
        ],
        answer: 1,
        explanation: 'DbContext commonly uses a request scope.',
      },
    ],
  },
  {
    id: 'cs-ef-sqlite',
    unit: 'csharp-2',
    title: 'Persistent CRUD with EF Core and SQLite',
    outcomes: ['LO4'],
    project: '03-ef-sqlite',
    page: 'cs-ef-sqlite',
    quiz: [
      {
        question: 'Which method actually sends pending changes to the database?',
        options: ['Add alone', 'SaveChangesAsync', 'Select alone'],
        answer: 1,
        explanation: 'Add tracks the entity; SaveChangesAsync persists it.',
      },
    ],
  },
  {
    id: 'cs-sqlserver',
    unit: 'csharp-2',
    title: 'Connect CRUD to SQL Server and SQL Express',
    outcomes: ['LO4'],
    project: '04-ef-sqlserver',
    page: 'cs-sqlserver',
    quiz: [
      {
        question:
          'Does an API connection string automatically create a running SQL Server service?',
        options: ['Yes', 'No'],
        answer: 1,
        explanation:
          'The database service must already be installed or running in a container.',
      },
    ],
  },
  {
    id: 'cs-ado-api',
    unit: 'csharp-2',
    title: 'CRUD using ADO.NET without Entity Framework',
    outcomes: ['LO4'],
    project: '05-ado-sqlserver',
    page: 'cs-ado-api',
    quiz: [
      {
        question: 'Which API reads a result set?',
        options: ['ExecuteReaderAsync', 'ExecuteNonQueryAsync', 'Console.WriteLine'],
        answer: 0,
        explanation: 'A data reader steps through returned rows.',
      },
    ],
  },
  {
    id: 'cs-advanced-api',
    unit: 'csharp-2',
    title: 'Advanced CRUD: paging, ownership and concurrency',
    outcomes: ['LO4'],
    project: '06-secure-api',
    page: 'cs-advanced-api',
    quiz: [
      {
        question: 'Two clients edit the same version. What should the stale save return?',
        options: ['201', '409', 'Always overwrite'],
        answer: 1,
        explanation: 'A concurrency conflict protects the newer change.',
      },
    ],
  },
  {
    id: 'cs-api-auth',
    unit: 'csharp-2',
    title: 'Registration, login and bearer-token testing',
    outcomes: ['LO4'],
    project: '06-secure-api',
    page: 'cs-api-auth',
    quiz: [
      {
        question: 'What should be stored for a password?',
        options: [
          'Plain text',
          'A proper password hash managed by Identity',
          'Base64 text',
        ],
        answer: 1,
        explanation:
          'Password hashing and verification should use a trusted password hasher.',
      },
    ],
  },
  {
    id: 'cs-mvc-client',
    unit: 'csharp-2',
    title: 'Build a full MVC website that calls your API',
    outcomes: ['LO1', 'LO3', 'LO4'],
    project: '07-mvc-client',
    page: 'cs-mvc-client',
    quiz: [
      {
        question: 'Which application connects to the database in this design?',
        options: ['The API', 'The Razor page in the browser'],
        answer: 0,
        explanation: 'The MVC server calls the API; the API owns data access.',
      },
    ],
  },
  {
    id: 'cs-api-testing',
    unit: 'csharp-2',
    title: 'Test, document and debug CRUD APIs',
    outcomes: ['LO3', 'LO4'],
    project: '13-api-http-tests',
    page: 'cs-api-testing',
    quiz: [
      {
        question: 'Does AddOpenApi automatically add a Swagger UI page?',
        options: ['Yes', 'No'],
        answer: 1,
        explanation: 'The document generator and interactive UI are separate pieces.',
      },
    ],
  },
  {
    id: 'cs-files-json',
    unit: 'csharp-3',
    title: 'Desktop file I/O, text and JSON serialization',
    outcomes: ['LO1', 'LO2', 'LO3'],
    project: '09-desktop-data',
    page: 'cs-files-json',
    quiz: [
      {
        question: 'Which library handles JSON here?',
        options: ['System.Text.Json', 'BinaryFormatter', 'SqlCommand'],
        answer: 0,
        explanation: 'System.Text.Json is the built-in JSON serializer.',
      },
    ],
  },
  {
    id: 'cs-desktop-ado',
    unit: 'csharp-3',
    title: 'Build desktop CRUD with ADO.NET',
    outcomes: ['LO4', 'LO5', 'LO11', 'LO12', 'LO13'],
    project: '09-desktop-data',
    page: 'cs-desktop-ado',
    quiz: [
      {
        question: 'How is user input passed into SQL?',
        options: ['String concatenation', 'Typed SQL parameters'],
        answer: 1,
        explanation: 'Parameters separate values from command text.',
      },
    ],
  },
  {
    id: 'cs-desktop-ef',
    unit: 'csharp-3',
    title: 'ORM, DbContext, tracking and desktop EF CRUD',
    outcomes: ['LO6', 'LO7', 'LO8', 'LO9', 'LO11', 'LO12', 'LO13'],
    project: '09-desktop-data',
    page: 'cs-desktop-ef',
    quiz: [
      {
        question: 'Does Add immediately execute INSERT?',
        options: ['Yes', 'No; SaveChanges persists it'],
        answer: 1,
        explanation: 'EF first tracks the new entity.',
      },
    ],
  },
  {
    id: 'cs-code-database-first',
    unit: 'csharp-3',
    title: 'Code-first, database-first and schema changes',
    outcomes: ['LO10'],
    project: '04-ef-sqlserver',
    page: 'cs-code-database-first',
    quiz: [
      {
        question: 'Which process reverse-engineers an existing schema?',
        options: ['Database-first scaffolding', 'Creating an empty class only'],
        answer: 0,
        explanation: 'Scaffolding reads the database and builds mappings.',
      },
    ],
  },
  {
    id: 'cs-mvvm',
    unit: 'csharp-4',
    title: 'WPF and the Model View ViewModel pattern',
    outcomes: ['LO1', 'LO2'],
    project: '10-wpf-mvvm',
    page: 'cs-mvvm',
    quiz: [
      {
        question: 'What is DataContext used for?',
        options: ['The default binding source', 'A SQL Server instance'],
        answer: 0,
        explanation:
          'Bindings resolve their paths against the configured source/DataContext.',
      },
    ],
  },
  {
    id: 'cs-notifications-validation',
    unit: 'csharp-4',
    title: 'Binding notifications and input validation',
    outcomes: ['LO3', 'LO4'],
    project: '10-wpf-mvvm',
    page: 'cs-notifications-validation',
    quiz: [
      {
        question: 'Which collection announces additions to a bound list?',
        options: ['ObservableCollection', 'A plain array automatically'],
        answer: 0,
        explanation: 'ObservableCollection implements collection-change notifications.',
      },
    ],
  },
  {
    id: 'cs-commands-mvc',
    unit: 'csharp-4',
    title: 'Custom commands and the MVC comparison',
    outcomes: ['LO5', 'LO6'],
    project: '10-wpf-mvvm',
    page: 'cs-commands-mvc',
    quiz: [
      {
        question: 'Which ICommand member decides whether the button is enabled?',
        options: ['Execute', 'CanExecute'],
        answer: 1,
        explanation: 'CanExecute expresses current action availability.',
      },
    ],
  },
  {
    id: 'cs-class-libraries',
    unit: 'csharp-5',
    title: 'Build and configure reusable class libraries',
    outcomes: ['LO1', 'LO2', 'LO3'],
    project: '11-libraries-reflection',
    page: 'cs-class-libraries',
    quiz: [
      {
        question: 'Does a normal class library need its own Main method?',
        options: ['Yes', 'No'],
        answer: 1,
        explanation: 'The consuming app supplies the executable entry point.',
      },
    ],
  },
  {
    id: 'cs-reflection',
    unit: 'csharp-5',
    title: 'Reflection, attributes and late binding',
    outcomes: ['LO4', 'LO5'],
    project: '11-libraries-reflection',
    page: 'cs-reflection',
    quiz: [
      {
        question: 'When is a missing method discovered with late binding?',
        options: ['Only at compile time', 'At runtime'],
        answer: 1,
        explanation: 'Reflection resolves metadata during execution.',
      },
    ],
  },
  {
    id: 'cs-dynamic-dlr',
    unit: 'csharp-5',
    title: 'Dynamic types, the DLR and CIL',
    outcomes: ['LO6', 'LO7', 'LO8'],
    project: '11-libraries-reflection',
    page: 'cs-dynamic-dlr',
    quiz: [
      {
        question: 'Does var remove compile-time type checking?',
        options: ['Yes', 'No'],
        answer: 1,
        explanation: 'var is inferred static typing.',
      },
    ],
  },
  {
    id: 'cs-dynamic-assemblies',
    unit: 'csharp-5',
    title: 'Dynamic assemblies and Reflection.Emit',
    outcomes: ['LO9', 'LO10'],
    project: '11-libraries-reflection',
    page: 'cs-dynamic-assemblies',
    quiz: [
      {
        question: 'Which instruction returns from the emitted method?',
        options: ['Ret', 'Console', 'Where'],
        answer: 0,
        explanation: 'Ret returns the stack result for this int-returning method.',
      },
    ],
  },
  {
    id: 'docker-containers',
    unit: 'docker-foundations',
    title: 'Containers, images and virtual machines',
    outcomes: ['LO1'],
    project: '12-docker-school',
    page: 'docker-containers',
    quiz: [
      {
        question: 'What is an image?',
        options: [
          'A running process only',
          'A packaged template used to create containers',
        ],
        answer: 1,
        explanation: 'Containers are created from an image.',
      },
    ],
  },
  {
    id: 'docker-dotnet-image',
    unit: 'docker-foundations',
    title: 'Write a complete multi-stage .NET Dockerfile',
    outcomes: ['LO2'],
    project: '12-docker-school',
    page: 'docker-dotnet-image',
    quiz: [
      {
        question: 'Does EXPOSE 8080 publish localhost:8080?',
        options: ['Yes', 'No'],
        answer: 1,
        explanation: 'Use -p or Compose ports to publish to the host.',
      },
    ],
  },
  {
    id: 'docker-cli',
    unit: 'docker-foundations',
    title: 'Run, inspect, tag and manage images',
    outcomes: ['LO3'],
    project: '12-docker-school',
    page: 'docker-cli',
    quiz: [
      {
        question: 'Which command shows container output?',
        options: ['docker logs', 'docker tag'],
        answer: 0,
        explanation: 'Application stdout/stderr appears in docker logs.',
      },
    ],
  },
  {
    id: 'docker-compose-stack',
    unit: 'docker-compose',
    title: 'Compose an API, MVC website and SQL Server',
    outcomes: ['LO4'],
    project: '12-docker-school',
    page: 'docker-compose-stack',
    quiz: [
      {
        question: 'Which service owns SQL Server storage?',
        options: ['website', 'db'],
        answer: 1,
        explanation: 'The named volume is mounted into the database service.',
      },
    ],
  },
  {
    id: 'docker-networking',
    unit: 'docker-compose',
    title: 'Networking, environment variables and secrets',
    outcomes: ['LO5'],
    project: '12-docker-school',
    page: 'docker-networking',
    quiz: [
      {
        question: 'Inside the API container, what does localhost refer to?',
        options: ['The API container', 'The SQL Server container'],
        answer: 0,
        explanation: 'Each container has its own loopback/network context.',
      },
    ],
  },
  {
    id: 'docker-volumes',
    unit: 'docker-compose',
    title: 'Persistent storage, backup and safe shutdown',
    outcomes: ['LO5', 'LO6'],
    project: '12-docker-school',
    page: 'docker-volumes',
    quiz: [
      {
        question: 'Which command normally preserves the named database volume?',
        options: ['docker compose down', 'docker compose down -v'],
        answer: 0,
        explanation: 'The -v option requests volume removal.',
      },
    ],
  },
  {
    id: 'docker-monitor-scale',
    unit: 'docker-compose',
    title: 'Monitor, scale and troubleshoot the stack',
    outcomes: ['LO6'],
    project: '12-docker-school',
    page: 'docker-monitor-scale',
    quiz: [
      {
        question: 'Why does scaling the provided API to2 replicas fail on host port5100?',
        options: [
          'Both try to publish the same host port',
          'SQL always forbids two clients',
        ],
        answer: 0,
        explanation: 'Fixed host port mappings collide between replicas.',
      },
    ],
  },
];

courseLessons.push({
  id: 'cs-openapi',
  unit: 'csharp-2',
  title: 'OpenAPI and Swagger UI: a complete working project',
  outcomes: ['LO3', 'LO4'],
  project: '14-openapi-swagger',
  page: 'cs-openapi',
  quiz: [
    {
      question: 'Does the JSON document itself draw the interactive UI?',
      options: ['Yes', 'No'],
      answer: 1,
      explanation: 'The generator supplies JSON; Swagger UI is a separate viewer.',
    },
  ],
});
// Keep the REST path sequential even as new lessons are appended to this editable catalogue.
const apiOrder = [
  'cs-web-foundations',
  'cs-crud-minimal',
  'cs-crud-controllers',
  'cs-openapi',
  'cs-ef-sqlite',
  'cs-sqlserver',
  'cs-ado-api',
  'cs-api-auth',
  'cs-advanced-api',
  'cs-mvc-client',
  'cs-api-testing',
];
courseLessons.sort((a, b) => {
  const unitOrder =
    courseUnits.findIndex((u) => u.id === a.unit) -
    courseUnits.findIndex((u) => u.id === b.unit);
  return (
    unitOrder ||
    (a.unit === 'csharp-2' ? apiOrder.indexOf(a.id) - apiOrder.indexOf(b.id) : 0)
  );
});

// Student-facing project briefs appear before setup and code.
export const projectBriefs = {
  '01-minimal-api': [
    'A small student register API',
    'Add a student, show students, change their details and remove a student. Requests send data to the API; this example has no form or webpage.',
    'Student data is kept in memory and is lost when the app restarts.',
    'Send a POST request, read the new student with GET, then try PUT and DELETE.',
  ],
  '02-controller-api': [
    'A student register organised with a controller',
    'Build the same four student actions in a StudentsController file. A small input object checks the name and age before changes are accepted.',
    'Student data is kept in memory and is lost when the app restarts.',
    'Create a valid student, then send an invalid age and compare the responses.',
  ],
  '03-ef-sqlite': [
    'A student register that remembers its data',
    'Build a student API that uses EF Core to read and write a SQLite database file.',
    'Student data stays in a local database file after the API closes.',
    'Add a student, restart the API, then use GET to check that the student is still there.',
  ],
  '04-ef-sqlserver': [
    'A student register connected to SQL Server',
    'Use EF Core to connect the API to SQL Server. C# objects represent student rows, and migrations create or change the tables.',
    'Student data is stored in your configured SQL Server database.',
    'Set the connection string, apply the migration, add a student and inspect the saved row.',
  ],
  '05-ado-sqlserver': [
    'A student register that runs SQL commands',
    'Build an API that sends parameterised SQL commands through ADO.NET. You write the SQL used to add, find, edit and remove rows.',
    'Student data is stored in SQL Server. Run the supplied setup script first.',
    'Create the table, send a student request and check the row in SQL Server.',
  ],
  '06-secure-api': [
    'A student API with accounts and protected records',
    'Register an account and log in. Each signed-in user works with their own students. The API also shows paging and checks whether a record has changed before saving an edit.',
    'Accounts and student rows are stored in SQLite. Keep the access token for later requests.',
    'Register, log in, copy the token into a request and create a student belonging to that account.',
  ],
  '07-mvc-client': [
    'A student website with pages and forms',
    'Build an MVC website that asks a separate student API to do the data work. Use pages to view students and forms to add, edit or delete them.',
    'The API holds the student data; the website displays it. Run both projects.',
    'Start the API on port 5100 and the website on port 5200, then add a student through the website.',
  ],
  '08-csharp-features': [
    'A console playground for C# features',
    'Run small experiments with objects, reusable helpers, lists and work that takes time. Each experiment prints results in the console.',
    'These experiments use temporary values rather than a student database.',
    'Run the console app, find the part for this lesson and compare its printed result with the explanation.',
  ],
  '09-desktop-data': [
    'A desktop student register',
    'Build a WPF window to add, show, edit and remove students. Compare database storage with exporting data as a JSON text file.',
    'The example can use SQLite or SQL Server. JSON export creates a separate file.',
    'Run the Windows desktop app, add a student, select the row and try editing it.',
  ],
  '10-wpf-mvvm': [
    'A desktop student form with clear responsibilities',
    'Build a WPF screen whose values and buttons connect to a ViewModel. The form checks input and refreshes when values change.',
    'This example keeps its working student list in memory.',
    'Type a name and age, watch whether the Add button is enabled, then add a student to the list.',
  ],
  '11-libraries-reflection': [
    'A shared toolbox and a console app that uses it',
    'Put reusable rules in a class library, then call them from a console project. Explore how C# can inspect types or create a small type at runtime.',
    'The example prints results in the console; it does not use a database.',
    'Build both projects together, run the console app and check the rule and reflection output.',
  ],
  '12-docker-school': [
    'A student website, API and database running in containers',
    'Package a .NET API and MVC website into images. Docker Compose starts them with SQL Server so the three services can work together.',
    'SQL Server stores its files in a named Docker volume so they can survive container replacement.',
    'Follow the setup steps, start the Compose stack, open the website and add a student.',
  ],
  '13-api-http-tests': [
    'A console checker for the student API',
    'Write a small program that sends real HTTP requests and checks the returned status and data. It reports PASS when an expected result matches.',
    'The checker uses the separately running controller API and its in-memory student list.',
    'Start the controller API first, then run this console project and inspect the PASS messages.',
  ],
  '14-openapi-swagger': [
    'A student API with a browser-based testing page',
    'Generate an OpenAPI document describing the endpoints. Swagger UI reads it and lets you send requests from a webpage during development.',
    'This example uses an in-memory student store. Documentation is enabled in Development.',
    'Run the API in Development, open /swagger and try creating and reading a student.',
  ],
};
export const lessonFocus = {
  'cs-lifetime':
    'Watch when an object can be cleaned up and use using to close an owned resource promptly.',
  'cs-language-tools':
    'Try one operator, one custom error type and one extension method before combining them.',
  'cs-linq':
    'Filter a list with Where, choose fields with Select and compare the resulting values.',
  'cs-processes':
    'Inspect a running process and distinguish process information from older .NET Framework AppDomain concepts.',
  'cs-threads':
    'Compare shared counter updates and see why simultaneous changes need coordination.',
  'cs-async':
    'Follow an awaited task, cancellation and several tasks waited for together.',
  'cs-web-foundations':
    'Follow a request from its URL to a controller action and back as a response.',
  'cs-crud-minimal':
    'Learn one HTTP action at a time before adding more files or a database.',
  'cs-crud-controllers':
    'Find the route, input rules and response for each action inside the controller.',
  'cs-openapi':
    'Compare the OpenAPI description with the Swagger UI page that displays it.',
  'cs-ef-sqlite': 'Connect C# student objects to rows in a small local SQLite file.',
  'cs-sqlserver':
    'Connect to your SQL Server instance and create tables with an EF Core migration.',
  'cs-ado-api':
    'Follow one SQL parameter from the incoming request into the database command.',
  'cs-api-auth':
    'Register, log in and use the returned token to call a protected endpoint.',
  'cs-advanced-api':
    'Try paging, ownership checks and an edit with an out-of-date version.',
  'cs-mvc-client':
    'Follow a form submission from the MVC website to the API and back to a page.',
  'cs-api-testing':
    'Check expected responses automatically instead of guessing whether a request worked.',
  'cs-files-json': 'Write student data to a JSON file and read it back as a preview.',
  'cs-desktop-ado':
    'Use SQL commands from the desktop app to read and change student rows.',
  'cs-desktop-ef':
    'Use an EF Core context from the desktop app to save and load student objects.',
  'cs-code-database-first':
    'Compare creating a database from C# models with generating models from an existing database.',
  'cs-mvvm':
    'Locate the Model, View and ViewModel, then follow one binding between them.',
  'cs-notifications-validation':
    'Check an input value and notify the screen when a property changes.',
  'cs-commands-mvc':
    'Connect a WPF button to a command and compare that job with an MVC controller action.',
  'cs-class-libraries':
    'Move a reusable rule into a library and call it from another project.',
  'cs-reflection':
    'Inspect a type and call a member using information discovered while the program runs.',
  'cs-dynamic-dlr':
    'Compare ordinary type checking with an operation checked when the program runs.',
  'cs-dynamic-assemblies': 'Create a tiny type in memory and inspect the result.',
  'docker-containers':
    'Identify the website, API and database as three separate services.',
  'docker-dotnet-image':
    'Build an image in stages so the final image contains what the app needs to run.',
  'docker-cli':
    'Build an image, start a container and inspect its status using commands.',
  'docker-compose-stack': 'Read the Compose file and start the three services together.',
  'docker-networking':
    'Follow the website-to-API and API-to-database connections using service names.',
  'docker-volumes':
    'Find where the database files live and understand what happens when containers are replaced.',
  'docker-monitor-scale':
    'Inspect service logs and learn the limits of scaling services that publish fixed host ports.',
};

projectBriefs['15-csharp-foundations'] = [
  'Your first console student register',
  'Store a name and mark, choose a pass message and print a list of marks. This is the starting point for the student register learning journey.',
  'All values are temporary and live in memory while the console app runs.',
  'Run the program, compare the seven output lines, then change mark to 45 and predict the new messages.',
];
lessonFocus['cs-foundations'] =
  'Practise variables, conditions, loops, methods, classes, objects and lists before using the advanced units.';
