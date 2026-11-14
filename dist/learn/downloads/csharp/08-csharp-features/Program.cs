using System.Diagnostics;
using System.Runtime.Loader;

// using closes the file even if later code throws. GC alone does not close it promptly.
using (var writer = new StreamWriter("lifetime.txt"))
{
    writer.WriteLine("Saved safely");
}

Console.WriteLine(File.ReadAllText("lifetime.txt").Trim());
var total = new Money(10m) + new Money(5m);
Console.WriteLine($"Money total: {total.Amount}");
try
{
    Enroll(-1);
}
catch (EnrollmentException ex)
{
    Console.WriteLine(ex.Message);
}

Console.WriteLine("lefa".Greeting());
var anonymous = new
{
    Name = "Lefa",
    Mark = 80
};
Console.WriteLine($"{anonymous.Name}: {anonymous.Mark}");
var students = new[]
{
    new Student("Lefa", 80),
    new Student("Thabo", 45),
    new Student("Mpho", 90)
};
var passes = students.Where(s => s.Mark >= 50).OrderBy(s => s.Name).Select(s => new { s.Name, s.Mark });
foreach (var s in passes)
    Console.WriteLine($"Pass: {s.Name} {s.Mark}");
using (var process = Process.GetCurrentProcess())
    Console.WriteLine($"Process name: {process.ProcessName}");
Console.WriteLine($"Domain: {AppDomain.CurrentDomain.FriendlyName}");
Console.WriteLine($"Load context: {AssemblyLoadContext.Default.Name}");
int count = 0;
Parallel.For(0, 1000, _ => Interlocked.Increment(ref count));
Console.WriteLine($"Safe count: {count}");
var thread = new Thread(() => Console.WriteLine("Worker thread finished"));
thread.Start();
thread.Join();
var results = await Task.WhenAll(LoadAsync("A"), LoadAsync("B"));
Console.WriteLine(string.Join(",", results));
using var cts = new CancellationTokenSource();
cts.Cancel();
try
{
    await Task.Delay(100, cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Cancelled safely");
}

static void Enroll(int age)
{
    if (age < 0)
        throw new EnrollmentException("Age cannot be negative.");
}

static async Task<string> LoadAsync(string name)
{
    await Task.Delay(20);
    return name;
}

public record Student(string Name, int Mark);
public readonly record struct Money(decimal Amount)
{
    public static Money operator +(Money a, Money b) => new(a.Amount + b.Amount);
}

public class EnrollmentException(string message) : Exception(message);
public static class StudentExtensions
{
    public static string Greeting(this string name) => $"Hello, {name}";
}
