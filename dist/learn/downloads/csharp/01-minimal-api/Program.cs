// Follow the numbered teaching parts in order. The full file combines every part.
using System.Collections.Concurrent;

// STUDY PART: Create the application builder
// The builder collects configuration, logging and services before the server starts.
var builder = WebApplication.CreateBuilder(args);
// STUDY PART: Register services
// Tell dependency injection which objects the application needs and how to create them.
builder.Services.AddSingleton<StudentStore>();
// STUDY PART: Build the application
// Create the app from the registered services and configuration.
var app = builder.Build();
// STUDY PART: Map an endpoint or controller
// Connect an HTTP method and URL to the C# work that handles the request.
app.MapGet("/api/students", (StudentStore db) => Results.Ok(db.Rows.Values.OrderBy(x => x.Id)));
// STUDY PART: Map an endpoint or controller
// Connect an HTTP method and URL to the C# work that handles the request.
app.MapGet("/api/students/{id:int}", (int id, StudentStore db) => db.Rows.TryGetValue(id, out var row) ? Results.Ok(row) : Results.NotFound());
// STUDY PART: Map an endpoint or controller
// Connect an HTTP method and URL to the C# work that handles the request.
app.MapPost("/api/students", (StudentInput input, StudentStore db) =>
{
    if (string.IsNullOrWhiteSpace(input.Name) || input.Name.Length > 80 || input.Age < 16 || input.Age > 100)
        return Results.BadRequest("Name is required (up to 80 characters). Age must be 16 to 100.");
    int id = db.NextId();
    var row = new Student(id, input.Name.Trim(), input.Age);
    db.Rows[id] = row;
    return Results.Created($"/api/students/{id}", row);
});
// STUDY PART: Map an endpoint or controller
// Connect an HTTP method and URL to the C# work that handles the request.
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
// STUDY PART: Map an endpoint or controller
// Connect an HTTP method and URL to the C# work that handles the request.
app.MapDelete("/api/students/{id:int}", (int id, StudentStore db) => db.Rows.TryRemove(id, out _) ? Results.NoContent() : Results.NotFound());
// STUDY PART: Start the server
// Keep the application running and listen for requests until it is stopped.
app.Run();
// STUDY PART: Define Student
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public record Student(int Id, string Name, int Age);
// STUDY PART: Define StudentInput
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public record StudentInput(string Name, int Age);
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
