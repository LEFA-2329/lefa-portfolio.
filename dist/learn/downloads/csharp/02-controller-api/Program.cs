var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddSingleton<StudentStore>();
var app = builder.Build();
app.MapControllers();
app.Run();
