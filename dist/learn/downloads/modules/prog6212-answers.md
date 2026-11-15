# C# . PROG6212 - worked answers

Compare your reasoning, not only the final result. Code fragments assume the schema and environment in each question. Test SQL Server, WPF and Docker examples in their native tools.

## Answer 1

using System;
using System.Linq;
int[] marks = { 40, 75, 50 }; // Sample marks
var passes = marks.Where(mark => mark >= 50); // Keep passes
Console.WriteLine(string.Join(", ", passes)); // 75, 50
Create a Console App in Visual Studio, replace Program.cs, then run.

## Answer 2

using var reader = new System.IO.StreamReader("notes.txt"); // Open file
string text = reader.ReadToEnd(); // Read text
Console.WriteLine(text);
Create notes.txt in the working directory first. using releases the file handle when the scope ends, including when an exception occurs. Garbage collection is not a substitute for prompt disposal.

## Answer 3

GET /students returns 200 with a list; GET /students/1 returns 200 or 404; POST /students validates input and returns 201 with a Location; PUT /students/1 returns 204 or 404; DELETE /students/1 returns 204 or 404. Invalid input returns 400. Use DTOs and check permissions.

## Answer 4

Load the student, check for null, assign student.Name, then await db.SaveChangesAsync(). Register the DbContext and provider first. Keep connection secrets outside source files and use migrations to manage schema changes.

## Answer 5

The view model must notify binding listeners, usually through INotifyPropertyChanged. Raise PropertyChanged for the property after assigning its backing field. Set DataContext and check the binding path. Commands handle actions without putting business rules in view code.

