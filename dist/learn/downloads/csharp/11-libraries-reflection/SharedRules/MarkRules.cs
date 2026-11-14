// Follow the numbered teaching parts in order. The full file combines every part.
namespace SharedRules;
// STUDY PART: Define StudyTopicAttribute
// Keep this type in this file or its own named file. Its members describe data or behaviour.
[AttributeUsage(AttributeTargets.Class)]
public class StudyTopicAttribute(string title) : Attribute
{
    public string Title { get; } = title;
}

// STUDY PART: Define MarkRules
// Keep this type in this file or its own named file. Its members describe data or behaviour.
[StudyTopic("Marks and passes")]
public static class MarkRules
{
    // STUDY PART: Helper: IsPass
    // This named method performs one reusable piece of work for the application.
    public static bool IsPass(int mark) => mark >= 50;
}
