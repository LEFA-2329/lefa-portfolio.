var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient("School", client => client.BaseAddress = new Uri(builder.Configuration["SchoolApi"] ?? "http://localhost:5100/"));
var app = builder.Build();
app.UseStaticFiles();
app.MapControllerRoute("default", "{controller=Students}/{action=Index}/{id?}");
app.Run();
