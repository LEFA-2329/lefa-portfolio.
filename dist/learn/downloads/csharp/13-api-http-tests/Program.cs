using System.Net;
using System.Net.Http.Json;

using var client = new HttpClient
{
    BaseAddress = new Uri("http://localhost:5100/")
};
// Start project 02-controller-api first, in a different terminal.
var created = await client.PostAsJsonAsync("api/students", new { name = "Test student", age = 22 });
Check(created.StatusCode == HttpStatusCode.Created, "POST returns 201");
var row = await created.Content.ReadFromJsonAsync<Student>();
Check(row is not null && row.Name == "Test student", "POST body has name and ID");
int id = row!.Id;
try
{
    var read = await client.GetFromJsonAsync<Student>($"api/students/{id}");
    Check(read?.Age == 22, "GET reads created data");
    var invalid = await client.PutAsJsonAsync($"api/students/{id}", new { name = "Test student", age = 2 });
    Check(invalid.StatusCode == HttpStatusCode.BadRequest, "Invalid age returns 400");
    var updated = await client.PutAsJsonAsync($"api/students/{id}", new { name = "Updated", age = 23 });
    Check(updated.StatusCode == HttpStatusCode.NoContent, "PUT returns 204");
    read = await client.GetFromJsonAsync<Student>($"api/students/{id}");
    Check(read?.Name == "Updated" && read.Age == 23, "GET confirms updated values");
    var deleted = await client.DeleteAsync($"api/students/{id}");
    Check(deleted.StatusCode == HttpStatusCode.NoContent, "DELETE returns 204");
    var missing = await client.GetAsync($"api/students/{id}");
    Check(missing.StatusCode == HttpStatusCode.NotFound, "GET after delete returns 404");
}
finally
{
    await client.DeleteAsync($"api/students/{id}");
}

Console.WriteLine("All CRUD checks passed.");
static void Check(bool condition, string message)
{
    if (!condition)
        throw new Exception("FAIL: " + message);
    Console.WriteLine("PASS: " + message);
}

public record Student(int Id, string Name, int Age);
