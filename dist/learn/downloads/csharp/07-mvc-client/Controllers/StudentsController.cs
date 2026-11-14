// Follow the numbered teaching parts in order. The full file combines every part.
using Microsoft.AspNetCore.Mvc;
// Import names from this library.
using System.Net.Http.Json;

// STUDY PART: Define StudentsController
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public class StudentsController(IHttpClientFactory factory) : Controller
{
    HttpClient Api => factory.CreateClient("School");

    // STUDY PART: Build the MVC page
    // Ask the API for rows and pass them to the Razor view.
    public async Task<IActionResult> Index()
    {
        // Store rows for the steps below.
        var rows = await Api.GetFromJsonAsync<List<Student>>("api/students") ?? [];
        // Send this result back to the caller.
        return View(rows);
    }

    // STUDY PART: Create a student
    // Validate the input, create a new row, then report the result.
    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(StudentInput input)
    {
        // Run the next branch only when this condition is true.
        if (!ModelState.IsValid)
        {
            TempData["Error"] = "Check name and age.";
            // Send this result back to the caller.
            return RedirectToAction(nameof(Index));
        }

        // Store r for the steps below.
        var r = await Api.PostAsJsonAsync("api/students", input);
        TempData["Error"] = r.IsSuccessStatusCode ? "Student created." : "API rejected create.";
        // Send this result back to the caller.
        return RedirectToAction(nameof(Index));
    }

    // STUDY PART: Update a student
    // Find an existing row, validate new values, then save changes.
    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Update(int id, StudentInput input)
    {
        // Run the next branch only when this condition is true.
        if (!ModelState.IsValid)
        {
            TempData["Error"] = "Invalid student.";
            // Send this result back to the caller.
            return RedirectToAction(nameof(Index));
        }

        // Store r for the steps below.
        var r = await Api.PutAsJsonAsync($"api/students/{id}", input);
        TempData["Error"] = r.IsSuccessStatusCode ? "Student updated." : "API rejected update.";
        // Send this result back to the caller.
        return RedirectToAction(nameof(Index));
    }

    // STUDY PART: Delete a student
    // Remove the selected or requested row and report whether it existed.
    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        // Store r for the steps below.
        var r = await Api.DeleteAsync($"api/students/{id}");
        TempData["Error"] = r.IsSuccessStatusCode ? "Student deleted." : "API rejected delete.";
        // Send this result back to the caller.
        return RedirectToAction(nameof(Index));
    }
}
