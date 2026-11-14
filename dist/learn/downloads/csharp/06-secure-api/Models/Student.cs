using System.ComponentModel.DataAnnotations;

public class Student
{
    public int Id { get; set; }

    [MaxLength(80)]
    public string Name { get; set; } = "";
    public int Age { get; set; }
    public string OwnerId { get; set; } = "";
    public Guid Version { get; set; } = Guid.NewGuid();
}

public record StudentInput([Required, StringLength(80)] string Name, [Range(16, 100)] int Age);
public record StudentUpdate([Required, StringLength(80)] string Name, [Range(16, 100)] int Age, Guid Version);
public record StudentView(int Id, string Name, int Age, Guid Version);
public record StudentPatch([StringLength(80)] string? Name, [Range(16, 100)] int? Age, Guid Version);
