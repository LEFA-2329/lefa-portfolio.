using System.Collections.Concurrent;

public class StudentStore
{
    private int id;
    public ConcurrentDictionary<int, Student> Rows { get; } = new();

    public int NextId() => Interlocked.Increment(ref id);
}
