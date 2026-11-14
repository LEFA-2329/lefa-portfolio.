// Follow the numbered teaching parts in order. The full file combines every part.
using System.Windows;
// Import names from this library.
using System.Windows.Controls;
// Import names from this library.
using System.IO;
// Import names from this library.
using System.Text.Json;
// Import names from this library.
using Microsoft.EntityFrameworkCore;
// Import names from this library.
using Microsoft.Data.SqlClient;
// Import names from this library.
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
        // Store db for the steps below.
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
        // Run the next branch only when this condition is true.
        if (string.IsNullOrWhiteSpace(NameBox.Text) || NameBox.Text.Length > 80 || !int.TryParse(AgeBox.Text, out int age) || age < 16 || age > 100)
            throw new ArgumentException("Enter a name up to 80 characters and age 16-100.");
        // Send this result back to the caller.
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
        // Run the next branch only when this condition is true.
        if (!Ado)
        {
            // Store db for the steps below.
            using var db = Db();
            // Send this result back to the caller.
            return db.Students.AsNoTracking().OrderBy(s => s.Id).ToList();
        }

        // Store c for the steps below.
        using var c = Connect();
        c.Open();
        // Store cmd for the steps below.
        using var cmd = new SqlCommand("SELECT Id,Name,Age FROM dbo.Students ORDER BY Id", c);
        // Store r for the steps below.
        using var r = cmd.ExecuteReader();
        // Store rows for the steps below.
        var rows = new List<Student>();
        while (r.Read())
            rows.Add(new() { Id = r.GetInt32(0), Name = r.GetString(1), Age = r.GetInt32(2) });
        // Send this result back to the caller.
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
        // Store s for the steps below.
        var s = Input();
        // Run the next branch only when this condition is true.
        if (Ado)
            Execute("INSERT dbo.Students(Name,Age) VALUES(@name,@age)", s);
        else
        {
            // Store db for the steps below.
            using var db = Db();
            db.Students.Add(s);
            // Save pending database changes.
            db.SaveChanges();
        }

        Read(sender, e);
    });
    // STUDY PART: Update a student
    // Find an existing row, validate new values, then save changes.
    void Update(object sender, RoutedEventArgs e) => Guard(() =>
    {
        // Run the next branch only when this condition is true.
        if (Rows.SelectedItem is not Student selected)
            throw new ArgumentException("Select a student.");
        // Store s for the steps below.
        var s = Input();
        s.Id = selected.Id;
        // Run the next branch only when this condition is true.
        if (Ado)
            Execute("UPDATE dbo.Students SET Name=@name,Age=@age WHERE Id=@id", s);
        else
        {
            // Store db for the steps below.
            using var db = Db();
            db.Students.Update(s);
            // Save pending database changes.
            db.SaveChanges();
        }

        Read(sender, e);
    });
    // STUDY PART: Delete a student
    // Remove the selected or requested row and report whether it existed.
    void Delete(object sender, RoutedEventArgs e) => Guard(() =>
    {
        // Run the next branch only when this condition is true.
        if (Rows.SelectedItem is not Student s)
            throw new ArgumentException("Select a student.");
        // Run the next branch only when this condition is true.
        if (Ado)
            Execute("DELETE dbo.Students WHERE Id=@id", s);
        else
        {
            // Store db for the steps below.
            using var db = Db();
            db.Students.Remove(s);
            // Save pending database changes.
            db.SaveChanges();
        }

        Read(sender, e);
    });
    // STUDY PART: Run the requested action
    // Execute the action or database command using its supplied values.
    void Execute(string sql, Student s)
    {
        // Store c for the steps below.
        using var c = Connect();
        c.Open();
        // Store cmd for the steps below.
        using var cmd = new SqlCommand(sql, c);
        // Send this value as a SQL parameter.
        cmd.Parameters.Add("@id", SqlDbType.Int).Value = s.Id;
        // Send this value as a SQL parameter.
        cmd.Parameters.Add("@name", SqlDbType.NVarChar, 80).Value = s.Name;
        // Send this value as a SQL parameter.
        cmd.Parameters.Add("@age", SqlDbType.Int).Value = s.Age;
        // Run a command that changes rows.
        cmd.ExecuteNonQuery();
    }

    // STUDY PART: Display the selected student
    // Copy the selected row into the editable form fields.
    void SelectRow(object sender, SelectionChangedEventArgs e)
    {
        // Run the next branch only when this condition is true.
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
        // Store file for the steps below.
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
    // Expose the Id value on this object.
    public int Id { get; set; }
    // Expose the Name value on this object.
    public string Name { get; set; } = "";
    // Expose the Age value on this object.
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
