// Curated links checked November 2026. Edit these records to add learning resources.
export const resources = [
  {
    topics: ['web'],
    kind: 'Learning guide',
    provider: 'MDN Web Docs',
    title: 'Build and style a responsive web page',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design',
    description:
      'See how flexible layouts, the viewport and media queries work together.',
    note: 'Try the examples as you work through Unit 5.',
  },
  {
    topics: ['web'],
    kind: 'Validation tool',
    provider: 'W3C',
    title: 'Nu HTML Checker',
    url: 'https://validator.w3.org/nu/',
    description: 'Validate a page by address, upload or direct input.',
    note: 'Correct the first reported structural error, then check again.',
  },
  {
    topics: ['csharp'],
    kind: 'Official tutorial',
    provider: 'Microsoft Learn',
    title: 'Build a controller-based Web API',
    url: 'https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-10.0',
    description: 'Follow ASP.NET Core routing, models and CRUD actions.',
    note: 'Match the documentation framework version to your project.',
  },
  {
    topics: ['csharp'],
    kind: 'Official guide',
    provider: 'Microsoft Learn',
    title: 'Manage object lifetime and garbage collection',
    url: 'https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/fundamentals',
    description: 'Understand managed memory and resource cleanup.',
    note: 'Use alongside the object lifetime lessons.',
  },
  {
    topics: ['docker'],
    kind: 'Official guide',
    provider: 'Docker',
    title: 'Docker Compose quickstart',
    url: 'https://docs.docker.com/compose/gettingstarted/',
    description: 'Build and run a multi-container application.',
    note: 'Use the StudyLab Docker project for the .NET and SQL Server stack.',
  },
  {
    topics: ['docker'],
    kind: 'Official guide',
    provider: 'Microsoft Learn',
    title: 'Run SQL Server in Docker',
    url: 'https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker',
    description: 'Review supported hosts, container settings and database connections.',
    note: 'Check SQL Server architecture and memory requirements before starting.',
  },
  {
    topics: ['programming', 'algorithms'],
    kind: 'Course + videos',
    provider: 'Harvard CS50',
    title: 'Computer science foundations',
    url: 'https://cs50.harvard.edu/x/',
    description:
      'Lectures and practice covering conditions, loops, arrays and problem solving.',
    note: 'Examples use C and other languages; apply the ideas to your pseudocode.',
  },
  {
    topics: ['algorithms'],
    kind: 'Lecture + notes',
    provider: 'Harvard CS50',
    title: 'Algorithms: searching and sorting',
    url: 'https://cs50.harvard.edu/x/weeks/3/',
    description:
      'Explore how searching and sorting algorithms work and compare their efficiency.',
    note: 'A useful companion to linear search and bubble sort.',
  },
  {
    topics: ['programming', 'algorithms'],
    kind: 'YouTube channel',
    provider: 'Harvard CS50',
    title: 'Watch CS50 on YouTube',
    url: 'https://www.youtube.com/cs50',
    description:
      'Browse explanations and demonstrations from the official CS50 teaching team.',
    note: 'Search the channel for your topic. Video playback uses data.',
  },
  {
    topics: ['programming'],
    kind: 'Interactive practice',
    provider: 'Khan Academy',
    title: 'Programming with JavaScript',
    url: 'https://www.khanacademy.org/computing/computer-programming',
    description:
      'Practise programming through drawing, animation and interactive challenges.',
    note: 'JavaScript syntax differs from StudyLab pseudocode.',
  },
  {
    topics: ['sql', 'joins'],
    kind: 'Interactive practice',
    provider: 'Khan Academy',
    title: 'Intro to SQL',
    url: 'https://www.khanacademy.org/computing/sql',
    description: 'Practise querying and managing relational data with guided exercises.',
    note: 'Check syntax differences before running examples in SQL Server.',
  },
  {
    topics: ['sql', 'scripting'],
    kind: 'Official tutorial',
    provider: 'Microsoft Learn',
    title: 'Write Transact-SQL statements',
    url: 'https://learn.microsoft.com/en-us/sql/t-sql/tutorial-writing-transact-sql-statements',
    description:
      'Follow SQL Server examples for creating objects, inserting data and querying tables.',
    note: 'Best match for SQL Server and DATA6222 T-SQL examples.',
  },
  {
    topics: ['sql', 'joins', 'design'],
    kind: 'Course + videos',
    provider: 'Harvard CS50',
    title: 'Introduction to databases with SQL',
    url: 'https://cs50.harvard.edu/sql/',
    description: 'Study queries, relationships, database design, views and indexes.',
    note: 'The course uses SQLite and discusses other database systems.',
  },
  {
    topics: ['joins'],
    kind: 'Lecture + notes',
    provider: 'Harvard CS50',
    title: 'Relating tables and joins',
    url: 'https://cs50.harvard.edu/sql/weeks/1/',
    description: 'See how keys and joins bring related data together.',
    note: 'Compare the examples with your SQL Server join exercises.',
  },
  {
    topics: ['design'],
    kind: 'Reading',
    provider: 'Microsoft Support',
    title: 'Database design basics',
    url: 'https://support.microsoft.com/en-us/access/database-design-basics',
    description: 'Work through tables, keys, relationships and normalisation.',
    note: 'Access examples explain design principles that also apply to SQL Server.',
  },
  {
    topics: ['design'],
    kind: 'Tutorial',
    provider: 'Cornell Virtual Workshop',
    title: 'Database normalisation',
    url: 'https://cvw.cac.cornell.edu/RelationalDBs/design-create/database_normalization',
    description: 'Review normalisation as part of designing relational databases.',
    note: 'Use alongside StudyLab’s 1NF, 2NF and 3NF dependency diagrams.',
  },
  {
    topics: ['scripting'],
    kind: 'Video series',
    provider: 'Microsoft Learn',
    title: 'Programming databases with T-SQL',
    url: 'https://learn.microsoft.com/en-us/sql/t-sql/videos-transact-sql',
    description: 'Watch demonstrations of database programming with Transact-SQL.',
    note: 'Video playback uses data; follow the accompanying learning modules too.',
  },
  {
    topics: ['scripting'],
    kind: 'Guided module',
    provider: 'Microsoft Learn',
    title: 'Implement transactions with Transact-SQL',
    url: 'https://learn.microsoft.com/en-us/training/modules/implement-transactions-transact-sql/',
    description: 'Learn to group statements into transactions and handle failures.',
    note: 'Practise against a disposable training database.',
  },
  {
    topics: ['hadoop'],
    kind: 'Official tutorial',
    provider: 'Apache Hadoop',
    title: 'MapReduce tutorial',
    url: 'https://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html',
    description:
      'Explore map and reduce stages through the official Hadoop programming guide.',
    note: 'More advanced material with Java examples; installation is separate from StudyLab.',
  },
];
export function recommendedTopic(course, title = '') {
  if (course === 'wede') return 'web';
  if (course === 'csharp') return 'csharp';
  if (course === 'docker') return 'docker';
  if (/hadoop|mapreduce|hdfs|big data/i.test(title)) return 'hadoop';
  if (/normali|dependenc|design|erd|entit/i.test(title)) return 'design';
  if (/join|relationship/i.test(title)) return 'joins';
  if (/transaction|procedur|script|batch|trigger|error/i.test(title)) return 'scripting';
  if (course === 'prld')
    return /array|search|sort|algorithm/i.test(title) ? 'algorithms' : 'programming';
  return 'sql';
}
