using System.ComponentModel.DataAnnotations;

public class Student
{
    public int Id { get; set; }

    [Required, StringLength(80)]
    public string Name { get; set; } = "";

    [Range(16, 100)]
    public int Age { get; set; }
}

public record StudentInput([Required, StringLength(80)] string Name, [Range(16, 100)] int Age);
