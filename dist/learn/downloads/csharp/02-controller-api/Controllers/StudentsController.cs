using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/students")]
public class StudentsController(StudentStore db) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(db.Rows.Values.OrderBy(x => x.Id));
    [HttpGet("{id:int}")]
    public IActionResult Get(int id) => db.Rows.TryGetValue(id, out var row) ? Ok(row) : NotFound();
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

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id) => db.Rows.TryRemove(id, out _) ? NoContent() : NotFound();
}
