// Follow the numbered teaching parts in order. The full file combines every part.
using Microsoft.AspNetCore.Authorization;
// Import names from this library.
using Microsoft.AspNetCore.Mvc;
// Import names from this library.
using Microsoft.EntityFrameworkCore;
// Import names from this library.
using System.Security.Claims;

// STUDY PART: Define StudentsController
// Keep this type in this file or its own named file. Its members describe data or behaviour.
[Authorize, ApiController, Route("api/students")]
public class StudentsController(AppDb db) : ControllerBase
{
    string Owner => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    IQueryable<Student> Mine => db.Students.Where(s => s.OwnerId == Owner);

    // STUDY PART: Helper: ViewOf
    // This named method performs one reusable piece of work for the application.
    static StudentView ViewOf(Student s) => new(s.Id, s.Name, s.Age, s.Version);
    // STUDY PART: Read and filter students
    // Load the list. Apply any filters and paging before returning the result.
    [HttpGet]
    public async Task<IActionResult> All(int page = 1, int pageSize = 10, string? search = null, CancellationToken ct = default)
    {
        // Run the next branch only when this condition is true.
        if (page < 1 || page > 100000 || pageSize < 1 || pageSize > 100 || search?.Length > 80)
            // Reject input that fails the rules.
            return BadRequest("Page 1-100000, pageSize 1-100, search up to 80 letters.");
        // Store q for the steps below.
        var q = Mine.AsNoTracking();
        // Run the next branch only when this condition is true.
        if (!string.IsNullOrWhiteSpace(search))
            q = q.Where(s => s.Name.Contains(search));
        // Store total for the steps below.
        var total = await q.CountAsync(ct);
        // Read matching rows without blocking the thread.
        var items = await q.OrderBy(s => s.Id).Skip((page - 1) * pageSize).Take(pageSize).Select(s => new StudentView(s.Id, s.Name, s.Age, s.Version)).ToListAsync(ct);
        // Send this result back to the caller.
        return Ok(new { page, pageSize, total, items });
    }

    // STUDY PART: Read one student
    // Look up the requested ID. Return NotFound when it does not exist.
    [HttpGet("{id:int}")]
    public async Task<IActionResult> One(int id, CancellationToken ct)
    {
        // Store s for the steps below.
        var s = await Mine.SingleOrDefaultAsync(s => s.Id == id, ct);
        // Report that the requested row was not found.
        return s is null ? NotFound() : Ok(ViewOf(s));
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
        // Store s for the steps below.
        var s = new Student
        {
            Name = input.Name.Trim(),
            Age = input.Age,
            OwnerId = Owner
        };
        db.Students.Add(s);
        // Save pending database changes.
        await db.SaveChangesAsync(ct);
        // Return the new row and its location.
        return CreatedAtAction(nameof(One), new { id = s.Id }, ViewOf(s));
    }

    // STUDY PART: Update a student
    // Find an existing row, validate new values, then save changes.
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, StudentUpdate input, CancellationToken ct)
    {
        // Run the next branch only when this condition is true.
        if (string.IsNullOrWhiteSpace(input.Name))
            // Reject input that fails the rules.
            return BadRequest("Name cannot be blank.");
        // Store s for the steps below.
        var s = await Mine.SingleOrDefaultAsync(s => s.Id == id, ct);
        // Run the next branch only when this condition is true.
        if (s is null)
            // Report that the requested row was not found.
            return NotFound();
        // Run the next branch only when this condition is true.
        if (s.Version != input.Version)
            // Send this result back to the caller.
            return Conflict("This student changed. GET it again before saving.");
        s.Name = input.Name.Trim();
        s.Age = input.Age;
        s.Version = Guid.NewGuid();
        try
        {
            // Save pending database changes.
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateConcurrencyException)
        {
            // Send this result back to the caller.
            return Conflict("Another request changed this student.");
        }

        // Send this result back to the caller.
        return Ok(ViewOf(s));
    }

    // STUDY PART: Update selected fields
    // Change only supplied values. Check the version to avoid overwriting newer edits.
    [HttpPatch("{id:int}")]
    public async Task<IActionResult> Patch(int id, StudentPatch input, CancellationToken ct)
    {
        // Run the next branch only when this condition is true.
        if (input.Name is null && input.Age is null)
            // Reject input that fails the rules.
            return BadRequest("Provide Name or Age.");
        // Run the next branch only when this condition is true.
        if (input.Name is not null && string.IsNullOrWhiteSpace(input.Name))
            // Reject input that fails the rules.
            return BadRequest("Name cannot be blank.");
        // Store row for the steps below.
        var row = await Mine.SingleOrDefaultAsync(s => s.Id == id, ct);
        // Run the next branch only when this condition is true.
        if (row is null)
            // Report that the requested row was not found.
            return NotFound();
        // Run the next branch only when this condition is true.
        if (row.Version != input.Version)
            // Send this result back to the caller.
            return Conflict("Record changed. Reload it.");
        // Run the next branch only when this condition is true.
        if (input.Name is not null)
            row.Name = input.Name.Trim();
        // Run the next branch only when this condition is true.
        if (input.Age.HasValue)
            row.Age = input.Age.Value;
        row.Version = Guid.NewGuid();
        try
        {
            // Save pending database changes.
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateConcurrencyException)
        {
            // Send this result back to the caller.
            return Conflict("Record changed. Reload it.");
        }

        // Send this result back to the caller.
        return Ok(ViewOf(row));
    }

    // STUDY PART: Delete a student
    // Remove the selected or requested row and report whether it existed.
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        // Store s for the steps below.
        var s = await Mine.SingleOrDefaultAsync(s => s.Id == id, ct);
        // Run the next branch only when this condition is true.
        if (s is null)
            // Report that the requested row was not found.
            return NotFound();
        db.Students.Remove(s);
        try
        {
            // Save pending database changes.
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateConcurrencyException)
        {
            // Send this result back to the caller.
            return Conflict("Record changed. Reload before deleting.");
        }

        // Report success without a response body.
        return NoContent();
    }
}
