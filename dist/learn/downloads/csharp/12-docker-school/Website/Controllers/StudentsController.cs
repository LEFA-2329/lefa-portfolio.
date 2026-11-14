using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;

public class StudentsController(IHttpClientFactory factory) : Controller
{
    HttpClient Api => factory.CreateClient("School");

    public async Task<IActionResult> Index()
    {
        var rows = await Api.GetFromJsonAsync<List<Student>>("api/students") ?? [];
        return View(rows);
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(StudentInput input)
    {
        if (!ModelState.IsValid)
        {
            TempData["Error"] = "Check name and age.";
            return RedirectToAction(nameof(Index));
        }

        var r = await Api.PostAsJsonAsync("api/students", input);
        TempData["Error"] = r.IsSuccessStatusCode ? "Student created." : "API rejected create.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Update(int id, StudentInput input)
    {
        if (!ModelState.IsValid)
        {
            TempData["Error"] = "Invalid student.";
            return RedirectToAction(nameof(Index));
        }

        var r = await Api.PutAsJsonAsync($"api/students/{id}", input);
        TempData["Error"] = r.IsSuccessStatusCode ? "Student updated." : "API rejected update.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var r = await Api.DeleteAsync($"api/students/{id}");
        TempData["Error"] = r.IsSuccessStatusCode ? "Student deleted." : "API rejected delete.";
        return RedirectToAction(nameof(Index));
    }
}
