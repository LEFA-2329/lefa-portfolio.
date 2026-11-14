using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[Authorize, ApiController, Route("api/students")]
public class StudentsController(AppDb db) : ControllerBase
{
    string Owner => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    IQueryable<Student> Mine => db.Students.Where(s => s.OwnerId == Owner);

    static StudentView ViewOf(Student s) => new(s.Id, s.Name, s.Age, s.Version);
    [HttpGet]
    public async Task<IActionResult> All(int page = 1, int pageSize = 10, string? search = null, CancellationToken ct = default)
    {
        if (page < 1 || page > 100000 || pageSize < 1 || pageSize > 100 || search?.Length > 80)
            return BadRequest("Page 1-100000, pageSize 1-100, search up to 80 letters.");
        var q = Mine.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(search))
            q = q.Where(s => s.Name.Contains(search));
        var total = await q.CountAsync(ct);
        var items = await q.OrderBy(s => s.Id).Skip((page - 1) * pageSize).Take(pageSize).Select(s => new StudentView(s.Id, s.Name, s.Age, s.Version)).ToListAsync(ct);
        return Ok(new { page, pageSize, total, items });
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> One(int id, CancellationToken ct)
    {
        var s = await Mine.SingleOrDefaultAsync(s => s.Id == id, ct);
        return s is null ? NotFound() : Ok(ViewOf(s));
    }

    [HttpPost]
    public async Task<IActionResult> Create(StudentInput input, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(input.Name))
            return BadRequest("Name cannot be blank.");
        var s = new Student
        {
            Name = input.Name.Trim(),
            Age = input.Age,
            OwnerId = Owner
        };
        db.Students.Add(s);
        await db.SaveChangesAsync(ct);
        return CreatedAtAction(nameof(One), new { id = s.Id }, ViewOf(s));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, StudentUpdate input, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(input.Name))
            return BadRequest("Name cannot be blank.");
        var s = await Mine.SingleOrDefaultAsync(s => s.Id == id, ct);
        if (s is null)
            return NotFound();
        if (s.Version != input.Version)
            return Conflict("This student changed. GET it again before saving.");
        s.Name = input.Name.Trim();
        s.Age = input.Age;
        s.Version = Guid.NewGuid();
        try
        {
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateConcurrencyException)
        {
            return Conflict("Another request changed this student.");
        }

        return Ok(ViewOf(s));
    }

    [HttpPatch("{id:int}")]
    public async Task<IActionResult> Patch(int id, StudentPatch input, CancellationToken ct)
    {
        if (input.Name is null && input.Age is null)
            return BadRequest("Provide Name or Age.");
        if (input.Name is not null && string.IsNullOrWhiteSpace(input.Name))
            return BadRequest("Name cannot be blank.");
        var row = await Mine.SingleOrDefaultAsync(s => s.Id == id, ct);
        if (row is null)
            return NotFound();
        if (row.Version != input.Version)
            return Conflict("Record changed. Reload it.");
        if (input.Name is not null)
            row.Name = input.Name.Trim();
        if (input.Age.HasValue)
            row.Age = input.Age.Value;
        row.Version = Guid.NewGuid();
        try
        {
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateConcurrencyException)
        {
            return Conflict("Record changed. Reload it.");
        }

        return Ok(ViewOf(row));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var s = await Mine.SingleOrDefaultAsync(s => s.Id == id, ct);
        if (s is null)
            return NotFound();
        db.Students.Remove(s);
        try
        {
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateConcurrencyException)
        {
            return Conflict("Record changed. Reload before deleting.");
        }

        return NoContent();
    }
}
