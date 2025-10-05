using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class TodosController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Todo>>> GetTodos()
    {
        return await context.Todos.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetTodoDetail(string id)
    {
        var todo = await context.Todos.FindAsync(id);
        if (todo == null) return NotFound();
        return todo;
}
}
