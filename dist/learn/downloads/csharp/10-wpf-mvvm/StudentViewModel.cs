using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;

namespace MvvmLab;
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

    public ObservableCollection<string> Students { get; } = [];
    public RelayCommand AddCommand { get; }

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
    void Changed([CallerMemberName] string? property = null) => PropertyChanged?.Invoke(this, new(property));
}

public class RelayCommand(Action run, Func<bool> allowed) : ICommand
{
    public bool CanExecute(object? p) => allowed();
    public void Execute(object? p) => run();
    public event EventHandler? CanExecuteChanged;
    public void Refresh() => CanExecuteChanged?.Invoke(this, EventArgs.Empty);
}
