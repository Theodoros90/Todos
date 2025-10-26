using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Todos.Commands;

public class CreateToDo
{
    public class Command : IRequest<string>
    {
        public required Todo Todo { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Todos.Add(request.Todo);
           await context.SaveChangesAsync(cancellationToken);
            return request.Todo.Id;
        }
    }

}
