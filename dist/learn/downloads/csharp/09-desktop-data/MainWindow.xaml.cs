// Follow the numbered teaching parts in order. The full file combines every part.
using System.Windows;
using System.Windows.Controls;
using System.IO;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Data;

namespace DesktopData;
// STUDY PART: Define MainWindow
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public partial class MainWindow : Window
{
    readonly string folder = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "StudyLabData");
    // STUDY PART: Initialise MainWindow
    // Set up the new object and its initial state.
    public MainWindow()
    {
        InitializeComponent();
        Directory.CreateDirectory(folder);
        using var db = Db();
        db.Database.EnsureCreated();
    }

    // STUDY PART: Create an EF context
    // Create a short-lived object that queries and saves database changes.
    SchoolDb Db() => new(Path.Combine(folder, "school.db"));
    // STUDY PART: Create a SQL connection
    // Describe the server and database. Open the connection before sending commands.
    SqlConnection Connect() => new(Environment.GetEnvironmentVariable("STUDYLAB_SQL") ?? @"Server=LEFA\SQLEXPRESS;Database=StudyLabAdo;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True");
    bool Ado => StorageMode.SelectedIndex == 1;

    // STUDY PART: Validate the form
    // Check the name and age before constructing a Student object.
    Student Input()
    {
        if (string.IsNullOrWhiteSpace(NameBox.Text) || NameBox.Text.Length > 80 || !int.TryParse(AgeBox.Text, out int age) || age < 16 || age > 100)
            throw new ArgumentException("Enter a name up to 80 characters and age 16-100.");
        return new()
        {
            Name = NameBox.Text.Trim(),
            Age = age
        };
    }

    // STUDY PART: Load the data source
    // Choose the configured storage provider and return the student rows.
    List<Student> Load()
    {
        if (!Ado)
        {
            using var db = Db();
            return db.Students.AsNoTracking().OrderBy(s => s.Id).ToList();
        }

        using var c = Connect();
        c.Open();
        using var cmd = new SqlCommand("SELECT Id,Name,Age FROM dbo.Students ORDER BY Id", c);
        using var r = cmd.ExecuteReader();
        var rows = new List<Student>();
        while (r.Read())
            rows.Add(new() { Id = r.GetInt32(0), Name = r.GetString(1), Age = r.GetInt32(2) });
        return rows;
    }

    // STUDY PART: Handle a desktop error
    // Run the action and show a local message if it fails.
    void Guard(Action action)
    {
        try
        {
            action();
        }
        catch (Exception ex)
        {
            Status.Text = ex.Message;
        }
    }

    // STUDY PART: Read data
    // Read data into an object or refresh the displayed list.
    void Read(object sender, RoutedEventArgs e) => Guard(() =>
    {
        Rows.ItemsSource = Load();
        Status.Text = "Rows loaded.";
    });
    // STUDY PART: Create a student
    // Validate the input, create a new row, then report the result.
    void Create(object sender, RoutedEventArgs e) => Guard(() =>
    {
        var s = Input();
        if (Ado)
            Execute("INSERT dbo.Students(Name,Age) VALUES(@name,@age)", s);
        else
        {
            using var db = Db();
            db.Students.Add(s);
            db.SaveChanges();
        }

        Read(sender, e);
    });
    // STUDY PART: Update a student
    // Find an existing row, validate new values, then save changes.
    void Update(object sender, RoutedEventArgs e) => Guard(() =>
    {
        if (Rows.SelectedItem is not Student selected)
            throw new ArgumentException("Select a student.");
        var s = Input();
        s.Id = selected.Id;
        if (Ado)
            Execute("UPDATE dbo.Students SET Name=@name,Age=@age WHERE Id=@id", s);
        else
        {
            using var db = Db();
            db.Students.Update(s);
            db.SaveChanges();
        }

        Read(sender, e);
    });
    // STUDY PART: Delete a student
    // Remove the selected or requested row and report whether it existed.
    void Delete(object sender, RoutedEventArgs e) => Guard(() =>
    {
        if (Rows.SelectedItem is not Student s)
            throw new ArgumentException("Select a student.");
        if (Ado)
            Execute("DELETE dbo.Students WHERE Id=@id", s);
        else
        {
            using var db = Db();
            db.Students.Remove(s);
            db.SaveChanges();
        }

        Read(sender, e);
    });
    // STUDY PART: Run the requested action
    // Execute the action or database command using its supplied values.
    void Execute(string sql, Student s)
    {
        using var c = Connect();
        c.Open();
        using var cmd = new SqlCommand(sql, c);
        cmd.Parameters.Add("@id", SqlDbType.Int).Value = s.Id;
        cmd.Parameters.Add("@name", SqlDbType.NVarChar, 80).Value = s.Name;
        cmd.Parameters.Add("@age", SqlDbType.Int).Value = s.Age;
        cmd.ExecuteNonQuery();
    }

    // STUDY PART: Display the selected student
    // Copy the selected row into the editable form fields.
    void SelectRow(object sender, SelectionChangedEventArgs e)
    {
        if (Rows.SelectedItem is Student s)
        {
            NameBox.Text = s.Name;
            AgeBox.Text = s.Age.ToString();
        }
    }

    // STUDY PART: Save JSON to a file
    // Serialize the current rows and write them to the application data folder.
    void Export(object sender, RoutedEventArgs e) => Guard(() =>
    {
        var file = Path.Combine(folder, "students.json");
        File.WriteAllText(file, JsonSerializer.Serialize(Load(), new JsonSerializerOptions { WriteIndented = true }));
        Status.Text = "Saved: " + file;
    });
    // STUDY PART: Load a JSON preview
    // Read saved text and turn it back into objects. Previewing does not insert database rows.
    void ReadJson(object sender, RoutedEventArgs e) => Guard(() =>
    {
        Rows.ItemsSource = JsonSerializer.Deserialize<List<Student>>(File.ReadAllText(Path.Combine(folder, "students.json"))) ?? [];
        Status.Text = "JSON preview loaded. It has not been inserted into the database.";
    });
}

// STUDY PART: Define Student
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int Age { get; set; }
}

// STUDY PART: Define SchoolDb
// Keep this type in this file or its own named file. Its members describe data or behaviour.
public class SchoolDb(string path) : DbContext
{
    public DbSet<Student> Students => Set<Student>();

    // STUDY PART: Configure the database provider
    // Choose how this context connects to its database.
    protected override void OnConfiguring(DbContextOptionsBuilder o) => o.UseSqlite("Data Source=" + path);
}
