// Follow the numbered teaching parts in order. The full file combines every part.
using System.ComponentModel.DataAnnotations;

// STUDY PART: Define Student
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public class Student
{
    public int Id { get; set; }

    [Required, StringLength(80)]
    public string Name { get; set; } = "";

    [Range(16, 100)]
    public int Age { get; set; }
}

// STUDY PART: Define StudentInput
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public record StudentInput([Required, StringLength(80)] string Name, [Range(16, 100)] int Age);
