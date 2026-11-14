// Follow the numbered teaching parts in order. The full file combines every part.
using Microsoft.AspNetCore.Mvc;

// STUDY PART: Define StudentsController
// Keep this type in this file or its own named file. Its members describe data or behaviour.
[ApiController]
[Route("api/students")]
public class StudentsController(StudentStore db) : ControllerBase
{
    // STUDY PART: Read all students
    // Read the stored students and return them to the caller.
    [HttpGet]
    public IActionResult GetAll() => Ok(db.Rows.Values.OrderBy(x => x.Id));
    // STUDY PART: Read one student
    // Look up the requested ID. Return NotFound when it does not exist.
    [HttpGet("{id:int}")]
    public IActionResult Get(int id) => db.Rows.TryGetValue(id, out var row) ? Ok(row) : NotFound();
    // STUDY PART: Create a student
    // Validate the input, create a new row, then report the result.
    [HttpPost]
    public IActionResult Create(StudentInput input)
    {
        if (string.IsNullOrWhiteSpace(input.Name))
            return BadRequest("Name cannot be blank.");
        var row = new Student
        {
            Id = db.NextId(),
            Name = input.Name.Trim(),
            Age = input.Age
        };
        db.Rows[row.Id] = row;
        return CreatedAtAction(nameof(Get), new { id = row.Id }, row);
    }

    // STUDY PART: Update a student
    // Find an existing row, validate new values, then save changes.
    [HttpPut("{id:int}")]
    public IActionResult Update(int id, StudentInput input)
    {
        if (string.IsNullOrWhiteSpace(input.Name))
            return BadRequest("Name cannot be blank.");
        while (db.Rows.TryGetValue(id, out var old))
        {
            var row = new Student
            {
                Id = id,
                Name = input.Name.Trim(),
                Age = input.Age
            };
            if (db.Rows.TryUpdate(id, row, old))
                return NoContent();
        }

        return NotFound();
    }

    // STUDY PART: Delete a student
    // Remove the selected or requested row and report whether it existed.
    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id) => db.Rows.TryRemove(id, out _) ? NoContent() : NotFound();
}
