// Follow the numbered teaching parts in order. The full file combines every part.
// STUDY PART: Create the application builder
// The builder collects configuration, logging and services before the server starts.
var builder = WebApplication.CreateBuilder(args);
// STUDY PART: Register services
// Tell dependency injection which objects the application needs and how to create them.
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient("School", client => client.BaseAddress = new Uri(builder.Configuration["SchoolApi"] ?? "http://localhost:5100/"));
// STUDY PART: Build the application
// Create the app from the registered services and configuration.
var app = builder.Build();
// STUDY PART: Configure request handling
// Middleware runs in this order. Authentication must run before authorisation.
app.UseStaticFiles();
// STUDY PART: Map an endpoint or controller
// Connect an HTTP method and URL to the C# work that handles the request.
app.MapControllerRoute("default", "{controller=Students}/{action=Index}/{id?}");
// STUDY PART: Start the server
// Keep the application running and listen for requests until it is stopped.
app.Run();
