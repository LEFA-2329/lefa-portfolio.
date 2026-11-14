// Follow the numbered teaching parts in order. The full file combines every part.
using System.Collections.Concurrent;

// STUDY PART: Define StudentStore
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public class StudentStore
{
    private int id;
    public ConcurrentDictionary<int, Student> Rows { get; } = new();

    // STUDY PART: Allocate a new ID safely
    // Interlocked increments the counter atomically for this in-memory example.
    public int NextId() => Interlocked.Increment(ref id);
}
