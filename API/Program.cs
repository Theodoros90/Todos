using Application.Core;
using Application.Todos.Queries;
using Microsoft.EntityFrameworkCore;
using Persistence;




var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add controllers service (required for MapControllers)
builder.Services.AddControllers();
builder.Services.AddMediatR(cfg =>
cfg.RegisterServicesFromAssemblyContaining<GetTodoList.Handler>());
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);





// Add CORS policy for development


var app = builder.Build();


// Use CORS policy
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("http://localhost:3000", "https://localhost:3000"));

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
