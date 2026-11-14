using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<StudentStore>();
var app = builder.Build();
app.MapGet("/api/students", (StudentStore db) => Results.Ok(db.Rows.Values.OrderBy(x => x.Id)));
app.MapGet("/api/students/{id:int}", (int id, StudentStore db) => db.Rows.TryGetValue(id, out var row) ? Results.Ok(row) : Results.NotFound());
app.MapPost("/api/students", (StudentInput input, StudentStore db) =>
{
    if (string.IsNullOrWhiteSpace(input.Name) || input.Name.Length > 80 || input.Age < 16 || input.Age > 100)
        return Results.BadRequest("Name is required (up to 80 characters). Age must be 16 to 100.");
    int id = db.NextId();
    var row = new Student(id, input.Name.Trim(), input.Age);
    db.Rows[id] = row;
    return Results.Created($"/api/students/{id}", row);
});
app.MapPut("/api/students/{id:int}", (int id, StudentInput input, StudentStore db) =>
{
    if (string.IsNullOrWhiteSpace(input.Name) || input.Name.Length > 80 || input.Age < 16 || input.Age > 100)
        return Results.BadRequest("Invalid student.");
    while (db.Rows.TryGetValue(id, out var old))
    {
        if (db.Rows.TryUpdate(id, new Student(id, input.Name.Trim(), input.Age), old))
            return Results.NoContent();
    }

    return Results.NotFound();
});
app.MapDelete("/api/students/{id:int}", (int id, StudentStore db) => db.Rows.TryRemove(id, out _) ? Results.NoContent() : Results.NotFound());
app.Run();
public record Student(int Id, string Name, int Age);
public record StudentInput(string Name, int Age);
public class StudentStore
{
    private int id;
    public ConcurrentDictionary<int, Student> Rows { get; } = new();

    public int NextId() => Interlocked.Increment(ref id);
}
