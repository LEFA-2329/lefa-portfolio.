// Follow the numbered teaching parts in order. The full file combines every part.
using System.Net;
// Import names from this library.
using System.Net.Http.Json;

// Store client for the steps below.
using var client = new HttpClient
{
    BaseAddress = new Uri("http://localhost:5100/")
};
// Start project 02-controller-api first, in a different terminal.
var created = await client.PostAsJsonAsync("api/students", new { name = "Test student", age = 22 });
Check(created.StatusCode == HttpStatusCode.Created, "POST returns 201");
// Store row for the steps below.
var row = await created.Content.ReadFromJsonAsync<Student>();
Check(row is not null && row.Name == "Test student", "POST body has name and ID");
// Store id for the steps below.
int id = row!.Id;
try
{
    // Store read for the steps below.
    var read = await client.GetFromJsonAsync<Student>($"api/students/{id}");
    Check(read?.Age == 22, "GET reads created data");
    // Store invalid for the steps below.
    var invalid = await client.PutAsJsonAsync($"api/students/{id}", new { name = "Test student", age = 2 });
    // Reject input that fails the rules.
    Check(invalid.StatusCode == HttpStatusCode.BadRequest, "Invalid age returns 400");
    // Store updated for the steps below.
    var updated = await client.PutAsJsonAsync($"api/students/{id}", new { name = "Updated", age = 23 });
    // Report success without a response body.
    Check(updated.StatusCode == HttpStatusCode.NoContent, "PUT returns 204");
    read = await client.GetFromJsonAsync<Student>($"api/students/{id}");
    Check(read?.Name == "Updated" && read.Age == 23, "GET confirms updated values");
    // Store deleted for the steps below.
    var deleted = await client.DeleteAsync($"api/students/{id}");
    // Report success without a response body.
    Check(deleted.StatusCode == HttpStatusCode.NoContent, "DELETE returns 204");
    // Store missing for the steps below.
    var missing = await client.GetAsync($"api/students/{id}");
    // Report that the requested row was not found.
    Check(missing.StatusCode == HttpStatusCode.NotFound, "GET after delete returns 404");
}
finally
{
    await client.DeleteAsync($"api/students/{id}");
}

// Display this result in the console.
Console.WriteLine("All CRUD checks passed.");
static void Check(bool condition, string message)
{
    // Run the next branch only when this condition is true.
    if (!condition)
        throw new Exception("FAIL: " + message);
    // Display this result in the console.
    Console.WriteLine("PASS: " + message);
}

// STUDY PART: Define Student
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public record Student(int Id, string Name, int Age);
