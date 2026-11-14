// Follow the numbered teaching parts in order. The full file combines every part.
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// STUDY PART: Define StudentsController
// Keep this type in this file or its own named file. Its members describe data or behaviour.
[ApiController]
[Route("api/students")]
public class StudentsController(SchoolDb db) : ControllerBase
{
    // STUDY PART: Read all students
    // Read the stored students and return them to the caller.
    [HttpGet]
    public async Task<ActionResult<List<Student>>> GetAll(CancellationToken ct) => await db.Students.AsNoTracking().OrderBy(s => s.Id).ToListAsync(ct);
    // STUDY PART: Read one student
    // Look up the requested ID. Return NotFound when it does not exist.
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Student>> Get(int id, CancellationToken ct)
    {
        var row = await db.Students.FindAsync([id], ct);
        return row is null ? NotFound() : Ok(row);
    }

    // STUDY PART: Create a student
    // Validate the input, create a new row, then report the result.
    [HttpPost]
    public async Task<IActionResult> Create(StudentInput input, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(input.Name))
            return BadRequest("Name cannot be blank.");
        var row = new Student
        {
            Name = input.Name.Trim(),
            Age = input.Age
        };
        db.Students.Add(row);
        await db.SaveChangesAsync(ct);
        return CreatedAtAction(nameof(Get), new { id = row.Id }, row);
    }

    // STUDY PART: Update a student
    // Find an existing row, validate new values, then save changes.
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, StudentInput input, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(input.Name))
            return BadRequest("Name cannot be blank.");
        var row = await db.Students.FindAsync([id], ct);
        if (row is null)
            return NotFound();
        row.Name = input.Name.Trim();
        row.Age = input.Age;
        await db.SaveChangesAsync(ct);
        return NoContent();
    }

    // STUDY PART: Delete a student
    // Remove the selected or requested row and report whether it existed.
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var row = await db.Students.FindAsync([id], ct);
        if (row is null)
            return NotFound();
        db.Students.Remove(row);
        await db.SaveChangesAsync(ct);
        return NoContent();
    }
}
