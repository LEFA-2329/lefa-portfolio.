// Follow the numbered teaching parts in order. The full file combines every part.
using System.ComponentModel.DataAnnotations;

// STUDY PART: Define Student
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public class Student
{
    public int Id { get; set; }

    [MaxLength(80)]
    public string Name { get; set; } = "";
    public int Age { get; set; }
    public string OwnerId { get; set; } = "";
    public Guid Version { get; set; } = Guid.NewGuid();
}

// STUDY PART: Define StudentInput
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public record StudentInput([Required, StringLength(80)] string Name, [Range(16, 100)] int Age);
// STUDY PART: Define StudentUpdate
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public record StudentUpdate([Required, StringLength(80)] string Name, [Range(16, 100)] int Age, Guid Version);
// STUDY PART: Define StudentView
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public record StudentView(int Id, string Name, int Age, Guid Version);
// STUDY PART: Define StudentPatch
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public record StudentPatch([StringLength(80)] string? Name, [Range(16, 100)] int? Age, Guid Version);
