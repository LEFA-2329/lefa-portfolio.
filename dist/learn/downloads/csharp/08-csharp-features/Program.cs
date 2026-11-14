// Follow the numbered teaching parts in order. The full file combines every part.
using System.Diagnostics;
// Import names from this library.
using System.Runtime.Loader;

// using closes the file even if later code throws. GC alone does not close it promptly.
using (var writer = new StreamWriter("lifetime.txt"))
{
    writer.WriteLine("Saved safely");
}

// Display this result in the console.
Console.WriteLine(File.ReadAllText("lifetime.txt").Trim());
// STUDY PART: Try the next language feature
// Read this small experiment and compare its output with the lesson explanation.
var total = new Money(10m) + new Money(5m);
// Display this result in the console.
Console.WriteLine($"Money total: {total.Amount}");
try
{
    Enroll(-1);
}
catch (EnrollmentException ex)
{
    // Display this result in the console.
    Console.WriteLine(ex.Message);
}

// Display this result in the console.
Console.WriteLine("lefa".Greeting());
// STUDY PART: Try the next language feature
// Read this small experiment and compare its output with the lesson explanation.
var anonymous = new
{
    Name = "Lefa",
    Mark = 80
};
// Display this result in the console.
Console.WriteLine($"{anonymous.Name}: {anonymous.Mark}");
// STUDY PART: Try the next language feature
// Read this small experiment and compare its output with the lesson explanation.
var students = new[]
{
    new Student("Lefa", 80),
    new Student("Thabo", 45),
    new Student("Mpho", 90)
};
// Store passes for the steps below.
var passes = students.Where(s => s.Mark >= 50).OrderBy(s => s.Name).Select(s => new { s.Name, s.Mark });
// Process each item in the collection.
foreach (var s in passes)
    // Display this result in the console.
    Console.WriteLine($"Pass: {s.Name} {s.Mark}");
using (var process = Process.GetCurrentProcess())
    // Display this result in the console.
    Console.WriteLine($"Process name: {process.ProcessName}");
// Display this result in the console.
Console.WriteLine($"Domain: {AppDomain.CurrentDomain.FriendlyName}");
// Display this result in the console.
Console.WriteLine($"Load context: {AssemblyLoadContext.Default.Name}");
// STUDY PART: Try the next language feature
// Read this small experiment and compare its output with the lesson explanation.
int count = 0;
Parallel.For(0, 1000, _ => Interlocked.Increment(ref count));
// Display this result in the console.
Console.WriteLine($"Safe count: {count}");
// STUDY PART: Try the next language feature
// Read this small experiment and compare its output with the lesson explanation.
var thread = new Thread(() => Console.WriteLine("Worker thread finished"));
thread.Start();
thread.Join();
// STUDY PART: Try the next language feature
// Read this small experiment and compare its output with the lesson explanation.
var results = await Task.WhenAll(LoadAsync("A"), LoadAsync("B"));
// Display this result in the console.
Console.WriteLine(string.Join(",", results));
// STUDY PART: Try the next language feature
// Read this small experiment and compare its output with the lesson explanation.
using var cts = new CancellationTokenSource();
cts.Cancel();
try
{
    await Task.Delay(100, cts.Token);
}
catch (OperationCanceledException)
{
    // Display this result in the console.
    Console.WriteLine("Cancelled safely");
}

static void Enroll(int age)
{
    // Run the next branch only when this condition is true.
    if (age < 0)
        throw new EnrollmentException("Age cannot be negative.");
}

static async Task<string> LoadAsync(string name)
{
    await Task.Delay(20);
    // Send this result back to the caller.
    return name;
}

// STUDY PART: Define Student
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public record Student(string Name, int Mark);
// STUDY PART: Define Money
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public readonly record struct Money(decimal Amount)
{
    public static Money operator +(Money a, Money b) => new(a.Amount + b.Amount);
}

// STUDY PART: Define EnrollmentException
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public class EnrollmentException(string message) : Exception(message);
// STUDY PART: Define StudentExtensions
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public static class StudentExtensions
{
    // STUDY PART: Helper: Greeting
    // This named method performs one reusable piece of work for the application.
    public static string Greeting(this string name) => $"Hello, {name}";
}
