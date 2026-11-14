using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<SchoolDb>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("School"), sql => sql.EnableRetryOnFailure()));
var app = builder.Build();
// Classroom startup migration. In production prefer a reviewed migration job.
if (builder.Configuration.GetValue<bool>("StudyLabMigrate"))
{
    using var scope = app.Services.CreateScope();
    scope.ServiceProvider.GetRequiredService<SchoolDb>().Database.Migrate();
}

app.MapGet("/health", () => Results.Ok(new { status = "ready" }));
app.MapControllers();
app.Run();
