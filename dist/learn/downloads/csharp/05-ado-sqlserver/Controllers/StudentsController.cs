// Follow the numbered teaching parts in order. The full file combines every part.
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

// STUDY PART: Define StudentsController
// Keep this type in this file or its own named file. Its members describe data or behaviour.
[ApiController, Route("api/students")]
public class StudentsController(IConfiguration config) : ControllerBase
{
    // STUDY PART: Create a SQL connection
    // Describe the server and database. Open the connection before sending commands.
    SqlConnection Connect() => new(config.GetConnectionString("School") ?? throw new InvalidOperationException("Set School connection."));
    // STUDY PART: Read data
    // Read data into an object or refresh the displayed list.
    static Student Read(SqlDataReader r) => new()
    {
        Id = r.GetInt32(0),
        Name = r.GetString(1),
        Age = r.GetInt32(2)
    };
    // STUDY PART: Read and filter students
    // Load the list. Apply any filters and paging before returning the result.
    [HttpGet]
    public async Task<IActionResult> All(CancellationToken ct)
    {
        await using var c = Connect();
        await c.OpenAsync(ct);
        await using var cmd = new SqlCommand("SELECT Id,Name,Age FROM dbo.Students ORDER BY Id", c);
        await using var r = await cmd.ExecuteReaderAsync(ct);
        var rows = new List<Student>();
        while (await r.ReadAsync(ct))
            rows.Add(Read(r));
        return Ok(rows);
    }

    // STUDY PART: Read one student
    // Look up the requested ID. Return NotFound when it does not exist.
    [HttpGet("{id:int}")]
    public async Task<IActionResult> One(int id, CancellationToken ct)
    {
        await using var c = Connect();
        await c.OpenAsync(ct);
        await using var cmd = new SqlCommand("SELECT Id,Name,Age FROM dbo.Students WHERE Id=@id", c);
        cmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
        await using var r = await cmd.ExecuteReaderAsync(ct);
        return await r.ReadAsync(ct) ? Ok(Read(r)) : NotFound();
    }

    // STUDY PART: Create a student
    // Validate the input, create a new row, then report the result.
    [HttpPost]
    public async Task<IActionResult> Create(StudentInput input, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(input.Name))
            return BadRequest("Name cannot be blank.");
        await using var c = Connect();
        await c.OpenAsync(ct);
        await using var cmd = new SqlCommand("INSERT dbo.Students(Name,Age) OUTPUT INSERTED.Id VALUES(@name,@age)", c);
        Fill(cmd, input);
        var id = Convert.ToInt32(await cmd.ExecuteScalarAsync(ct));
        return CreatedAtAction(nameof(One), new { id }, new Student { Id = id, Name = input.Name.Trim(), Age = input.Age });
    }

    // STUDY PART: Update a student
    // Find an existing row, validate new values, then save changes.
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, StudentInput input, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(input.Name))
            return BadRequest("Name cannot be blank.");
        await using var c = Connect();
        await c.OpenAsync(ct);
        await using var cmd = new SqlCommand("UPDATE dbo.Students SET Name=@name,Age=@age WHERE Id=@id", c);
        Fill(cmd, input);
        cmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
        return await cmd.ExecuteNonQueryAsync(ct) == 0 ? NotFound() : NoContent();
    }

    // STUDY PART: Delete a student
    // Remove the selected or requested row and report whether it existed.
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        await using var c = Connect();
        await c.OpenAsync(ct);
        await using var cmd = new SqlCommand("DELETE dbo.Students WHERE Id=@id", c);
        cmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
        return await cmd.ExecuteNonQueryAsync(ct) == 0 ? NotFound() : NoContent();
    }

    // STUDY PART: Add SQL parameters
    // Pass values as typed parameters rather than joining input into SQL text.
    static void Fill(SqlCommand cmd, StudentInput input)
    {
        cmd.Parameters.Add("@name", SqlDbType.NVarChar, 80).Value = input.Name.Trim();
        cmd.Parameters.Add("@age", SqlDbType.Int).Value = input.Age;
    }
}
