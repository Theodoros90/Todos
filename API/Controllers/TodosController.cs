using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class TodosController : BaseApiController
    {
        private readonly AppDbContext context;
        public TodosController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Todo>> CreateTodo(Todo todo)
        {
            context.Todos.Add(todo);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodoDetail), new { id = todo.Id }, todo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(string id)
        {
            var todo = await context.Todos.FindAsync(id);
            if (todo == null) return NotFound();
            context.Todos.Remove(todo);
            await context.SaveChangesAsync();
            return NoContent();
        }

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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(string id, Todo updatedTodo)
        {
            if (id != updatedTodo.Id)
                return BadRequest("ID mismatch");

            var todo = await context.Todos.FindAsync(id);
            if (todo == null) return NotFound();

            // Update fields
            todo.Title = updatedTodo.Title;
            todo.Description = updatedTodo.Description;
            todo.Status = updatedTodo.Status;
            todo.CreateAt = updatedTodo.CreateAt;
            todo.UpdateAt = updatedTodo.UpdateAt;
            todo.DueDate = updatedTodo.DueDate;
            todo.Pariority = updatedTodo.Pariority;

            await context.SaveChangesAsync();
            return Ok(todo);
        }
    }
}
