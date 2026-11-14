// Follow the numbered teaching parts in order. The full file combines every part.
using System.Collections.ObjectModel;
// Import names from this library.
using System.ComponentModel;
// Import names from this library.
using System.Runtime.CompilerServices;
// Import names from this library.
using System.Windows.Input;

namespace MvvmLab;
// STUDY PART: Define StudentViewModel
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public class StudentViewModel : INotifyPropertyChanged, IDataErrorInfo
{
    string name = "", ageText = "", status = "Enter a valid name and age.";
    public string Name
    {
        get => name;
        set
        {
            name = value;
            Changed();
            AddCommand.Refresh();
        }
    }

    public string AgeText
    {
        get => ageText;
        set
        {
            ageText = value;
            Changed();
            AddCommand.Refresh();
        }
    }

    public string Status
    {
        get => status;
        private set
        {
            status = value;
            Changed();
        }
    }

    // Expose the Students value on this object.
    public ObservableCollection<string> Students { get; } = [];
    // Expose the AddCommand value on this object.
    public RelayCommand AddCommand { get; }

    // STUDY PART: Initialise StudentViewModel
    // Set up the new object and its initial state.
    public StudentViewModel()
    {
        AddCommand = new(() =>
        {
            Students.Add($"{Name.Trim()} ({AgeText})");
            Status = "Student added.";
            Name = "";
            AgeText = "";
        }, () => string.IsNullOrEmpty(this[nameof(Name)]) && string.IsNullOrEmpty(this[nameof(AgeText)]));
    }

    public string Error => "";

    public string this[string column] => column == nameof(Name) ? (string.IsNullOrWhiteSpace(Name) || Name.Length > 80 ? "Name is required, up to 80 characters." : "") : column == nameof(AgeText) ? (!int.TryParse(AgeText, out int age) || age < 16 || age > 100 ? "Age must be 16 to 100." : "") : "";
    public event PropertyChangedEventHandler? PropertyChanged;
    // STUDY PART: Tell the View that a property changed
    // Raise PropertyChanged so WPF refreshes the binding.
    void Changed([CallerMemberName] string? property = null) => PropertyChanged?.Invoke(this, new(property));
}

// STUDY PART: Define RelayCommand
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public class RelayCommand(Action run, Func<bool> allowed) : ICommand
{
    // STUDY PART: Decide whether the command is enabled
    // Return true only when the current state allows this action.
    public bool CanExecute(object? p) => allowed();
    // STUDY PART: Run the requested action
    // Execute the action or database command using its supplied values.
    public void Execute(object? p) => run();
    public event EventHandler? CanExecuteChanged;
    // STUDY PART: Recheck command availability
    // Tell WPF to ask CanExecute again after inputs change.
    public void Refresh() => CanExecuteChanged?.Invoke(this, EventArgs.Empty);
}
