namespace SharedRules;
[AttributeUsage(AttributeTargets.Class)]
public class StudyTopicAttribute(string title) : Attribute
{
    public string Title { get; } = title;
}

[StudyTopic("Marks and passes")]
public static class MarkRules
{
    public static bool IsPass(int mark) => mark >= 50;
}
