using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/students")]
public class StudentsController(SchoolDb db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Student>>> GetAll(CancellationToken ct) => await db.Students.AsNoTracking().OrderBy(s => s.Id).ToListAsync(ct);
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Student>> Get(int id, CancellationToken ct)
    {
        var row = await db.Students.FindAsync([id], ct);
        return row is null ? NotFound() : Ok(row);
    }

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
