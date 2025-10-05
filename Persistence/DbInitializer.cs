using System;
using Domain;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        if (context.Todos.Any()) return;
        var todos = new List<Todo>
        {
            new()
            {
                Id = Guid.NewGuid().ToString(),
                Title = "Learn .NET",
                Description = "Watch tutorials and build a sample project",
                Status = "Pending",
                CreateAt = DateTime.Now,
                UpdateAt = DateTime.Now,
                DueDate = DateTime.Now.AddDays(7),
                Pariority = "High"
            },
            new()
            {
                Id = Guid.NewGuid().ToString(),
                Title = "Learn React",
                Description = "Create a small React frontend",
               Status = "Completed",
                CreateAt = DateTime.Now,
                UpdateAt = DateTime.Now,
                DueDate = DateTime.Now.AddDays(14),
                Pariority = "Medium"
            },
            new()
            {
                Id = Guid.NewGuid().ToString(),
                Title = "Finish Bank Project",
                Description = "Work on document generation system",
                Status = "In Progress",
                CreateAt = DateTime.Now,
                UpdateAt = DateTime.Now,
                DueDate = DateTime.Now.AddDays(30),
                Pariority = "High"
            }
        };

        context.Todos.AddRange(todos);

        await context.SaveChangesAsync();
}
}
