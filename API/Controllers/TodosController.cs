using System;
using Application.Todos.Commands;
using Application.Todos.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TodosController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Todo>>> GetTodos()
        {
            return await Mediator.Send(new GetTodoList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodoDetail(string id)
        {
            return await Mediator.Send(new GetTodoDetails.Query { Id = id });

        }
        [HttpPost]
        public async Task<ActionResult<string>> CreateTodo(Todo todo)
        {
            return await Mediator.Send(new CreateToDo.Command { Todo = todo });

        }
        [HttpPut]
        public async Task<ActionResult> EditTodo(Todo todo)
        {
            await Mediator.Send(new EditTodo.Command { Todo = todo });
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodo(string id)
        {
            await Mediator.Send(new DeleteToDo.Command { Id = id });
            return Ok();
        }
    }
}
