// Follow the numbered teaching parts in order. The full file combines every part.
using Microsoft.EntityFrameworkCore;

// STUDY PART: Create the application builder
// The builder collects configuration, logging and services before the server starts.
var builder = WebApplication.CreateBuilder(args);
// STUDY PART: Register services
// Tell dependency injection which objects the application needs and how to create them.
builder.Services.AddControllers();
builder.Services.AddDbContext<SchoolDb>(options => options.UseSqlite(builder.Configuration.GetConnectionString("School") ?? throw new InvalidOperationException("Set ConnectionStrings:School.")));
// STUDY PART: Build the application
// Create the app from the registered services and configuration.
var app = builder.Build();
// Run the migration commands in the lesson before starting this project.
// STUDY PART: Map an endpoint or controller
// Connect an HTTP method and URL to the C# work that handles the request.
app.MapControllers();
// STUDY PART: Start the server
// Keep the application running and listen for requests until it is stopped.
app.Run();
