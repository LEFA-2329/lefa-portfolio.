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
