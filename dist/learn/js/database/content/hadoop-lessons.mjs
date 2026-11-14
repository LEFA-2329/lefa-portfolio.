// Original Hadoop extension; native cluster execution remains pending.
export const hadoopUnit = {
  id: 209,
  number: 9,
  title: 'Hadoop and Big Data',
  subtitle: 'Advanced Database \u00b7 distributed data systems',
  chapter: '',
  sessions: 'Suggested study: three sessions',
  overview:
    'Explore how distributed storage and batch processing complement relational databases. Separate HDFS storage, YARN resource management and MapReduce computation, then use Hive to describe analytical queries and compare Spark workloads.',
  themes: [
    'Hadoop architecture and HDFS',
    'YARN and MapReduce',
    'Hive, Spark and relational trade-offs',
  ],
  outcomes: [
    'Distinguish Hadoop storage, scheduling and computation responsibilities.',
    'Explain HDFS blocks, replication, failure recovery and small-file trade-offs.',
    'Trace map, shuffle, group and reduce stages.',
    'Explain ResourceManager, NodeManager and ApplicationMaster roles.',
    'Write a Hive aggregation and choose a partition strategy.',
    'Compare Hadoop, Spark and relational databases for a workload.',
  ],
  check:
    'Complete all three lessons, nine quiz questions and six written tasks. Command examples require a separately configured Hadoop or Hive lab; they do not execute in the browser SQL workspace.',
};
export const hadoopLessons = [
  {
    id: 'advanced-9-1',
    unit: 209,
    title: 'Hadoop architecture and HDFS',
    sections: [
      {
        heading: 'What Hadoop provides',
        text: 'Hadoop is an ecosystem for distributed storage and processing, not a replacement name for every big-data tool. HDFS stores files across nodes; YARN coordinates compute resources; MapReduce is one processing framework. Large data volume alone does not justify a cluster: consider access patterns, latency, skills and operational cost.',
      },
      {
        heading: 'Blocks, metadata and replication',
        text: 'HDFS divides files into blocks. The NameNode manages the namespace and block-location metadata; DataNodes store block replicas and serve data to clients. Block size and replication factor are configurable. Replication adds failure tolerance and storage cost; it is not a substitute for an independent recovery strategy. High-availability deployments add standby NameNode arrangements rather than relying on a single active process forever.',
      },
      {
        heading: 'Capacity and workload fit',
        text: 'With replication factor 3, 100 GiB of logical data needs roughly 300 GiB for replicas before metadata and operational overhead, assuming full replication. Many tiny files increase namespace overhead and reduce throughput. HDFS targets large sequential access; frequent low-latency row updates usually belong in a system designed for that purpose. A Secondary NameNode performs checkpoints in applicable configurations; it is not automatically a hot standby.',
      },
      {
        heading: 'Practice environment',
        text: 'These commands and concepts need a separately configured Hadoop/Hive lab. The browser SQL engine does not simulate HDFS, YARN, MapReduce or Hive. Examples are teaching material and have not been run against a native cluster here.',
      },
    ],
    example: {
      title: 'Calculate replica storage',
      problem:
        'A lab stores 200 GiB of files at replication factor 3. Estimate replica storage and explain one limitation.',
      solution:
        'About 600 GiB is required for replicas alone. Reserve extra capacity for metadata, temporary output, growth and recovery. Replication protects against some failures but does not prevent an authorised deletion from propagating.',
    },
    sampleCode:
      '# Hadoop shell; configured HDFS and permissions required.\n# Run in a dedicated lab; this is not browser SQL.\nhdfs dfs -mkdir -p /user/studylab/hadoop-lab/input\n# Prepare a small local events.txt first; upload only fictional data.\nhdfs dfs -put events.txt /user/studylab/hadoop-lab/input/\nhdfs dfs -ls /user/studylab/hadoop-lab/input\nhdfs dfs -cat /user/studylab/hadoop-lab/input/events.txt\n# Existing files are not overwritten by this example.\n',
    environment: 'hadoop',
    environmentLabel: 'Hadoop shell example',
    download: 'advanced-9-1.txt',
    downloadFolder: 'advanced',
    references: [
      {
        title: 'Apache HDFS architecture',
        url: 'https://hadoop.apache.org/docs/r3.4.3/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html',
      },
      {
        title: 'Apache YARN architecture',
        url: 'https://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/YARN.html',
      },
      {
        title: 'Apache MapReduce tutorial',
        url: 'https://hadoop.apache.org/docs/r3.4.3/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html',
      },
      {
        title: 'Apache Hive SELECT manual',
        url: 'https://hive.apache.org/docs/latest/language/languagemanual-select/',
      },
    ],
    quizzes: [
      {
        question: 'Which component stores HDFS block data?',
        options: ['ResourceManager', 'Hive metastore', 'DataNode'],
        answer: 2,
        explanation:
          'DataNodes store and serve blocks; the NameNode manages filesystem metadata.',
      },
      {
        question:
          '100 GiB is fully replicated three times. What is the approximate replica space before overhead?',
        options: ['33 GiB', '300 GiB', '100 GiB'],
        answer: 1,
        explanation:
          'Three copies multiply the logical size by three; metadata and working space require additional capacity.',
      },
      {
        question: 'Which workload best fits HDFS?',
        options: [
          'Large sequential batch reads',
          'Frequent individual bank-balance updates',
          'A guarantee of sub-millisecond point lookups',
        ],
        answer: 0,
        explanation:
          'HDFS is designed for throughput-oriented file access; transaction and latency requirements need other design choices.',
      },
    ],
    quizRevision: 'hadoop-1',
    task: {
      title: 'Separate the responsibilities',
      prompt:
        'A student says YARN stores the data blocks and the NameNode performs every query. Correct both claims and describe a client read.',
      hint: 'Separate metadata from bytes and scheduling.',
      solution:
        'YARN allocates compute resources. The NameNode manages file metadata and block locations; DataNodes store blocks. An HDFS client obtains locations from the NameNode and reads bytes from appropriate DataNodes. Query execution belongs to the selected processing framework.',
      revision: 'hadoop-1',
    },
    tasks: [
      {
        title: 'Separate the responsibilities',
        prompt:
          'A student says YARN stores the data blocks and the NameNode performs every query. Correct both claims and describe a client read.',
        hint: 'Separate metadata from bytes and scheduling.',
        solution:
          'YARN allocates compute resources. The NameNode manages file metadata and block locations; DataNodes store blocks. An HDFS client obtains locations from the NameNode and reads bytes from appropriate DataNodes. Query execution belongs to the selected processing framework.',
        revision: 'hadoop-1',
      },
      {
        title: 'Plan storage and files',
        prompt:
          'A college has 2 TiB of logs, replication factor 3 and millions of tiny files. Estimate replica space and recommend two design changes.',
        hint: 'Calculate raw replica space before overhead.',
        solution:
          'About 6 TiB is needed for replicas before overhead and headroom. Compact small files into larger suitable files, and plan storage growth plus failure-recovery capacity. Keep an independent recovery strategy; replication alone does not recover every logical mistake.',
        revision: 'hadoop-1',
      },
    ],
  },
  {
    id: 'advanced-9-2',
    unit: 209,
    title: 'YARN and MapReduce processing',
    sections: [
      {
        heading: 'Resource management is separate from computation',
        text: 'In YARN, the ResourceManager arbitrates cluster resources, NodeManagers manage containers on nodes, and an ApplicationMaster coordinates a particular application. A YARN container is an allocation of resources and an execution context; it need not mean a Docker container. MapReduce can run on YARN, while other engines can use YARN too.',
      },
      {
        heading: 'Map, shuffle and reduce',
        text: 'A mapper transforms input records into intermediate key/value pairs. The shuffle partitions and transfers intermediate records so values for the same key reach the appropriate reducer; sorting/grouping prepares each key group. Reducers aggregate groups. A combiner can reduce transfer for suitable operations, but may run zero or multiple times, so correctness must never depend on it.',
      },
      {
        heading: 'Failures, skew and predictable results',
        text: 'MapReduce can retry failed tasks, so external side effects need careful handling. Hot keys can overload one reducer even when workers are otherwise idle. Data-local execution can reduce network traffic, but scheduling cannot always guarantee locality. Multiple reducer outputs do not automatically form one globally sorted file.',
      },
      {
        heading: 'Practice environment',
        text: 'These commands and concepts need a separately configured Hadoop/Hive lab. The browser SQL engine does not simulate HDFS, YARN, MapReduce or Hive. Examples are teaching material and have not been run against a native cluster here.',
      },
    ],
    example: {
      title: 'Trace word count',
      problem:
        'Input lines are "data data" and "lab data". Show intermediate pairs and final counts.',
      solution:
        'Map emits (data,1),(data,1),(lab,1),(data,1). Shuffle groups data:[1,1,1] and lab:[1]. Reduce sums to data=3 and lab=1. A sum combiner can reduce traffic but is optional.',
    },
    sampleCode:
      'MAP(record):\n  FOR EACH token IN split(record)\n    EMIT(token, 1)\n\nSHUFFLE_AND_GROUP:\n  data: [1, 1, 1]\n  lab: [1]\n\nREDUCE(token, values):\n  EMIT(token, SUM(values))\n\nEXPECTED OUTPUT (order not guaranteed):\n  data 3\n  lab 1\n# Teaching pseudocode, not a runnable Hadoop job.\n',
    environment: 'hadoop',
    environmentLabel: 'MapReduce teaching pseudocode',
    download: 'advanced-9-2.txt',
    downloadFolder: 'advanced',
    references: [
      {
        title: 'Apache HDFS architecture',
        url: 'https://hadoop.apache.org/docs/r3.4.3/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html',
      },
      {
        title: 'Apache YARN architecture',
        url: 'https://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/YARN.html',
      },
      {
        title: 'Apache MapReduce tutorial',
        url: 'https://hadoop.apache.org/docs/r3.4.3/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html',
      },
      {
        title: 'Apache Hive SELECT manual',
        url: 'https://hive.apache.org/docs/latest/language/languagemanual-select/',
      },
    ],
    quizzes: [
      {
        question: 'Which component coordinates one YARN application?',
        options: ['Secondary NameNode', 'ApplicationMaster', 'DataNode'],
        answer: 1,
        explanation:
          'The ApplicationMaster coordinates its application and requests resources through YARN.',
      },
      {
        question: 'What brings all values for a key to its reducer?',
        options: ['Shuffle and grouping', 'HDFS replication alone', 'A browser ORDER BY'],
        answer: 0,
        explanation:
          'Intermediate data is partitioned, transferred and grouped by key before reduce processing.',
      },
      {
        question: 'Why is averaging mapper averages generally wrong?',
        options: [
          'Addition cannot be parallelised',
          'A combiner always runs exactly once',
          'Groups may contain different numbers of values',
        ],
        answer: 2,
        explanation:
          'Carry both sum and count, combine those, then divide once at the end; unweighted partial averages lose group-size information.',
      },
    ],
    quizRevision: 'hadoop-1',
    task: {
      title: 'Trace a grouped count',
      prompt:
        'Input lines are "sql hive sql" and "hive spark". Give map pairs, grouped values and reduced totals. Explain whether final line order is guaranteed.',
      hint: 'Emit one pair per token.',
      solution:
        'Pairs: (sql,1),(hive,1),(sql,1),(hive,1),(spark,1). Groups: sql:[1,1], hive:[1,1], spark:[1]. Totals: sql=2,hive=2,spark=1. Do not assume globally sorted final output across multiple reducers without an explicit global ordering design.',
      revision: 'hadoop-1',
    },
    tasks: [
      {
        title: 'Trace a grouped count',
        prompt:
          'Input lines are "sql hive sql" and "hive spark". Give map pairs, grouped values and reduced totals. Explain whether final line order is guaranteed.',
        hint: 'Emit one pair per token.',
        solution:
          'Pairs: (sql,1),(hive,1),(sql,1),(hive,1),(spark,1). Groups: sql:[1,1], hive:[1,1], spark:[1]. Totals: sql=2,hive=2,spark=1. Do not assume globally sorted final output across multiple reducers without an explicit global ordering design.',
        revision: 'hadoop-1',
      },
      {
        title: 'Repair a combiner and skew',
        prompt:
          'One mapper sees marks 10 and 20; another sees 90. Explain why averaging their averages is wrong. What if one course key holds 90% of all records?',
        hint: 'Use sum/count; inspect key distribution.',
        solution:
          'The averages 15 and 90 yield 52.5 if combined equally, but the true mean is 120/3=40. Emit (sum,count), combine each component and divide in the final reducer. A hot course key creates skew; consider two-stage aggregation or appropriate partitioning while preserving the final grouping semantics.',
        revision: 'hadoop-1',
      },
    ],
  },
  {
    id: 'advanced-9-3',
    unit: 209,
    title: 'Hive, Spark and analytical design',
    sections: [
      {
        heading: 'Hive tables and query processing',
        text: 'Hive provides SQL-style analytical access to distributed data, with table metadata describing locations, formats and columns. An external table can refer to existing files; creating metadata does not copy every file into the metastore. Execution depends on the configured engine and deployment, so do not assume every Hive query launches a MapReduce job. Schema-on-read still needs data validation and format contracts.',
      },
      {
        heading: 'Partitioning and columnar storage',
        text: 'Partitioning by a useful date or region can let queries skip irrelevant data when filters match the partition structure. Excessive high-cardinality partitions and many small files increase overhead. Columnar formats such as Parquet and ORC can reduce analytical I/O, depending on projection, compression and engine capabilities. Compare plans and measured scans rather than promising universal speedups.',
      },
      {
        heading: 'Choose between relational, Hadoop and Spark workloads',
        text: 'A relational DBMS is a strong fit for constrained operational transactions and joins. Hadoop supplies distributed storage and resource-management components. Spark is a processing engine that can use HDFS and YARN or other storage and cluster managers; it does not require all data to fit in memory and may spill to disk. Iterative analytics may benefit from reuse and caching, but Spark is not guaranteed to beat every alternative.',
      },
      {
        heading: 'Practice environment',
        text: 'These commands and concepts need a separately configured Hadoop/Hive lab. The browser SQL engine does not simulate HDFS, YARN, MapReduce or Hive. Examples are teaching material and have not been run against a native cluster here.',
      },
    ],
    example: {
      title: 'Aggregate fictional order events',
      problem:
        'A text file has lines North,120.00 then North,80.00 then South,50.00. What does a grouped Hive revenue query return?',
      solution:
        'For a two-column region/amount schema, GROUP BY region with SUM(amount) returns North=200.00 and South=50.00. ORDER BY region makes this small demonstration deterministic. Real CSV quoting and malformed rows require an appropriate SerDe or preprocessing; a simple comma delimiter is not a general CSV parser.',
    },
    sampleCode:
      "-- HiveQL, not SQL Server or the browser workspace.\n-- Prerequisite: configured Hive, HDFS access and an unused lab path.\n-- Upload these headerless fictional rows to the lab directory first:\n-- North,120.00\n-- North,80.00\n-- South,50.00\nCREATE EXTERNAL TABLE IF NOT EXISTS studylab_hadoop_orders (\n  region STRING, amount DECIMAL(10,2)\n)\nROW FORMAT DELIMITED FIELDS TERMINATED BY ','\nSTORED AS TEXTFILE\nLOCATION '/user/studylab/hadoop-lab/orders';\nSELECT region, SUM(amount) AS revenue\nFROM studylab_hadoop_orders\nGROUP BY region\nORDER BY region;\n-- Existing table metadata is not replaced by IF NOT EXISTS; inspect it first.\n",
    environment: 'hadoop',
    environmentLabel: 'HiveQL example',
    download: 'advanced-9-3.txt',
    downloadFolder: 'advanced',
    references: [
      {
        title: 'Apache HDFS architecture',
        url: 'https://hadoop.apache.org/docs/r3.4.3/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html',
      },
      {
        title: 'Apache YARN architecture',
        url: 'https://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/YARN.html',
      },
      {
        title: 'Apache MapReduce tutorial',
        url: 'https://hadoop.apache.org/docs/r3.4.3/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html',
      },
      {
        title: 'Apache Hive SELECT manual',
        url: 'https://hive.apache.org/docs/latest/language/languagemanual-select/',
      },
    ],
    quizzes: [
      {
        question: 'What is Hive primarily adding to distributed data?',
        options: [
          'SQL-style table metadata and analytical querying',
          'HDFS block replication',
          'Automatic row-level OLTP behaviour for every file',
        ],
        answer: 0,
        explanation:
          'Hive describes tables and supports analytical queries; storage and execution depend on the configured environment.',
      },
      {
        question:
          'Which design can help a report that reads one month of a large event history?',
        options: [
          'One partition for every individual row',
          'Remove all date filters',
          'Suitable date partitions and matching filters',
        ],
        answer: 2,
        explanation:
          'Useful partitioning can prune data; excessive partitions and small files introduce costs.',
      },
      {
        question: 'Which statement correctly compares Spark and Hadoop?',
        options: [
          'Spark requires the entire dataset to fit in RAM',
          'Spark can use HDFS and YARN but also supports other storage and managers',
          'Spark always replaces every Hadoop component',
        ],
        answer: 1,
        explanation:
          'Spark is a processing engine; Hadoop components can provide storage and cluster resources. Spark may spill to disk.',
      },
    ],
    quizRevision: 'hadoop-1',
    task: {
      title: 'Write a Hive aggregation',
      prompt:
        'Given sales(region STRING, amount DECIMAL(10,2)), return regions whose total amount exceeds 1000. Sort by region and explain WHERE versus HAVING.',
      hint: 'Filter grouped SUM with HAVING.',
      solution:
        'SELECT region, SUM(amount) AS total FROM sales GROUP BY region HAVING SUM(amount)>1000 ORDER BY region; WHERE filters source rows before grouping; HAVING filters aggregate groups. Test NULL and malformed input policies separately.',
      revision: 'hadoop-1',
    },
    tasks: [
      {
        title: 'Write a Hive aggregation',
        prompt:
          'Given sales(region STRING, amount DECIMAL(10,2)), return regions whose total amount exceeds 1000. Sort by region and explain WHERE versus HAVING.',
        hint: 'Filter grouped SUM with HAVING.',
        solution:
          'SELECT region, SUM(amount) AS total FROM sales GROUP BY region HAVING SUM(amount)>1000 ORDER BY region; WHERE filters source rows before grouping; HAVING filters aggregate groups. Test NULL and malformed input policies separately.',
        revision: 'hadoop-1',
      },
      {
        title: 'Choose an end-to-end architecture',
        prompt:
          'A college needs immediate enrolment updates, referential integrity and nightly analytics over years of click logs. Choose storage and processing roles and explain two operational concerns.',
        hint: 'Separate operational transactions from bulk analytics.',
        solution:
          'Keep enrolments in a relational transactional DBMS. Store suitably sized log files in HDFS or another appropriate data lake, then query with Hive or process with Spark according to requirements. Plan ingestion validation, partition/file layout, permissions, recovery and late-arriving data. Do not claim Hadoop makes operational constraints or cross-system consistency automatic.',
        revision: 'hadoop-1',
      },
    ],
  },
];
