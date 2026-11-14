// STUDY PART: Store one student name and mark
// Text uses string. A whole number uses int.
string name = "Lefa";
int mark = 65;
Console.WriteLine($"{name}: {mark}");

// STUDY PART: Make a decision
// Choose the message using a condition.
if (mark >= 50)
{
    Console.WriteLine("Pass");
}
else
{
    Console.WriteLine("Try again");
}

// STUDY PART: Repeat work with a list
// A list keeps several values of the same type.
List<int> marks = [65, 40, 80];
// Visit each mark once.
foreach (int currentMark in marks)
{
    Console.WriteLine($"Mark: {currentMark}");
}

// STUDY PART: Call a method
// Pass a mark in and receive a message back.
Console.WriteLine(ResultFor(mark));

// STUDY PART: Create a student object
// Create one student using the class defined below.
Student student = new() { Name = name, Mark = mark };
Console.WriteLine($"Student: {student.Name}, result: {ResultFor(student.Mark)}");

// STUDY PART: Define a reusable method
// int score is the input. string is the return type.
static string ResultFor(int score)
{
    if (score >= 50)
    {
        return "Pass";
    }
    return "Try again";
}

// STUDY PART: Describe a student with a class
// A class describes the values each Student object can hold.
public class Student
{
    // A property stores a value on an object.
    public string Name { get; set; } = "";
    public int Mark { get; set; }
}
