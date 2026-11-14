using System.Windows;
using System.Windows.Controls;
using System.IO;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Data;

namespace DesktopData;
public partial class MainWindow : Window
{
    readonly string folder = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "StudyLabData");
    public MainWindow()
    {
        InitializeComponent();
        Directory.CreateDirectory(folder);
        using var db = Db();
        db.Database.EnsureCreated();
    }

    SchoolDb Db() => new(Path.Combine(folder, "school.db"));
    SqlConnection Connect() => new(Environment.GetEnvironmentVariable("STUDYLAB_SQL") ?? @"Server=LEFA\SQLEXPRESS;Database=StudyLabAdo;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True");
    bool Ado => StorageMode.SelectedIndex == 1;

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

    void Read(object sender, RoutedEventArgs e) => Guard(() =>
    {
        Rows.ItemsSource = Load();
        Status.Text = "Rows loaded.";
    });
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

    void SelectRow(object sender, SelectionChangedEventArgs e)
    {
        if (Rows.SelectedItem is Student s)
        {
            NameBox.Text = s.Name;
            AgeBox.Text = s.Age.ToString();
        }
    }

    void Export(object sender, RoutedEventArgs e) => Guard(() =>
    {
        var file = Path.Combine(folder, "students.json");
        File.WriteAllText(file, JsonSerializer.Serialize(Load(), new JsonSerializerOptions { WriteIndented = true }));
        Status.Text = "Saved: " + file;
    });
    void ReadJson(object sender, RoutedEventArgs e) => Guard(() =>
    {
        Rows.ItemsSource = JsonSerializer.Deserialize<List<Student>>(File.ReadAllText(Path.Combine(folder, "students.json"))) ?? [];
        Status.Text = "JSON preview loaded. It has not been inserted into the database.";
    });
}

public class Student
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int Age { get; set; }
}

public class SchoolDb(string path) : DbContext
{
    public DbSet<Student> Students => Set<Student>();

    protected override void OnConfiguring(DbContextOptionsBuilder o) => o.UseSqlite("Data Source=" + path);
}
