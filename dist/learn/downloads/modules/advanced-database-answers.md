# Advanced Database - worked answers

Compare your reasoning, not only the final result. Code fragments assume the schema and environment in each question. Test SQL Server, WPF and Docker examples in their native tools.

## Answer 1

Both may believe stock is available. Use an atomic conditional update: UPDATE Product SET Stock = Stock - 1 WHERE ProductID = @id AND Stock > 0; check that exactly one row changed. Group related operations in a transaction.

## Answer 2

Inspect the actual execution plan, row estimates, reads, statistics and parameter values. Consider an index beginning with CustomerID. Compare timings and write costs on representative data.

## Answer 3

HDFS stores file blocks across machines with replication. Map emits (word, 1). Shuffle groups matching words. Reduce sums each group. A word occurring three times produces (word, 3).

## Answer 4

No. Restore it into an isolated environment and validate data and application access. Test recovery time and the acceptable amount of lost work. Protect and retain backups separately.

## Answer 5

Partitioning divides data, for example by date, to distribute storage or work. Replication keeps copies to support availability or reads. A distributed system can use both; copies can lag and require consistency decisions.

