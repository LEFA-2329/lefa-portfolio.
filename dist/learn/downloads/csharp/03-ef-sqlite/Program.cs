using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<SchoolDb>(options => options.UseSqlite(builder.Configuration.GetConnectionString("School") ?? throw new InvalidOperationException("Set ConnectionStrings:School.")));
var app = builder.Build();
// Run the migration commands in the lesson before starting this project.
app.MapControllers();
app.Run();
