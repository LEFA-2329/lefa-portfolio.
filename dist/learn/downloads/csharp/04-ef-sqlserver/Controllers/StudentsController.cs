// Follow the numbered teaching parts in order. The full file combines every part.
using Microsoft.AspNetCore.Mvc;
// Import names from this library.
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
        // Look up a row by its primary key.
        var row = await db.Students.FindAsync([id], ct);
        // Report that the requested row was not found.
        return row is null ? NotFound() : Ok(row);
    }

    // STUDY PART: Create a student
    // Validate the input, create a new row, then report the result.
    [HttpPost]
    public async Task<IActionResult> Create(StudentInput input, CancellationToken ct)
    {
        // Run the next branch only when this condition is true.
        if (string.IsNullOrWhiteSpace(input.Name))
            // Reject input that fails the rules.
            return BadRequest("Name cannot be blank.");
        // Store row for the steps below.
        var row = new Student
        {
            Name = input.Name.Trim(),
            Age = input.Age
        };
        db.Students.Add(row);
        // Save pending database changes.
        await db.SaveChangesAsync(ct);
        // Return the new row and its location.
        return CreatedAtAction(nameof(Get), new { id = row.Id }, row);
    }

    // STUDY PART: Update a student
    // Find an existing row, validate new values, then save changes.
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, StudentInput input, CancellationToken ct)
    {
        // Run the next branch only when this condition is true.
        if (string.IsNullOrWhiteSpace(input.Name))
            // Reject input that fails the rules.
            return BadRequest("Name cannot be blank.");
        // Look up a row by its primary key.
        var row = await db.Students.FindAsync([id], ct);
        // Run the next branch only when this condition is true.
        if (row is null)
            // Report that the requested row was not found.
            return NotFound();
        row.Name = input.Name.Trim();
        row.Age = input.Age;
        // Save pending database changes.
        await db.SaveChangesAsync(ct);
        // Report success without a response body.
        return NoContent();
    }

    // STUDY PART: Delete a student
    // Remove the selected or requested row and report whether it existed.
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        // Look up a row by its primary key.
        var row = await db.Students.FindAsync([id], ct);
        // Run the next branch only when this condition is true.
        if (row is null)
            // Report that the requested row was not found.
            return NotFound();
        db.Students.Remove(row);
        // Save pending database changes.
        await db.SaveChangesAsync(ct);
        // Report success without a response body.
        return NoContent();
    }
}
