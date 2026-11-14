# C# PROG6212 and Docker

C# PROG6212 follows Units 1–5 from the supplied outline. Docker is a separate picker entry with foundations/image creation and Compose topics, rather than a page named Learning Unit 6. The PRLD display code is PRLD5121; existing internal prld keys and routes remain stable so previous work is preserved.

There are 28 C# lessons, 7 Docker lessons, 70 expandable tasks/answers, 35 checked quiz questions, and 14 complete example packs. Each lesson shows the relevant source files and offers a browser-generated ZIP. Examples use .NET 10. Lesson narratives distinguish expected results, classroom shortcuts and modern/legacy APIs. C# is displayed in StudyLab and executed locally in Visual Studio/.NET, rather than pretending to run C# in JavaScript.

## Editing locations

- Units, outcomes, lesson order and quizzes: `dist/learn/js/csharp/course-outline-and-lessons.mjs`.
- Plain-English explanations and tasks: `dist/learn/pages/cs-*.html` and `docker-*.html`.
- Editable, complete project source: `dist/learn/downloads/csharp/01-*` through `14-*`. Each pack has a .csproj or a full Docker stack, configuration and README.
- Course rendering/progress: `dist/learn/js/csharp/csharp-and-docker-pages.mjs`.
- ZIP writer: `dist/learn/js/csharp/project-zip-download.mjs`.
- Source catalogue build: `scripts/build-csharp-examples.mjs`. Do not edit its generated complete-example-files.mjs output.

Run `npm run format`, `npm run build`, `npm test`, then `npm run format:check`. Build regenerates both the source catalogue and compiled HTML pages. The source downloads are intentionally excluded from Prettier; C#, XAML and Docker sources retain their own formatting. bin/obj/databases and real .env files are excluded from source packs and Git.

## Learning state

C#/Docker completion and last quiz scores use `studylab-csharp-learning-v1`. Completion is explicitly self-reported. Existing PRLD/database completion records are separate. The new progress page shows last checked scores and completion per lesson. Private browsing, cleared site data or blocked localStorage can prevent restoration; a failed save reports that it is visit-only.

## Verification and limits

- All example .csproj files build using the .NET 10 SDK; WPF is cross-compiled with Windows targeting. Updated dependency versions restore without reported package-security warnings.
- Runtime HTTP checks cover Minimal API CRUD, controller CRUD/validation, SQLite CRUD, Identity registration/login, ownership isolation, bounded paging and stale-version conflict handling.
- The supplied console HTTP test runner creates its own row, checks 201/200/204/400/404 and cleans it up. Console feature/reflection outputs were executed and checked.
- ZIP archives are checked for valid structure and CRCs. Browser checks cover course switching, lesson/source display, quiz checking, completion restoration and downloads.
- SQL Server projects compile, but a SQL Server service is not available here for integration execution. Docker engine is unavailable; Compose YAML and service dependencies are checked, not a running full stack. WPF windows require a Windows desktop for interactive execution. The lessons contain the exact local steps for those remaining environment-specific checks.

## Primary reference material

Original explanations were checked against Microsoft Learn documentation for ASP.NET Core 10, Identity API endpoints, EF Core, garbage collection, WPF and modern .NET compatibility, and Docker’s Compose/startup documentation. Related links appear in Helpful resources for the selected course.

- https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-10.0
- https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-10.0
- https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/fundamentals
- https://learn.microsoft.com/en-us/dotnet/core/porting/net-framework-tech-unavailable
- https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data
- https://docs.docker.com/compose/gettingstarted/
- https://docs.docker.com/compose/how-tos/startup-order/
- https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker

## Numbered code walkthroughs

Each lesson now shows ordered files with small numbered code fragments, followed by the complete project files. Source comments beginning with STUDY PART define meaningful boundaries; C# comments were placed at syntax-node boundaries rather than inside strings or method bodies. XML, Docker, SQL and HTTP examples use their own comment syntax. JSON stays valid JSON, with explanations outside the code.

Edit the source examples to change comments or boundaries. `step-by-step-code.mjs` extracts parts without removing text, so joining the parts exactly reconstructs the downloadable file. A fragment can contain an unfinished class/block and is labelled as such; combine the fragments in the same file before building. The complete-file section and ZIP remain the runnable reference.
