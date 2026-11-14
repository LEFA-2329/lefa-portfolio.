// Follow the numbered teaching parts in order. The full file combines every part.
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.RateLimiting;

// STUDY PART: Create the application builder
// The builder collects configuration, logging and services before the server starts.
var builder = WebApplication.CreateBuilder(args);
// STUDY PART: Register services
// Tell dependency injection which objects the application needs and how to create them.
builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddDbContext<AppDb>(o => o.UseSqlite(builder.Configuration.GetConnectionString("School") ?? "Data Source=secure-school.db"));
builder.Services.AddIdentityApiEndpoints<IdentityUser>().AddEntityFrameworkStores<AppDb>();
builder.Services.AddAuthorization();
builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = 429;
    o.AddPolicy("api", context => RateLimitPartition.GetFixedWindowLimiter(context.User.Identity?.Name ?? context.Connection.RemoteIpAddress?.ToString() ?? "local", _ => new FixedWindowRateLimiterOptions { PermitLimit = 60, Window = TimeSpan.FromMinutes(1), QueueLimit = 0 }));
});
// STUDY PART: Build the application
// Create the app from the registered services and configuration.
var app = builder.Build();
// STUDY PART: Configure request handling
// Middleware runs in this order. Authentication must run before authorisation.
app.UseExceptionHandler();
app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();
// STUDY PART: Map an endpoint or controller
// Connect an HTTP method and URL to the C# work that handles the request.
app.MapGroup("/auth").MapIdentityApi<IdentityUser>();
// STUDY PART: Map an endpoint or controller
// Connect an HTTP method and URL to the C# work that handles the request.
app.MapControllers().RequireRateLimiting("api");
// STUDY PART: Start the server
// Keep the application running and listen for requests until it is stopped.
app.Run();
